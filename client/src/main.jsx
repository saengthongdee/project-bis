import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme.js'
import Dashbord from './HR/dashbord.jsx';
import Createcost from './HR/createcost.jsx';
import Repost from './HR/repost.jsx';
import DashboardPage from './EMP/dashboard.jsx';

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
  },
  {
    path: "DashboardPage",
    element: <DashboardPage />
  }

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>

  </React.StrictMode>,
);
