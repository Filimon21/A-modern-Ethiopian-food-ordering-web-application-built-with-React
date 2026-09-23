import { useEffect, useState } from "react";

const STORAGE_KEY = "addis-eats-admin";

const ADMIN_EMAIL = "admin@addiseats.com";
const ADMIN_PASSWORD = "admin123";

function getSavedAdmin() {
  try {
    const savedAdmin = localStorage.getItem(STORAGE_KEY);

    if (!savedAdmin) {
      return null;
    }

    const parsedAdmin = JSON.parse(savedAdmin);

    if (!parsedAdmin?.email) {
      return null;
    }

    return parsedAdmin;
  } catch (error) {
    console.error("Failed to load admin session:", error);
    return null;
  }
}

export function useAdminAuth() {
  const [admin, setAdmin] = useState(getSavedAdmin);

  useEffect(() => {
    if (admin) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(admin)
      );
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [admin]);

  function login(email, password) {
    const normalizedEmail = email.trim().toLowerCase();

    if (
      normalizedEmail !== ADMIN_EMAIL ||
      password !== ADMIN_PASSWORD
    ) {
      return {
        success: false,
        message: "Invalid admin email or password.",
      };
    }

    const adminUser = {
      email: normalizedEmail,
      name: "Addis Eats Admin",
      loggedInAt: new Date().toISOString(),
    };

    setAdmin(adminUser);

    return {
      success: true,
      user: adminUser,
    };
  }

  function logout() {
    setAdmin(null);
  }

  return {
    admin,
    isAdminAuthenticated: Boolean(admin),
    login,
    logout,
  };
}

export {
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
};