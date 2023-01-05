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
import {weekDays, months} from '../utils/getDayFromDate';
import LineChart from './LineChart';
import {celsiusToFahrenheit} from '../utils/getDayFromDate';

const Weather = (props) => {
  const [currentTime, setCurrentTime] = useState({hours: 0});
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

  const toFahrenheitHandler = () => {
    temperatureChange.temperatureConversionToggle(false);
  };

  const toCelsiusHandler = () => {
    temperatureChange.temperatureConversionToggle(true);
  };
  
  const timing = () => {
    setCurrentTime({hours: selectedWeatherData.hours});
  };
  
  useEffect(() => {
    timing();
    setBGGif(DayImageChange(currentTime.hours));
  }, [currentTime.hours]);
  
  return <>
    {bgGif}
    <div className={classes.textBlockRight}>
      <h2>{props.cityAddress}</h2>
      <h4>{month + ' ' +selectedWeatherData.date?.substr(8,10) + ', ' + selectedWeatherData.date?.substr(0,4)}</h4>
      <h4>{selectedWeatherData.conditions}</h4>
      <h4>{selectedWeatherData.day + 'day'}</h4>
    </div>
    <table className={classes.textBlockLeft}>
      <tbody>
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
      </tbody>
    </table>
    
    <table>
      <tbody>
        <tr>
          <td className={classes.box}>
            <LineChart/>
          </td>
        </tr>
      </tbody>
    </table>
  </>
};

export default Weather;