import Image from '../ui/Image';
import {AFTERNOON_GIF, EVENING_GIF, MORNING_GIF, NIGHT_GIF} from '../constants/Urls';
import React from 'react';

export const DayImageChange = (hours) => {
  let image;
  switch (true) {
  case hours >=0 && hours <= 6:
    image = <Image source={MORNING_GIF} alternate="MORNING_GIF"/>
    break;
  case hours > 6 && hours <= 12:
    image = <Image source={AFTERNOON_GIF} alternate="AFTERNOON_GIF"/>
    break;
  case hours > 12 && hours <= 16:
    image = <Image source={EVENING_GIF} alternate="EVENING_GIF"/>
    break;
  case hours > 16 && hours <= 24:
    image = <Image source={NIGHT_GIF} alternate="NIGHT_GIF"/>
    break;
  default:
    image = <Image source={MORNING_GIF} alternate="MORNING_GIF"/>
    break;
  }
  return image;
}