import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Spinner from "../ui/Spinner";

import OrderHistoryItem from "./OrderHistoryItem";
import { getOrders } from "./orderHistoryStore";

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function loadOrders() {
      setOrders(getOrders());
      setLoading(false);
    }

    loadOrders();

    window.addEventListener(
      "orders-changed",
      loadOrders
    );

    return () => {
      window.removeEventListener(
        "orders-changed",
        loadOrders
      );
    };
  }, []);

  if (loading) {
    return (
      <main className="page-section">
        <div className="container">
          <div className="loading-state">
            <Spinner />
            <p>Loading your orders...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="page-section">
      <div className="container">
        <div className="page-heading">
          <div>
            <span className="eyebrow">
              Your activity
            </span>

            <h1>Order History</h1>

            <p>
              Track your previous Addis Eats
              orders and order your favorites again.
            </p>
          </div>

          <Link
            to="/menu"
            className="button button-primary"
          >
            Order Again
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🧾</div>

            <h2>No orders yet</h2>

            <p>
              Your completed orders will appear
              here after you place your first order.
            </p>

            <Link
              to="/menu"
              className="button button-primary"
            >
              Explore Menu
            </Link>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <OrderHistoryItem
                key={order.id}
                order={order}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default OrderHistory;