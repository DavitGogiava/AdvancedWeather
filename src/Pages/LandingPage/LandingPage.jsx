import React, { useState, useEffect, useRef } from "react";
import styles from "./LandingPage.module.css";
import axios from "axios";
import fetchWeatherData from "../../Utils/WeatherForecast";
import { UseRealTimeClock } from "../../Utils/UseRealTimeClock";

import LeftSection from "../../Components/LeftSection/LeftSection";
import RightSection from "../../Components/RightSection/RightSection";

import Thermometer from "../../Assets/Icons/thermometer.png";
import Search from "../../Assets/Icons/search.png";

import { getWeatherVideo } from "../../Utils/WeatherVideoMapper";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LandingPage = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [coords, setCoords] = useState({ lat: null, lon: null });
  const { time: fetchedTime } = UseRealTimeClock(coords.lat, coords.lon);

  const hasFetchedWeatherData = useRef(false);
  const apiKeyOne = process.env.REACT_APP_API_ONE;

  const suggestionsRef = useRef(null);


  const fetchCitySuggestions = async () => {
    if (city.trim() === "") {
      setError("Please enter a valid city name.");
      return;
    }

    setError(null);

    try {
      setIsRefreshing(true);
      const response = await axios.get(
        `https://geocode.maps.co/search?q=${encodeURIComponent(
          city
        )}&api_key=${apiKeyOne}`
      );
      if (response.data.length === 0) {
        toast.error("No suggestions found for this city."); // Show toast notification for no suggestions
        return;
      } else {
        setSuggestions(response.data.slice(0, 1));
      }
    } catch (err) {
      setError("Error fetching city suggestions. Please try again.");
    } finally {
      setIsRefreshing(false); // Reset isRefreshing after fetching
    }
  };

  const handleCoordinatesFetch = (selectedCity) => {
    setSuggestions([]);
    setCoords({ lat: selectedCity.lat, lon: selectedCity.lon });
    setCity(selectedCity.display_name);
    hasFetchedWeatherData.current = false; // Reset weather data fetch flag when a new city is selected
  };

  // Effect to fetch weather data when time is available and only once
  useEffect(() => {
    const fetchWeatherDataAndUpdate = async () => {
      if (
        fetchedTime &&
        coords.lat &&
        coords.lon &&
        !hasFetchedWeatherData.current
      ) {
        setError(null);
        try {
          const data = await fetchWeatherData(
            fetchedTime,
            coords.lat,
            coords.lon
          );
          setLoading(true);
          data.city = city;
          setWeatherData(data);
          hasFetchedWeatherData.current = true; // Set to true after fetching
        } catch (err) {
          setError(err.message);
        } finally {
          console.log("finished");
          setLoading(false); // Loading ends after weather data is fetched
        }
      }
    };

    fetchWeatherDataAndUpdate();
  }, [fetchedTime, coords, city]);


  // Handle click outside suggestions list
  const handleClickOutside = (event) => {
    if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
      setSuggestions([]); // Clear suggestions when clicking outside
    }
  };

  useEffect(() => {
    // Add event listener for clicks
    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      // Cleanup the event listener on component unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  // Show loader until the weather data is fetched and video is fully loaded
  const isLoading = loading || isRefreshing;

  return (
    <div className={styles.LandingPageWrapper}>
      <div className={styles.LandingPageContainer}>
        {weatherData && (
          <video
            src={getWeatherVideo(
              weatherData.currentWeatherCode,
              weatherData.isDay
            )}
            autoPlay
            muted
            loop
            className={styles.Video}
          ></video>
        )}

        <div className={styles.LeftSection}>
          <div className={styles.LeftSectionContainer}>
            <div className={styles.inputContainer}>
              <img src={Thermometer} alt="" className={styles.searchIcon} />
              <img
                src={Search}
                alt=""
                className={styles.searchIcon}
                onClick={fetchCitySuggestions}
              />
              <input
                type="text"
                placeholder="Enter city name"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className={styles.countryInput}
              />
              {error && <p className={styles.error}>{error}</p>}
              {suggestions.length > 0 && (
                <ul className={styles.suggestionsList} ref={suggestionsRef}>
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      onClick={() => handleCoordinatesFetch(suggestion)}
                      className={styles.suggestionItem}
                    >
                      {suggestion.display_name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <LeftSection weatherData={weatherData} isLoading={isLoading} />
          </div>
        </div>
        <RightSection weatherData={weatherData} isLoading={isLoading} />
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default LandingPage;
