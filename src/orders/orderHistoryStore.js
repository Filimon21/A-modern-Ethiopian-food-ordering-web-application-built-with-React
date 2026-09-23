const STORAGE_KEY = "addis-eats-orders";

export function getOrders() {
  try {
    const savedOrders = localStorage.getItem(STORAGE_KEY);

    if (!savedOrders) {
      return [];
    }

    const parsedOrders = JSON.parse(savedOrders);

    if (!Array.isArray(parsedOrders)) {
      return [];
    }

    return parsedOrders;
  } catch (error) {
    console.error("Failed to load orders:", error);
    return [];
  }
}

export function saveOrder(order) {
  const orders = getOrders();

  const updatedOrders = [order, ...orders];

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedOrders)
  );

  window.dispatchEvent(
    new Event("orders-changed")
  );

  return order;
}

export function updateOrderStatus(orderId, status) {
  const orders = getOrders();

  const updatedOrders = orders.map((order) =>
    String(order.id) === String(orderId)
      ? {
          ...order,
          status,
        }
      : order
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedOrders)
  );

  window.dispatchEvent(
    new Event("orders-changed")
  );

  return updatedOrders;
}

export function getOrderById(orderId) {
  const orders = getOrders();

  return (
    orders.find(
      (order) =>
        String(order.id) === String(orderId)
    ) || null
  );
}

export function clearOrders() {
  localStorage.removeItem(STORAGE_KEY);

  window.dispatchEvent(
    new Event("orders-changed")
  );
}