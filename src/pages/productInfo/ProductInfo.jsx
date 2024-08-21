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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ProductInfo = () => {
    const context = useContext(myContext);
    const { loading, setLoading } = context;

    const [product, setProduct] = useState(null);
    const { id } = useParams();
    const [rentalStart, setRentalStart] = useState(new Date());
    const [rentalEnd, setRentalEnd] = useState(new Date());
    const [rentalPrice, setRentalPrice] = useState(0);

    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const getProductData = async () => {
        setLoading(true);
        try {
            const productDoc = await getDoc(doc(fireDB, "rentProducts", id));
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

    // ProductInfo.js
    const addCart = (item) => {
        dispatch(
            addToCart({
                ...item,
                rentalStart,
                rentalEnd,
                rentalPrice,
            })
        );
        toast.success('Added to cart');
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

    useEffect(() => {
        if (product) {
            const oneDay = 24 * 60 * 60 * 1000; // Hours * Minutes * Seconds * Milliseconds
            const diffDays = Math.round(Math.abs((rentalStart - rentalEnd) / oneDay));
            const calculatedRentalPrice = diffDays * product.price;
            setRentalPrice(calculatedRentalPrice);
        }
    }, [rentalStart, rentalEnd, product]);
    

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
                                        {/* ... */}
                                    </div>
                                    <h1 className="title-font text-xl font-bold text-green-600 mb-3">
                                        ₹{product.price}
                                    </h1>
                                    <p className="text-sm text-gray-700 mb-4">
                                        {product.description}
                                    </p>
                                    <h2 className="title-font text-xl font-bold text-green-600 mb-3">
                                        {product.location}
                                    </h2>
                                    <h2 className="title-font text-xl font-bold text-green-600 mb-3">
                                        {product.contact}
                                    </h2>
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
                                    <div className="flex flex-col items-start mb-4">
                                        <p className="text-gray-700 font-semibold mb-2">Rental Period:</p>
                                        <div className="flex items-center space-x-4">
                                            <DatePicker
                                                selected={rentalStart}
                                                onChange={(date) => setRentalStart(date)}
                                                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                            />
                                            <DatePicker
                                                selected={rentalEnd}
                                                onChange={(date) => setRentalEnd(date)}
                                                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                            />
                                        </div>
                                        <p className="text-gray-700 font-semibold mt-2">
                                            Total Rental Price: ₹{rentalPrice}
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