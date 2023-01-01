import Day from './Day';

export const Days = (props) => {
  const numberOfDays = 8;
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const todayDay = Date().toLocaleString().substr(0,4).trim();
  const index = days.indexOf(todayDay, 0);
  
  let nextSevenDays = [];
  for (let i = index; i < index+numberOfDays; i++) {
    nextSevenDays.push(days.at(i%(numberOfDays-1)));
  }
  
  console.log(index);
  return (<table>
    <tbody>
      <tr>{props.days.slice(0, numberOfDays).map((day, index) => <th key={day}><Day eachDay={day} weekDay={nextSevenDays.at(index)}/></th>)}</tr>
    </tbody>
  </table>
  );
}