import { Link } from "react-router-dom";

function OrderHistoryItem({ order }) {
  const date = new Date(order.date);

  const total = Number(order.total) || 0;

  return (
    <article className="order-card">
      <div className="order-card-header">
        <div>
          <span className="order-label">
            Order
          </span>

          <h2>#{order.id}</h2>

          <p>
            {date.toLocaleDateString()}{" "}
            {date.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>

        <span
          className={`order-status ${
            order.status
              ?.toLowerCase()
              .replace(/\s+/g, "-") || ""
          }`}
        >
          {order.status || "Preparing"}
        </span>
      </div>

      <div className="order-customer">
        <div>
          <span>Customer</span>
          <strong>
            {order.customer?.fullName ||
              "Customer"}
          </strong>
        </div>

        <div>
          <span>Delivery Area</span>
          <strong>
            {order.customer?.area ||
              "Not specified"}
          </strong>
        </div>

        <div>
          <span>Payment</span>
          <strong>
            {order.customer?.paymentMethod ===
            "telebirr"
              ? "Telebirr"
              : "Cash on Delivery"}
          </strong>
        </div>
      </div>

      <div className="order-items">
        {order.items?.map((item) => {
          const price = Number(item.price) || 0;
          const quantity =
            Number(item.quantity) || 0;

          return (
            <div
              className="order-item"
              key={item.id}
            >
              <div className="order-item-main">
                <span className="order-item-icon">
                  {item.emoji || "🍽️"}
                </span>

                <div>
                  <strong>{item.name}</strong>

                  <span>
                    {quantity} ×{" "}
                    {price.toLocaleString()} ETB
                  </span>
                </div>
              </div>

              <strong>
                {(price * quantity).toLocaleString()}{" "}
                ETB
              </strong>
            </div>
          );
        })}
      </div>

      <div className="order-total">
        <span>Total</span>

        <strong>
          {total.toLocaleString()} ETB
        </strong>
      </div>

      <div className="order-card-footer">
        <Link
          to="/menu"
          className="button button-small button-secondary"
        >
          Order Again
        </Link>
      </div>
    </article>
  );
}

export default OrderHistoryItem;