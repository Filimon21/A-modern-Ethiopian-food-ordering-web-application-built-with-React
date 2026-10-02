import { useCart } from "./cartStore";

function CartBadge({ onClick, className = "" }) {
  const { totalItems } = useCart();

  return (
    <button
      type="button"
      className={`cart-badge-button ${className}`}
      onClick={onClick}
      aria-label={`Shopping cart with ${totalItems} items`}
    >
      <span className="cart-icon">🛒</span>
      <span className="cart-label">Cart</span>

      {totalItems > 0 && (
        <span className="cart-count">
          {totalItems}
        </span>
      )}
    </button>
  );
}

export default CartBadge;