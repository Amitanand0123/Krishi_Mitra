import React, { useState } from 'react';
import Layout from "../../components/layout/Layout";
import { fireDB, storage } from "../../firebase/FirebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { FaSeedling, FaCloudUploadAlt, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import { auth } from "../../firebase/FirebaseConfig";

const KnowYourSoil = () => {
  const [selectedTests, setSelectedTests] = useState([]);
  const [soilPhoto, setSoilPhoto] = useState(null);
  const [soilType, setSoilType] = useState('');
  const [extraSoilInfo, setExtraSoilInfo] = useState('');
  const [cropInfo, setCropInfo] = useState('');
  const [selectedCenter, setSelectedCenter] = useState('');
  const [manualLocation, setManualLocation] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleTestSelection = (e) => {
    const value = e.target.value;
    setSelectedTests(prev =>
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
    );
  };

  const handleFileChange = (e) => {
    console.log('File selected:', e.target.files[0]);
    setSoilPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Check if user is authenticated
      const user = auth.currentUser;
      if (!user) {
        throw new Error('User must be logged in to submit a booking');
      }

      // Upload the soil photo
      const photoRef = ref(storage, `soil_photos/${soilPhoto.name}`);
      await uploadBytes(photoRef, soilPhoto);
      const photoURL = await getDownloadURL(photoRef);

      // Save the form data
      await addDoc(collection(fireDB, 'soilBookings'), {
        userId: user.uid, // Add the userId here
        selectedTests,
        soilPhotoURL: photoURL,
        soilType,
        extraSoilInfo,
        cropInfo,
        selectedCenter,
        location: manualLocation,
        mobileNumber,
        timestamp: new Date()
      });

      setSuccess(true);
    } catch (err) {
      console.error('Form submission error:', err);
      setError(`Failed to submit the form: ${err.message}`);
    }

    setLoading(false);
  };

  return (
    <Layout>
      <div className="mt-36 bg-gradient-to-br from-green-50 to-green-100 min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-5xl font-extrabold mb-8 text-green-800 text-center">
            <FaSeedling className="inline-block mr-4 text-green-600" />
            Book a Soil Health Test
          </h1>

          <form onSubmit={handleSubmit} className="bg-white shadow-2xl rounded-3xl p-8 space-y-8">
            <section>
              <h2 className="text-3xl font-bold mb-6 text-green-700 border-b-2 border-green-200 pb-2">
                Select Soil Tests
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {['pH', 'Nitrogen', 'Phosphorus', 'Potassium'].map((test) => (
                  <label key={test} className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg transition-all hover:bg-green-100">
                    <input
                      type="checkbox"
                      value={test}
                      onChange={handleTestSelection}
                      className="form-checkbox h-5 w-5 text-green-600 rounded-md"
                    />
                    <span className="text-lg text-green-800">{test}</span>
                  </label>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-6 text-green-700 border-b-2 border-green-200 pb-2">
                Upload Soil Photos
              </h2>
              <div className="flex items-center justify-center w-full">
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-green-300 border-dashed rounded-lg cursor-pointer bg-green-50 hover:bg-green-100">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <FaCloudUploadAlt className="w-10 h-10 mb-3 text-green-600" />
                    <p className="mb-2 text-sm text-green-700"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-green-600">PNG, JPG or GIF (MAX. 800x400px)</p>
                  </div>
                  <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} disabled={loading} />
                </label>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-6 text-green-700 border-b-2 border-green-200 pb-2">
                Soil Information
              </h2>
              <select
                value={soilType}
                onChange={(e) => setSoilType(e.target.value)}
                className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-200 focus:border-green-500"
              >
                <option value="">Select soil type</option>
                {['Sandy', 'Clay', 'Loam', 'Silt', 'Peat', 'Chalk'].map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              {soilType && (
                <textarea
                  value={extraSoilInfo}
                  onChange={(e) => setExtraSoilInfo(e.target.value)}
                  placeholder="Provide extra details about your soil (optional)"
                  className="w-full p-3 mt-4 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-200 focus:border-green-500"
                  rows="4"
                />
              )}
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-6 text-green-700 border-b-2 border-green-200 pb-2">
                Crop Information
              </h2>
              <textarea
                value={cropInfo}
                onChange={(e) => setCropInfo(e.target.value)}
                placeholder="Describe the crops you are growing"
                className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-200 focus:border-green-500"
                rows="4"
              />
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-6 text-green-700 border-b-2 border-green-200 pb-2">
                Select Nearest Soil Testing Center
              </h2>
              <select
                value={selectedCenter}
                onChange={(e) => setSelectedCenter(e.target.value)}
                className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-200 focus:border-green-500"
              >
                <option value="">Select a center</option>
                <option value="Center1">Center 1</option>
                <option value="Center2">Center 2</option>
              </select>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-6 text-green-700 border-b-2 border-green-200 pb-2">
                Location & Contact
              </h2>
              <div className="space-y-4">
                <div className="flex items-center border border-green-300 rounded-lg overflow-hidden">
                  <span className="p-3 bg-green-100 text-green-600">
                    <FaMapMarkerAlt />
                  </span>
                  <input
                    type="text"
                    value={manualLocation}
                    onChange={(e) => setManualLocation(e.target.value)}
                    placeholder="Enter location"
                    className="flex-grow p-3 focus:outline-none"
                  />
                </div>
                <div className="flex items-center border border-green-300 rounded-lg overflow-hidden">
                  <span className="p-3 bg-green-100 text-green-600">
                    <FaPhoneAlt />
                  </span>
                  <input
                    type="tel"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    placeholder="Your mobile number"
                    className="flex-grow p-3 focus:outline-none"
                  />
                </div>
              </div>
            </section>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit Booking'}
            </button>

            {success && <p className="text-green-600 mt-4 text-center font-semibold">Booking submitted successfully!</p>}
            {error && <p className="text-red-600 mt-4 text-center font-semibold">{error}</p>}
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default KnowYourSoil;