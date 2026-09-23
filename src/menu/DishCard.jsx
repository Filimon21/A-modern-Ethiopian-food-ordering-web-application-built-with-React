import { Link } from "react-router-dom";
import { useCart } from "../cart/cartStore";
import FavoriteButton from "../favorites/FavoriteButton";

function DishCard({ dish }) {
  const { addToCart } = useCart();
  const price = Number(dish.price) || 0;

  return (
    <article className="dish-card">
      <div className="dish-card-image">
        {dish.image ? (
          <img
            src={dish.image}
            alt={dish.name}
            className="dish-real-image"
          />
        ) : (
          <span className="dish-emoji">
            {dish.emoji || "🍽️"}
          </span>
        )}

        {dish.popular && (
          <span className="popular-badge">
            Popular
          </span>
        )}

        <div className="dish-favorite">
          <FavoriteButton dishId={dish.id} />
        </div>
      </div>

      <div className="dish-card-body">
        <div className="dish-card-meta">
          <span className="dish-category">
            {dish.category}
          </span>

          {dish.rating && (
            <span className="dish-rating">
              ★ {dish.rating}
            </span>
          )}
        </div>

        <h3>{dish.name}</h3>

        <p className="dish-description">
          {dish.description}
        </p>

        <div className="dish-card-footer">
          <div>
            <strong className="dish-price">
              {price.toLocaleString()} ETB
            </strong>

            {dish.prepTime && (
              <span className="prep-time">
                {dish.prepTime} min
              </span>
            )}
          </div>

          <div className="dish-actions">
            <Link
              to={`/menu/${dish.id}`}
              className="button button-small button-secondary"
            >
              View
            </Link>

            <button
              type="button"
              className="button button-small button-primary"
              onClick={() => addToCart(dish)}
            >
              Add +
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default DishCard;