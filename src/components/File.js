import {useContext, useEffect, useState} from 'react';
import Weather from './weather';
import {Days} from './Days';
import WeatherDataContext from '../store/weather-data-context';

const File = () => {
  const [currentCity, setCurrentCity] = useState(null);
  const [weatherReport, setWeatherReport] = useState({address: '', days: [], currentConditions: {}});
  const weatherData = useContext(WeatherDataContext);
  
  const getLocation = (() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((position) => {
        const latitude = (position.coords.latitude);
        const longitude = (position.coords.longitude);

        fetch(`http://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
          .then((response) =>
            response.json()
          ).then((data) => {
            setCurrentCity(data.address.city);
          }).catch(err => {
            console.error(err);
          });
      });
    }
  });
  
  const getData = () => {
    if(currentCity){
      fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${currentCity}?unitGroup=metric&key=H4TWQN62342CA78ESWC9JJW6A&contentType=json`)
        .then(response => response.json())
        .then((responseData) => {
          weatherData.setAllDays(responseData.days);
          weatherData.setCurrentDayCondition(responseData.currentConditions);
          const currentDay = Date().toLocaleString();
          setWeatherReport({address: responseData.resolvedAddress, days: [...responseData.days], currentConditions: {
            date:responseData.days.at(0).datetime,
            day: currentDay.substr(0,3),
            conditions:responseData.days.at(0).conditions,
            icon:responseData.days.at(0).icon,
            temp:responseData.days.at(0).temp,
            humidity:responseData.days.at(0).humidity,
            windspeed:responseData.days.at(0).windspeed,
            sunrise:responseData.days.at(0).sunrise,
            sunset:responseData.days.at(0).sunset,
          }});
        })
        .catch(err => {
          console.error(err);
        });
    }
  };
  
  useEffect(() => {
    getLocation();
  }, []);
  
  useEffect(() => {
    getData();
  }, [currentCity]);
  
  return <div>
    <Weather cityAddress={weatherReport.address} todayWeather={weatherReport.currentConditions}/>
    <Days days={weatherReport.days} />
  </div>
};

export default File;