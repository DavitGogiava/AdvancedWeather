import React, { useState, useEffect, useRef } from "react";
import styles from "./LandingPage.module.css";
import Clouds from "../../Assets/Vids/Clouds_1.mp4";
import axios from "axios";
import fetchWeatherData from "../../Utils/WeatherForecast";
import { UseRealTimeClock } from "../../Utils/UseRealTimeClock";

import LeftSection from "../../Components/LeftSection/LeftSection";
import RightSection from "../../Components/RightSection/RightSection";

import Thermometer from "../../Assets/Icons/thermometer.png";
import Search from "../../Assets/Icons/search.png";

const LandingPage = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [coords, setCoords] = useState({ lat: null, lon: null });
  const { time: fetchedTime } = UseRealTimeClock(coords.lat, coords.lon);

  // Ref to track if weather data has already been fetched
  const hasFetchedWeatherData = useRef(false);
  const apiKeyOne = process.env.REACT_APP_API_ONE
  const fetchCitySuggestions = async () => {
    if (city.trim() === "") {
      setError("Please enter a valid city name.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://geocode.maps.co/search?q=${encodeURIComponent(
          city
        )}&api_key=${apiKeyOne}`
      );
      if (response.data.length === 0) {
        setError("No cities found. Please try again.");
      } else {
        setSuggestions(response.data.slice(0, 1));
      }
    } catch (err) {
      setError("Error fetching city suggestions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCoordinatesFetch = (selectedCity) => {
    setSuggestions([]);
    setCoords({ lat: selectedCity.lat, lon: selectedCity.lon });
    setCity(selectedCity.display_name);
    hasFetchedWeatherData.current = false; // Reset the ref when a new city is selected
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
        setLoading(true);
        setError(null);
        try {
          const data = await fetchWeatherData(
            fetchedTime,
            coords.lat,
            coords.lon
          );
          console.log(data);
          data.city = city;
          setWeatherData(data);
          hasFetchedWeatherData.current = true; // Set to true after fetching
        } catch (err) {
          setError(err.message);
          console.log(err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchWeatherDataAndUpdate();
  }, [fetchedTime, coords, city]); // Only react to changes in these dependencies

  return (
    <div className={styles.LandingPageWrapper}>
      <div className={styles.LandingPageContainer}>
        <video
          src={Clouds}
          autoPlay
          muted
          loop
          className={styles.Video}
        ></video>
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

              {loading && <p>Loading...</p>}
              {error && <p className={styles.error}>{error}</p>}
              {suggestions.length > 0 && (
                <ul className={styles.suggestionsList}>
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
            <LeftSection weatherData={weatherData} />
          </div>
        </div>
        <RightSection weatherData={weatherData} />
      </div>
    </div>
  );
};

export default LandingPage;
