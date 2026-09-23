import { useEffect, useState } from "react";
import {
  Link,
  useParams,
} from "react-router-dom";

import { getDishById } from "../api/dishes";
import { useCart } from "../cart/cartStore";
import FavoriteButton from "../favorites/FavoriteButton";
import Spinner from "../ui/Spinner";
import Button from "../ui/Button";

export default function DishDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [dish, setDish] = useState(null);
  const [loading, setLoading] =
    useState(true);
  const [error, setError] =
    useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    getDishById(id)
      .then(setDish)
      .catch((err) => {
        console.error(
          "Failed to load dish:",
          err
        );
        setError(err);
      })
      .finally(() =>
        setLoading(false)
      );
  }, [id]);

  if (loading) {
    return (
      <section className="page-section">
        <div className="loading-state">
          <Spinner />
          <p>Loading dish...</p>
        </div>
      </section>
    );
  }

  if (error || !dish) {
    return (
      <section className="page-section">
        <div className="empty-state">
          <div className="empty-icon">
            🍽️
          </div>

          <h1>Dish not found</h1>

          <p>
            We could not find the dish you
            requested.
          </p>

          <Link
            className="button button-primary"
            to="/menu"
          >
            Back to Menu
          </Link>
        </div>
      </section>
    );
  }

  const price =
    Number(dish.price) || 0;

  return (
    <section className="page-section">
      <div className="container">
        <Link
          className="back-link"
          to="/menu"
        >
          ← Back to menu
        </Link>

        <div className="details-card">
          <div className="details-image">
            {dish.image ? (
              <img
                src={dish.image}
                alt={dish.name}
                className="dish-details-image"
              />
            ) : (
              <span className="dish-details-emoji">
                {dish.emoji || "🍽️"}
              </span>
            )}

            <div className="details-favorite">
              <FavoriteButton
                dishId={dish.id}
              />
            </div>
          </div>

          <div className="details-content">
            <span className="eyebrow">
              {dish.category}
            </span>

            <h1>{dish.name}</h1>

            <div className="details-rating">
              ★ {dish.rating || "New"}{" "}
              · {dish.prepTime || "--"} min
            </div>

            <p>
              {dish.description}
            </p>

            <div className="details-price">
              {price.toLocaleString()} ETB
            </div>

            <Button
              onClick={() =>
                addToCart(dish)
              }
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}