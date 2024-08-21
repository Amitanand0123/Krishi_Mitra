import { useState } from "react";
import { useNavigate } from "react-router";
import { getAuth } from "firebase/auth";
import { fireDB, storage } from "../../firebase/FirebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Layout from "../../components/layout/Layout";
import toast from "react-hot-toast";

const categoriesData = [
    { name: "All", image: "/img/all.jpeg" },
    { name: "Electronics", image: "/img/electro.jpeg" },
    { name: "Tools", image: "/img/tools-image.jpeg" },
    { name: "Seeds", image: "/img/seeds.jpeg" },
    { name: "Machinery", image: "/img/machinery_user.jpeg" },
    { name: "Fertilizers", image: "/img/ferti.jpeg" },
    { name: "Irrigation", image: "/img/irri.jpeg" }
];

const user = JSON.parse(localStorage.getItem('users'));

const RentProduct = () => {
    const navigate = useNavigate();
    const [rentProduct, setRentProduct] = useState({
        title: "",
        price: "",
        productImageUrl: "",
        description: "",
        category: categoriesData[0].name, // Set default category without converting to lowercase
        authorName: user?.name || '', // Store author's name
        authorImageURL: user?.imageURL || '', // Store author's image URL
        timestamp: serverTimestamp(),
    });
    const [imageFile, setImageFile] = useState(null);

    const handleInputChange = (e) => {
        setRentProduct({ ...rentProduct, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleCategoryChange = (e) => {
        setRentProduct({ ...rentProduct, category: e.target.value });
    };

    const handleListProduct = async () => {
        try {
            const auth = getAuth();
            const user = auth.currentUser;

            if (!user) {
                toast.error("You need to be logged in to list a product for rent.");
                return;
            }

            let imageUrl = "";
            if (imageFile) {
                const storageRef = ref(storage, `rentProducts/${user.uid}/${imageFile.name}`);
                const snapshot = await uploadBytes(storageRef, imageFile);
                imageUrl = await getDownloadURL(snapshot.ref);
            }

            const productData = {
                ...rentProduct,
                productImageUrl: imageUrl,
                userId: user.uid,
            };

            await addDoc(collection(fireDB, "rentProducts"), productData);

            toast.success("Product listed for rent!");
            setRentProduct({ title: "", price: "", productImageUrl: "", description: "", category: categoriesData[0].name });
            setImageFile(null);
            navigate("/allproduct");
        } catch (error) {
            console.error("Error adding document: ", error);
            toast.error("Failed to list product. Please try again.");
        }
    };

    return (
        <Layout>
            <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
                        List Your Equipment for Rent
                    </h2>

                    <div className="space-y-6">
                        <div className="relative">
                            <label htmlFor="title" className="text-gray-700 text-sm font-medium">
                                Product Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                placeholder="Enter the product title"
                                value={rentProduct.title}
                                onChange={handleInputChange}
                                className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-[#6AC128] focus:border-[#6AC128]"
                            />
                        </div>

                        <div className="relative">
                            <label htmlFor="price" className="text-gray-700 text-sm font-medium">
                                Price (₹)
                            </label>
                            <input
                                type="text"
                                name="price"
                                id="price"
                                placeholder="Enter the rental price"
                                value={rentProduct.price}
                                onChange={handleInputChange}
                                className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-[#6AC128] focus:border-[#6AC128]"
                            />
                        </div>

                        <div className="relative">
                            <label htmlFor="category" className="text-gray-700 text-sm font-medium">
                                Category
                            </label>
                            <select
                                name="category"
                                id="category"
                                value={rentProduct.category}
                                onChange={handleCategoryChange}
                                className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-[#6AC128] focus:border-[#6AC128]"
                            >
                                {categoriesData.map((category) => (
                                    <option key={category.name} value={category.name}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="relative">
                            <label htmlFor="productImage" className="text-gray-700 text-sm font-medium">
                                Product Image
                            </label>
                            <input
                                type="file"
                                name="productImage"
                                id="productImage"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-[#6AC128] focus:border-[#6AC128]"
                            />
                        </div>

                        <div className="relative">
                            <label htmlFor="description" className="text-gray-700 text-sm font-medium">
                                Description
                            </label>
                            <textarea
                                name="description"
                                id="description"
                                rows="4"
                                placeholder="Provide a detailed description of the item"
                                value={rentProduct.description}
                                onChange={handleInputChange}
                                className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-[#6AC128] focus:border-[#6AC128]"
                            ></textarea>
                        </div>

                        <div className="text-center">
                            <button
                                onClick={handleListProduct}
                                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#6AC128] hover:bg-[#5aa622] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6AC128]"
                            >
                                List Product
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default RentProduct;
