import { useEffect, useState } from "react";

import {
  getDishes,
  saveDishes,
} from "../api/dishes";

import DishForm from "./DishForm";

function DishManager() {
  const [dishes, setDishes] = useState([]);
  const [editingDish, setEditingDish] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDishes() {
      try {
        const result = await getDishes();

        setDishes(
          Array.isArray(result) ? result : []
        );
      } catch (error) {
        console.error(
          "Failed to load dishes:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    loadDishes();
  }, []);

  function persistDishes(updatedDishes) {
    saveDishes(updatedDishes);
    setDishes(updatedDishes);

    window.dispatchEvent(
      new Event("dishes-changed")
    );
  }

  function handleSave(formData) {
    if (editingDish) {
      const updatedDishes = dishes.map(
        (dish) =>
          String(dish.id) ===
          String(editingDish.id)
            ? {
                ...dish,
                ...formData,
              }
            : dish
      );

      persistDishes(updatedDishes);
    } else {
      const newDish = {
        id: `dish-${Date.now()}`,
        ...formData,
      };

      persistDishes([
        ...dishes,
        newDish,
      ]);
    }

    setEditingDish(null);
    setShowForm(false);
  }

  function handleEdit(dish) {
    setEditingDish(dish);
    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function handleDelete(dish) {
    const confirmed = window.confirm(
      `Delete "${dish.name}" from the menu?`
    );

    if (!confirmed) {
      return;
    }

    const updatedDishes = dishes.filter(
      (item) =>
        String(item.id) !== String(dish.id)
    );

    persistDishes(updatedDishes);
  }

  function handleCancel() {
    setEditingDish(null);
    setShowForm(false);
  }

  if (loading) {
    return (
      <div className="loading-state">
        <p>Loading dishes...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="page-heading">
        <div>
          <span className="eyebrow">
            Menu Management
          </span>

          <h1>Manage Dishes</h1>

          <p>
            Add, edit, and remove items from the
            Addis Eats menu.
          </p>
        </div>

        {!showForm && (
          <button
            type="button"
            className="button button-primary"
            onClick={() => {
              setEditingDish(null);
              setShowForm(true);
            }}
          >
            + Add Dish
          </button>
        )}
      </div>

      {showForm && (
        <div style={{ marginBottom: "24px" }}>
          <DishForm
            dish={editingDish}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        </div>
      )}

      {dishes.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">
            🍽️
          </div>

          <h2>No dishes found</h2>

          <p>
            Add your first dish to the Addis Eats
            menu.
          </p>
        </div>
      ) : (
        <div className="dish-grid">
          {dishes.map((dish) => (
            <article
              className="dish-card"
              key={dish.id}
            >
              <div className="dish-card-image">
                <span className="dish-emoji">
                  {dish.emoji || "🍽️"}
                </span>

                {dish.popular && (
                  <span className="popular-badge">
                    Popular
                  </span>
                )}
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
                  <strong className="dish-price">
                    {Number(
                      dish.price || 0
                    ).toLocaleString()}{" "}
                    ETB
                  </strong>

                  <div className="dish-actions">
                    <button
                      type="button"
                      className="button button-small button-secondary"
                      onClick={() =>
                        handleEdit(dish)
                      }
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className="button button-small button-primary"
                      onClick={() =>
                        handleDelete(dish)
                      }
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default DishManager;