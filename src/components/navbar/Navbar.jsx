import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faShoppingBag, faBars, faTimes, faHome, faStore, faLeaf,faSignInAlt, faUserPlus, faCloud, faBlog } from "@fortawesome/free-solid-svg-icons";
const Navbar = () => {
    const user = JSON.parse(localStorage.getItem('users'));
    const navigate = useNavigate();

    // logout function 
    const logout = () => {
        localStorage.removeItem('users');
        navigate("/");
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

    const navList = (
        <ul className="flex flex-col space-y-8 px-5 font-medium text-md lg:flex-row lg:space-y-0 lg:space-x-6 montserrat">
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
            {/* <li className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faCloud} className="h-6 w-6 text-[#6AC128] lg:hidden" />
                <Link to={'/weatherpage'} onClick={() => setIsMobileMenuOpen(false)}>WEATHER</Link>
            </li> */}
            <li className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faBlog} className="h-6 w-6 text-[#6AC128] lg:hidden" />
                <Link to={'/blogpage'} onClick={() => setIsMobileMenuOpen(false)}>FARM BLOG</Link>
            </li>
            <li>
                <Link to={'/cart'} onClick={() => setIsMobileMenuOpen(false)} className="flex items-center space-x-2">
                    <FontAwesomeIcon icon={faShoppingBag} className="h-6 w-6 text-[#6AC128]" />
                    <span className="lg:hidden">CART</span>
                </Link>
            </li>
            <li>
                <div className="relative">
                    <Link
                        className="text-gray-900 hover:text-gray-700 transition duration-300 focus:outline-none flex items-center space-x-2"
                        onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                    >
                        {user?.imageURL ? (
                            <img
                                src={user.imageURL}
                                alt="Profile"
                                className="h-6 w-6 rounded-full"
                            />
                        ) : (
                            <FontAwesomeIcon icon={faCircleUser} className="h-6 w-6 text-[#6AC128]" />
                        )}
                        {/* Display user name if logged in */}
                        {user && (
                            <span className="ml-2">{user.name}</span>
                        )}
                    </Link>

                    {isProfileDropdownOpen && (
                        <ul className="absolute right-0 text-gray-900 bg-white rounded-lg shadow-lg mt-2 py-2 w-48 z-50"
                            onMouseLeave={handleMouseLeave}>
                            {!user && (
                                <>
                                    <li className="flex items-center space-x-2 hover:bg-gray-200 transition duration-200">
                                        <FontAwesomeIcon icon={faUserPlus} className="h-5 w-5 ml-2 text-[#6AC128]" />
                                        <Link to={'/signup'} className="block px-4 py-2" onClick={() => setIsProfileDropdownOpen(false)}>Signup</Link>
                                    </li>
                                    <li className="flex items-center space-x-2 hover:bg-gray-200 transition duration-200">
                                        <FontAwesomeIcon icon={faSignInAlt} className="h-5 w-5 ml-2 text-[#6AC128]" />
                                        <Link to={'/login'} className="block px-4 py-2" onClick={() => setIsProfileDropdownOpen(false)}>Login</Link>
                                    </li>
                                </>
                            )}
                            {user && (
                                <>
                                    <li className="hover:bg-gray-200 transition duration-200">
                                      <Link 
                                          to={user.role === "user" ? '/user-dashboard' : '/admin-dashboard'} 
                                          className="block px-4 py-2"
                                          onClick={() => setIsProfileDropdownOpen(false)}
                                      >
                                          My Account
                                      </Link>
                                  </li>
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
        <nav className="top-0 left-0 w-full flex justify-center py-4 z-50">
            <div className="bg-white w-11/12 lg:w-10/12 flex justify-between items-center px-6 py-2 rounded-lg shadow-lg">
                <div className="flex items-center">
                    <Link to={'/'}>
                        <img src="/km_logo.png" alt="Krishi Mitra" className="h-10 lg:h-14" />
                    </Link>
                    <Link to={'/'}>
                    <h2 className="text-3xl font-bold new-amsterdam-regular ml-2 text-[#6AC128]">Krishi Mitra</h2>
                    </Link>
                </div>
                <div className="hidden lg:block montserrat items-center space-x-6">
                    {navList}
                </div>
                <button className="lg:hidden text-gray-600"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    <FontAwesomeIcon icon={faBars} className="h-6 w-6" />
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="lg:hidden fixed top-20 right-6 rounded sm:w-2/6 w-2/3 bg-white px-6 py-4 shadow-md z-50">
                    <button
                        className="text-gray-600"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <FontAwesomeIcon icon={faTimes} className="h-6 w-6" />
                    </button>
                    <div className="">
                        {navList}
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
