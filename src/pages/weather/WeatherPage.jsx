import { useState, useEffect } from "react";
import axios from "axios";

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
            `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=013fcf8c6986f660703ecbaf2ea8507d
             &units=metric`
          );
          setWeatherData(response.data);
          sendToGeminiAPI(response.data); // Send the data to Gemini API
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
      };

      fetchWeatherData();
    }
  }, [location]);

  // Function to send weather data to Gemini API
  const sendToGeminiAPI = async (data) => {
    try {
      const response = await axios.post("AIzaSyCSYFC1S6Dt_o4DaD2_auVlbyiTqRVHiN4", {
        weather: data,
      });
      setGeminiResponse(response.data);
    } catch (error) {
      console.error("Error sending data to Gemini API:", error);
    }
  };

  return (
    <div className="weather-page">
      <h1>Weather Forecast</h1>

      {error && <p>{error}</p>}

      {weatherData && (
        <div>
          <h2>Current Weather</h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
        </div>
      )}

      {geminiResponse && (
        <div>
          <h2>Gemini Forecast & Suggestions</h2>
          <p>Forecast: {geminiResponse.forecast}</p>
          <p>Suggestions: {geminiResponse.suggestions}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherPage;
