import {days, getCurrentDay, numberOfDays} from '../utils/Date.utils';
import Day from './Day';

export const Days = (props) => {
  const index = getCurrentDay(props.days?.at(0)?.datetime);
  
  let nextSevenDays = [];
  
  for (let i = index; i < index+numberOfDays; i++) {
    nextSevenDays.push(days.at(i%(numberOfDays-1)));
  }
  
  return (<table>
    <tbody>
      <tr>{props.days.slice(0, numberOfDays).map((day, index) => 
        <th key={day.datetime}>
          <Day eachDay={day} weekDay={nextSevenDays.at(index)}/>
        </th>)}
      </tr>
    </tbody>
  </table>
  );
}