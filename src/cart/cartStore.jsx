import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const CartContext = createContext(null);

const STORAGE_KEY = "addis-eats-cart";

function getInitialCart() {
  try {
    const savedCart = localStorage.getItem(STORAGE_KEY);

    if (!savedCart) {
      return [];
    }

    const parsedCart = JSON.parse(savedCart);

    // Cart must always be an array.
    if (!Array.isArray(parsedCart)) {
      localStorage.removeItem(STORAGE_KEY);
      return [];
    }

    return parsedCart;
  } catch (error) {
    console.error("Failed to load cart:", error);

    localStorage.removeItem(STORAGE_KEY);

    return [];
  }
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(getInitialCart);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(cart)
    );
  }, [cart]);

  function addToCart(dish) {
    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (item) => String(item.id) === String(dish.id)
      );

      if (existingItem) {
        return currentCart.map((item) =>
          String(item.id) === String(dish.id)
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...currentCart,
        {
          id: dish.id,
          name: dish.name,
          price: Number(dish.price) || 0,
          emoji: dish.emoji || "🍽️",
          quantity: 1,
        },
      ];
    });
  }

  function removeFromCart(id) {
    setCart((currentCart) =>
      currentCart.filter(
        (item) => String(item.id) !== String(id)
      )
    );
  }

  function increaseQuantity(id) {
    setCart((currentCart) =>
      currentCart.map((item) =>
        String(item.id) === String(id)
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  }

  function decreaseQuantity(id) {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          String(item.id) === String(id)
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function clearCart() {
    setCart([]);
  }

  const totalItems = useMemo(() => {
    return cart.reduce(
      (total, item) => total + Number(item.quantity || 0),
      0
    );
  }, [cart]);

  const subtotal = useMemo(() => {
    return cart.reduce(
      (total, item) =>
        total +
        Number(item.price || 0) *
          Number(item.quantity || 0),
      0
    );
  }, [cart]);

  const value = {
    cart,
    items: cart,

    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,

    totalItems,
    subtotal,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
}