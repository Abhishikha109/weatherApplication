import './App.css';
import File from './components/File';
import Dropdown from './components/Dropdown';
import Weather from './components/weather';
import {useState} from 'react';

function App() {
  const [selectedDate, setSelectedDate] = useState(null);
  const selectedDateHandler = (date) => {
    setSelectedDate(date);
  };
    
  return (
    <div className='App'>
      {/*<File/>*/}
      {/*<Dropdown selectedDate={selectedDateHandler}/>*/}
      {/*{selectedDate && <Weather date={selectedDate}/>}*/}
      <Weather/>
    </div>
  );
}

export default App;
