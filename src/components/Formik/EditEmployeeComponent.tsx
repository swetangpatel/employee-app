import React, { useEffect, useState } from "react";
import { Employee } from "../../types/Employee";
import * as Yup from "yup";
import { ErrorMessage, Field, FieldArray, Form, Formik, useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { addEmployee, getEmployeeById, updateEmployee } from "../../employeeService";
import { Button } from "react-bootstrap";
import { Box, Grid, TextField, Typography } from "@mui/material";
import AddressComponent from "./AddressComponent";
import { Address } from "../../types/Address";

const EmployeeForm = () => {

  const { id } = useParams();

  const [initialValues, setInitialValues] = useState<Employee>({
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
  });

  useEffect(() => {
    getEmployeeById(parseInt(id as string))
      .then((employee) => {
        const response = employee;
        setInitialValues(response);
      }
      );

  }, [id, getEmployeeById]);



  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    id: Yup.number().required('Id is required'),
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    phoneNumber: Yup.string().required('Phone Number is required'),
  });

  const handleSubmit = async (values: Employee) => {
    await updateEmployee(values.id, values);
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
          enableReinitialize={true}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleSubmit(values);
            console.log(values);
          }}>


          {({ values, setFieldValue }) => {
            return (
              <Form>
                <Typography variant="h6" gutterBottom>Personal Details</Typography>

                <Grid container spacing={2} marginBottom={"20px"}>

                  <Grid item xs={12} sm={12}>

                    <Field
                      id="id"
                      name="id"
                      as={TextField}
                      type="number"
                      label="Id"
                      setfieldvalue="id"
                      placeholder="Id"
                      value={values.id} />
                    <ErrorMessage name="id" component="div" className="field-error" />

                  </Grid>

                  <Grid item xs={12} sm={12}>

                    <Field
                      name="firstName"
                      as={TextField}
                      type="text"
                      label="First Name"
                      value={values.firstName}
                      setfieldvalue="firstName"
                      placeholder="First Name" />
                    <ErrorMessage name="firstName" component="div" className="field-error" />

                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <Field
                      name="lastName"
                      type="text"
                      as={TextField}
                      setfieldvalue="lastName"
                      label="Last Name"
                      placeholder="Last Name"
                      value={values.lastName} />
                    <ErrorMessage name="lastName" component="div" className="field-error" />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Field
                      name="email"
                      as={TextField}
                      setfieldvalue="email"
                      value={values.email}
                      type="email"
                      label="Email"
                      placeholder="Email" />
                    <ErrorMessage name="email" component="div" className="field-error" />
                  </Grid>
                  <Grid item xs={12} sm={12}>

                    <Field
                      name="phoneNumber"
                      label="Phone Number"
                      as={TextField}
                      setfieldvalue="phoneNumber"
                      value={values.phoneNumber}
                      type="text"
                      placeholder="Phone Number" />
                    <ErrorMessage name="phoneNumber" component="div" className="field-error" />
                  </Grid>
                </Grid>

                <Typography variant="h6" >Addresses</Typography>

                <FieldArray name="addresses">
                  {({ remove, push }: any) => (
                    <div>
                      {values.addresses && values.addresses.length > 0 &&
                        values.addresses.map((address, index) => (
                          <Box border={1} margin={"20px"} padding={"20px"}>
                            <Grid container spacing={2}>
                              <Grid item xs={12} sm={6}>
                                <AddressComponent address={address} setFieldValue={setFieldValue} index={index}/>
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

                <Button color="primary" variant="contained" type="submit">Save Employee</Button>
              </Form>
            );
          }}
        </Formik>

      </Box>



    </>
  );
};

export default EmployeeForm;


