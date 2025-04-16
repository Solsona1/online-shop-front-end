import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./routes/layout/Layout";
import { HomePage } from "./routes/homePage/HomePage";
import {
  ProductsListPage,
  productsLoader,
} from "./routes/productsListPage/ProductsListPage";
import { LocationPage } from "./routes/locationPage/LocationPage";
import {
  ProductSinglePage,
  singleProductLoader,
} from "./routes/productSinglePage/ProductSinglePage";
import { Login } from "./routes/login/Login";
import { ProductsCrudPage } from "./routes/productsCrud/ProductsCrudPage";
import {
  ProductsForm,
  singleProductFormLoader,
} from "./routes/productsCrud/ProductsForm";
import { CartPage } from "./routes/cartPage/CartPage";
import { StoreContextProvider } from "./contexts/StoreContext";
import { CartContextProvider } from "./contexts/CartContext";
import { UserContextProvider } from "./contexts/UserContext";
import { PrivateRoute } from "./routes/privateRoute/PrivateRoute";
import { Role } from "./types";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/location",
          element: <LocationPage />,
        },
        {
          path: "/list",
          children: [
            {
              index: true,
              element: <ProductsListPage />,
              loader: productsLoader,
            },
            {
              path: ":id",
              element: <ProductSinglePage />,
              loader: singleProductLoader,
            },
          ],
        },
        {
          path: "/login",
          element: <Login />,
        },
        /* admin paths */
        {
          path: "/manage-products",
          children: [
            {
              index: true,
              element: (
                <PrivateRoute authorizedRole={Role.ADMIN}>
                  <ProductsCrudPage />
                </PrivateRoute>
              ),
              loader: productsLoader,
            },
            {
              path: "form/:id?",
              element: (
                <PrivateRoute authorizedRole={Role.ADMIN}>
                  <ProductsForm />
                </PrivateRoute>
              ),
              loader: singleProductFormLoader,
            },
            /*{
              path: "stats",
              element: <StatsPage/>
            }*/
          ],
        },
        /* client's paths */
        {
          path: "/cart",
          children: [
            {
              index: true,
              element: (
                <PrivateRoute authorizedRole={Role.CLIENT}>
                  <CartPage />
                </PrivateRoute>
              ),
            },
            /*  {
              path: "mp/:state",
              element: "estado mp"
            }
          */
          ],
        },
      ],
    },
  ]);

  return (
    <StoreContextProvider>
      <UserContextProvider>
        <CartContextProvider>
          <RouterProvider router={router} />
        </CartContextProvider>
      </UserContextProvider>
    </StoreContextProvider>
  );
}

export default App;
