import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';

const WeatherPage = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [geminiResponse, setGeminiResponse] = useState(null);
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get user's location
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            });
          },
          (error) => {
            setError("Location access denied. Please allow location access.");
          }
        );
      } else {
        setError("Geolocation is not supported by this browser.");
      }
    };

    getLocation();
  }, []);

  useEffect(() => {
    // Fetch weather data once the location is available
    if (location.lat && location.lon) {
      const fetchWeatherData = async () => {
        try {
          const response = await axios.get(
            `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,cloud_cover,surface_pressure,wind_speed_10m,wind_gusts_10m&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,precipitation_probability,precipitation,cloud_cover,visibility,evapotranspiration,wind_speed_10m,wind_direction_10m,wind_gusts_10m,soil_temperature_0cm,soil_moisture_0_to_1cm,soil_moisture_1_to_3cm&daily=temperature_2m_max,daylight_duration,sunshine_duration,uv_index_max,precipitation_sum,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max&timezone=Asia%2FBangkok`
          );
          setWeatherData(response.data);
          await sendToGeminiAPI(response.data); // Send the data to Gemini API
        } catch (error) {
          console.error("Error fetching weather data:", error);
          setError("Error fetching weather data. Please try again later.");
        }
      };

      fetchWeatherData();
    }
  }, [location]);

  // Function to send weather data to Gemini API
  const sendToGeminiAPI = async (data) => {
    try {
      const response = await axios.post("https://your-gemini-api-endpoint", {
        weather: data,
      });
      setGeminiResponse(response.data);
    } catch (error) {
      console.error("Error sending data to Gemini API:", error);
      setError("Error sending data to Gemini API. Please try again later.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-12 px-4">
        <h1 className="text-center text-4xl font-bold mb-6">Weather Forecast for Farmers</h1>

        {error && <p className="text-red-500 text-center">{error}</p>}

        {weatherData && (
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 className="text-3xl font-semibold mb-4">Current Weather</h2>
            <p className="text-lg mb-2"><strong>Temperature:</strong> {weatherData.current.temperature_2m}°C</p>
            <p className="text-lg mb-2"><strong>Weather Code:</strong> {weatherData.current.weather_code}</p>
            <p className="text-lg mb-2"><strong>Humidity:</strong> {weatherData.current.relative_humidity_2m}%</p>
            <p className="text-lg mb-2"><strong>Wind Speed:</strong> {weatherData.current.wind_speed_10m} km/h</p>
            <p className="text-lg mb-2"><strong>Wind Gusts:</strong> {weatherData.current.wind_gusts_10m} km/h</p>
          </div>
        )}

        {weatherData && weatherData.hourly && weatherData.hourly.time && (
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 className="text-3xl font-semibold mb-4">Hourly Forecast</h2>
            {weatherData.hourly.time.map((time, index) => (
              <div key={index} className="mb-2">
                <p><strong>Time:</strong> {new Date(time).toLocaleTimeString()}</p>
                <p><strong>Temperature:</strong> {weatherData.hourly.temperature_2m[index]}°C</p>
                <p><strong>Humidity:</strong> {weatherData.hourly.relative_humidity_2m[index]}%</p>
                <p><strong>Wind Speed:</strong> {weatherData.hourly.wind_speed_10m[index]} km/h</p>
              </div>
            ))}
          </div>
        )}

        {weatherData && weatherData.daily && weatherData.daily.time && (
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-3xl font-semibold mb-4">Daily Forecast</h2>
            {weatherData.daily.time.map((date, index) => (
              <div key={index} className="mb-2">
                <p><strong>Date:</strong> {date}</p>
                <p><strong>Max Temperature:</strong> {weatherData.daily.temperature_2m_max[index]}°C</p>
                <p><strong>Precipitation:</strong> {weatherData.daily.precipitation_sum[index]} mm</p>
              </div>
            ))}
          </div>
        )}

        {geminiResponse && (
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-3xl font-semibold mb-4">Gemini Forecast & Suggestions</h2>
            <p className="text-lg mb-2"><strong>Forecast:</strong> {geminiResponse.forecast}</p>
            <p className="text-lg mb-2"><strong>Suggestions:</strong> {geminiResponse.suggestions}</p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default WeatherPage;
