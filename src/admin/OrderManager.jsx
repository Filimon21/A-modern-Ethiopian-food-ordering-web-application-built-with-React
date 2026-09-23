import { useEffect, useState } from "react";

import {
  getOrders,
  updateOrderStatus,
} from "../orders/orderHistoryStore";

const statuses = [
  "Preparing",
  "Out for Delivery",
  "Delivered",
  "Cancelled",
];

function OrderManager() {
  const [orders, setOrders] = useState([]);

  function loadOrders() {
    setOrders(getOrders());
  }

  useEffect(() => {
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

  function handleStatusChange(
    orderId,
    status
  ) {
    const updatedOrders =
      updateOrderStatus(
        orderId,
        status
      );

    setOrders(updatedOrders);
  }

  return (
    <div>
      <div className="page-heading">
        <div>
          <span className="eyebrow">
            Order Management
          </span>

          <h1>Customer Orders</h1>

          <p>
            Review orders and update their delivery
            status.
          </p>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">
            🧾
          </div>

          <h2>No customer orders</h2>

          <p>
            Orders placed by customers will appear
            here.
          </p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => {
            const total =
              Number(order.total) || 0;

            const date = new Date(order.date);

            return (
              <article
                className="order-card"
                key={order.id}
              >
                <div className="order-card-header">
                  <div>
                    <span className="order-label">
                      Customer Order
                    </span>

                    <h2>#{order.id}</h2>

                    <p>
                      {date.toLocaleDateString()}{" "}
                      {date.toLocaleTimeString(
                        [],
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </p>
                  </div>

                  <select
                    value={
                      order.status ||
                      "Preparing"
                    }
                    onChange={(event) =>
                      handleStatusChange(
                        order.id,
                        event.target.value
                      )
                    }
                    style={{
                      padding: "9px 12px",
                      borderRadius: "10px",
                      border:
                        "1px solid var(--border)",
                      background:
                        "var(--surface)",
                      color: "var(--text)",
                      fontWeight: 700,
                    }}
                  >
                    {statuses.map(
                      (status) => (
                        <option
                          key={status}
                          value={status}
                        >
                          {status}
                        </option>
                      )
                    )}
                  </select>
                </div>

                <div className="order-customer">
                  <div>
                    <span>
                      Customer
                    </span>

                    <strong>
                      {order.customer
                        ?.fullName ||
                        "Customer"}
                    </strong>
                  </div>

                  <div>
                    <span>
                      Phone
                    </span>

                    <strong>
                      {order.customer
                        ?.phone ||
                        "Not provided"}
                    </strong>
                  </div>

                  <div>
                    <span>
                      Area
                    </span>

                    <strong>
                      {order.customer
                        ?.area ||
                        "Not specified"}
                    </strong>
                  </div>

                  <div>
                    <span>
                      Payment
                    </span>

                    <strong>
                      {order.customer
                        ?.paymentMethod ===
                      "telebirr"
                        ? "Telebirr"
                        : "Cash on Delivery"}
                    </strong>
                  </div>
                </div>

                <div
                  style={{
                    margin: "16px 0",
                    padding: "14px",
                    borderRadius: "12px",
                    background:
                      "var(--blue-light)",
                  }}
                >
                  <strong>
                    Delivery Address
                  </strong>

                  <p
                    style={{
                      margin:
                        "6px 0 0",
                    }}
                  >
                    {order.customer
                      ?.address ||
                      "No address provided"}
                  </p>
                </div>

                <div className="order-items">
                  {order.items?.map(
                    (item) => {
                      const price =
                        Number(
                          item.price
                        ) || 0;

                      const quantity =
                        Number(
                          item.quantity
                        ) || 0;

                      return (
                        <div
                          className="order-item"
                          key={item.id}
                        >
                          <div className="order-item-main">
                            <span className="order-item-icon">
                              {item.emoji ||
                                "🍽️"}
                            </span>

                            <div>
                              <strong>
                                {item.name}
                              </strong>

                              <span>
                                {quantity} ×{" "}
                                {price.toLocaleString()}{" "}
                                ETB
                              </span>
                            </div>
                          </div>

                          <strong>
                            {(
                              price *
                              quantity
                            ).toLocaleString()}{" "}
                            ETB
                          </strong>
                        </div>
                      );
                    }
                  )}
                </div>

                <div className="order-total">
                  <span>
                    Total
                  </span>

                  <strong>
                    {total.toLocaleString()}{" "}
                    ETB
                  </strong>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default OrderManager;