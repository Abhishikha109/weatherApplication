import {AFTERNOON_GIF, EVENING_GIF, MORNING_GIF, NIGHT_GIF} from '../constants/Urls';
import React, {useEffect, useState} from 'react';
import Image from '../ui/Image';
import classes from './weather.module.css';

const Weather = () => {
  const [currentTime, setCurrentTime] = useState({date: '', day: '', hours: 0});
  const [bgGif, setBGGif] = useState(undefined); 
  
  const timing = () => {
    const currentDay = Date().toLocaleString();
    const date = new Date();
    const totalHours = date.getHours();
    setCurrentTime({date: currentDay.substr(4,11), day: currentDay.substr(0,4), hours: 7});
  };
  
  useEffect(() => {
    timing();
    switch (true) {
    case currentTime.hours >=0 && currentTime.hours <= 6:
      setBGGif(
        <Image source={MORNING_GIF} alternate="MORNING_GIF"/>
      );
      break;
    case currentTime.hours > 6 && currentTime.hours <= 12:
      setBGGif(
        <Image source={AFTERNOON_GIF} alternate="AFTERNOON_GIF"/>
      );
      break;
    case currentTime.hours > 12 && currentTime.hours <= 16:
      setBGGif(
        <Image source={EVENING_GIF} alternate="EVENING_GIF"/>
      );
      break;
    case currentTime.hours > 16 && currentTime.hours <= 24:
      setBGGif(
        <Image source={NIGHT_GIF} alternate="NIGHT_GIF"/>
      );
      break;
    default:
      setBGGif(
        <Image source={MORNING_GIF} alternate="MORNING_GIF"/>
      );
      break;
    }
  }, [currentTime.hours]);
  
  return <>
    <div className={classes.container}>
      {bgGif}
      <div className={classes.textBlock}>
        <h4>{currentTime.date}</h4>
        <p>{currentTime.day}</p>
      </div>
    </div>
  </>
};

export default Weather;