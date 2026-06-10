import {
  ChevronDown,
  ChevronRight,
  Heart,
  Menu,
  Search,
  ShoppingCart,
  UserRound,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useLocation, useHistory } from "react-router-dom";
import { setFilter } from "../../store/actions/productActions";
import Cart from "../Cart";
import { setUser } from "../../store/actions/clientActions";

function Header() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const [shopDropDownOpen, setShopDropDownOpen] = useState(false);
  const user = useSelector((store) => store.client.user);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCustomerOpen, setIsCustomerOpen] = useState(false);
  const history = useHistory();

  const categories = useSelector((store) => store.product.categories);
  const dispatch = useDispatch();
  const currenFilter = useSelector((store) => store.product.filter);

  const handleInputChange = (e) => {
    dispatch(setFilter(e.target.value));
  };
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setIsSearchOpen(false);
    if (!location.pathname.startsWith("/shop")) {
      history.push("/shop");
    }
    setFilter("");
  };
  const womenCategories = useMemo(
    () =>
      categories
        ?.filter((category) => category.gender === "k")
        .filter(
          (category, index, currentArray) =>
            currentArray.findIndex(
              (x) => x.title === category.title && x.gender === category.gender,
            ) === index,
        )
        .sort((a, b) => b.rating - a.rating),
    [categories],
  );

  const menCategories = useMemo(
    () =>
      categories
        ?.filter((category) => category.gender === "e")
        .filter(
          (category, index, currentArray) =>
            currentArray.findIndex(
              (item) =>
                item.title === category.title &&
                item.gender === category.gender,
            ) === index,
        )
        .sort((a, b) => b.rating - a.rating),
    [categories],
  );
  const cartProducts = useSelector((store) => store.shoppingCart.cart);
  const totalCartProducts = cartProducts.reduce(
    (total, item) => total + item.count,
    0,
  );
  const handleLogout =()=>{
    localStorage.removeItem('token');
    dispatch(setUser({}));
    history.push('/');
  }

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
                  <h3 className="font-bold text-[16px] md:text-2xl text-text cursor-pointer">
                    Bandage
                  </h3>
                </Link>
              </div>

              {/* Masaüstü Menü: (1024px altında hamburger olacak) */}
              <nav className="hidden  lg:flex gap-6 items-center">
                <NavLink
                  exact
                  to="/"
                  className="font-link text-4xl text-second-text hover:text-primary transition-colors whitespace-nowrap"
                  activeClassName="text-primary font-bold"
                >
                  Home
                </NavLink>
                <div className="relative w-full">
                  <button
                    className="flex font-link text-second-text hover:text-primary transition-colors whitespace-nowrap"
                    onClick={() => setShopDropDownOpen(!shopDropDownOpen)}
                  >
                    Shop
                    {!shopDropDownOpen ? <ChevronDown /> : <ChevronRight />}
                  </button>
                  {shopDropDownOpen && (
                    <div className="absolute top-full grid grid-cols-2  gap-4 left-0 mt-2 w-100 bg-white shadow-lg p-4 z-50 rounded-md">
                      {/* kadın erkek dışında kategory gelirse cocuk gibi burayı değiştir*/}
                      <div className="flex flex-col gap-4">
                        <Link to={"/shop/kadin"}>Kadın</Link>
                        <div className="flex flex-col font-link text-second-text gap-4">
                          {womenCategories.map((category) => {
                            const currentGender = "kadin";
                            const categorySubTitle =
                              category.code.split(":")[1];
                            return (
                              <Link
                                onClick={() =>
                                  setShopDropDownOpen(!shopDropDownOpen)
                                }
                                key={category.id}
                                to={`/shop/${currentGender}/${categorySubTitle}/${category.id}`}
                              >
                                {category.title}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                      <div className="flex flex-col gap-4">
                        <Link to="/shop/erkek">Erkek</Link>
                        <div className="flex flex-col font-link text-second-text gap-4">
                          {menCategories.map((category) => {
                            const currentGender = "erkek";

                            const categorySubTitle =
                              category.code.split(":")[1];
                            return (
                              <Link
                                onClick={() =>
                                  setShopDropDownOpen(!shopDropDownOpen)
                                }
                                key={category.id}
                                to={`/shop/${currentGender}/${categorySubTitle}/${category.id}`}
                              >
                                {category.title}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
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
            <div className="flex items-center gap-2 md:gap-4 text-primary font-bold shrink-0 ml-4">
              {/* Login/Register*/}

              {user && user.avatarUrl && user.token ? (
                <div
                  className="relative inline-block hover:cursor-pointer"
                  onMouseEnter={() => setIsCustomerOpen(true)}
                  onMouseLeave={() => setIsCustomerOpen(false)}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700">
                      {user.name}
                    </span>
                    <img
                      src={user.avatarUrl}
                      alt={user.name}
                      className="w-9 h-9 rounded-full object-cover border border-gray-200 "
                    />
                  </div>
                  {isCustomerOpen && (
                    <div className="absolute flex flex-col gap-4 items-start bg-blue-50 text-alert-text p-10 left-0 rounded-xl">
                      <Link to="/myorders">Siparişlerim</Link>
                      <button onClick={handleLogout}>Logout</button>
                    </div>
                  )}
                </div>
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
              <div className="relative">
                <div className="flex items-center gap-3 lg:gap-4 text-primary">
                  <button
                    onClick={() => setIsSearchOpen(!isSearchOpen)}
                    className="hover:scale-110 transition-transform"
                  >
                    <Search className="w-6 h-6 text-primary cursor-pointer hover:scale-120" />
                  </button>
                  <div className="hidden sm:flex items-center gap-1 text-primary">
                    <Heart className="w-6 h-6 text-primary cursor-pointer hover:scale-120" />
                    <span className="text-xs font-normal text-primary">1</span>
                  </div>

                  <div
                    className="flex items-center gap-1 text-primary"
                    onClick={() => setIsCartOpen(!isCartOpen)}
                  >
                    <ShoppingCart className="w-6 h-6 text-primary cursor-pointer hover:scale-120" />
                    <span className="text-xs font-normal text-primary">
                      {totalCartProducts}
                    </span>
                  </div>

                  <button
                    className="lg:hidden p-1 text-text pr-0 sm:pr-4"
                    onClick={() => setIsMobileOpen(!isMobileOpen)}
                  >
                    {isMobileOpen ? <X size={28} /> : <Menu size={28} />}
                  </button>
                </div>
                {isCartOpen && (
                  <div className="absolute top-10 right-0">
                    <Cart setIsCartOpen={setIsCartOpen} />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Arama Çubuğu */}
          <form
            onSubmit={handleSearchSubmit}
            className={`w-full overflow-hidden transition-all duration-300 ${isSearchOpen ? "max-h-20 opacity-100 mt-2" : "max-h-0 opacity-0"}`}
          >
            <input
              value={currenFilter}
              onChange={handleInputChange}
              type="text"
              placeholder="Search..."
              className="bg-primary/10 w-full rounded-full px-4 h-10 outline-none border border-transparent focus:border-primary/30"
            />
          </form>
        </div>

        <div
          className={`w-full flex mobile-menu flex-col justify-center items-center gap-8 transition-all duration-500 ease-in-out overflow-hidden bg-white ${isMobileOpen ? "max-h-150 py-10 opacity-100 border-b border-gray-100" : "max-h-0 opacity-0"} lg:hidden`}
        >
          <Link
            to="/"
            onClick={() => setIsMobileOpen(false)}
            className=" text-second-text hover:text-primary transition-colors"
          >
            Home
          </Link>
          <Link
            to="/shop"
            onClick={() => setIsMobileOpen(false)}
            className=" text-second-text hover:text-primary transition-colors"
          >
            Shop
          </Link>
          <Link
            to="/about"
            onClick={() => setIsMobileOpen(false)}
            className=" text-second-text hover:text-primary transition-colors"
          >
            About
          </Link>
          <Link
            to="/blog"
            onClick={() => setIsMobileOpen(false)}
            className=" text-second-text hover:text-primary transition-colors"
          >
            Blog
          </Link>
          <Link
            to="/contact"
            onClick={() => setIsMobileOpen(false)}
            className=" text-second-text hover:text-primary transition-colors"
          >
            Contact
          </Link>
          <Link
            to="/pages"
            onClick={() => setIsMobileOpen(false)}
            className=" text-second-text hover:text-primary transition-colors"
          >
            Pages
          </Link>

          {user && user.avatarUrl && user.token ? (
            <div className="flex  lg:hidden items-center gap-2">
              <span className="text-sm font-medium text-gray-700">
                {user.name}
              </span>
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-4 h-4 rounded-full object-cover border border-gray-200"
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
