import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { fireDB } from '../../firebase/FirebaseConfig';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';

const Blog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      const blogDoc = await getDoc(doc(fireDB, "blogs", id));
      if (blogDoc.exists()) {
        setBlog({ id: blogDoc.id, ...blogDoc.data() });
      } else {
        console.error("Blog not found");
      }
    };
    fetchBlog();
  }, [id]);

  const formatDate = (timestamp) => {
    if (!timestamp || !timestamp.toDate) return 'Date unavailable';
    const date = timestamp.toDate();
    return date.toLocaleDateString("en-US", {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-44 px-4">
        {/* Blog Title */}
        <h1 className="text-4xl font-bold text-center mb-6">{blog.title}</h1>

        {/* Blog Image */}
        {blog.imageURL && (
          <img
            alt="blog"
            className="w-full max-w-3xl h-auto object-cover rounded-lg shadow-lg mb-6 mx-auto"
            src={blog.imageURL}
          />
        )}

        {/* Author Info and Date */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            {blog.authorImageURL && (
              <img
                alt="author"
                className="w-12 h-12 rounded-full mr-4"
                src={blog.authorImageURL}
              />
            )}
            {blog.authorName && (
              <span className="text-xl font-semibold text-gray-700">
                {blog.authorName}
              </span>
            )}
          </div>
          {blog.timestamp && (
            <span className="text-gray-500 text-md">
              Published on: {formatDate(blog.timestamp)}
            </span>
          )}
        </div>

        {/* Blog Content */}
        <div className="text-lg text-gray-700 leading-relaxed">
          {blog.content}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Blog;
