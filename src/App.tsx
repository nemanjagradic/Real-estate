import { createBrowserRouter } from "react-router-dom";
import RootLayoutPage from "./pages/RootLayoutPage";
import HomePage from "./pages/HomePage";
import { RouterProvider } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import PropertyPage, { loader as loadProperty } from "./pages/PropertyPage";
import ErrorPage from "./pages/ErrorPage";
import { JSX } from "react";
import "./App.css";

function App(): JSX.Element {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayoutPage />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        { path: "/search", element: <SearchPage /> },
        {
          path: "/property/:id",
          element: <PropertyPage />,
          loader: loadProperty,
        },
      ],
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
