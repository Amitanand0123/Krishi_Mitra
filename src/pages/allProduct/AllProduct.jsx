import { useNavigate } from "react-router";
import Layout from "../../components/layout/Layout";
import { useContext, useEffect, useState } from "react";
import myContext from "../../context/myContext";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import Loader from "../../components/loader/Loader";

const AllProduct = () => {
    const navigate = useNavigate();
    const context = useContext(myContext);
    const { loading, getAllProduct } = context;

    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const [selectedCategory, setSelectedCategory] = useState("All");

    // Define categories with images
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

    // Normalize category names to lowercase
    const normalizedCategories = categoriesData.map(cat => ({
        ...cat,
        name: cat.name.toLowerCase()
    }));

    const addCategory = (category) => {
        setSelectedCategory(category.toLowerCase());
    };

    // Filter products based on selected category
    const filteredProducts = selectedCategory === "all" 
        ? getAllProduct 
        : getAllProduct.filter(product => product.category.toLowerCase() === selectedCategory);

    console.log("Selected Category:", selectedCategory);
    console.log("Filtered Products:", filteredProducts);

    return (
        <Layout>
            <div className="py-8">
                {/* Heading */}
                <div className="">
                    <h1 className="text-center mb-5 text-2xl font-semibold">
                        Shop or Rent Products
                    </h1>
                </div>

                {/* Category Selection */}
                <div className="flex justify-center flex-wrap mb-5">
                    {normalizedCategories.map((category, index) => (
                        <div
                            key={index}
                            onClick={() => addCategory(category.name)}
                            className={`p-4 w-24 h-24 rounded-full m-2 cursor-pointer flex flex-col items-center ${
                                selectedCategory === category.name
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200"
                            }`}
                        >
                            <img
                                src={category.image}
                                alt={category.name}
                                className="w-24 h-24 object-cover mb-2 rounded-lg"
                            />
                            <p className="text-center capitalize">{category.name}</p>
                        </div>
                    ))}
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
