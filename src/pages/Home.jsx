import { Link } from "react-router-dom";

import { getDishes } from "../api/dishes";
import useFetch from "../hooks/useFetch";
import Spinner from "../ui/Spinner";

function Home() {
  const {
    data,
    loading,
    error,
  } = useFetch(getDishes, []);

  const dishes = Array.isArray(data) ? data : [];

  const popularDishes = dishes
    .filter((dish) => dish.popular)
    .slice(0, 4);

  const featuredDishes =
    popularDishes.length > 0
      ? popularDishes
      : dishes.slice(0, 4);

  return (
    <main>
      {/* HERO */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          padding: "72px 0 80px",
          background:
            "linear-gradient(135deg, var(--orange-light) 0%, var(--surface) 48%, var(--blue-light) 100%)",
          borderBottom:
            "1px solid var(--border)",
        }}
      >
        <div
          className="container"
          style={{
            display: "grid",
            gridTemplateColumns:
              "minmax(0, 1.1fr) minmax(300px, 0.9fr)",
            gap: "48px",
            alignItems: "center",
          }}
        >
          <div>
            <span className="eyebrow">
              🍴 Made for Addis
            </span>

            <h1
              style={{
                fontSize:
                  "clamp(42px, 6vw, 76px)",
                lineHeight: 1.02,
                letterSpacing: "-0.04em",
                margin:
                  "14px 0 22px",
                maxWidth: "720px",
              }}
            >
              Delicious food.
              <br />
              <span className="heading-accent">
                Delivered happy.
              </span>
            </h1>

            <p
              style={{
                fontSize: "18px",
                lineHeight: 1.7,
                color: "var(--muted)",
                maxWidth: "590px",
                marginBottom: "30px",
              }}
            >
              Discover the best flavors from
              Addis Ababa, order your favorites,
              and enjoy delicious food delivered
              right to your door.
            </p>

            <div
              style={{
                display: "flex",
                gap: "12px",
                flexWrap: "wrap",
              }}
            >
              <Link
                to="/menu"
                className="button button-primary"
              >
                Explore Menu →
              </Link>

              <Link
                to="/favorites"
                className="button button-secondary"
              >
                ♥ Your Favorites
              </Link>
            </div>

            <div
              style={{
                display: "flex",
                gap: "28px",
                flexWrap: "wrap",
                marginTop: "34px",
              }}
            >
              <div>
                <strong
                  style={{
                    display: "block",
                    fontSize: "20px",
                    color: "var(--text)",
                  }}
                >
                  Fresh
                </strong>

                <span
                  style={{
                    color: "var(--muted)",
                    fontSize: "13px",
                  }}
                >
                  Prepared with care
                </span>
              </div>

              <div>
                <strong
                  style={{
                    display: "block",
                    fontSize: "20px",
                    color: "var(--text)",
                  }}
                >
                  Fast
                </strong>

                <span
                  style={{
                    color: "var(--muted)",
                    fontSize: "13px",
                  }}
                >
                  Reliable delivery
                </span>
              </div>

              <div>
                <strong
                  style={{
                    display: "block",
                    fontSize: "20px",
                    color: "var(--text)",
                  }}
                >
                  Local
                </strong>

                <span
                  style={{
                    color: "var(--muted)",
                    fontSize: "13px",
                  }}
                >
                  Addis flavors
                </span>
              </div>
            </div>
          </div>

          <div
            style={{
              position: "relative",
              minHeight: "400px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "min(390px, 80vw)",
                height: "390px",
                borderRadius: "50%",
                background:
                  "linear-gradient(135deg, var(--orange), var(--blue))",
                opacity: 0.12,
                position: "absolute",
              }}
            />

            <div
              style={{
                position: "relative",
                width: "min(330px, 72vw)",
                aspectRatio: "1",
                borderRadius: "38% 62% 55% 45%",
                background:
                  "linear-gradient(145deg, var(--surface), var(--background))",
                border:
                  "1px solid var(--border)",
                boxShadow:
                  "var(--shadow-lg)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform:
                  "rotate(-4deg)",
              }}
            >
              <div
                style={{
                  textAlign: "center",
                  transform:
                    "rotate(4deg)",
                }}
              >
                <div
                  style={{
                    fontSize: "105px",
                    lineHeight: 1,
                  }}
                >
                  🍛
                </div>

                <div
                  style={{
                    marginTop: "20px",
                    fontSize: "24px",
                    fontWeight: 800,
                    color:
                      "var(--text)",
                  }}
                >
                  Taste Addis
                </div>

                <div
                  style={{
                    marginTop: "6px",
                    color:
                      "var(--muted)",
                  }}
                >
                  One delicious order away.
                </div>
              </div>
            </div>

            <div
              style={{
                position: "absolute",
                top: "15%",
                right: "4%",
                padding: "12px 16px",
                borderRadius: "14px",
                background:
                  "var(--surface)",
                border:
                  "1px solid var(--border)",
                boxShadow:
                  "var(--shadow-md)",
                fontWeight: 800,
              }}
            >
              ⭐ 4.9

              <span
                style={{
                  display: "block",
                  fontSize: "11px",
                  color:
                    "var(--muted)",
                  fontWeight: 500,
                }}
              >
                Customer rating
              </span>
            </div>

            <div
              style={{
                position: "absolute",
                bottom: "13%",
                left: "0",
                padding: "12px 16px",
                borderRadius: "14px",
                background:
                  "var(--surface)",
                border:
                  "1px solid var(--border)",
                boxShadow:
                  "var(--shadow-md)",
                fontWeight: 800,
              }}
            >
              🚚 30 min

              <span
                style={{
                  display: "block",
                  fontSize: "11px",
                  color:
                    "var(--muted)",
                  fontWeight: 500,
                }}
              >
                Average delivery
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* POPULAR DISHES */}
      <section className="page-section">
        <div className="container">
          <div className="page-heading">
            <div>
              <span className="eyebrow">
                Customer favorites
              </span>

              <h2>
                Popular dishes
              </h2>

              <p>
                Some of the dishes our customers
                love most.
              </p>
            </div>

            <Link
              to="/menu"
              className="button button-secondary"
            >
              View Full Menu →
            </Link>
          </div>

          {loading && (
            <div className="loading-state">
              <Spinner />
              <p>
                Loading popular dishes...
              </p>
            </div>
          )}

          {error && (
            <div className="error-state">
              <div className="empty-icon">
                ⚠️
              </div>

              <h2>
                Unable to load dishes
              </h2>

              <p>
                Please visit the menu to try
                again.
              </p>

              <Link
                to="/menu"
                className="button button-primary"
              >
                Open Menu
              </Link>
            </div>
          )}

          {!loading &&
            !error &&
            featuredDishes.length === 0 && (
              <div className="empty-state">
                <div className="empty-icon">
                  🍽️
                </div>

                <h2>
                  Menu coming soon
                </h2>

                <p>
                  Our delicious dishes will
                  appear here.
                </p>
              </div>
            )}

          {!loading &&
            !error &&
            featuredDishes.length > 0 && (
              <div className="dish-grid">
                {featuredDishes.map(
                  (dish) => {
                    const price =
                      Number(
                        dish.price
                      ) || 0;

                    return (
                      <article
                        className="dish-card"
                        key={dish.id}
                      >
                        <div className="dish-card-image">
                          {dish.image ? (
                            <img
                              src={dish.image}
                              alt={dish.name}
                              className="dish-real-image"
                            />
                          ) : (
                            <span className="dish-emoji">
                              {dish.emoji ||
                                "🍽️"}
                            </span>
                          )}

                          {dish.popular && (
                            <span className="popular-badge">
                              Popular
                            </span>
                          )}
                        </div>

                        <div className="dish-card-body">
                          <div className="dish-card-meta">
                            <span className="dish-category">
                              {dish.category ||
                                "Food"}
                            </span>

                            {dish.rating && (
                              <span className="dish-rating">
                                ★{" "}
                                {dish.rating}
                              </span>
                            )}
                          </div>

                          <h3>
                            {dish.name}
                          </h3>

                          <p className="dish-description">
                            {dish.description ||
                              "A delicious Addis Eats selection."}
                          </p>

                          <div className="dish-card-footer">
                            <div>
                              <strong className="dish-price">
                                {price.toLocaleString()}{" "}
                                ETB
                              </strong>

                              {dish.prepTime && (
                                <span className="prep-time">
                                  {dish.prepTime} min
                                </span>
                              )}
                            </div>

                            <Link
                              to={`/menu/${dish.id}`}
                              className="button button-small button-primary"
                            >
                              View
                            </Link>
                          </div>
                        </div>
                      </article>
                    );
                  }
                )}
              </div>
            )}
        </div>
      </section>

      {/* WHY ADDIS EATS */}
      <section
        style={{
          padding: "80px 0",
          background:
            "var(--surface)",
          borderTop:
            "1px solid var(--border)",
          borderBottom:
            "1px solid var(--border)",
        }}
      >
        <div className="container">
          <div
            style={{
              maxWidth: "680px",
              marginBottom: "42px",
            }}
          >
            <span className="eyebrow">
              Why Addis Eats?
            </span>

            <h2
              style={{
                fontSize:
                  "clamp(30px, 4vw, 46px)",
                margin:
                  "10px 0 12px",
              }}
            >
              More than food delivery.
            </h2>

            <p
              style={{
                color:
                  "var(--muted)",
                fontSize: "16px",
                lineHeight: 1.7,
              }}
            >
              We make discovering, ordering,
              and enjoying your favorite food
              simple.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(3, minmax(0, 1fr))",
              gap: "18px",
            }}
          >
            <article className="checkout-card">
              <div
                style={{
                  width: "54px",
                  height: "54px",
                  borderRadius: "16px",
                  display: "flex",
                  alignItems:
                    "center",
                  justifyContent:
                    "center",
                  background:
                    "var(--orange-light)",
                  fontSize: "25px",
                  marginBottom:
                    "18px",
                }}
              >
                🍴
              </div>

              <h3>
                Fresh & Delicious
              </h3>

              <p>
                Discover carefully selected
                dishes prepared to make every
                meal memorable.
              </p>
            </article>

            <article className="checkout-card">
              <div
                style={{
                  width: "54px",
                  height: "54px",
                  borderRadius: "16px",
                  display: "flex",
                  alignItems:
                    "center",
                  justifyContent:
                    "center",
                  background:
                    "var(--blue-light)",
                  fontSize: "25px",
                  marginBottom:
                    "18px",
                }}
              >
                🚚
              </div>

              <h3>
                Fast Delivery
              </h3>

              <p>
                Choose your delivery area and
                get a clear estimate before
                placing your order.
              </p>
            </article>

            <article className="checkout-card">
              <div
                style={{
                  width: "54px",
                  height: "54px",
                  borderRadius: "16px",
                  display: "flex",
                  alignItems:
                    "center",
                  justifyContent:
                    "center",
                  background:
                    "var(--orange-light)",
                  fontSize: "25px",
                  marginBottom:
                    "18px",
                }}
              >
                🔒
              </div>

              <h3>
                Simple Ordering
              </h3>

              <p>
                Browse, add to cart, checkout,
                and track your orders in one
                simple experience.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="page-section">
        <div className="container">
          <div
            style={{
              textAlign: "center",
              maxWidth: "650px",
              margin:
                "0 auto 46px",
            }}
          >
            <span className="eyebrow">
              Simple process
            </span>

            <h2>
              How it works
            </h2>

            <p>
              Great food is only three simple
              steps away.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(3, minmax(0, 1fr))",
              gap: "20px",
            }}
          >
            <article
              style={{
                textAlign: "center",
                padding: "28px 20px",
              }}
            >
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  margin:
                    "0 auto 18px",
                  borderRadius: "50%",
                  background:
                    "var(--orange)",
                  color: "white",
                  display: "flex",
                  alignItems:
                    "center",
                  justifyContent:
                    "center",
                  fontSize: "22px",
                  fontWeight: 800,
                }}
              >
                01
              </div>

              <h3>
                Choose your food
              </h3>

              <p>
                Browse our menu and discover
                something delicious.
              </p>
            </article>

            <article
              style={{
                textAlign: "center",
                padding: "28px 20px",
              }}
            >
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  margin:
                    "0 auto 18px",
                  borderRadius: "50%",
                  background:
                    "var(--blue)",
                  color: "white",
                  display: "flex",
                  alignItems:
                    "center",
                  justifyContent:
                    "center",
                  fontSize: "22px",
                  fontWeight: 800,
                }}
              >
                02
              </div>

              <h3>
                Place your order
              </h3>

              <p>
                Add your favorites to the cart
                and complete checkout.
              </p>
            </article>

            <article
              style={{
                textAlign: "center",
                padding: "28px 20px",
              }}
            >
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  margin:
                    "0 auto 18px",
                  borderRadius: "50%",
                  background:
                    "var(--orange)",
                  color: "white",
                  display: "flex",
                  alignItems:
                    "center",
                  justifyContent:
                    "center",
                  fontSize: "22px",
                  fontWeight: 800,
                }}
              >
                03
              </div>

              <h3>
                Enjoy your meal
              </h3>

              <p>
                Sit back, relax, and enjoy your
                Addis Eats delivery.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section
        style={{
          padding:
            "70px 0 80px",
        }}
      >
        <div className="container">
          <div
            style={{
              position: "relative",
              overflow: "hidden",
              borderRadius: "28px",
              padding:
                "52px 40px",
              background:
                "linear-gradient(135deg, var(--blue), var(--orange))",
              color: "white",
              textAlign: "center",
              boxShadow:
                "var(--shadow-lg)",
            }}
          >
            <div
              style={{
                position:
                  "absolute",
                width: "180px",
                height: "180px",
                borderRadius: "50%",
                background:
                  "rgba(255,255,255,0.10)",
                top: "-70px",
                right: "-30px",
              }}
            />

            <div
              style={{
                position:
                  "absolute",
                width: "130px",
                height: "130px",
                borderRadius: "50%",
                background:
                  "rgba(255,255,255,0.08)",
                bottom: "-55px",
                left: "-20px",
              }}
            />

            <div
              style={{
                position:
                  "relative",
              }}
            >
              <span
                style={{
                  display: "block",
                  fontSize: "34px",
                  marginBottom:
                    "12px",
                }}
              >
                🍽️
              </span>

              <h2
                style={{
                  color: "white",
                  fontSize:
                    "clamp(28px, 4vw, 44px)",
                  margin:
                    "0 0 12px",
                }}
              >
                Ready to taste Addis?
              </h2>

              <p
                style={{
                  color:
                    "rgba(255,255,255,0.86)",
                  maxWidth: "560px",
                  margin:
                    "0 auto 26px",
                  lineHeight: 1.7,
                }}
              >
                Your next favorite meal is waiting.
                Explore the menu and order
                something delicious today.
              </p>

              <Link
                to="/menu"
                className="button"
                style={{
                  background:
                    "white",
                  color:
                    "var(--blue)",
                }}
              >
                Start Ordering →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;