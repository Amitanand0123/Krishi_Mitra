import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { fireDB } from '../../firebase/FirebaseConfig';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import { useNavigate } from 'react-router-dom';

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const user = JSON.parse(localStorage.getItem('users'));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      const querySnapshot = await getDocs(collection(fireDB, "blogs"));
      setBlogs(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchBlogs();
  }, []);

  const formatDate = (timestamp) => {
    if (!timestamp || !timestamp.toDate) return 'Date unavailable';
    const date = timestamp.toDate();
    return date.toLocaleDateString("en-US", {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleAddBlog = () => {
    if (user) {
      navigate('/add-blog');
    } else {
      navigate('/login');
    }
  };

  const handleBlogClick = (id) => {
    navigate(`/blog/${id}`);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-30 px-4">
        <h1 className="text-center text-3xl font-bold mb-6">Farm Blogs</h1>
        <h2 className=' text-center text-2xl font-semibold mb-10' > Listen to the <span className=' text-green-500'>tricks and tips</span> of our <span className=' text-green-500'>users</span> .</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map(blog => (
            <div
              key={blog.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col cursor-pointer"
              onClick={() => handleBlogClick(blog.id)}
            >
              {blog.imageURL && (
                <img alt="blog" className="w-full h-48 object-cover" src={blog.imageURL} />
              )}
              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-2xl font-bold mb-2">{blog.title}</h2>
                <p className="text-gray-700 text-base mb-4">{blog.content.substring(0, 150)}...</p>
              </div>
              <div className="bg-white p-4 flex items-center justify-between mb-3">
                <div className="flex items-center">
                  {blog.authorImageURL && (
                    <img
                      alt="author"
                      className="w-8 h-8 rounded-full mr-3"
                      src={blog.authorImageURL}
                    />
                  )}
                  {blog.authorName && (
                    <span className="text-gray-700 font-semibold">
                      {blog.authorName}
                    </span>
                  )}
                </div>
                {blog.timestamp && (
                  <span className="text-gray-500 text-sm">
                    {formatDate(blog.timestamp)}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
            onClick={handleAddBlog}
          >
            Add New Blog
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BlogPage;
