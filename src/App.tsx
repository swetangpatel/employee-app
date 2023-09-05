import React from 'react';
import EmployeeList from './components/EmployeeList';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';

import AddEmployeeComponent from './components/Formik/AddEmployeeComponent';
import EditEmployeeComponent from './components/Formik/EditEmployeeComponent';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { FormLibrary } from './types/enum';


const App = () => {

  const [formLibrary, setFormLibrary] = React.useState('formik');

  const navigate = useNavigate();


  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: FormLibrary,
  ) => {
    setFormLibrary(newAlignment);
    navigate("/");
  };


  return (
    <>
      <h1>Employee Management</h1>
      <ToggleButtonGroup
        color="primary"
        value={formLibrary}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
      >
        <ToggleButton value={FormLibrary.FORMIK}>Formik</ToggleButton>
        <ToggleButton value={FormLibrary.REACT_HOOK_FORM}>React Hook</ToggleButton>
      </ToggleButtonGroup>
      <Navbar />

      {
        formLibrary === FormLibrary.FORMIK &&
        <Routes>
          <Route path="/" element={<EmployeeList formLib={formLibrary}/>} />
          <Route path="/formik/add" element={<AddEmployeeComponent />} />
          <Route path="/formik/edit/:id" element={<EditEmployeeComponent />} />

        </Routes>
      }

{
        formLibrary === FormLibrary.REACT_HOOK_FORM &&
        <Routes>
          <Route path="/" element={<EmployeeList formLib={formLibrary} />} />
          <Route path="/reacthook/add" element={<AddEmployeeComponent />} />
          <Route path="/reacthook/edit/:id" element={<EditEmployeeComponent />} />

        </Routes>
      }

    </>
  );
};

export default App;
