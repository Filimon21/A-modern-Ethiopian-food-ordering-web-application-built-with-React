import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getFavorites,
  toggleFavorite
} from "./favoritesStore";
import DishCard from "../menu/DishCard";

export default function Favorites() {
  const [favorites, setFavorites] =
    useState(getFavorites);

  useEffect(() => {
    const update = () => {
      setFavorites(getFavorites());
    };

    window.addEventListener(
      "favoritesChanged",
      update
    );

    return () => {
      window.removeEventListener(
        "favoritesChanged",
        update
      );
    };
  }, []);

  function removeFavorite(dish) {
    toggleFavorite(dish);
    setFavorites(getFavorites());
  }

  return (
    <section className="page-section">
      <div className="page-heading">
        <span className="eyebrow">YOUR FAVORITES</span>
        <h1>Foods you love</h1>
        <p>
          Your favorite Addis Eats dishes in one place.
        </p>
      </div>

      {!favorites.length ? (
        <div className="empty-state">
          <div className="empty-icon">♡</div>
          <h3>No favorites yet</h3>
          <p>
            Browse the menu and save dishes you love.
          </p>

          <Link className="btn btn-primary" to="/">
            Explore Menu
          </Link>
        </div>
      ) : (
        <div className="dish-grid">
          {favorites.map((dish) => (
            <div key={dish.id} className="favorite-card">
              <DishCard dish={dish} />

              <button
                className="remove-favorite"
                onClick={() =>
                  removeFavorite(dish)
                }
              >
                Remove from favorites
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}