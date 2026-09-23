const STORAGE_KEY = "addis-eats-dishes";

export async function getDishes() {
  try {
    const savedDishes =
      localStorage.getItem(STORAGE_KEY);

    if (savedDishes) {
      const parsedDishes =
        JSON.parse(savedDishes);

      if (Array.isArray(parsedDishes)) {
        return parsedDishes;
      }
    }
  } catch (error) {
    console.error(
      "Failed to read saved dishes:",
      error
    );
  }

  const response =
    await fetch("/menu-data.json");

  if (!response.ok) {
    throw new Error(
      `Failed to load menu data: ${response.status}`
    );
  }

  const dishes = await response.json();

  if (!Array.isArray(dishes)) {
    throw new Error(
      "menu-data.json must contain an array of dishes."
    );
  }

  return dishes;
}

export async function getDishById(id) {
  const dishes = await getDishes();

  return (
    dishes.find(
      (dish) =>
        String(dish.id) === String(id)
    ) || null
  );
}

export function saveDishes(dishes) {
  if (!Array.isArray(dishes)) {
    throw new Error(
      "Dishes must be an array."
    );
  }

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(dishes)
  );

  window.dispatchEvent(
    new Event("dishes-changed")
  );

  return dishes;
}

export function clearSavedDishes() {
  localStorage.removeItem(STORAGE_KEY);

  window.dispatchEvent(
    new Event("dishes-changed")
  );
}