import DishCard from "./DishCard";

function DishList({ dishes = [] }) {
  if (dishes.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">🍽️</div>

        <h2>No dishes available</h2>

        <p>
          We couldn't find any dishes in this
          category.
        </p>
      </div>
    );
  }

  return (
    <div className="dish-grid">
      {dishes.map((dish) => (
        <DishCard
          key={dish.id}
          dish={dish}
        />
      ))}
    </div>
  );
}

export default DishList;