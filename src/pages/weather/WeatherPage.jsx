import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import { FaTemperatureHigh, FaWind, FaTint, FaCloudRain } from 'react-icons/fa';

const WeatherPage = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [message, setMessage] = useState("");
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [error, setError] = useState(null);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            });
          },
          () => {
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
    if (location.lat && location.lon) {
      const fetchWeatherData = async () => {
        try {
          const response = await axios.get(
            `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m,weather_code&timezone=Asia%2FBangkok`
          );
          setWeatherData(response.data);
          generateMessage(response.data);
        } catch (error) {
          console.error("Error fetching weather data:", error);
          setError("Error fetching weather data. Please try again later.");
        }
      };

      fetchWeatherData();
    }
  }, [location]);

  const generateMessage = (data) => {
    const temperature = data.current.temperature_2m;
    const precipitation = data.current.precipitation;
    const humidity = data.current.relative_humidity_2m;
    const windSpeed = data.current.wind_speed_10m;
    let message = '';
  
    // High temperature, low precipitation, and moderate humidity
    if (temperature > 35 && precipitation < 2 && humidity < 60) {
      message += "🔥 It's a blazing hot day with little chance of rain. Make sure to irrigate your crops in the early morning or late evening to prevent evaporation losses. Consider using mulch to retain soil moisture. ";
    }
  
    // High temperature with high humidity
    if (temperature > 35 && humidity > 80) {
      message += "🥵 It's a hot and humid day! Your crops might be at risk of heat stress and fungal infections. Ensure proper ventilation in greenhouses and monitor your crops closely. ";
    }
  
    // Heavy rainfall with high humidity
    if (precipitation > 10 && humidity > 80) {
      message += "🌧️🌫️ Expect heavy rain coupled with high humidity. This could create perfect conditions for fungal growth. Check your drainage systems and consider using fungicides to protect your crops. ";
    }
  
    // High wind speed with dry conditions
    if (windSpeed > 20 && precipitation < 1) {
      message += "💨 The winds are strong today, and the air is dry. Secure any loose tools, and ensure your plants are well-anchored to prevent damage. Dust levels may be higher, so consider covering delicate plants. ";
    }
  
    // Mild weather conditions
    if (temperature < 30 && precipitation < 5 && windSpeed < 15 && humidity < 70) {
      message += "🌤️ The weather today is ideal for farming! With moderate temperatures and calm winds, it's a perfect time to carry out routine tasks or consider planting new crops. ";
    }
  
    // Catch-all for favorable weather
    if (!message) {
      message = "🌿 The weather is looking good for farming! Take advantage of these favorable conditions to tend to your crops and prepare for the coming days.";
    }
  
    setMessage(message);
  };


  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-12 px-4">
        <h1 className="text-center text-4xl font-bold mb-6">Weather Forecast for Farmers</h1>

        {error && <p className="text-red-500 text-center">{error}</p>}

        {weatherData && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white shadow-md rounded-lg p-6 flex items-center">
              <FaTemperatureHigh className="text-4xl text-blue-500 mr-4" />
              <div>
                <h2 className="text-xl font-semibold">Temperature</h2>
                <p className="text-lg">{weatherData.current.temperature_2m}°C</p>
              </div>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6 flex items-center">
              <FaCloudRain className="text-4xl text-blue-500 mr-4" />
              <div>
                <h2 className="text-xl font-semibold">Precipitation</h2>
                <p className="text-lg">{weatherData.current.precipitation} mm</p>
              </div>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6 flex items-center">
              <FaTint className="text-4xl text-blue-500 mr-4" />
              <div>
                <h2 className="text-xl font-semibold">Humidity</h2>
                <p className="text-lg">{weatherData.current.relative_humidity_2m}%</p>
              </div>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6 flex items-center">
              <FaWind className="text-4xl text-blue-500 mr-4" />
              <div>
                <h2 className="text-xl font-semibold">Wind Speed</h2>
                <p className="text-lg">{weatherData.current.wind_speed_10m} km/h</p>
              </div>
            </div>
          </div>
        )}

        {message && (
          <div className="bg-green-100 shadow-md rounded-lg p-6 mt-6">
            <h2 className="text-3xl font-semibold mb-4 text-green-800">Farmer's Advisory</h2>
            <p className="text-lg text-green-700 font-light">{message}</p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default WeatherPage;
