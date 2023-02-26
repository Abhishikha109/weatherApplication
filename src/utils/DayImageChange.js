import {AFTERNOON_GIF, EVENING_GIF, MORNING_GIF, NIGHT_GIF} from '../constants/Urls';
import Image from '../ui/Image';
import React from 'react';

export const DayImageChange = (hours) => {
  let image;
  switch (true) {
  case hours >3 && hours <= 9:
    image = <Image source={MORNING_GIF} alternate="MORNING_GIF"/>
    break;
  case hours > 9 && hours <= 15:
    image = <Image source={AFTERNOON_GIF} alternate="AFTERNOON_GIF"/>
    break;
  case hours > 15 && hours <= 21:
    image = <Image source={EVENING_GIF} alternate="EVENING_GIF"/>
    break;
  case hours > 21 && hours <= 24 || hours >=0 && hours <= 3:
    image = <Image source={NIGHT_GIF} alternate="NIGHT_GIF"/>
    break;
  default:
    image = <Image source={MORNING_GIF} alternate="MORNING_GIF"/>
    break;
  }
  return image;
}