import { Grid, TextField } from "@mui/material";
import { ErrorMessage, Field } from "formik";
import { Address } from "../../types/Address";
import React from "react";

const AddressComponent = (props: { address: Address, setFieldValue: any, index: number }) => {

    const handleFieldChange = (field: string, value: any) => {
        props.setFieldValue(field, value);
    };

    return (
        <Grid container spacing={2}>

            <Grid item xs={12} sm={4} >


                <Field
                    as={TextField}
                    value={props.address.apartmentNumber}
                    name={`addresses[${props.index}].apartmentNumber`}
                    type="number"
                    label="Apartment Number"
                    placeholder="Apartment Number"
                />
                <ErrorMessage
                    name={`addresses[${props.index}].apartmentNumber`}
                    component="div"
                    className="field-error"
                />
            </Grid>

            <Grid item xs={12} sm={6}>
                <Field
                    name={`addresses[${props.index}].streetName`}
                    placeholder="Street Name"
                    as={TextField}
                    label="Street Name"
                    value={props.address.streetName}
                    type="text"
                />
                <ErrorMessage
                    name={`addresses[${props.index}].streetName`}
                    component="div"
                    className="field-error"
                />
            </Grid>

            <Grid item xs={12} sm={6}>
                <Field
                    name={`addresses[${props.index}].postalCode`}
                    placeholder="Postal Code"
                    as={TextField}
                    label="Postal Code"
                    value={props.address.postalCode}
                    type="text"
                />
                <ErrorMessage
                    name={`addresses[${props.index}].postalCode`}
                    component="div"
                    className="field-error"
                />
            </Grid>



            <Grid item xs={12} sm={4} >
                <Field
                    name={`addresses[${props.index}].state`}
                    placeholder="State"
                    as={TextField}
                    label="State"
                    value={props.address.state}
                    type="text"
                />
                <ErrorMessage
                    name={`addresses[${props.index}].state`}
                    component="div"
                    className="field-error"
                />
            </Grid>

            <Grid item xs={12} sm={4} >
                <Field
                    name={`addresses[${props.index}].country`}
                    placeholder="Country"
                    as={TextField}
                    label="Country"
                    value={props.address.country}
                    type="text"
                />
                <ErrorMessage
                    name={`addresses[${props.index}].country`}
                    component="div"
                    className="field-error"
                />
            </Grid>
        </Grid>
    )
};

export default AddressComponent;

