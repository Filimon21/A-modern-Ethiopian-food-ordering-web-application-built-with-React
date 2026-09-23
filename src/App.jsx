import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./Layout";

import Home from "./pages/Home";
import Login from "./pages/Login";
import DishDetails from "./pages/DishDetails";
import NotFound from "./pages/NotFound";

import Menu from "./menu/Menu";

import Favorites from "./favorites/Favorites";

import OrderHistory from "./orders/OrderHistory";

import Checkout from "./checkout/Checkout";

import AdminLogin from "./admin/AdminLogin";
import RequireAdmin from "./admin/RequireAdmin";
import AdminLayout from "./admin/AdminLayout";
import Dashboard from "./admin/Dashboard";
import DishManager from "./admin/DishManager";
import OrderManager from "./admin/OrderManager";

import RequireAuth from "./auth/RequireAuth";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />

          <Route path="/menu" element={<Menu />} />

          <Route
            path="/menu/:id"
            element={<DishDetails />}
          />

          <Route
            path="/favorites"
            element={<Favorites />}
          />

          <Route element={<RequireAuth />}>
            <Route
              path="/checkout"
              element={<Checkout />}
            />

            <Route
              path="/orders"
              element={<OrderHistory />}
            />
          </Route>

          <Route
            path="*"
            element={<NotFound />}
          />
        </Route>

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        <Route element={<RequireAdmin />}>
          <Route
            path="/admin"
            element={<AdminLayout />}
          >
            <Route
              index
              element={<Dashboard />}
            />

            <Route
              path="dishes"
              element={<DishManager />}
            />

            <Route
              path="orders"
              element={<OrderManager />}
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}