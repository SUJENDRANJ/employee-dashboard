import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/themeSlice.js";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userEmail = localStorage.getItem("userEmail");

  const isDark = useSelector((state) => state.theme.isDark);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  const handleThemeClick = () => {
    dispatch(toggleTheme());
  };

  return (
    <div className="bg-paper dark:bg-surface2 text-ink dark:text-paper px-4 sm:px-6 py-3 flex flex-wrap justify-between items-center gap-3 border-b border-ink/10 dark:border-edge transition-colors sticky top-0 z-20">
      <h1 className="text-sm tracking-widest">
        employee_index<span className="text-signal">.</span>db
      </h1>
      <div className="flex items-center gap-3">
        <span className="text-xs text-muted dark:text-muted-light hidden sm:block">
          {userEmail}
        </span>

        <button
          onClick={handleThemeClick}
          className="border border-ink/20 dark:border-paper/30 px-3 py-1 text-xs tracking-widest hover:border-signal transition-colors"
        >
          {isDark ? "LIGHT" : "DARK"}
        </button>

        <button
          onClick={handleLogout}
          className="border border-ink/20 dark:border-paper/30 px-3 py-1 text-xs tracking-widest hover:bg-signal hover:border-signal hover:text-ink transition-colors"
        >
          LOGOUT
        </button>
      </div>
    </div>
  );
}

export default Navbar;
