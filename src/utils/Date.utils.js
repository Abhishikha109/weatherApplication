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

export const getTemperatureAndHumidity = (day, isCelsius, type) => {
  const hours = day.hours;
  const temperature = [['', '']];
  const humidity = [['', '']];
  const windSpeed = [];

  const timeMeridian = ['1am', '3am', '5am', '7am', '9am', '11am',
    '1pm', '3pm', '5pm', '7pm', '9pm', '11pm'];

  for(let i=1; i<hours?.length; i=i+2){
    let tempVar = [];
    let humidityVar = [];
    let windSpeedVar = [];
    
    tempVar.push(timeMeridian.at(i/2).toString());
    humidityVar.push(timeMeridian.at(i/2).toString());
    windSpeedVar.push(timeMeridian.at(i/2).toString());
    
    if(!isCelsius)
      tempVar.push(celsiusToFahrenheit(hours.at(i).temp));
    else
      tempVar.push(hours.at(i).temp);
    
    humidityVar.push(hours.at(i).humidity);
    
    windSpeedVar.push(hours.at(i).windspeed);
    windSpeedVar.push(hours.at(i).winddir);

    temperature.push(tempVar);
    humidity.push(humidityVar);
    windSpeed.push(windSpeedVar);
  }
  
  if(type === 'windSpeed'){
    for(let i=0; i< windSpeed.length; i++){
      console.log(windSpeed.at(i));
    }
  }
 
  return type === 'humidity' ? humidity:
    type === 'temperature'? temperature: windSpeed;
};