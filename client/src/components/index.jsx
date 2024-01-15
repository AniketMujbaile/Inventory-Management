import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import axios from 'axios';

const Dashboard = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [supplier_info, setSupplierInfo] = useState("");
  const [mfgDate, setMfgDate] = useState("");
  const [items, setItems] = useState([]);

  const Url = "http://localhost:8000";
  const token = localStorage.getItem('todoToken');

  const fetchItems = async () => {
    try {
      const response = await axios.get(`${Url}/get`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log(response.data);

      if (response.status === 200) {
        setItems(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSignout = () => {
     localStorage.removeItem('todoToken');
     window.location.href = '/login';
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    const itemObject = {
      name,
      price,
      supplier_info,
      mfgDate,
    };

    try {
      const itemResponse = await axios.post(`${Url}/add`, itemObject, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (itemResponse.status === 200) {
        setName("");
        setPrice("");
        setSupplierInfo("");
        setMfgDate("");
        setItems((prevItems) => [itemResponse.data.data, ...prevItems]);
      } else if (itemResponse.status === 401) {
        console.error("Unauthorized - Please log in");
       }
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      const response = await axios.delete(`${Url}/delete/${itemId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        setItems((prevItems) => prevItems.filter((item) => item._id !== itemId));
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleUpdateItem = async (itemId) => {
    try {
      const existingItem = items.find((item) => item._id === itemId);

      const updatedName = prompt("Enter updated name", existingItem.name);
      const updatedPrice = prompt("Enter updated price", existingItem.price);
      const updatedSupplierInfo = prompt("Enter updated supplier info", existingItem.supplier_info);
      const updatedMfgDate = prompt("Enter updated manufacturing date", existingItem.mfgDate);

      const updatedItem = {
        name: updatedName,
        price: updatedPrice,
        supplier_info: updatedSupplierInfo,
        mfgDate: updatedMfgDate,
      };

      const response = await axios.put(`${Url}/update/${itemId}`, updatedItem, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        setItems((prevItems) =>
          prevItems.map((item) => (item._id === itemId ? { ...item, ...updatedItem } : item))
        );
        console.log("Item updated successfully!");
      } else {
        console.error("Error updating item:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  return (
    
    <div className="dashboard-container">
      <header>
        <h1>Inventory Management System</h1>
      <button onClick={handleSignout}>Sign Out</button>
      </header>
      <section>
      <h1>Add Inventory Item</h1>
      <form onSubmit={formSubmitHandler} className="item-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input id="name" value={name} onChange={(event) => setName(event.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input id="price" value={price} onChange={(event) => setPrice(event.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="supplierInfo">Supplier Info:</label>
          <input
            id="supplierInfo"
            value={supplier_info}
            onChange={(event) => setSupplierInfo(event.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="mfgDate">Manufacturing Date:</label>
          <input
            id="mfgDate"
            value={mfgDate}
            onChange={(event) => setMfgDate(event.target.value)}
            type="date"
          />
        </div>

        <div className="form-group">
          <button type="submit">Submit</button>
          <button type="reset">Reset</button>
        </div>
      </form>

      
      <h1>Items List</h1>
      <ul className="item-list">
        {items.map((item) => (
          <li key={item._id} className="item">
            {item.name}{" "}
            <button onClick={() => handleUpdateItem(item._id)}>Update</button>{" "}
            <button onClick={() => handleDeleteItem(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
      </section>
    </div>
  );
};

export default Dashboard;