import {useContext, useEffect, useState} from 'react';
import Weather from './Weather';
import {Days} from './Days';
import {days, getCurrentDay, getTemperatureAndHumidity} from '../utils/Date.utils';
import WeatherDataContext from '../store/weather-data-context';
import classes from './File.module.css';
import {CircleLoader} from 'react-spinners';

const File = () => {
  const [currentCity, setCurrentCity] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [weatherReport, setWeatherReport] = useState({address: '', days: [], todayCondition: {}, currentHour: 0});
  const weatherData = useContext(WeatherDataContext);
  
  const sevenDaysDates = (responseData) => {
    let datesSevenDays = ((responseData.days.slice(1, 8).map((day) => {
      return {dateTime: day.datetime, selected: false}
    })));
    datesSevenDays.splice(0, 0, {dateTime: responseData.days.at(0).datetime, selected: true});
    return datesSevenDays;
  };
  
  const prepareTodayConditionData = (responseData) => {
    return {
      date:responseData.datetime,
      day: days.at(getCurrentDay(responseData.datetime)),
      conditions:responseData.conditions,
      icon:responseData.icon,
      temp:responseData.temp,
      humidity:responseData.humidity,
      windspeed:responseData.windspeed,
      sunrise:responseData.sunrise,
      sunset:responseData.sunset,
    }
  };
  
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
          
          weatherData.setAllDays(responseData.days.slice(0, 8));
          weatherData.sevenDaysDateHandler(sevenDaysDates(responseData));

          if(weatherData.currentParameterSelected === 'temperature')
            weatherData.currentDaySelectedTemperatureHandler(getTemperatureAndHumidity(responseData.days.at(0), weatherData.temperatureChange, 'temperature'));
          else if(weatherData.currentParameterSelected === 'humidity')
            weatherData.currentDaySelectedTemperatureHandler(getTemperatureAndHumidity(responseData.days.at(0), weatherData.temperatureChange, 'humidity'));
          else if(weatherData.currentParameterSelected === 'windSpeed')
            weatherData.currentDaySelectedWindSpeedHandler(getTemperatureAndHumidity(responseData.days.at(0), weatherData.temperatureChange, 'windSpeed'));
          
          setWeatherReport({address: responseData.resolvedAddress, 
            days: [...responseData.days], 
            todayCondition: prepareTodayConditionData(responseData.days.at(0)),
            currentHour: responseData.currentConditions.datetime.substr(0,2) - '0',
          });
        })
        .catch(err => {
          console.error(err);
        });
    }
  };
  
  useEffect(() => {
    setIsLoading(true);
    getLocation();
  }, []);
  
  useEffect(() => {
    getData();
    currentCity && weatherReport.address && setIsLoading(false);
  }, [currentCity, weatherReport.address]);
  
  return <div className={classes.container}>
    {isLoading ?
      <div className={classes.loader}>
        <CircleLoader
          color="#36d7b7"
          size={250}
        />
      </div> :
      <table>
        <tbody>
          <tr>
            <td>
              <Weather cityAddress={weatherReport.address} todayWeather={weatherReport.todayCondition} hours={weatherReport.currentHour}/></td>
          </tr>
          <tr>
            <td><Days days={weatherReport.days} /></td>
          </tr>
        </tbody>
      </table>}
  </div>
};

export default File;