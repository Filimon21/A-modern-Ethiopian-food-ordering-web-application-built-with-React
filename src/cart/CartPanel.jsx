import { Link } from "react-router-dom";
import { useCart } from "./cartStore";

function CartPanel({ isOpen, onClose }) {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    subtotal,
  } = useCart();

  if (!isOpen) {
    return null;
  }

  return (
    <div className="cart-overlay" onClick={onClose}>
      <aside
        className="cart-panel"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="cart-panel-header">
          <div>
            <span className="eyebrow">Your order</span>
            <h2>Shopping Cart</h2>
          </div>

          <button
            type="button"
            className="cart-close"
            onClick={onClose}
            aria-label="Close shopping cart"
          >
            ×
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="cart-empty">
            <div className="cart-empty-icon">🛒</div>

            <h3>Your cart is empty</h3>

            <p>
              Add some delicious dishes from the Addis Eats menu.
            </p>

            <Link
              to="/menu"
              className="button button-primary"
              onClick={onClose}
            >
              Explore Menu
            </Link>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item) => {
                const itemPrice = Number(item.price) || 0;
                const quantity = Number(item.quantity) || 0;
                const itemTotal = itemPrice * quantity;

                return (
                  <article
                    className="cart-item"
                    key={item.id}
                  >
                    <div className="cart-item-icon">
                      {item.emoji || "🍽️"}
                    </div>

                    <div className="cart-item-info">
                      <h3>{item.name}</h3>

                      <span className="cart-item-price">
                        {itemPrice.toLocaleString()} ETB
                      </span>

                      <div className="cart-item-controls">
                        <button
                          type="button"
                          onClick={() =>
                            decreaseQuantity(item.id)
                          }
                          aria-label={`Decrease ${item.name}`}
                        >
                          −
                        </button>

                        <span>{quantity}</span>

                        <button
                          type="button"
                          onClick={() =>
                            increaseQuantity(item.id)
                          }
                          aria-label={`Increase ${item.name}`}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="cart-item-right">
                      <strong>
                        {itemTotal.toLocaleString()} ETB
                      </strong>

                      <button
                        type="button"
                        className="cart-remove"
                        onClick={() =>
                          removeFromCart(item.id)
                        }
                      >
                        Remove
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="cart-panel-footer">
              <div className="cart-summary-row">
                <span>Subtotal</span>

                <strong>
                  {Number(subtotal).toLocaleString()} ETB
                </strong>
              </div>

              <p className="cart-note">
                Delivery fee will be calculated at checkout.
              </p>

              <Link
                to="/checkout"
                className="button button-primary cart-checkout-button"
                onClick={onClose}
              >
                Proceed to Checkout
              </Link>

              <button
                type="button"
                className="button button-secondary cart-clear-button"
                onClick={clearCart}
              >
                Clear Cart
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

export default CartPanel;