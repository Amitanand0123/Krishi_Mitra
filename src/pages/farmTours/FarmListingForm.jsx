// src/components/FarmListingForm.js
import React, { useState } from 'react';
import { firestore, storage } from '../firebase/config';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const FarmListingForm = () => {
  const [farmName, setFarmName] = useState('');
  const [farmArea, setFarmArea] = useState('');
  const [farmDescription, setFarmDescription] = useState('');
  const [crops, setCrops] = useState('');
  const [availabilityStart, setAvailabilityStart] = useState('');
  const [availabilityEnd, setAvailabilityEnd] = useState('');
  const [farmImage, setFarmImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Upload the farm image
      const imageRef = ref(storage, `farm_images/${farmImage.name}`);
      await uploadBytes(imageRef, farmImage);
      const imageUrl = await getDownloadURL(imageRef);

      // Save the farm listing to Firestore
      await addDoc(collection(firestore, 'farmListings'), {
        farmName,
        farmArea,
        farmDescription,
        crops,
        availabilityStart,
        availabilityEnd,
        imageUrl,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });

      // Reset the form
      setFarmName('');
      setFarmArea('');
      setFarmDescription('');
      setCrops('');
      setAvailabilityStart('');
      setAvailabilityEnd('');
      setFarmImage(null);
    } catch (error) {
      console.error('Error submitting farm listing:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    setFarmImage(e.target.files[0]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Farm Name"
        value={farmName}
        onChange={(e) => setFarmName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Farm Area (in acres)"
        value={farmArea}
        onChange={(e) => setFarmArea(e.target.value)}
        required
      />
      <textarea
        placeholder="Farm Description"
        value={farmDescription}
        onChange={(e) => setFarmDescription(e.target.value)}
        required
      ></textarea>
      <input
        type="text"
        placeholder="Crops Grown"
        value={crops}
        onChange={(e) => setCrops(e.target.value)}
        required
      />
      <input
        type="month"
        placeholder="Availability Start"
        value={availabilityStart}
        onChange={(e) => setAvailabilityStart(e.target.value)}
        required
      />
      <input
        type="month"
        placeholder="Availability End"
        value={availabilityEnd}
        onChange={(e) => setAvailabilityEnd(e.target.value)}
        required
      />
      <input type="file" onChange={handleImageChange} required />
      <button type="submit" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit Listing'}
      </button>
    </form>
  );
};

export default FarmListingForm;