import Day from './Day';

export const Days = (props) => {
  const numberOfDays = 8;
  return (<table>
    <tbody>
      <tr>{props.days.slice(0, numberOfDays).map((day) => <th key={day}><Day eachDay={day}/></th>)}</tr>
    </tbody>
  </table>
  );
}