import { useContext, useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import myContext from "../../context/myContext";
import Loader from "../../components/loader/Loader";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";

const UserDashboard = () => {
    const context = useContext(myContext);
    const { loading, getAllOrder } = context;

    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [soilBookings, setSoilBookings] = useState([]);

    // Fetch user from localStorage
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('users'));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    // Fetch user data from Firebase
    useEffect(() => {
        if (user?.uid) {
            const fetchUserData = async () => {
                try {
                    const userDocRef = doc(fireDB, "user", user.uid);
                    const userDoc = await getDoc(userDocRef);
                    if (userDoc.exists()) {
                        setUserData(userDoc.data());
                    } else {
                        console.error("No such user document!");
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            };
            fetchUserData();
        }
    }, [user?.uid]);

    // Fetch soil bookings
    useEffect(() => {
        if (user?.uid) {
            const fetchSoilBookings = async () => {
                try {
                    const q = query(collection(fireDB, "soilBookings"), where("userId", "==", user.uid));
                    const querySnapshot = await getDocs(q);
                    const bookings = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
                    setSoilBookings(bookings);
                } catch (error) {
                    console.error("Error fetching soil bookings:", error);
                }
            };
            fetchSoilBookings();
        }
    }, [user?.uid]);

    return (
        <Layout>
            <div className="container mx-auto px-4 py-5 lg:py-8">
                {/* Top Section */}
                <div className="top">
                    <div className="bg-green-50 py-5 rounded-xl border border-green-100">
                        {/* Profile Image */}
                        <div className="flex justify-center">
                            <img
                                src={user?.imageURL || "https://cdn-icons-png.flaticon.com/128/2202/2202112.png"}
                                alt="User Profile"
                                className="h-32 w-32 rounded-full object-cover border border-green-200"
                            />
                        </div>
                        {/* User Information */}
                        <div className="text-center mt-4">
                            <h1 className="text-lg font-bold">Name: {user?.name || "Loading..."}</h1>
                            <h1 className="text-lg">Email: {user?.email || user?.email}</h1>
                            <h1 className="text-lg">Date: {user?.date}</h1>
                            <h1 className="text-lg">Role: {user?.role}</h1>
                        </div>
                    </div>
                </div>

                {/* Soil Bookings Section */}
                <div className="mt-8">
                    <h2 className="text-2xl lg:text-3xl font-bold mb-4">Soil Test Bookings</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {soilBookings.map((booking) => (
                            <div key={booking.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-green-200">
                                <div className="p-6">
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-sm font-semibold text-green-600">Booking ID: {booking.id.slice(0, 8)}</span>
                                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                                            {new Date(booking.timestamp.toDate()).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Soil Type: {booking.soilType}</h3>
                                    <p className="text-sm text-gray-600 mb-4">{booking.extraSoilInfo}</p>
                                    <div className="mb-4">
                                        <h4 className="text-sm font-semibold text-gray-700 mb-2">Selected Tests:</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {booking.selectedTests.map((test, index) => (
                                                <span key={index} className="px-2 py-1 text-xs font-medium rounded-full bg-green-50 text-green-700">
                                                    {test}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center text-sm text-gray-500">
                                        <span>Center: {booking.selectedCenter}</span>
                                        <span>{booking.mobileNumber}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Section - Order Details */}
                <div className="bottom mt-8">
                    <div className="mx-auto my-4 max-w-6xl px-2 md:my-6 md:px-0">
                        <h2 className="text-2xl lg:text-3xl font-bold">Order Details</h2>

                        {loading && (
                            <div className="flex justify-center relative top-10">
                                <Loader />
                            </div>
                        )}

                        {/* Order List */}
                        {getAllOrder
                            .filter((obj) => obj.userid === user?.uid)
                            .map((order, index) => {
                                return (
                                    <div key={index}>
                                        {order.cartItems.map((item, index) => {
                                            const { id, date, quantity, price, title, productImageUrl, category, location, contact } = item;
                                            const { status } = order;
                                            return (
                                                <div
                                                    key={index}
                                                    className="mt-5 flex flex-col overflow-hidden rounded-xl border border-green-100 md:flex-row"
                                                >
                                                    {/* Order Information */}
                                                    <div className="w-full border-r border-green-100 bg-green-50 md:max-w-xs">
                                                        <div className="p-8">
                                                            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-1">
                                                                <div className="mb-4">
                                                                    <div className="text-sm font-semibold text-black">Order Id</div>
                                                                    <div className="text-sm font-medium text-gray-900">#{id}</div>
                                                                </div>
                                                                <div className="mb-4">
                                                                    <div className="text-sm font-semibold">Date</div>
                                                                    <div className="text-sm font-medium text-gray-900">{date}</div>
                                                                </div>
                                                                <div className="mb-4">
                                                                    <div className="text-sm font-semibold">Total Amount</div>
                                                                    <div className="text-sm font-medium text-gray-900">₹ {price * quantity}</div>
                                                                </div>
                                                                <div className="mb-4">
                                                                    <div className="text-sm font-semibold">Order Status</div>
                                                                    {status === "pending" ? (
                                                                        <div className="text-sm font-medium text-red-800 first-letter:uppercase">{status}</div>
                                                                    ) : (
                                                                        <div className="text-sm font-medium text-green-800 first-letter:uppercase">{status}</div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* Product Information */}
                                                    <div className="flex-1">
                                                        <div className="p-8">
                                                            <ul className="-my-7 divide-y divide-gray-200">
                                                                <li className="flex flex-col justify-between space-x-5 py-7 md:flex-row">
                                                                    <div className="flex flex-1 items-stretch">
                                                                        <div className="flex-shrink-0">
                                                                            <img
                                                                                className="h-40 w-40 rounded-lg border border-gray-200 object-contain"
                                                                                src={productImageUrl}
                                                                                alt="Product"
                                                                            />
                                                                        </div>
                                                                        <div className="ml-5 flex flex-col justify-between">
                                                                            <div className="flex-1">
                                                                                <p className="text-sm font-bold text-gray-900">{title}</p>
                                                                                <p className="mt-1.5 text-sm font-medium text-gray-500">{category}</p>
                                                                                <p className="mt-1.5 text-sm font-medium text-gray-500">{location}</p>
                                                                                <p className="mt-1.5 text-sm font-medium text-gray-500">{contact}</p>
                                                                            </div>
                                                                            <p className="mt-4 text-sm font-medium text-gray-500">x {quantity}</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="ml-auto flex flex-col items-end justify-between">
                                                                        <p className="text-right text-sm font-bold text-gray-900">₹ {price}</p>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default UserDashboard;