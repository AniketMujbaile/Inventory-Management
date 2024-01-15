const express = require('express');
const ItemDetails = require('../../model/Item');
const authenticateToken = require('../../middleware/authenticateToken');
const router = express.Router();

router.post('/add', authenticateToken, async (req, res) => {
    try {
        console.log("the body", req.body);
        const item = await ItemDetails.create(req.body);
    
        return res.status(200).json({
            data: item,
            message: "Item created successfully!"
        });
    } catch (error) {
        console.error("Error creating item:", error);
        return res.status(500).json({
            data: null,
            message: "Error while creating item!"
        });
    }
});

router.get('/get', authenticateToken, async (req, res) => {
    try {
        const items = await ItemDetails.find();
        return res.status(200).json({
            data: items,
            message: "Items fetched successfully!"
        });
    } catch (error) {
        console.error("Error fetching items:", error);
        return res.status(500).json({
            data: null,
            message: "Error while fetching items!"
        });
    }
});

router.put('/update/:id', authenticateToken, async (req, res) => {
    try {
        const updatedItem = await ItemDetails.findByIdAndUpdate(req.params.id, req.body, { new: true });
        
        if (!updatedItem) {
            return res.status(404).json({
                data: null,
                message: "Item not found!"
            });
        }

        return res.status(200).json({
            data: updatedItem,
            message: "Item updated successfully!"
        });
    } catch (error) {
        console.error("Error updating item:", error);
        return res.status(500).json({
            data: null,
            message: "Error while updating item!"
        });
    }
});

router.delete('/delete/:id', authenticateToken, async (req, res) => {
    try {
        const deletedItem = await ItemDetails.findByIdAndDelete(req.params.id);
        
        if (!deletedItem) {
            return res.status(404).json({
                data: null,
                message: "Item not found!"
            });
        }

        return res.status(200).json({
            data: deletedItem,
            message: "Item deleted successfully!"
        });
    } catch (error) {
        console.error("Error deleting item:", error);
        return res.status(500).json({
            data: null,
            message: "Error while deleting item!"
        });
    }
});

module.exports = router;

 