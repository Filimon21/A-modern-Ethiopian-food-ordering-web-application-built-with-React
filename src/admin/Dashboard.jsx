import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getDishes } from "../api/dishes";
import { getOrders } from "../orders/orderHistoryStore";

function Dashboard() {
  const [stats, setStats] = useState({
    dishes: 0,
    orders: 0,
    revenue: 0,
    pending: 0,
  });

  useEffect(() => {
    function loadStats() {
      const dishes = getDishes();

      const orders = getOrders();

      Promise.resolve(dishes).then((dishData) => {
        const safeDishes = Array.isArray(dishData)
          ? dishData
          : [];

        const safeOrders = Array.isArray(orders)
          ? orders
          : [];

        const revenue = safeOrders.reduce(
          (total, order) =>
            total + Number(order.total || 0),
          0
        );

        const pending = safeOrders.filter(
          (order) =>
            order.status !== "Delivered" &&
            order.status !== "Cancelled"
        ).length;

        setStats({
          dishes: safeDishes.length,
          orders: safeOrders.length,
          revenue,
          pending,
        });
      });
    }

    loadStats();

    window.addEventListener(
      "orders-changed",
      loadStats
    );

    window.addEventListener(
      "dishes-changed",
      loadStats
    );

    return () => {
      window.removeEventListener(
        "orders-changed",
        loadStats
      );

      window.removeEventListener(
        "dishes-changed",
        loadStats
      );
    };
  }, []);

  return (
    <div>
      <div className="page-heading">
        <div>
          <span className="eyebrow">
            Control Center
          </span>

          <h1>Admin Dashboard</h1>

          <p>
            Manage your Addis Eats menu and customer
            orders.
          </p>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        <div className="checkout-card">
          <span className="eyebrow">
            Menu
          </span>

          <h2
            style={{
              fontSize: "32px",
              margin: "8px 0",
            }}
          >
            {stats.dishes}
          </h2>

          <p>Available dishes</p>
        </div>

        <div className="checkout-card">
          <span className="eyebrow">
            Orders
          </span>

          <h2
            style={{
              fontSize: "32px",
              margin: "8px 0",
            }}
          >
            {stats.orders}
          </h2>

          <p>Total customer orders</p>
        </div>

        <div className="checkout-card">
          <span className="eyebrow">
            Revenue
          </span>

          <h2
            style={{
              fontSize: "28px",
              margin: "8px 0",
            }}
          >
            {stats.revenue.toLocaleString()} ETB
          </h2>

          <p>Total recorded sales</p>
        </div>

        <div className="checkout-card">
          <span className="eyebrow">
            Active
          </span>

          <h2
            style={{
              fontSize: "32px",
              margin: "8px 0",
            }}
          >
            {stats.pending}
          </h2>

          <p>Orders in progress</p>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px",
        }}
      >
        <div className="checkout-card">
          <h2>Manage Menu</h2>

          <p>
            Add, edit, and remove dishes from the
            Addis Eats menu.
          </p>

          <Link
            to="/admin/dishes"
            className="button button-primary"
          >
            Manage Dishes
          </Link>
        </div>

        <div className="checkout-card">
          <h2>Manage Orders</h2>

          <p>
            Review customer orders and update their
            delivery status.
          </p>

          <Link
            to="/admin/orders"
            className="button button-primary"
          >
            Manage Orders
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;