import { useTheme } from "./ThemeContext";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={
        isDark
          ? "Switch to light mode"
          : "Switch to dark mode"
      }
      title={
        isDark
          ? "Switch to light mode"
          : "Switch to dark mode"
      }
    >
      <span className="theme-toggle-icon">
        {isDark ? "☀️" : "🌙"}
      </span>

      <span className="theme-toggle-label">
        {isDark ? "Light" : "Dark"}
      </span>
    </button>
  );
}

export default ThemeToggle;