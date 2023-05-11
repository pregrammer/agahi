import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Ad, { adLoader } from "./pages/Ad";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./components/Layout";
import UserProvider from "./components/UserProvider";
import RefreshIndexPageProvider from "./components/RefreshIndexPageProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: "advertisement/:id",
        element: <Ad />,
        loader: adLoader
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <UserProvider>
        <RefreshIndexPageProvider>
          <RouterProvider router={router} />
        </RefreshIndexPageProvider>
      </UserProvider>
    </div>
  );
}

export default App;
