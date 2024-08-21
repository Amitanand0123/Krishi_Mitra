import { useContext, useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import myContext from "../../context/myContext";
import { useParams } from "react-router";
import { fireDB } from "../../firebase/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import Loader from "../../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";

const ProductInfo = () => {
    const context = useContext(myContext);
    const { loading, setLoading } = context;

    const [product, setProduct] = useState(null);
    const { id } = useParams();
    
    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const getProductData = async () => {
        setLoading(true);
        try {
            const productDoc = await getDoc(doc(fireDB, "rentProducts", id)); // Adjusted to match your Firebase collection
            if (productDoc.exists()) {
                setProduct({ ...productDoc.data(), id: productDoc.id });
            } else {
                console.error("Product not found");
            }
        } catch (error) {
            console.error("Error fetching product data:", error);
        } finally {
            setLoading(false);
        }
    };

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

    useEffect(() => {
        getProductData();
    }, []);

    return (
        <Layout>
            <section className="py-5 lg:py-16 font-poppins dark:bg-gray-800">
                {loading ? (
                    <div className="flex justify-center items-center">
                        <Loader />
                    </div>
                ) : product ? (
                    <div className="max-w-6xl px-4 mx-auto">
                        <div className="flex flex-wrap mb-24 -mx-4">
                            <div className="w-full px-4 mb-8 md:w-1/2 md:mb-0">
                                <img
                                    className="w-full lg:h-[39em] rounded-lg"
                                    src={product.productImageUrl}
                                    alt={product.title}
                                />
                            </div>
                            <div className="w-full px-4 md:w-1/2">
                                <div className="lg:pl-20">
                                    <h2 className="max-w-xl mb-6 text-xl font-semibold leading-loose tracking-wide text-gray-700 md:text-2xl dark:text-gray-300">
                                        {product.title}
                                    </h2>
                                    <div className="flex flex-wrap items-center mb-6">
                                        {/* Example star rating */}
                                        <ul className="flex mb-4 mr-2 lg:mb-0">
                                            {[...Array(5)].map((_, i) => (
                                                <li key={i}>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width={16}
                                                        height={16}
                                                        fill="currentColor"
                                                        className="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star "
                                                        viewBox="0 0 16 16"
                                                    >
                                                        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"></path>
                                                    </svg>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <h1 className="title-font text-xl font-bold text-green-600 mb-3">
                                        ₹{product.price}
                                    </h1>
                                    <p className="text-sm text-gray-700 mb-4">
                                        {product.description}
                                    </p>
                                    <div className="flex items-center justify-between text-gray-500 text-sm mb-4">
                                        <div className="flex items-center">
                                            {product.authorImageURL && (
                                                <img
                                                    src={product.authorImageURL}
                                                    alt={product.authorName}
                                                    className="w-8 h-8 rounded-full mr-2"
                                                />
                                            )}
                                            <p>{product.authorName}</p>
                                        </div>
                                        <p>
                                            {new Date(
                                                product.timestamp.seconds * 1000
                                            ).toLocaleDateString("en-GB", {
                                                day: "numeric",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </p>
                                    </div>
                                    <div className="flex justify-center mt-8">
                                        {cartItems.some((p) => p.id === product.id) ? (
                                            <button
                                                onClick={() => deleteCart(product)}
                                                className="bg-red-700 hover:bg-red-600 w-full text-white py-2 rounded-lg font-bold transition duration-300"
                                            >
                                                Delete From Cart
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => addCart(product)}
                                                className="bg-green-500 hover:bg-green-600 w-full text-white py-2 rounded-lg font-bold transition duration-300"
                                            >
                                                Rent
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className="text-center text-gray-500">Product not found.</p>
                )}
            </section>
        </Layout>
    );
};

export default ProductInfo;
