import { useEffect, useState } from "react";
import {
  isFavorite,
  toggleFavorite,
} from "./favoritesStore";

function FavoriteButton({ dishId }) {
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    if (dishId === undefined || dishId === null) {
      return;
    }

    setFavorite(isFavorite(dishId));
  }, [dishId]);

  function handleToggle() {
    if (dishId === undefined || dishId === null) {
      return;
    }

    const updatedFavorite = toggleFavorite(dishId);

    setFavorite(updatedFavorite);
  }

  return (
    <button
      type="button"
      className={`favorite-button ${
        favorite ? "active" : ""
      }`}
      onClick={handleToggle}
      aria-label={
        favorite
          ? "Remove from favorites"
          : "Add to favorites"
      }
      aria-pressed={favorite}
    >
      <span className="favorite-icon">
        {favorite ? "♥" : "♡"}
      </span>
    </button>
  );
}

export default FavoriteButton;