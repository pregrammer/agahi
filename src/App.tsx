import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Ad, { adLoader } from "./pages/Ad";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./components/Layout";
import UserProvider from "./components/UserProvider";
import RefreshIndexPageProvider from "./components/RefreshIndexPageProvider";
import Error from "./pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Index />,
        errorElement: <Error />,
      },
      {
        path: "advertisement/:id",
        element: <Ad />,
        loader: adLoader,
        errorElement: <Error />,
      },
      {
        path: "login",
        element: <Login />,
        errorElement: <Error />,
      },
      {
        path: "register",
        element: <Register />,
        errorElement: <Error />,
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
