import React from 'react';
import { Employee } from "../../types/Employee";
import * as Yup from "yup";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import AddressComponent from "./AddressComponent";
import { addEmployee } from "../../employeeService";

const AddEmployeeForm = () => {
  const initialValues: Employee =
  {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    addresses: [
      {
        apartmentNumber: 0,
        streetName: '',
        postalCode: '',
        state: '',
        country: ''
      }
    ]
  };

  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    id: Yup.number().required('Id is required'),
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    phoneNumber: Yup.string().required('Phone Number is required'),
  });

  const handleSubmit = async (values: Employee) => {
    await addEmployee(values);
    navigate('/');
  };

  return (
    <>

      <Box margin={"20px"} >
        <Button variant="contained" href="/">Employee List</Button>
      </Box>

      <Box margin={"20px"} >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleSubmit(values);
          }}>


          {({ values, setFieldValue }) => {
            return (
              <Form>
                <Typography variant="h6" gutterBottom>Personal Details</Typography>

                <Grid container spacing={2} marginBottom={"20px"}>

                  <Grid item xs={12} sm={12}>

                    <Field
                      as={TextField}
                      name="id"
                      type="number"
                      label="Id"
                      placeholder="Id" />
                    <ErrorMessage name="id" component="div" className="field-error" />

                  </Grid>

                  <Grid item xs={12} sm={12}>

                    <Field
                      as={TextField}
                      name="firstName"
                      type="text"
                      label="First Name"
                      placeholder="First Name" />
                    <ErrorMessage name="firstName" component="div" className="field-error" />

                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <Field
                      as={TextField}
                      name="lastName"
                      type="text"
                      label="Last Name"
                      placeholder="Last Name" />
                    <ErrorMessage name="lastName" component="div" className="field-error" />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Field
                      as={TextField}
                      name="email"

                      type="email"
                      label="Email"
                      placeholder="Email" />
                    <ErrorMessage name="email" component="div" className="field-error" />
                  </Grid>
                  <Grid item xs={12} sm={12}>

                    <Field
                      as={TextField}
                      name="phoneNumber"
                      label="Phone Number"
                      type="text"
                      placeholder="Phone Number" />
                    <ErrorMessage name="phoneNumber" component="div" className="field-error" />
                  </Grid>
                </Grid>

                <Typography variant="h6" >Addresses</Typography>

                <FieldArray name="addresses">
                  {({ remove, push }: any) => (
                    <div>
                      {values.addresses && values.addresses.length > 0 && values.addresses.map((address, index) =>
                      (
                        <Box border={1} margin={"20px"} padding={"20px"} key={index}>
                          <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} >
                              <AddressComponent address={address} setFieldValue={setFieldValue} index={index} />
                            </Grid>
                            <Grid item xs={12} sm={6} >
                              <button
                                type="button"
                                className="secondary"
                                onClick={() => remove(index)}
                              >
                                Remove Address
                              </button>
                            </Grid>
                          </Grid>
                        </Box>
                      ))}
                      <button type="button" className="secondary" onClick={() => push({ streetName: '', postalCode: '', apartmentNumber: 0, state: '', country: '' })}>
                        Add Address
                      </button>
                    </div>
                  )}
                </FieldArray>

                <Button color="primary" variant="contained" type="submit">Add Employee</Button>
              </Form>
            );
          }}
        </Formik>

      </Box>

    </>
  );
};

export default AddEmployeeForm;


