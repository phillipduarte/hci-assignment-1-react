import React, { useState, useEffect, useCallback } from 'react';
import SearchBar from './components/SearchBar';
import WeatherInfo from './components/WeatherInfo';
import HourlyForecast from './components/HourlyForecast';
import AdditionalInfo from './components/AdditionalInfo';
import NavBar from './components/NavBar';
import Popup from './components/Popup';
import './styles.css';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [isCelsius, setIsCelsius] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('lightblue'); 
  const [query, setQuery] = useState(''); 

  const favoriteCities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'];

  const updateBackgroundColor = (dt, timezone) => {
    const localTime = new Date((dt + timezone) * 1000); 
    const hour = localTime.getUTCHours();
    if (hour >= 6 && hour < 18) {
      setBackgroundColor('#87CEEB'); // Daytime
    } else {
      setBackgroundColor('#001f3f'); // Nighttime
    }
  };

  const fetchWeatherData = useCallback(async (query) => {
    const apiKey = '112945193a161e00b334b0404055b6e0';
    const units = isCelsius ? 'metric' : 'imperial';
    const geoapi = `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`;

    try {
      const geoResponse = await fetch(geoapi);
      const geoData = await geoResponse.json();
      if (geoData.length > 0) {
        const { lat, lon } = geoData[0];

        // Fetch current weather data
        const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`);
        const weatherData = await weatherResponse.json();
        setWeatherData(weatherData);

        // Update background color based on API time
        if (weatherData.dt && weatherData.timezone) {
          updateBackgroundColor(weatherData.dt, weatherData.timezone);
        }

        // Fetch forecast data
        const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`);
        const forecastData = await forecastResponse.json();
        setForecastData(forecastData);
      }
    } catch (error) {
      console.error('Error fetching weather or forecast data:', error);
    }
  }, [isCelsius]);

  useEffect(() => {
    fetchWeatherData('Philadelphia');
  }, [fetchWeatherData]);

  const toggleUnit = () => {
    setIsCelsius(!isCelsius);
  };

  const handleLocationClick = () => {
    setQuery('');
    fetchWeatherData('Philadelphia'); 
  };

  return (
    <div
      className="weather-app"
      style={{ backgroundColor }}
    >
      <SearchBar onSearch={fetchWeatherData} query={query} setQuery={setQuery} />
      {weatherData && <WeatherInfo data={weatherData} isCelsius={isCelsius} />}
      {forecastData && <HourlyForecast data={forecastData} isCelsius={isCelsius} />}
      {weatherData && <AdditionalInfo data={weatherData} hourly={forecastData} />}
      <NavBar
        onFavoritesClick={() => setShowFavorites(true)}
        onSettingsClick={() => setShowSettings(true)}
        onLocationClick={handleLocationClick} // Handle location click
      />
      {showFavorites && (
        <Popup title="Favorites" onClose={() => setShowFavorites(false)}>
          <ul>
            {favoriteCities.map((city, index) => (
              <li key={index}>{city}</li>
            ))}
          </ul>
        </Popup>
      )}
      {showSettings && (
        <Popup title="Settings" onClose={() => setShowSettings(false)}>
          <button onClick={toggleUnit}>Switch to {isCelsius ? 'Fahrenheit' : 'Celsius'}</button>
        </Popup>
      )}
    </div>
  );
};

export default App;