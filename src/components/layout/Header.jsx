import { Heart, Menu, Search, ShoppingCart, UserRound, X } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, useLocation } from "react-router-dom";

function Header() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  const user = useSelector((store) => store.client.user);

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      {/* 
       
      */}
      <div className="max-w-7xl mx-auto px-10 sm:px-6 lg:px-10 xl:px-20 flex flex-col items-center w-full">
        <div className="w-full flex flex-col py-6 lg:py-9 gap-4">
          <div className="w-full flex justify-between items-center">
            {/* SOL GRUP */}
            <div className="flex items-center gap-4 lg:gap-20 flex-1">
              <div className="shrink-0">
                <Link to="/">
                  <h3 className="font-bold text-2xl text-text cursor-pointer">
                    Bandage
                  </h3>
                </Link>
              </div>

              {/* Masaüstü Menü: md:hidden yerine lg:flex yapıldı (1024px altında hamburger olacak) */}
              <nav className="hidden lg:flex gap-6 items-center">
                <NavLink
                  exact
                  to="/"
                  className="font-link text-second-text hover:text-primary transition-colors whitespace-nowrap"
                  activeClassName="text-primary font-bold"
                >
                  Home
                </NavLink>
                <NavLink
                  to="/shop"
                  className="font-link text-second-text hover:text-primary transition-colors whitespace-nowrap"
                  activeClassName="text-primary font-bold"
                >
                  Shop
                </NavLink>
                <NavLink
                  to="/about"
                  className="font-link text-second-text hover:text-primary transition-colors whitespace-nowrap"
                  activeClassName="text-primary font-bold"
                >
                  About
                </NavLink>
                <NavLink
                  to="/blog"
                  className="font-link text-second-text hover:text-primary transition-colors whitespace-nowrap"
                  activeClassName="text-primary font-bold"
                >
                  Blog
                </NavLink>
                <NavLink
                  to="/contact"
                  className="font-link text-second-text hover:text-primary transition-colors whitespace-nowrap"
                  activeClassName="text-primary font-bold"
                >
                  Contact
                </NavLink>
                <NavLink
                  to="/pages"
                  className="font-link text-second-text hover:text-primary transition-colors whitespace-nowrap"
                  activeClassName="text-primary font-bold"
                >
                  Pages
                </NavLink>
              </nav>
            </div>

            {/* SAĞ GRUP */}
            <div className="flex items-center gap-4 text-primary font-bold shrink-0 ml-4">
              {/* Login/Register: lg:flex yapıldı */}

              {user && user.avatarUrl &&user.token ? (
                <>
                  <span className="text-sm font-medium text-gray-700">
                    {user.name}
                  </span>
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="w-9 h-9 rounded-full object-cover border border-gray-200"
                  />
                </>
              ) : (
                <div className="hidden lg:flex items-center gap-2 mr-4">
                  <UserRound size={18} />
                  <Link
                    to={{
                      pathname: "/login",
                      state: { from: location.pathname },
                    }}
                  >
                    <button className="cursor-pointer hover:opacity-80 whitespace-nowrap">
                      Login
                    </button>
                  </Link>
                  <span>/</span>
                  <Link
                    to={{
                      pathname: "/signup",
                      state: { from: location.pathname },
                    }}
                  >
                    <button className="cursor-pointer hover:opacity-80 whitespace-nowrap">
                      Register
                    </button>
                  </Link>
                </div>
              )}

              {/* İkonlar */}
              <div className="flex items-center gap-3 lg:gap-4 text-primary">
                <button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="hover:scale-110 transition-transform"
                >
                  <Search className="w-5 h-5 text-primary cursor-pointer" />
                </button>

                <div className="flex items-center gap-1 text-primary">
                  <ShoppingCart className="w-5 h-5 text-primary cursor-pointer" />
                  <span className="text-xs font-normal text-primary">1</span>
                </div>

                <div className="hidden sm:flex items-center gap-1 text-primary">
                  <Heart className="w-5 h-5 text-primary cursor-pointer" />
                  <span className="text-xs font-normal text-primary">1</span>
                </div>

                {/* Mobil Hamburger: lg:hidden yapıldı (820px'de görünür olacak) */}
                <button
                  className="lg:hidden p-1 text-text pr-0 sm:pr-4"
                  onClick={() => setIsMobileOpen(!isMobileOpen)}
                >
                  {isMobileOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
              </div>
            </div>
          </div>

          {/* Arama Çubuğu */}
          <div
            className={`w-full overflow-hidden transition-all duration-300 ${isSearchOpen ? "max-h-20 opacity-100 mt-2" : "max-h-0 opacity-0"}`}
          >
            <input
              type="text"
              placeholder="Search..."
              className="bg-primary/10 w-full rounded-full px-4 h-10 outline-none border border-transparent focus:border-primary/30"
            />
          </div>
        </div>

        {/* Mobil Menü: lg kırılmasında gizlenecek */}
        <div
          className={`w-full flex flex-col justify-center items-center gap-8 transition-all duration-500 ease-in-out overflow-hidden bg-white ${isMobileOpen ? "max-h-150 py-10 opacity-100 border-b border-gray-100" : "max-h-0 opacity-0"} lg:hidden`}
        >
          <Link
            to="/"
            onClick={() => setIsMobileOpen(false)}
            className="font-link text-second-text hover:text-primary transition-colors"
          >
            Home
          </Link>
          <Link
            to="/shop"
            onClick={() => setIsMobileOpen(false)}
            className="font-link text-second-text hover:text-primary transition-colors"
          >
            Shop
          </Link>
          <Link
            to="/about"
            onClick={() => setIsMobileOpen(false)}
            className="font-link text-second-text hover:text-primary transition-colors"
          >
            About
          </Link>
          <Link
            to="/blog"
            onClick={() => setIsMobileOpen(false)}
            className="font-link text-second-text hover:text-primary transition-colors"
          >
            Blog
          </Link>
          <Link
            to="/contact"
            onClick={() => setIsMobileOpen(false)}
            className="font-link text-second-text hover:text-primary transition-colors"
          >
            Contact
          </Link>
          <Link
            to="/pages"
            onClick={() => setIsMobileOpen(false)}
            className="font-link text-second-text hover:text-primary transition-colors"
          >
            Pages
          </Link>
          
              {user && user.avatarUrl && user.token ? (
                <div className="flex lg:hidden items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">
                    {user.name}
                  </span>
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="w-9 h-9 rounded-full object-cover border border-gray-200"
                  />
                </div>
              ) : (
                 <div className="flex lg:hidden items-center gap-2 text-primary font-bold">
                  <UserRound size={18} className="text-primary" />
                  <Link
                    to={{
                      pathname: "/login",
                      state: { from: location.pathname },
                    }}
                  >
                    <button className="text-primary cursor-pointer hover:opacity-80 whitespace-nowrap">
                      Login
                    </button>
                  </Link>
                  <span className="text-primary">/</span>
                  <Link
                    to={{
                      pathname: "/signup",
                      state: { from: location.pathname },
                    }}
                  >
                    <button className="text-primary cursor-pointer hover:opacity-80 whitespace-nowrap">
                      Register
                    </button>
                  </Link>
                </div>
              )}
        </div>
      </div>
    </header>
  );
}

export default Header;
