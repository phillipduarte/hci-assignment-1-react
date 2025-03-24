import React from 'react';

const HourlyForecast = ({ data, isCelsius }) => {
  if (!data || !data.list || data.list.length === 0) {
    return <div>No hourly forecast available</div>;
  }

  const hourlyData = data.list.slice(0, 5);

  const getWeatherIcon = (description) => {
    if (description.includes('cloud')) {
      return '/assets/cloud.png';
    } else if (description.includes('rain')) {
      return '/assets/rain.png';
    } else if (description.includes('clear')) {
      return '/assets/sun-icon-clipart-xl.png';
    }
    return null;
  };

  return (
    <div className='section'>
      <div className="section-caption">Hourly</div>
      <div className="hourly-forecast">
        {hourlyData.map((hour, index) => (
          <div key={index} className="hour">
            <p className='hour-time'>{new Date(hour.dt * 1000).toLocaleTimeString([], { hour: 'numeric', hour12: true })}</p>
            <p className='hour-temp'>{Math.round(hour.main.temp)}° {isCelsius ? 'C' : 'F'}</p>
            <img
              src={getWeatherIcon(hour.weather[0].description)}
              alt={hour.weather[0].description}
              className="hour-icon"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast;