const STORAGE_KEY = "addis-eats-favorites";

export function getFavorites() {
  try {
    const savedFavorites = localStorage.getItem(STORAGE_KEY);

    if (!savedFavorites) {
      return [];
    }

    const parsedFavorites = JSON.parse(savedFavorites);

    if (!Array.isArray(parsedFavorites)) {
      return [];
    }

    return parsedFavorites;
  } catch (error) {
    console.error("Failed to load favorites:", error);
    return [];
  }
}

export function isFavorite(dishId) {
  const favorites = getFavorites();

  return favorites.some(
    (id) => String(id) === String(dishId)
  );
}

export function toggleFavorite(dishId) {
  const favorites = getFavorites();

  const exists = favorites.some(
    (id) => String(id) === String(dishId)
  );

  let updatedFavorites;

  if (exists) {
    updatedFavorites = favorites.filter(
      (id) => String(id) !== String(dishId)
    );
  } else {
    updatedFavorites = [...favorites, dishId];
  }

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedFavorites)
  );

  window.dispatchEvent(new Event("favorites-changed"));

  return !exists;
}

export function getFavoriteIds() {
  return getFavorites();
}

export function clearFavorites() {
  localStorage.removeItem(STORAGE_KEY);

  window.dispatchEvent(new Event("favorites-changed"));
}