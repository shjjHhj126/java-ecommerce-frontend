import { Fragment, useState, useRef, useEffect } from "react";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Avatar, Button, Menu, MenuItem, IconButton } from "@mui/material";
import Logout from "@mui/icons-material/Logout";
import { useNavigate, useLocation } from "react-router-dom";
import AuthModal from "../../Auth/AuthModal";
import { useDispatch, useSelector } from "react-redux";
import { signup, getUser, logout, refresh } from "../../../redux/Auth/Action";
import { getCart } from "../../../redux/Cart/Action";
import { jwtDecode } from "jwt-decode";
import { findCategories, findProducts } from "../../../redux/Product/Action";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchParam, setSearchParam] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const openAccount = Boolean(anchorEl);
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const storedAccessToken = localStorage.getItem("accessToken");
  const storedRefreshToken = localStorage.getItem("refreshToken");

  const { user } = useSelector((store) => store.auth);
  const { cart, cartItems } = useSelector((store) => store.cart);
  const { categories } = useSelector((store) => store.product);

  // for search visibility
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  // to search depends on the searchParam on click icon
  const handleSearch = () => {
    if (searchParam.trim()) {
      navigate(`/search?searchParam=${searchParam}`);
    }
  };

  // to search depends on the searchParam on enter.
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    // get user profile
    if (storedAccessToken) {
      dispatch(getUser(storedAccessToken));
    }

    // refresh token
    if (storedAccessToken && storedRefreshToken) {
      const tokenDecoded = jwtDecode(storedAccessToken);
      const currentTime = Math.floor(Date.now() / 1000); // second
      if (tokenDecoded.exp - currentTime < 5 * 60) {
        dispatch(refresh(storedRefreshToken));
      }
    }
  }, [storedAccessToken]);

  useEffect(() => {
    if (user) {
      handleClose(); //close menu
    }
    if (location.pathname == "/login" || location.pathname == "/signup") {
      navigate(-1);
    }
  }, [user]);

  useEffect(() => {
    dispatch(findCategories());
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCategoryClick = (category, sub, close) => {
    navigate(`/search?categoryId=${sub.id}`);
    const data = {
      categoryId: sub.id,
      pageSize: 3,
      pageNum: 1,
      sort: "price_low",
    };
    dispatch(findProducts(data));
    console.log("a good start");
    close();
  };

  const handleCloseAuthModal = () => {
    setOpenAuthModal(false);
    navigate("/");
  };

  const handleOpenAuthModal = () => {
    setOpenAuthModal(true);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleClose();
  };

  useEffect(() => {
    dispatch(getCart());
  }, []);

  return (
    <div className="bg-white">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full">
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}>
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Links */}
                <Tab.Group as="div" className="mt-2">
                  <Tab.Panels as={Fragment}>
                    {categories?.map((category) => (
                      <Tab.Panel
                        key={category.name}
                        className="space-y-10 px-4 pb-8 pt-10 bg-white ">
                        {categories?.map((category) => (
                          <div key={category.id}>
                            <p
                              id={`${category.id}-heading-mobile`}
                              className="font-medium text-gray-900">
                              {category.name}
                            </p>
                            <ul
                              role="list"
                              aria-labelledby={`${category.id}-ul-heading-mobile`}
                              className="mt-6 flex flex-col space-y-6">
                              {category.subcategories.map((sub) => (
                                <li
                                  key={sub.name}
                                  className="flow-root cursor-pointer"
                                  onClick={() =>
                                    handleCategoryClick(category, sub, close)
                                  }>
                                  <p className="block p-4 rounded-lg bg-black text-white  transition-colors ">
                                    {sub.name}
                                  </p>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </Tab.Panel>
                    ))}
                  </Tab.Panels>
                </Tab.Group>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative bg-white">
        <p className="flex h-10 items-center justify-center bg-black px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
          Get free delivery on orders over $100
        </p>

        <nav
          aria-label="Top"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <button
                type="button"
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}>
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <a href="#">
                  <span className="sr-only">Your Company</span>
                  <img
                    className="h-[80px] w-auto"
                    src="https://firebasestorage.googleapis.com/v0/b/java-ecommerce-69ec1.appspot.com/o/Fashion-logo-fashion-clothes-shop-Graphics-26436674-1-1-580x386.png?alt=media&token=3f85db4e-177a-47b9-8deb-8f78abe43662"
                    alt=""
                    onClick={() => navigate("/")}
                  />
                </a>
              </div>

              {/* Flyout menus */}
              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  {categories?.map((category) => (
                    <Popover key={category.name} className="flex">
                      {({ open, close }) => (
                        <>
                          <div className="relative flex">
                            <Popover.Button
                              className={classNames(
                                open
                                  ? "border-indigo-600 text-indigo-600"
                                  : "border-transparent text-gray-700 hover:text-gray-800",
                                "relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out"
                              )}>
                              {category.name}
                            </Popover.Button>
                          </div>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0">
                            <Popover.Panel
                              className="absolute inset-x-0 top-full text-sm text-gray-500"
                              style={{ zIndex: 10 }}>
                              {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                              <div
                                className="absolute inset-0 top-1/2 bg-white shadow"
                                aria-hidden="true"
                              />
                              <div className="relative bg-gray-50">
                                <div className="mx-auto max-w-7xl px-4 py-8">
                                  <div className="grid grid-cols-6 gap-6">
                                    {category.subcategories.map((sub) => (
                                      <div
                                        key={sub.name}
                                        onClick={() =>
                                          handleCategoryClick(
                                            category,
                                            sub,
                                            close
                                          )
                                        }
                                        className="relative overflow-hidden rounded-lg bg-black shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                                        <div className="p-6 flex flex-col justify-center items-center text-white text-center">
                                          <p className="text-lg font-semibold mb-2">
                                            {sub.name}
                                          </p>
                                          <p className="text-sm font-medium">
                                            Explore
                                          </p>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  ))}
                </div>
              </Popover.Group>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {user?.firstName ? (
                    <IconButton
                      onClick={handleClick}
                      size="small"
                      sx={{ ml: 2 }}
                      aria-controls={open ? "account-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}>
                      <Avatar
                        sx={{
                          width: 32,
                          height: 32,
                          bgcolor: "black",
                          border: "double 3px",
                        }}>
                        <p className="text-xs">{user?.firstName}</p>
                      </Avatar>
                    </IconButton>
                  ) : (
                    <Button
                      style={{
                        color: "black",
                        border: "1.5px solid gray",
                      }}
                      onClick={handleOpenAuthModal}>
                      Log in
                    </Button>
                  )}

                  <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={openAccount}
                    onClose={handleClose}
                    onClick={handleClose}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{
                      horizontal: "right",
                      vertical: "bottom",
                    }}>
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem
                      onClick={() => {
                        navigate("/account/order");
                        handleClose();
                      }}>
                      My Orders
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      <Logout fontSize="small" />
                      Logout
                    </MenuItem>
                  </Menu>
                </div>

                {/* Search */}
                <div className="flex lg:ml-6">
                  {/* Search Input Area */}
                  {isSearchOpen && (
                    <div className="ml-4">
                      <input
                        value={searchParam}
                        onChange={(e) => setSearchParam(e.target.value)}
                        onKeyUp={handleKeyPress}
                        type="text"
                        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Search products..."
                      />
                    </div>
                  )}

                  {/* Search Icon */}
                  <a
                    onClick={toggleSearch}
                    className="p-2 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Search</span>
                    <MagnifyingGlassIcon
                      className="h-6 w-6"
                      aria-hidden="true"
                    />
                  </a>
                </div>

                {/* Cart */}
                <div
                  onClick={() => navigate("/cart")}
                  className="ml-4 flow-root lg:ml-6">
                  <a href="#" className="group -m-2 flex items-center p-2">
                    <ShoppingBagIcon
                      className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                      {cartItems ? cartItems.length : 0}
                    </span>
                    <span className="sr-only">items in cart, view bag</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <AuthModal handleClose={handleCloseAuthModal} open={openAuthModal} />
    </div>
  );
}
