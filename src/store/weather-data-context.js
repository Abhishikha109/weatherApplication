import {createContext, useState} from 'react';

const WeatherDataContext = createContext({
  days: [],
  setAllDays: () => {},
  temperatureChange: true,
  temperatureConversionToggle: () => {},
  currentDataSelected: {},
  setCurrentDataSelected: () => {},
  sevenDaysDate: [],
  sevenDaysDateHandler: () => {},
  currentDaySelectedTemperature: [],
  currentDaySelectedTemperatureHandler: () => {},
  currentParameterSelected: 'temperature',
  currentParameterSelectedHandler: () => {},
});

export const WeatherDataContextProvider = (props) => {
  const [weatherDays, setWeatherDays] = useState([]);
  const [temperatureToggle, setTemperatureToggle] = useState(true);
  const [currentData, setCurrentData] = useState({});
  const [sevenDaysDate, setSevenDayDate] = useState([]);
  const [selectedDayTemperature, setSelectedDayTemperature] = useState([]);
  const [parameterSelected, setParameterSelected] = useState('temperature');

  const parameterSelectedHandler = (selectedTab) => {
    setParameterSelected(selectedTab);
  };
  
  const temperatureHandler = (temperature) => {
    setSelectedDayTemperature(temperature);
  };
  
  const sevenDaysDateHandler = (nextSevenDaysDate) => {
    setSevenDayDate(nextSevenDaysDate);
  };
  
  const setDaysHandler = (allDays) => {
    setWeatherDays(allDays);
  };
  
  const setTemperatureToggleHandler = (value) => {
    setTemperatureToggle(value);
  }
  
  const setCurrentDataSelectedHandler = (currentData) => {
    setCurrentData(currentData);
  };
  
  const contextValue = {
    days: weatherDays, 
    setAllDays: setDaysHandler,
    temperatureChange: temperatureToggle,
    temperatureConversionToggle: setTemperatureToggleHandler,
    currentDataSelected: currentData,
    setCurrentDataSelected: setCurrentDataSelectedHandler,
    sevenDaysDate: sevenDaysDate,
    sevenDaysDateHandler: sevenDaysDateHandler,
    currentDaySelectedTemperature: selectedDayTemperature,
    currentDaySelectedTemperatureHandler: temperatureHandler,
    currentParameterSelected: parameterSelected,
    currentParameterSelectedHandler: parameterSelectedHandler,
  }

  return (
    <WeatherDataContext.Provider value={contextValue}>
      {props.children}
    </WeatherDataContext.Provider>
  );
};

export default WeatherDataContext;