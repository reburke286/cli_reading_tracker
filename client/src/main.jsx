import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import Landing from './pages/Landing'
import YearOverYear from './pages/YearOverYear'
import AllBooks from "./pages/AllBooks";
import BooksByYear from './pages/BooksByYear'
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "/yearoveryear",
        element: <YearOverYear />,
      },
      {
        path: "/all",
        element: <AllBooks />
      },
      {
        path: "/byyear",
        element: <BooksByYear />
      }
    ],
  },

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);