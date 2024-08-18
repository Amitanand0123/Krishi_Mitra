import React, { useState } from 'react';
import Layout from "../../components/layout/Layout";
import { storage, fireDB } from "../../firebase/FirebaseConfig";

const KnowYourSoil = () => {
  const [selectedTests, setSelectedTests] = useState([]);
  const [soilPhoto, setSoilPhoto] = useState(null);
  const [soilInfo, setSoilInfo] = useState('');
  const [cropInfo, setCropInfo] = useState('');
  const [selectedCenter, setSelectedCenter] = useState('');
  const [location, setLocation] = useState('');
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
    setSoilPhoto(e.target.files[0]);
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=YOUR_GOOGLE_MAPS_API_KEY`);
            const data = await response.json();

            if (data.results && data.results.length > 0) {
              setLocation(data.results[0].formatted_address);
              setManualLocation('');
            } else {
              setError('Unable to retrieve address from coordinates.');
            }
          } catch (error) {
            setError('Error fetching the location. Please try again.');
          }
        },
        (error) => {
          setError('Unable to retrieve your location.');
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Upload the soil photo
      const photoRef = storage.ref().child(`soil_photos/${soilPhoto.name}`);
      await photoRef.put(soilPhoto);
      const photoURL = await photoRef.getDownloadURL();

      // Save the form data
      await fireDB.collection('soilBookings').add({
        selectedTests,
        soilPhotoURL: photoURL,
        soilInfo,
        cropInfo,
        selectedCenter,
        location: location || manualLocation,
        mobileNumber,
        timestamp: new Date()
      });

      setSuccess(true);
    } catch (err) {
      setError('Failed to submit the form. Please try again.');
    }

    setLoading(false);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6 text-green-700">Book a Soil Health Test</h1>

        <form onSubmit={handleSubmit} className="bg-green-50 shadow-md rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-4 text-green-600">Select Soil Tests</h2>
          <div className="flex flex-col mb-6">
            <label className="flex items-center mb-2">
              <input
                type="checkbox"
                value="pH"
                onChange={handleTestSelection}
                className="form-checkbox h-5 w-5 text-green-600"
              />
              <span className="ml-2">Soil pH</span>
            </label>
            <label className="flex items-center mb-2">
              <input
                type="checkbox"
                value="Nitrogen"
                onChange={handleTestSelection}
                className="form-checkbox h-5 w-5 text-green-600"
              />
              <span className="ml-2">Nitrogen</span>
            </label>
            <label className="flex items-center mb-2">
              <input
                type="checkbox"
                value="Phosphorus"
                onChange={handleTestSelection}
                className="form-checkbox h-5 w-5 text-green-600"
              />
              <span className="ml-2">Phosphorus</span>
            </label>
            <label className="flex items-center mb-2">
              <input
                type="checkbox"
                value="Potassium"
                onChange={handleTestSelection}
                className="form-checkbox h-5 w-5 text-green-600"
              />
              <span className="ml-2">Potassium</span>
            </label>
            {/* Add more tests as needed */}
          </div>

          <h2 className="text-2xl font-semibold mt-6 mb-4 text-green-600">Upload Soil Photos</h2>
          <input
            type="file"
            onChange={handleFileChange}
            className="mb-4 p-2 border border-gray-300 rounded w-full"
          />

          <h2 className="text-2xl font-semibold mt-6 mb-4 text-green-600">Soil Information</h2>
          <textarea
            value={soilInfo}
            onChange={(e) => setSoilInfo(e.target.value)}
            placeholder="Provide details about your soil"
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />

          <h2 className="text-2xl font-semibold mt-6 mb-4 text-green-600">Crop Information</h2>
          <textarea
            value={cropInfo}
            onChange={(e) => setCropInfo(e.target.value)}
            placeholder="Describe the crops you are growing"
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />

          <h2 className="text-2xl font-semibold mt-6 mb-4 text-green-600">Select Nearest Soil Testing Center</h2>
          <select
            value={selectedCenter}
            onChange={(e) => setSelectedCenter(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          >
            <option value="">Select a center</option>
            {/* Populate options dynamically */}
            <option value="Center1">Center 1</option>
            <option value="Center2">Center 2</option>
          </select>

          <h2 className="text-2xl font-semibold mt-6 mb-4 text-green-600">Location & Contact</h2>
          <div className="flex items-center justify-between mb-4">
            <input
              type="text"
              value={manualLocation}
              onChange={(e) => setManualLocation(e.target.value)}
              placeholder="Enter location manually"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <button
              type="button"
              onClick={handleCurrentLocation}
              className="bg-green-600 hover:bg-green-700 h-10 text-white font-bold text-sm py-1 px-3 rounded ml-4"
            >
              Current Location
            </button>
          </div>
          <input
            type="tel"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            placeholder="Your mobile number"
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Booking'}
          </button>

          {success && <p className="text-green-600 mt-4">Booking submitted successfully!</p>}
          {error && <p className="text-red-600 mt-4">{error}</p>}
        </form>
      </div>
    </Layout>
  );
};

export default KnowYourSoil;
