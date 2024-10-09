import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashbord from './HR/dashbord.jsx';
import Createcost from './HR/createcost.jsx';
import Repost from './HR/repost.jsx';

const router = createBrowserRouter([
  {
    path: "index",
    element: <App />
  },
  {
    path: "/",
    element: <App />,
  },
  {
    path: "dashboard",
    element: <Dashbord />
  },
  {
    path: "createcost",
    element: <Createcost />
  },
  {
    path: "repost",
    element: <Repost />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
