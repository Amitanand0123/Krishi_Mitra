/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { auth, fireDB, storage } from "../../firebase/FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import toast from "react-hot-toast";
import Loader from "../../components/loader/Loader";

const Signup = () => {
  const context = useContext(myContext);
  const { loading, setLoading } = context;

  const navigate = useNavigate();

  const [userSignup, setUserSignup] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    image: null,
    location: "",
    aadharNumber: "", // Added for Aadhaar number
    governmentIDImage: null, // Added for Government ID image
  });

  // Handle image file change for profile picture
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setUserSignup({
        ...userSignup,
        image: e.target.files[0]
      });
    }
  };

  // Handle government ID image change
  const handleIDImageChange = (e) => {
    if (e.target.files[0]) {
      setUserSignup({
        ...userSignup,
        governmentIDImage: e.target.files[0]
      });
    }
  };

  const userSignupFunction = async () => {
    if (userSignup.name === "" || userSignup.email === "" || userSignup.password === "" || userSignup.location === "" || userSignup.aadharNumber === "") {
      toast.error("All Fields are required");
      return;
    }

    setLoading(true);
    try {
      const users = await createUserWithEmailAndPassword(auth, userSignup.email, userSignup.password);

      let imageURL = "";
      if (userSignup.image) {
        const storageRef = ref(storage, `user_images/${users.user.uid}`);
        await uploadBytes(storageRef, userSignup.image);
        imageURL = await getDownloadURL(storageRef);
      }

      let governmentIDImageURL = "";
      if (userSignup.governmentIDImage) {
        const idStorageRef = ref(storage, `government_ids/${users.user.uid}`);
        await uploadBytes(idStorageRef, userSignup.governmentIDImage);
        governmentIDImageURL = await getDownloadURL(idStorageRef);
      }

      const user = {
        name: userSignup.name,
        email: users.user.email,
        uid: users.user.uid,
        role: userSignup.role,
        imageURL: imageURL,
        aadharNumber: userSignup.aadharNumber, // Store Aadhaar number
        governmentIDImageURL: governmentIDImageURL, // Store Government ID image URL
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      };

      const userRefrence = collection(fireDB, "user");
      await addDoc(userRefrence, user);

      setUserSignup({
        name: "",
        email: "",
        password: "",
        role: "user",
        image: null,
        location: "",
        aadharNumber: "", // Reset Aadhaar number
        governmentIDImage: null, // Reset Government ID image
      });

      toast.success("Signup Successfully");
      setLoading(false);
      navigate('/login');
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-green-50'>
      {loading && <Loader />}
      <div className="signup_form bg-white px-10 py-8 border border-green-100 rounded-xl shadow-lg w-full max-w-md">
        <div className="mb-5 text-center">
          <h2 className='text-3xl font-bold text-green-500 mb-2'>
            Sign Up
          </h2>
          <p className="text-gray-600">Join our community of farmers!</p>
        </div>

        {/* Full Name */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Full Name</label>
          <input
            type="text"
            placeholder='John Doe'
            value={userSignup.name}
            onChange={(e) => setUserSignup({ ...userSignup, name: e.target.value })}
            className='bg-green-50 border border-green-200 px-4 py-2 w-full rounded-md focus:ring-2 focus:ring-green-500 outline-none placeholder-gray-400 transition'
          />
        </div>

        {/* Email Address */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Email Address</label>
          <input
            type="email"
            placeholder='you@example.com'
            value={userSignup.email}
            onChange={(e) => setUserSignup({ ...userSignup, email: e.target.value })}
            className='bg-green-50 border border-green-200 px-4 py-2 w-full rounded-md focus:ring-2 focus:ring-green-500 outline-none placeholder-gray-400 transition'
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Password</label>
          <input
            type="password"
            placeholder='Enter your password'
            value={userSignup.password}
            onChange={(e) => setUserSignup({ ...userSignup, password: e.target.value })}
            className='bg-green-50 border border-green-200 px-4 py-2 w-full rounded-md focus:ring-2 focus:ring-green-500 outline-none placeholder-gray-400 transition'
          />
        </div>

        {/* Location */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Location</label>
          <input
            type="text"
            placeholder='Enter your location'
            value={userSignup.location}
            onChange={(e) => setUserSignup({ ...userSignup, location: e.target.value })}
            className='bg-green-50 border border-green-200 px-4 py-2 w-full rounded-md focus:ring-2 focus:ring-green-500 outline-none placeholder-gray-400 transition'
          />
        </div>

        {/* Aadhaar Number */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Aadhaar Number</label>
          <input
            type="text"
            placeholder='Enter your Aadhaar number'
            value={userSignup.aadharNumber}
            onChange={(e) => setUserSignup({ ...userSignup, aadharNumber: e.target.value })}
            className='bg-green-50 border border-green-200 px-4 py-2 w-full rounded-md focus:ring-2 focus:ring-green-500 outline-none placeholder-gray-400 transition'
          />
        </div>

        {/* Profile Picture */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Profile Picture</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="bg-green-50 border border-green-200 px-4 py-2 w-full rounded-md focus:ring-2 focus:ring-green-500 outline-none transition"
          />
        </div>

        {/* Government ID Upload */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Government ID Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleIDImageChange}
            className="bg-green-50 border border-green-200 px-4 py-2 w-full rounded-md focus:ring-2 focus:ring-green-500 outline-none transition"
          />
        </div>

        {/* Role Selection */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Register As</label>
          <select
            value={userSignup.role}
            onChange={(e) => setUserSignup({ ...userSignup, role: e.target.value })}
            className='bg-green-50 border border-green-200 px-4 py-2 w-full rounded-md focus:ring-2 focus:ring-green-500 outline-none transition'
          >
            <option value="user">Consumer</option>
            <option value="admin">Farmer</option>
          </select>
        </div>

        {/* Signup Button */}
        <div className="mb-4">
          <button
            type='button'
            onClick={userSignupFunction}
            className='bg-green-500 hover:bg-green-600 w-full text-white text-center py-3 font-bold rounded-md shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500'
          >
            Sign Up
          </button>
        </div>

        <div className="text-center">
          Already have an account?{" "}
          <Link to="/login" className='text-green-500 hover:underline'>
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
