import {RAIN} from '../constants/Urls';

const {CLOUDY_IMG, CLEAR_DAY_IMG, CLEAR_NIGHT_IMG, PARTLY_CLOUDY_NIGHT, PARTLY_CLOUDY_DAY} = require('../constants/Urls');

export const WeatherIcon = (iconName) => {
  let image;
  switch (iconName){
  case 'cloudy': image = <img src={CLOUDY_IMG} alt="cloudy"/>
    break;
  case 'clear-day': image = <img src={CLEAR_DAY_IMG} alt="clear-day"/>
    break;
  case 'clear-night': image = <img src={CLEAR_NIGHT_IMG} height='35' width='35' alt="clear-night"/>
    break;
  case 'partly-cloudy-night': image = <img src={PARTLY_CLOUDY_NIGHT} height='35' width='44' alt="partly-cloudy-nigh"/>
    break;
  case 'partly-cloudy-day': image = <img src={PARTLY_CLOUDY_DAY} alt="partly-cloudy-day"/>
    break;
  case 'rain': image = <img src={RAIN} alt="rain"/>
    break;
  }
  return image;
}