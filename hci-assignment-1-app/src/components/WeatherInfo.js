import React from 'react';

const WeatherInfo = ({ data, isCelsius }) => {
  const temp = Math.round(data.main.temp);
  const weatherCondition = data.weather[0].main.toLowerCase();

  const localTime = new Date((data.dt + data.timezone) * 1000);
  const hour = localTime.getUTCHours();
  const isDaytime = hour >= 6 && hour < 18;

  // Select the appropriate icon
  const icon = isDaytime
    ? weatherCondition.includes('cloud')
      ? 'cloud.png'
      : weatherCondition.includes('rain')
      ? 'rain.png'
      : 'sun-icon-clipart-xl.png'
    : 'white_moon.png';

  return (
    <div className="weather-info">
      <div>
        <img src={`/assets/${icon}`} alt="logo" className="sun-logo" />
      </div>
      <div className="feels-like">Feels like</div>
      <div className="temp">{temp}°{isCelsius ? 'C' : 'F'}</div>
    </div>
  );
};

export default WeatherInfo;