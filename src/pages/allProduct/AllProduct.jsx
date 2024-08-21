import { useNavigate } from "react-router";
import Layout from "../../components/layout/Layout";
import { useContext, useEffect, useState } from "react";
import myContext from "../../context/myContext";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import Loader from "../../components/loader/Loader";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Import icons for arrows

const AllProduct = () => {
    const navigate = useNavigate();
    const context = useContext(myContext);
    const { loading, getAllProduct } = context;

    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const [selectedCategory, setSelectedCategory] = useState("all");

    const categoriesData = [
        { name: "All", image: "/img/all.jpeg" },
        { name: "Electronics", image: "/img/electro.jpeg" },
        { name: "Tools", image: "/img/tools-image.jpeg" },
        { name: "Seeds", image: "/img/seeds.jpeg" },
        { name: "Machinery", image: "/img/machinery_user.jpeg" },
        { name: "Fertilizers", image: "/img/ferti.jpeg" },
        { name: "Irrigation", image: "/img/irri.jpeg" }
    ];

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
        ? getAllProduct 
        : getAllProduct.filter(product => product.category.toLowerCase() === selectedCategory);

    return (
        <Layout>
            <div className="py-8">
                <div className="">
                    <h1 className="text-center mb-5 text-2xl font-semibold">
                        Shop or Rent Products
                    </h1>
                </div>

                {/* Category Selection */}
                <div className="relative">
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

                    {/* Mobile view with left-right arrows */}
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

                {/* Main */}
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
                                    const { id, title, price, productImageUrl } = item;
                                    return (
                                        <div
                                            key={index}
                                            className="p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
                                        >
                                            <div className="h-full border border-gray-300 rounded-xl overflow-hidden shadow-md flex flex-col">
                                                <img
                                                    onClick={() =>
                                                        navigate(`/productinfo/${id}`)
                                                    }
                                                    className="lg:h-64 h-48 w-full object-cover cursor-pointer"
                                                    src={productImageUrl}
                                                    alt={title}
                                                />
                                                <div className="p-6 flex flex-col justify-between flex-grow">
                                                    <div>
                                                        <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                                                            {title.substring(0, 25)}
                                                        </h1>
                                                        <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                                                            ₹{price}
                                                        </h1>
                                                    </div>
                                                    <div className="flex justify-center mt-auto">
                                                        {cartItems.some((p) => p.id === item.id) ? (
                                                            <button
                                                                onClick={() => deleteCart(item)}
                                                                className="bg-red-700 hover:bg-red-600 w-full text-white py-2 rounded-lg font-bold"
                                                            >
                                                                Delete From Cart
                                                            </button>
                                                        ) : (
                                                            <button
                                                                onClick={() => addCart(item)}
                                                                className="bg-green-500 hover:bg-green-600 w-full text-white py-2 rounded-lg font-bold"
                                                            >
                                                                Add To Cart
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
