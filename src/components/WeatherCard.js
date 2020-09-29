import React, { useState, useEffect } from 'react';
import { Card, CardBody, Spinner } from 'reactstrap';
import SkiGuideApi from '../SkiGuideApi';

const WeatherCard = ({ latitude, longitude }) => {
  const [weather, setWeather] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  
  useEffect(() => {
    const getWeather = async (lat, lng) => {
      try {
        const result = await SkiGuideApi.getWeather(lat, lng)
        setWeather(result.weather);
        setIsLoading(false)
      } catch (err) {
        setIsError(true);
        setIsLoading(false);
      }
    }
    getWeather(latitude, longitude)
  }, [latitude, longitude]);

  if (isLoading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status" />
        <span className="sr-only">Loading...</span>
      </div>
    )
  }

  return (
    <Card className="mt-2">
      <CardBody>
        <h6 className="d-flex justify-content-between">
          <span className="text-capitalize">Today's weather in {weather.name}</span>
          <img className="thumbnail"
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png` || 
            'https://bit.ly/340DhLe'} 
            height="50px" 
            alt={`weather-icon`} 
          />  
        </h6>
      </CardBody>
    </Card>
  )
}

export default WeatherCard;