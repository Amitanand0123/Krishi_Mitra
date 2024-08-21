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

  // navigate 
  const navigate = useNavigate();

  // User Signup State 
  const [userSignup, setUserSignup] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    image: null,
  });

  // Handle image file change
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setUserSignup({
        ...userSignup,
        image: e.target.files[0]
      });
    }
  };

  /**========================================================================
   *                          User Signup Function 
  *========================================================================**/
  const userSignupFunction = async () => {
    // validation 
    if (userSignup.name === "" || userSignup.email === "" || userSignup.password === "") {
      toast.error("All Fields are required");
      return;
    }

    setLoading(true);
    try {
      const users = await createUserWithEmailAndPassword(auth, userSignup.email, userSignup.password);

      // If an image is uploaded, store it in Firebase Storage
      let imageURL = "";
      if (userSignup.image) {
        const storageRef = ref(storage, `user_images/${users.user.uid}`);
        await uploadBytes(storageRef, userSignup.image);
        imageURL = await getDownloadURL(storageRef);
      }

      // create user object
      const user = {
        name: userSignup.name,
        email: users.user.email,
        uid: users.user.uid,
        role: userSignup.role,
        imageURL: imageURL,  // Add imageURL to the user object
        time: Timestamp.now(),
        date: new Date().toLocaleString(
          "en-US",
          {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }
        )
      }

      // create user reference
      const userRefrence = collection(fireDB, "user");

      // Add User Detail
      await addDoc(userRefrence, user);

      setUserSignup({
        name: "",
        email: "",
        password: "",
        image: null
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

        {/* Image Upload */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Profile Picture</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
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
          <p className='text-gray-600'>
            Already have an account? <Link className='text-green-500 font-bold' to={'/login'}>Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
