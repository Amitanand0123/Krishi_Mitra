import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faShoppingBag, faBars, faTimes, faHome, faStore, faLeaf, faBook, faSignInAlt, faUserPlus } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
    const user = JSON.parse(localStorage.getItem('users'));
    let parsedUser = null;

    if (user) {
        try {
            parsedUser = JSON.parse(user);
        } catch (error) {
            console.error('Error parsing user data:', error);
        }
    }

    const navigate = useNavigate();

    // Logout function 
    const logout = () => {
        localStorage.clear('users');
        navigate("/login");
        toast.success("Logout Success");
        localStorage.removeItem('cart');
    }

    const cartItems = useSelector((state) => state.cart);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

    // Close dropdown when mouse leaves the profile area
    const handleMouseLeave = () => {
        setIsProfileDropdownOpen(false);
    };

    // NavList Data
    const navList = (
      <ul className="flex flex-col space-y-4 px-5 font-medium text-md lg:flex-row lg:space-y-0 lg:space-x-6">
          <li className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faHome} className="h-6 w-6 text-[#6AC128] lg:hidden" />
              <Link to={'/'} onClick={() => setIsMobileMenuOpen(false)}>HOME</Link>
          </li>
          <li className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faStore} className="h-6 w-6 text-[#6AC128] lg:hidden" />
              <Link to={'/allproduct'} onClick={() => setIsMobileMenuOpen(false)}>OUR STORE</Link>
          </li>
          <li className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faLeaf} className="h-6 w-6 text-[#6AC128] lg:hidden" />
              <Link to={'/knowyoursoil'} onClick={() => setIsMobileMenuOpen(false)}>KNOW YOUR SOIL</Link>
          </li>
          <li className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faBook} className="h-6 w-6 text-[#6AC128] lg:hidden" />
              <Link to={'/farmstory'} onClick={() => setIsMobileMenuOpen(false)}>FARM STORY</Link>
          </li>
          <li className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faShoppingBag} className="h-6 w-6 text-[#6AC128]" />
              <Link to={'/cart'} onClick={() => setIsMobileMenuOpen(false)}>
                  Cart({cartItems.length})
              </Link>
          </li>
          <li className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faCircleUser} className="h-6 w-6 text-[#6AC128]" />
              <div className="relative">
                  <button
                      className="text-gray-900 hover:text-gray-700 transition duration-300 focus:outline-none"
                      onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  >
                      Profile
                  </button>
                  {isProfileDropdownOpen && (
                      <ul 
                        className="absolute right-0 text-gray-900 bg-white rounded-lg shadow-lg mt-2 py-2 w-48 z-50 transition-opacity duration-300 ease-in-out opacity-100" 
                        onMouseLeave={handleMouseLeave} // Close dropdown when mouse leaves the dropdown area
                      >
                          {!parsedUser && (
                              <>
                                  <li className="flex items-center space-x-2 hover:bg-gray-200 transition duration-200">
                                      <FontAwesomeIcon icon={faUserPlus} className="h-5 w-5 ml-2" />
                                      <Link to={'/signup'} className="block px-4 py-2" onClick={() => setIsProfileDropdownOpen(false)}>Signup</Link>
                                  </li>
                                  <li className="flex items-center space-x-2 hover:bg-gray-200 transition duration-200">
                                      <FontAwesomeIcon icon={faSignInAlt} className="h-5 w-5 ml-2" />
                                      <Link to={'/login'} className="block px-4 py-2" onClick={() => setIsProfileDropdownOpen(false)}>Login</Link>
                                  </li>
                              </>
                          )}
                          {parsedUser && (
                              <>
                                  {parsedUser.role.toLowerCase() === "user" && (
                                      <li className="hover:bg-gray-200 transition duration-200">
                                          <Link to={'/user-dashboard'} className="block px-4 py-2" onClick={() => setIsProfileDropdownOpen(false)}>User</Link>
                                      </li>
                                  )}
                                  <li className="cursor-pointer hover:bg-gray-200 transition duration-200 block px-4 py-2" onClick={logout}>
                                      Logout
                                  </li>
                              </>
                          )}
                      </ul>
                  )}
              </div>
          </li>
      </ul>
  );
  

    return (
        <nav className="fixed top-0 left-0 w-full flex justify-center py-4 z-50">
            <div className="bg-white w-11/12 lg:w-10/12 flex justify-between items-center px-6 py-2 rounded-lg shadow-lg">
                <div className="flex items-center">
                    <Link to={'/'}>
                        <img src="/km_logo.png" alt="Krishi Mitra" className="h-10 lg:h-14" />
                    </Link>
                    <h2 className="text-2xl text-green-600 font-bold ml-3">Krishi Mitra</h2>
                </div>
                <div className="hidden lg:block items-center space-x-6">
                    {navList}
                </div>
                <button
                    className="lg:hidden text-gray-600"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} className="h-6 w-6" />
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="lg:hidden fixed top-20 right-14 w-2/6 bg-white px-6 py-4 shadow-md z-50">
                    <button
                        className="text-gray-600"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                    </button>
                    <div className="">
                        {navList}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
