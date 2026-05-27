import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "@/context/theme-provider";
import { Moon, Sun } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { Button } from "./ui/button";
import { CitySearch } from "./city-search";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  const { user, logout } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  // Current page detection
  const isLoginPage = location.pathname === "/login";
  const isSignupPage = location.pathname === "/signup";

  return (
    <header className="sticky top-0 z-50 backdrop-blur-2xl border-b border-white/10 bg-white/70 dark:bg-slate-900/80 shadow-lg">
      <div className="container mx-auto px-4 py-3">
        {/* Main Header Row */}
        <div className="flex items-center justify-between gap-6 h-14">
          
          {/* Logo */}
          <Link
            to="/"
            className="flex-shrink-0 group hover:opacity-80 transition-opacity"
          >
            <img
              src={isDark ? "./Aethera-d.png" : "./Aethera-l.png"}
              alt="Aethera Logo"
              className="h-10 w-auto transform group-hover:scale-105 transition-transform duration-300"
            />
          </Link>

          {/* Search Bar */}
          <div className="hidden lg:flex flex-1 justify-center px-8">
            <CitySearch />
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3 lg:gap-4">
            
            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className="relative flex items-center justify-center w-10 h-10 rounded-full cursor-pointer transition-all duration-300 hover:scale-110 hover:bg-primary/10 active:scale-95"
              aria-label="Toggle theme"
            >
              {/* Sun */}
              <div
                className={`absolute transition-all duration-500 transform ${
                  isDark
                    ? "rotate-0 scale-100 opacity-100"
                    : "rotate-180 scale-0 opacity-0"
                }`}
              >
                <Sun className="w-5 h-5 text-amber-500" />
              </div>

              {/* Moon */}
              <div
                className={`absolute transition-all duration-500 transform ${
                  !isDark
                    ? "rotate-0 scale-100 opacity-100"
                    : "-rotate-180 scale-0 opacity-0"
                }`}
              >
                <Moon className="w-5 h-5 text-blue-400" />
              </div>
            </button>

            {/* Authentication */}
            {user ? (
              // Logged In -> Logout Button
              <Button
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
                className="bg-red-500 hover:bg-red-600 text-white text-xs sm:text-sm font-medium transition-all duration-300 shadow-lg hover:scale-105"
              >
                Logout
              </Button>
            ) : (
              // Logged Out -> Sign In & Sign Up
              <div className="flex items-center gap-2">
                
                {/* Sign In */}
                {!isLoginPage && (
                  <Button
                    variant="outline"
                    onClick={() => navigate("/login")}
                    className="border-white/20 hover:bg-primary/10 hover:border-primary/30 text-xs sm:text-sm hidden sm:inline-flex transition-all duration-300"
                  >
                    Sign In
                  </Button>
                )}

                {/* Sign Up */}
                {!isSignupPage && (
                  <Button
                    onClick={() => navigate("/signup")}
                    className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white transition-all duration-300 text-xs sm:text-sm font-medium shadow-lg hover:scale-105"
                  >
                    Sign Up
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Search */}
        <div className="flex lg:hidden pt-2">
          <CitySearch />
        </div>
      </div>
    </header>
  );
};

export default Header;