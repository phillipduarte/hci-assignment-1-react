import React from 'react';

const AdditionalInfo = ({ data, hourly }) => {
  if (!data || !hourly || hourly.length === 0) {
    return <div>No additional information available</div>;
  }

  console.log(data);
  console.log(hourly);

  const precipitation = hourly.list[0]?.pop ? hourly.list[0].pop * 100 : 0;
  const windSpeed = data?.wind?.speed ? Math.round(data.wind.speed) : 0;
  const windGust = data?.wind?.gust ? Math.round(data.wind.gust) : 0;
  const windDirection = data?.wind?.deg || 0;

  // Check for next rain event
  let nextRain = null;
  for (let i = 0; i < hourly.list.length; i++) {
    if (hourly.list[i].pop > 0) {
      nextRain = hourly.list[i];
      break;
    }
  }

  // Format the next rain time
  let precipitationText = 'All Clear!';
  if (nextRain) {
    const nextRainTime = new Date((nextRain.dt + data.timezone) * 1000);
    const nextRainHours = nextRainTime.getUTCHours();
    const nextRainAmpm = nextRainHours >= 12 ? 'PM' : 'AM';
    const nextRainFormatted = nextRainHours % 12 || 12;
    precipitationText = `Next rain at ${nextRainFormatted} ${nextRainAmpm}`;
  }

  return (
    <div className="additional-info">
      <div className="section">
        <div className="section-caption">Precipitation</div>
        <div className="precipitation">
          <span>{precipitation}%</span>
          <div>{precipitationText}</div> {/* Display next rain time or "All Clear!" */}
        </div>
      </div>
      <div className="section">
        <div className="section-caption">Wind</div>
        <div className="wind">
          <div className="wind-info">
            <span>Wind</span>
            <p>{windSpeed} mph</p>
            <span>Gusts</span>
            <p className="gusts">{windGust} mph</p>
          </div>
          <div>
            <img
              src="/assets/compass.png"
              alt="Wind Direction"
              className="wind-icon"
              style={{ transform: `rotate(${windDirection}deg)` }}
            />
            <p>{getWindDirectionText(windDirection)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const getWindDirectionText = (degree) => {
  if (degree > 337.5 || degree <= 22.5) return 'N';
  if (degree > 22.5 && degree <= 67.5) return 'NE';
  if (degree > 67.5 && degree <= 112.5) return 'E';
  if (degree > 112.5 && degree <= 157.5) return 'SE';
  if (degree > 157.5 && degree <= 202.5) return 'S';
  if (degree > 202.5 && degree <= 247.5) return 'SW';
  if (degree > 247.5 && degree <= 292.5) return 'W';
  if (degree > 292.5 && degree <= 337.5) return 'NW';
};

export default AdditionalInfo;