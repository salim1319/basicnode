import App from "./App";
import Login from "./pages/Login.js";
import Home from "./pages/Home.js";
import Register from "./pages/Register.js";
import { createBrowserRouter } from "react-router-dom";
import CheckAuth from "./utils/CheckAuth.js";
import Guest from "./utils/Guest.js";
import Category from "./pages/Category.js";

export default createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <CheckAuth>
            <Home />
          </CheckAuth>
        ),
      },

      {
        path: "/login",
        element: (
          <Guest>
            <Login />
          </Guest>
        ),
      },

      {
        path: "/register",
        element: (
          <Guest>
            <Register />
          </Guest>
        ),
      },

      {
        path: "/category",
        element: (
          <CheckAuth>
            <Category />
          </CheckAuth>
        ),
      },
    ],
  },
]);
