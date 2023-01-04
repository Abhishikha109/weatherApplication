export const numberOfDays = 8;
export const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const weekDays = {'Sun':'Sun', 'Mon':'Mon', 'Tue':'Tues', 'Wed':'Wednes', 'Thu':'Thurs', 'Fri':'Fri', 'Sat':'Satur'};
export const months = {'01':'Jan', '02':'Feb', '03':'Mar', '04':'Apr', '05':'May', '06':'Jun',
  '07':'Jul', '08':'Aug', '09':'Sep', '10':'Oct', '11':'Nov', '12':'Dec'};

export const celsiusToFahrenheit = (cTemp) => {
  return Math.round(cTemp * 9 / 5 + 32);
};

export const getCurrentDay = (date) => {
  let day = date?.substr(8,10) - '0',
    month = date?.substr(5).substr(0,2) - '0',
    year = date?.substr(0,4) - '0';

  let t = [ 0, 3, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4 ];
  year -= (month < 3) ? 1 : 0;
  return (( year + year/4 - year/100 + year/400 + t[month-1] + day) % 7);
};