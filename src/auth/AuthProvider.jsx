import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const AuthContext = createContext(null);

const STORAGE_KEY = "addis-eats-user";

function getInitialUser() {
  try {
    const savedUser = localStorage.getItem(STORAGE_KEY);

    if (!savedUser) {
      return null;
    }

    const parsedUser = JSON.parse(savedUser);

    if (!parsedUser || !parsedUser.name) {
      return null;
    }

    return parsedUser;
  } catch (error) {
    console.error("Failed to load user:", error);
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getInitialUser);

  useEffect(() => {
    if (user) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(user)
      );
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  function login(name, email) {
    const newUser = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      loggedInAt: new Date().toISOString(),
    };

    setUser(newUser);

    return newUser;
  }

  function logout() {
    setUser(null);
  }

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login,
      logout,
    }),
    [user]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}