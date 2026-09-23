import { useEffect, useState } from "react";

const emptyDish = {
  name: "",
  category: "",
  price: "",
  description: "",
  emoji: "🍽️",
  rating: "4.5",
  prepTime: "20–30 min",
  popular: false,
};

function DishForm({
  dish,
  onSave,
  onCancel,
}) {
  const [form, setForm] = useState(emptyDish);

  useEffect(() => {
    if (dish) {
      setForm({
        name: dish.name || "",
        category: dish.category || "",
        price: dish.price || "",
        description: dish.description || "",
        emoji: dish.emoji || "🍽️",
        rating: dish.rating || "4.5",
        prepTime: dish.prepTime || "20–30 min",
        popular: Boolean(dish.popular),
      });
    } else {
      setForm(emptyDish);
    }
  }, [dish]);

  function handleChange(event) {
    const { name, value, type, checked } =
      event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]:
        type === "checkbox" ? checked : value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!form.name.trim()) {
      alert("Dish name is required.");
      return;
    }

    if (!form.category.trim()) {
      alert("Category is required.");
      return;
    }

    if (!form.price || Number(form.price) <= 0) {
      alert("Please enter a valid price.");
      return;
    }

    if (!form.description.trim()) {
      alert("Description is required.");
      return;
    }

    onSave({
      ...form,
      name: form.name.trim(),
      category: form.category.trim(),
      description: form.description.trim(),
      price: Number(form.price),
      rating: Number(form.rating) || 0,
    });
  }

  return (
    <form
      className="checkout-card"
      onSubmit={handleSubmit}
    >
      <div className="checkout-card-heading">
        <span className="checkout-step">
          {dish ? "✏️" : "➕"}
        </span>

        <div>
          <h2>
            {dish ? "Edit Dish" : "Add New Dish"}
          </h2>

          <p>
            {dish
              ? "Update the selected menu item."
              : "Create a new menu item."}
          </p>
        </div>
      </div>

      <div className="form-grid">
        <div className="form-field">
          <label htmlFor="dish-name">
            Dish Name *
          </label>

          <input
            id="dish-name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. Doro Wot"
          />
        </div>

        <div className="form-field">
          <label htmlFor="dish-category">
            Category *
          </label>

          <input
            id="dish-category"
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="e.g. Ethiopian"
          />
        </div>

        <div className="form-field">
          <label htmlFor="dish-price">
            Price (ETB) *
          </label>

          <input
            id="dish-price"
            name="price"
            type="number"
            min="1"
            value={form.price}
            onChange={handleChange}
            placeholder="250"
          />
        </div>

        <div className="form-field">
          <label htmlFor="dish-emoji">
            Emoji
          </label>

          <input
            id="dish-emoji"
            name="emoji"
            value={form.emoji}
            onChange={handleChange}
            placeholder="🍛"
          />
        </div>

        <div className="form-field">
          <label htmlFor="dish-rating">
            Rating
          </label>

          <input
            id="dish-rating"
            name="rating"
            type="number"
            min="0"
            max="5"
            step="0.1"
            value={form.rating}
            onChange={handleChange}
          />
        </div>

        <div className="form-field">
          <label htmlFor="dish-prepTime">
            Preparation Time
          </label>

          <input
            id="dish-prepTime"
            name="prepTime"
            value={form.prepTime}
            onChange={handleChange}
            placeholder="20–30 min"
          />
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="dish-description">
          Description *
        </label>

        <textarea
          id="dish-description"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Describe the dish..."
          rows="4"
        />
      </div>

      <label
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          margin: "16px 0",
          fontWeight: 700,
        }}
      >
        <input
          type="checkbox"
          name="popular"
          checked={form.popular}
          onChange={handleChange}
        />

        Mark as Popular
      </label>

      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        <button
          type="submit"
          className="button button-primary"
        >
          {dish ? "Update Dish" : "Add Dish"}
        </button>

        {onCancel && (
          <button
            type="button"
            className="button button-secondary"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default DishForm;