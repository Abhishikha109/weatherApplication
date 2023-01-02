import React, {useContext, useEffect, useState} from 'react';
import classes from './weather.module.css';
import {WiHumidity} from '@react-icons/all-files/wi/WiHumidity';
import {BsWind} from 'react-icons/bs';
import {RiSunFill} from '@react-icons/all-files/ri/RiSunFill';
import {IoIosMoon} from '@react-icons/all-files/io/IoIosMoon';
import {WeatherIcon} from '../utils/WeatherIcon';
import {DayImageChange} from '../utils/DayImageChange';
import {TbTemperatureCelsius, TbTemperatureFahrenheit} from 'react-icons/tb';
import WeatherDataContext from '../store/weather-data-context';

const Weather = (props) => {
  const weekDays = {'Sun':'Sun', 'Mon':'Mon', 'Tue':'Tues', 'Wed':'Wednes', 'Thu':'Thurs', 'Fri':'Fri', 'Sat':'Satur'};
  const months = {'01':'Jan', '02':'Feb', '03':'Mar', '04':'Apr', '05':'May', '06':'Jun',
    '07':'Jul', '08':'Aug', '09':'Sep', '10':'Oct', '11':'Nov', '12':'Dec'};
  const [currentTime, setCurrentTime] = useState({date: '', day: '', hours: 0});
  const [bgGif, setBGGif] = useState(undefined); 
  const temperatureChange = useContext(WeatherDataContext);
  const selectedWeatherData = JSON.stringify(temperatureChange.currentDataSelected) === '{}' ? props.todayWeather : temperatureChange.currentDataSelected;
  const actualDay = selectedWeatherData.day;
  let month = '';

  for (const [key, value] of Object.entries(weekDays)) {
    if(key === actualDay){
      selectedWeatherData.day = value;
      break;
    }
  }

  for (const [key, value] of Object.entries(months)) {
    if(key === selectedWeatherData.date?.substr(5).substr(0,2)){
      month = value;
      break;
    }
  }

  const celsiusToFahrenheit = (cTemp) => {
    return Math.round(cTemp * 9 / 5 + 32);
  };

  const toFahrenheitHandler = () => {
    temperatureChange.temperatureConversionToggle(false);
  };

  const toCelsiusHandler = () => {
    temperatureChange.temperatureConversionToggle(true);
  };
  
  const timing = () => {
    const currentDay = Date().toLocaleString();
    const date = new Date();
    const totalHours = date.getHours();
    setCurrentTime({date: currentDay.substr(4,11), day: currentDay.substr(0,4), hours: totalHours});
  };
  
  useEffect(() => {
    timing();
    setBGGif(DayImageChange(currentTime.hours));
  }, [currentTime.hours]);
  
  return <>
    <div className={classes.container}>
      {bgGif}
      <div className={classes.textBlockRight}>
        <h2>{props.cityAddress}</h2>
        <h4>{month + ' ' +selectedWeatherData.date?.substr(8,10) + ', ' + selectedWeatherData.date?.substr(0,4)}</h4>
        <h4>{selectedWeatherData.conditions}</h4>
        <h4>{selectedWeatherData.day + 'day'}</h4>
      </div>
      <table className={classes.textBlockLeft}>
        <tr>
          <th>{WeatherIcon(selectedWeatherData.icon)}</th>
          <th>          {temperatureChange.temperatureChange? <h1>{selectedWeatherData.temp}
            <TbTemperatureCelsius onClick={toCelsiusHandler} style={{cursor: 'pointer', color: 'blue'}}/> | <TbTemperatureFahrenheit onClick={toFahrenheitHandler} style={{cursor: 'pointer'}}/></h1> :
            <h1>{celsiusToFahrenheit(selectedWeatherData.temp)}
              <TbTemperatureCelsius onClick={toCelsiusHandler} style={{cursor: 'pointer'}}/> | <TbTemperatureFahrenheit onClick={toFahrenheitHandler} style={{cursor: 'pointer', color: 'blue'}}/></h1>}</th>
          <th>          <p><WiHumidity/>{selectedWeatherData.humidity} %</p>
            <p><BsWind/> {selectedWeatherData.windspeed} km/hr</p>
            <p><RiSunFill/> {selectedWeatherData.sunrise} am</p>
            <p><IoIosMoon/> {selectedWeatherData.sunset} pm</p></th>
        </tr>
      </table>
    </div>
  </>
};

export default Weather;