import {useEffect, useState, useCallback} from 'react';
import Dropdown from './Dropdown';
import {CLEAR_DAY_IMG, CLEAR_NIGHT_IMG, CLOUDY_IMG, PARTLY_CLOUDY_DAY, PARTLY_CLOUDY_NIGHT} from '../constants/Urls';
import HourlyWeatherReport from './HourlyWeatherReport';
const File = () => {
  const [currentCity, setCurrentCity] = useState(null);
  const [weatherReport, setWeatherReport] = useState({address: '', days: [], currentConditions: {}});
  
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
          setWeatherReport({address: responseData.resolvedAddress, days: [...responseData.days], currentConditions: responseData.currentConditions});
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
  
  return <>
    {/*<img src={CLOUDY_IMG} alt="cloudy"/><br/>*/}
    {/*<img src={CLEAR_DAY_IMG} alt="clear-day"/><br/>*/}
    {/*<img src={CLEAR_NIGHT_IMG} height='35' width='35' alt="clear-night" /><br/>*/}
    {/*<img src={PARTLY_CLOUDY_NIGHT} height='35' width='44' alt="partly-cloudy-night"/><br/>*/}
    {/*<img src={PARTLY_CLOUDY_DAY} alt="partly-cloudy-day"/><br/>*/}
    <p>{currentCity}</p>
    <p>{weatherReport.address}</p>
    <HourlyWeatherReport cityAddress={weatherReport.address} days={weatherReport.days} todayWeather={weatherReport.currentConditions}/>
  </>
};

export default File;