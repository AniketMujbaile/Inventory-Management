 
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Home from './components/index';
import Register from './components/Register';
import Login from './components/Login';

const router = createBrowserRouter(
  [
    { path: "/get", element: <Home /> },
    { path: "/register", element: <Register /> },
    { path: "/login", element: <Login /> }

  ]
)

function App() {
  return (
    <RouterProvider router={router}>

    </RouterProvider>
  );
}

export default App;


// import React from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import Dashboard from './components/index';
// import Registration from './components/Register';
// import Login from './components/Login';

// const App = () => {
//   return (
//     <Router>
//       <Switch>
//         <Route path="/item/get" component={Dashboard} />
//         <Route path="/auth/register" component={Registration} />
//         <Route path="/auth/login" component={Login} />
//       </Switch>
//     </Router>
//   );
// };

// export default App;
