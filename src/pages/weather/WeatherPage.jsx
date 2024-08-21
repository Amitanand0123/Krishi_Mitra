import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import { FaTemperatureHigh, FaWind, FaTint, FaCloudRain } from 'react-icons/fa';
import { CohereClient } from "cohere-ai";

const cohere = new CohereClient({
  token: import.meta.env.VITE_WEATHER_COHERE_API_KEY,
});

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
          generateAdvice(response.data);
        } catch (error) {
          console.error("Error fetching weather data:", error);
          setError("Error fetching weather data. Please try again later.");
        }
      };

      fetchWeatherData();
    }
  }, [location]);

  const generateAdvice = async (data) => {
    const temperature = data.current.temperature_2m;
    const precipitation = data.current.precipitation;
    const humidity = data.current.relative_humidity_2m;
    const windSpeed = data.current.wind_speed_10m;

    const prompt = `
      Provide a farming advisory message based on the following weather conditions:
      Temperature: ${temperature}°C
      Precipitation: ${precipitation} mm
      Humidity: ${humidity}%
      Wind Speed: ${windSpeed} km/h
    `;

    try {
      const response = await cohere.generate({
        model: 'command',
        prompt: prompt,
        max_tokens: 200,
        temperature: 0.7,
        k: 0,
        p: 0.75,
        frequency_penalty: 0,
        presence_penalty: 0,
        stop_sequences: ["--"],
        return_likelihoods: 'NONE'
      });

      setMessage(response.generations[0].text);
    } catch (error) {
      console.error("Error generating advice:", error);
      setMessage("Error generating advice. Please try again later.");
    }
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
