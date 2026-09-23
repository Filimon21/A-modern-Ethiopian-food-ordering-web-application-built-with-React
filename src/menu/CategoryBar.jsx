function CategoryBar({
  categories = [],
  activeCategory,
  onCategoryChange,
}) {
  return (
    <div className="category-bar">
      <div className="category-list">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={`category-button ${
              activeCategory === category
                ? "active"
                : ""
            }`}
            onClick={() =>
              onCategoryChange(category)
            }
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CategoryBar;