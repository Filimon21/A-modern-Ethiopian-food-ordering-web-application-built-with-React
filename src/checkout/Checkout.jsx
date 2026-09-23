import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useCart } from "../cart/cartStore";
import { saveOrder } from "../orders/orderHistoryStore";

import Field from "./Field";
import DeliveryEstimate from "./DeliveryEstimate";
import { validateCheckout } from "./validate";

function Checkout() {
  const navigate = useNavigate();

  const {
    cart,
    subtotal,
    clearCart,
  } = useCart();

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    area: "",
    paymentMethod: "",
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const deliveryFee = useMemo(() => {
    const fees = {
      Bole: 80,
      Kazanchis: 70,
      Piassa: 90,
      Megenagna: 80,
      CMC: 100,
      Lideta: 80,
      Mexico: 80,
    };

    return fees[form.area] || 0;
  }, [form.area]);

  const total = subtotal + deliveryFee;

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: "",
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (cart.length === 0) {
      return;
    }

    const validationErrors = validateCheckout(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);

    const order = {
      id: `AE-${Date.now()}`,
      date: new Date().toISOString(),
      status: "Preparing",
      customer: {
        fullName: form.fullName.trim(),
        phone: form.phone.trim(),
        address: form.address.trim(),
        area: form.area,
        paymentMethod: form.paymentMethod,
      },
      items: cart.map((item) => ({
        id: item.id,
        name: item.name,
        price: Number(item.price) || 0,
        quantity: Number(item.quantity) || 0,
        emoji: item.emoji || "🍽️",
      })),
      subtotal,
      deliveryFee,
      total,
    };

    saveOrder(order);
    clearCart();

    setSubmitting(false);

    navigate("/orders");
  }

  if (cart.length === 0) {
    return (
      <main className="page-section">
        <div className="container">
          <div className="empty-state">
            <div className="empty-icon">🛒</div>

            <h1>Your cart is empty</h1>

            <p>
              Add some delicious dishes before
              checking out.
            </p>

            <Link
              to="/menu"
              className="button button-primary"
            >
              Browse Menu
            </Link>
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
              Almost there
            </span>

            <h1>Checkout</h1>

            <p>
              Enter your delivery information and
              place your Addis Eats order.
            </p>
          </div>
        </div>

        <div className="checkout-layout">
          <form
            className="checkout-form"
            onSubmit={handleSubmit}
          >
            <section className="checkout-card">
              <div className="checkout-card-heading">
                <span className="checkout-step">
                  01
                </span>

                <div>
                  <h2>Delivery Information</h2>

                  <p>
                    Tell us where to deliver your
                    order.
                  </p>
                </div>
              </div>

              <div className="form-grid">
                <Field
                  label="Full Name"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  error={errors.fullName}
                  required
                />

                <Field
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="09xxxxxxxx"
                  error={errors.phone}
                  required
                />
              </div>

              <Field
                label="Delivery Address"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="House number, street or landmark"
                error={errors.address}
                required
              />

              <Field
                label="Delivery Area"
                name="area"
                value={form.area}
                onChange={handleChange}
                error={errors.area}
                required
                options={[
                  {
                    value: "Bole",
                    label: "Bole",
                  },
                  {
                    value: "Kazanchis",
                    label: "Kazanchis",
                  },
                  {
                    value: "Piassa",
                    label: "Piassa",
                  },
                  {
                    value: "Megenagna",
                    label: "Megenagna",
                  },
                  {
                    value: "CMC",
                    label: "CMC",
                  },
                  {
                    value: "Lideta",
                    label: "Lideta",
                  },
                  {
                    value: "Mexico",
                    label: "Mexico",
                  },
                ]}
              />

              <DeliveryEstimate area={form.area} />
            </section>

            <section className="checkout-card">
              <div className="checkout-card-heading">
                <span className="checkout-step">
                  02
                </span>

                <div>
                  <h2>Payment Method</h2>

                  <p>
                    Choose how you want to pay.
                  </p>
                </div>
              </div>

              <div className="payment-options">
                <label
                  className={`payment-option ${
                    form.paymentMethod === "cash"
                      ? "selected"
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash"
                    checked={
                      form.paymentMethod === "cash"
                    }
                    onChange={handleChange}
                  />

                  <span className="payment-icon">
                    💵
                  </span>

                  <span>
                    <strong>Cash on Delivery</strong>
                    <small>
                      Pay when your order arrives.
                    </small>
                  </span>
                </label>

                <label
                  className={`payment-option ${
                    form.paymentMethod === "telebirr"
                      ? "selected"
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="telebirr"
                    checked={
                      form.paymentMethod ===
                      "telebirr"
                    }
                    onChange={handleChange}
                  />

                  <span className="payment-icon">
                    📱
                  </span>

                  <span>
                    <strong>Telebirr</strong>
                    <small>
                      Pay securely using Telebirr.
                    </small>
                  </span>
                </label>
              </div>

              {errors.paymentMethod && (
                <span className="field-error">
                  {errors.paymentMethod}
                </span>
              )}
            </section>

            <button
              type="submit"
              className="button button-primary checkout-submit"
              disabled={submitting}
            >
              {submitting
                ? "Placing Order..."
                : `Place Order · ${total.toLocaleString()} ETB`}
            </button>
          </form>

          <aside className="checkout-summary">
            <div className="checkout-summary-card">
              <div className="checkout-summary-heading">
                <h2>Your Order</h2>

                <Link to="/menu">
                  Add more
                </Link>
              </div>

              <div className="checkout-items">
                {cart.map((item) => {
                  const price =
                    Number(item.price) || 0;

                  const quantity =
                    Number(item.quantity) || 0;

                  return (
                    <div
                      className="checkout-item"
                      key={item.id}
                    >
                      <div className="checkout-item-icon">
                        {item.emoji || "🍽️"}
                      </div>

                      <div>
                        <strong>{item.name}</strong>

                        <span>
                          {quantity} ×{" "}
                          {price.toLocaleString()} ETB
                        </span>
                      </div>

                      <strong>
                        {(
                          price * quantity
                        ).toLocaleString()}{" "}
                        ETB
                      </strong>
                    </div>
                  );
                })}
              </div>

              <div className="summary-divider" />

              <div className="summary-row">
                <span>Subtotal</span>

                <strong>
                  {subtotal.toLocaleString()} ETB
                </strong>
              </div>

              <div className="summary-row">
                <span>Delivery</span>

                <strong>
                  {deliveryFee.toLocaleString()} ETB
                </strong>
              </div>

              <div className="summary-total">
                <span>Total</span>

                <strong>
                  {total.toLocaleString()} ETB
                </strong>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default Checkout;