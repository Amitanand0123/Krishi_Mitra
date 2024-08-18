import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { fireDB } from '../../firebase/FirebaseConfig';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';

const predefinedTags = [
  'Organic Farming',
  'Sustainable Agriculture',
  'Irrigation',
  'Crop Rotation',
  'Pest Control',
  'Weather Forecast',
  'Market Trends',
];

const AddBlogPage = () => {
  const [title, setTitle] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [imageURL, setImageURL] = useState('');
  const [content, setContent] = useState('');

  const handleTagChange = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleAddBlog = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(fireDB, "blogs"), {
        title,
        tags: selectedTags,
        imageURL,
        content,
        timestamp: serverTimestamp(),
      });
      window.location.href = '/blogpage';
    } catch (error) {
      console.error("Error adding blog: ", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-44 px-4">
        <h1 className="text-center text-3xl font-bold mb-8">Add New Blog</h1>
        <form onSubmit={handleAddBlog} className="max-w-2xl mx-auto">
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Tags</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {predefinedTags.map((tag) => (
                <label key={tag} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-green-500 rounded"
                    checked={selectedTags.includes(tag)}
                    onChange={() => handleTagChange(tag)}
                  />
                  <span className="ml-2 text-gray-700">{tag}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Image URL</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={imageURL}
              onChange={(e) => setImageURL(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Content</label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-40"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          <div className="text-center">
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300" type="submit">
              Submit Blog
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default AddBlogPage;