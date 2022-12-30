import React from 'react';
import {MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem, MDBBtn} from 'mdb-react-ui-kit';

const DUMMY_DATA = [
  '2023-01-10',
  '2023-01-11',
  '2023-01-12',
];

const Dropdown = (props) => {
  const setDateHandler = (event) => {
    props.selectedDate(event.target.innerText);
  };
  
  return (
    <>
      <MDBDropdown dropright group>
        <MDBDropdownToggle>Dropright</MDBDropdownToggle>
        <MDBDropdownMenu>
          {DUMMY_DATA.map((date) => <MDBDropdownItem key={date} onClick={setDateHandler} link>{date}</MDBDropdownItem>)}
        </MDBDropdownMenu>
      </MDBDropdown>
    </>
  );
};

export default Dropdown;