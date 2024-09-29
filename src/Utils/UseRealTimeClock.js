import { useState, useEffect } from 'react';

// Function to fetch the timezone from TimeZoneDB
const fetchTimeZone = async (lat, lon) => {
  const apiKeyTwo = process.env.REACT_APP_API_TWO
  const response = await fetch(
    `http://api.timezonedb.com/v2.1/get-time-zone?key=${apiKeyTwo}&format=json&by=position&lat=${lat}&lng=${lon}`
  );
  const data = await response.json();
  return data;
};

// Function to get current time in the provided timezone
const getTimeInTimeZone = (timeZone) => {
  const timeOptions = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: timeZone,
    hour12: false,
  };
  return new Intl.DateTimeFormat('en-US', timeOptions).format(new Date());
};

// Custom Hook to fetch timezone and time when the component mounts
export const UseRealTimeClock = (lat, lon) => {
  const [time, setTime] = useState('');
  const [timeZone, setTimeZone] = useState('');

  useEffect(() => {
    const fetchAndSetTimeZone = async () => {
      if (lat === null || lon === null) {
        setTime(''); // Reset time when lat or lon is null
        setTimeZone(''); // Reset timeZone when lat or lon is null
        return;
      }

      try {
        const timeZoneData = await fetchTimeZone(lat, lon);
        if (timeZoneData.status === 'OK') {
          setTimeZone(timeZoneData.zoneName);
          const currentTime = getTimeInTimeZone(timeZoneData.zoneName);
          setTime(currentTime);
        } else {
          setTime(''); // Handle error by resetting time
          setTimeZone(''); // Handle error by resetting timeZone
        }
      } catch (err) {
        console.error('Error fetching timezone data:', err);
        setTime(''); // Handle error by resetting time
        setTimeZone(''); // Handle error by resetting timeZone
      }
    };

    fetchAndSetTimeZone(); // Fetch timezone when lat and lon change

    const intervalId = setInterval(() => {
      if (timeZone) {
        setTime(getTimeInTimeZone(timeZone)); // Update time every second
      }
    }, 1000);

    // Cleanup interval on component unmount
    return () => {
      clearInterval(intervalId);
    };
  }, [lat, lon, timeZone]); // Runs when lat, lon, or timeZone changes

  return { time, timeZone };
};
