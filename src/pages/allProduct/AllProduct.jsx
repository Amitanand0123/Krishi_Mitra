import { useNavigate } from "react-router";
import Layout from "../../components/layout/Layout";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import Loader from "../../components/loader/Loader";
import { collection, getDocs } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapLocationDot, faPhone, faSearch } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "../../components/searchBar/SearchBar";

const AllProduct = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart);
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");

    const categoriesData = [
        { name: "All", image: "/img/all.jpeg" },
        { name: "Vehicles", image: "/img/electro.jpeg" },
        { name: "Tools", image: "/img/tools-image.jpeg" },
        { name: "Electronics", image: "/img/electronics_farming.jpg" }
    ];

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const querySnapshot = await getDocs(collection(fireDB, "rentProducts"));
                const fetchedProducts = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
                setProducts(fetchedProducts);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching products: ", error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const addCart = (item) => {
        dispatch(addToCart(item));
        toast.success("Added to cart");
    };

    const deleteCart = (item) => {
        dispatch(deleteFromCart(item));
        toast.success("Deleted from cart");
    };

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems]);

    const normalizedCategories = categoriesData.map(cat => ({
        ...cat,
        name: cat.name.toLowerCase()
    }));

    const addCategory = (category) => {
        setSelectedCategory(category.toLowerCase());
    };

    const filteredProducts = selectedCategory === "all"
        ? products
        : products.filter(product => product.category?.toLowerCase() === selectedCategory);

    return (
        <Layout>
            <div className="py-8">
                <div>
                    <h1 className="text-center mb-5 text-2xl font-semibold">
                        Shop or Rent Products
                    </h1>
                </div>

                {/* Category Selection */}
                <div className="relative">
                    {/* Desktop View */}
                    <div className="hidden sm:flex justify-center flex-wrap mb-5">
                        {normalizedCategories.map((category, index) => (
                            <div
                                key={index}
                                onClick={() => addCategory(category.name)}
                                className={`p-4 cursor-pointer flex flex-col items-center ${
                                    selectedCategory === category.name
                                        ? "text-[#6AC128]"
                                        : ""
                                }`}
                            >
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className={`w-28 h-28 object-cover mb-2 rounded-full ${
                                        selectedCategory === category.name
                                            ? "border-8 border-[#6AC128]"
                                            : ""
                                    }`}
                                />
                                <p className="text-center capitalize mt-2">{category.name}</p>
                            </div>
                        ))}
                    </div>

                    {/* Mobile View with Arrows */}
                    <div className="sm:hidden flex items-center">
                        <button className="p-2" onClick={() => document.getElementById('category-scroll').scrollBy({ left: -150, behavior: 'smooth' })}>
                            <FaChevronLeft size={24} />
                        </button>
                        <div id="category-scroll" className="flex overflow-x-scroll space-x-4">
                            {normalizedCategories.map((category, index) => (
                                <div
                                    key={index}
                                    onClick={() => addCategory(category.name)}
                                    className={`flex-shrink-0 cursor-pointer flex flex-col items-center ${
                                        selectedCategory === category.name
                                            ? "text-[#6AC128]"
                                            : ""
                                    }`}
                                >
                                    <img
                                        src={category.image}
                                        alt={category.name}
                                        className={`w-28 h-28 object-cover mb-2 rounded-full ${
                                            selectedCategory === category.name
                                                ? "border-8 border-[#6AC128]"
                                                : ""
                                        }`}
                                    />
                                    <p className="text-center capitalize mt-2">{category.name}</p>
                                </div>
                            ))}
                        </div>
                        <button className="p-2" onClick={() => document.getElementById('category-scroll').scrollBy({ left: 150, behavior: 'smooth' })}>
                            <FaChevronRight size={24} />
                        </button>
                    </div>
                </div>

                {/*SearchBar */}
                <SearchBar products={products}/>

                {/* List Product for Rent */}
                <div className="text-center mt-8">
                            <Link
                                to="/rentproduct"
                                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#6AC128] hover:bg-[#5aa622]"
                            >
                                List Your Equipment for Rent
                            </Link>
                        </div>
                                        

                {/* Main Product Listing */}
                <section className="text-gray-600 body-font">
                    <div className="container px-5 lg:px-0 py-5 mx-auto">
                        <div className="flex justify-center">
                            {loading && <Loader />}
                        </div>
                        <div className="flex flex-wrap">
                            {filteredProducts.length === 0 ? (
                                <p className="text-center w-full">No products available in this category.</p>
                            ) : (
                                filteredProducts.map((item, index) => {
                                    const { id, title, price, location, contact, productImageUrl, description, authorName, authorImageURL, timestamp } = item;
                                    const date = timestamp ? new Date(timestamp.seconds * 1000).toLocaleDateString('en-GB', {
                                        day: 'numeric',
                                        month: 'short',
                                        year: 'numeric'
                                    }) : "Unknown date";
                                    
                                    return (
                                        <div
                                            key={index}
                                            className="p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
                                        >
                                            <div className="h-full border border-gray-300 rounded-xl overflow-hidden shadow-lg flex flex-col">
                                                <img
                                                    onClick={() =>
                                                        navigate(`/productinfo/${id}`)
                                                    }
                                                    className="lg:h-64 h-48 w-full object-cover cursor-pointer hover:opacity-90 transition duration-300"
                                                    src={productImageUrl}
                                                    alt={title}
                                                />
                                                <div className="p-6 flex flex-col justify-between flex-grow">
                                                    <div>
                                                        <h1 className="title-font text-lg font-semibold text-gray-900 mb-2">
                                                            {title.length > 25 ? title.substring(0, 25) + "..." : title}
                                                        </h1>
                                                        <h1 className="title-font text-xl font-bold text-green-600 mb-3">
                                                            ₹{price}
                                                        </h1>
                                                        <p className="text-sm text-gray-700 mb-4">
                                                            {description.length > 50 ? description.substring(0, 50) + "..." : description}
                                                        </p>
                                                        <h1 className="title-font text-sm  text-green-600 mb-3">
                                                        <FontAwesomeIcon icon={faMapLocationDot} className="h-6 w-6 text-[#FF0000] " />                                                  {location}
                                                        </h1>
                                                        <h1 className="title-font text-sm text-green-600 mb-3">
                                                        <FontAwesomeIcon icon={faPhone} className="h-6 w-6 text-[#0000FF] " />                                                    {contact}
                                                        </h1>
                                                    </div>
                                                    <div className="flex items-center justify-between text-gray-500 text-sm mb-4">
                                                        <div className="flex items-center">
                                                            {authorImageURL && (
                                                                <img
                                                                    src={authorImageURL}
                                                                    alt={authorName}
                                                                    className="w-8 h-8 rounded-full mr-2"
                                                                />
                                                            )}
                                                            <p>{authorName}</p>
                                                        </div>
                                                        <p>{date}</p>
                                                    </div>
                                                    <div className="flex justify-center mt-auto">
                                                        {cartItems.some((p) => p.id === item.id) ? (
                                                            <button
                                                                onClick={() => deleteCart(item)}
                                                                className="bg-red-700 hover:bg-red-600 w-full text-white py-2 rounded-lg font-bold transition duration-300"
                                                            >
                                                                Delete From Cart
                                                            </button>
                                                        ) : (
                                                            <button
                                                                onClick={() => addCart(item)}
                                                                className="bg-green-500 hover:bg-green-600 w-full text-white py-2 rounded-lg font-bold transition duration-300"
                                                            >
                                                                Rent
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>

                        
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default AllProduct;
