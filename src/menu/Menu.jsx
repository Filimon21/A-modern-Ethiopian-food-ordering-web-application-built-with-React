import { useMemo, useState } from "react";

import CategoryBar from "./CategoryBar";
import DishList from "./DishList";

import Spinner from "../ui/Spinner";

import { getDishes } from "../api/dishes";
import useFetch from "../hooks/useFetch";
import useDebounce from "../hooks/useDebounce";

function Menu() {
  const {
    data,
    loading,
    error,
  } = useFetch(getDishes, []);

  const dishes = Array.isArray(data) ? data : [];

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const debouncedSearch = useDebounce(search, 300);

  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(
        dishes
          .map((dish) => dish.category)
          .filter(Boolean)
      ),
    ];

    return ["All", ...uniqueCategories];
  }, [dishes]);

  const filteredDishes = useMemo(() => {
    const query = debouncedSearch
      .trim()
      .toLowerCase();

    return dishes.filter((dish) => {
      const matchesCategory =
        category === "All" ||
        dish.category === category;

      const matchesSearch =
        !query ||
        dish.name
          ?.toLowerCase()
          .includes(query) ||
        dish.description
          ?.toLowerCase()
          .includes(query);

      return (
        matchesCategory &&
        matchesSearch
      );
    });
  }, [
    dishes,
    category,
    debouncedSearch,
  ]);

  if (loading) {
    return (
      <main className="page-section">
        <div className="container">
          <div className="loading-state">
            <Spinner />
            <p>Loading Addis Eats menu...</p>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="page-section">
        <div className="container">
          <div className="error-state">
            <div className="empty-icon">⚠️</div>

            <h2>Unable to load the menu</h2>

            <p>
              Please check that
              <strong> public/menu-data.json </strong>
              exists and try again.
            </p>

            <button
              type="button"
              className="button button-primary"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="page-section">
      <div className="container">
        <div className="page-heading">
          <div>
            <span className="eyebrow">
              Addis Eats Menu
            </span>

            <h1>
              Find something
              <span className="heading-accent">
                {" "}
                delicious.
              </span>
            </h1>

            <p>
              Explore Ethiopian favorites,
              comfort food, and fresh drinks.
            </p>
          </div>

          <div className="menu-count">
            <strong>
              {filteredDishes.length}
            </strong>

            <span>
              {filteredDishes.length === 1
                ? "dish"
                : "dishes"}
            </span>
          </div>
        </div>

        <div className="menu-toolbar">
          <div className="search-box">
            <span className="search-icon">
              🔎
            </span>

            <input
              type="search"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search dishes..."
              aria-label="Search dishes"
            />

            {search && (
              <button
                type="button"
                className="search-clear"
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>
        </div>

        <CategoryBar
          categories={categories}
          activeCategory={category}
          onCategoryChange={setCategory}
        />

        {filteredDishes.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              🔎
            </div>

            <h2>No dishes found</h2>

            <p>
              Try another search or choose a
              different category.
            </p>

            <button
              type="button"
              className="button button-secondary"
              onClick={() => {
                setSearch("");
                setCategory("All");
              }}
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <DishList dishes={filteredDishes} />
        )}
      </div>
    </main>
  );
}

export default Menu;