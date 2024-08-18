import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { fireDB } from '../../firebase/FirebaseConfig';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);

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
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-44 px-4">
        <h1 className="text-center text-3xl font-bold mb-8">Farm Blogs</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map(blog => (
            <div key={blog.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
              {blog.imageURL && (
                <img alt="blog" className="w-full h-48 object-cover" src={blog.imageURL} />
              )}
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">{blog.title}</h2>
                <p className="text-gray-700 text-base mb-4">{blog.content.substring(0, 150)}...</p>
                <div className="flex flex-wrap mb-4">
                  {blog.tags && blog.tags.map(tag => (
                    <span key={tag} className="bg-green-100 text-green-800 text-xs font-semibold mr-2 mb-2 px-2.5 py-0.5 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                {blog.timestamp && (
                  <p className="text-gray-500 text-sm">
                    Posted on: {formatDate(blog.timestamp)}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
            onClick={() => window.location.href = '/add-blog'}
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