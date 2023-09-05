import React, { useEffect, useState } from 'react';
import { DataGrid, GridRowsProp, GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import { Employee } from '../types/Employee';
import { deleteEmployee, getEmployees } from '../employeeService';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { Button, Form } from 'react-bootstrap';
import { Box } from '@mui/material';
import AddEmployeeForm from './Formik/AddEmployeeComponent';
import { useNavigate } from 'react-router-dom';
import { FormLibrary } from '../types/enum';



const EmployeeList = (props: { formLib: FormLibrary }) => {

    const navigate = useNavigate();

    const [employees, setEmployees] = useState<Employee[]>([]);

    const handleEditEmployee = (employee: Employee) => {
        if (props.formLib === FormLibrary.FORMIK) {
            navigate(`/${FormLibrary.FORMIK}/edit/${employee.id}`);
        }
        if (props.formLib === FormLibrary.REACT_HOOK_FORM) {
            navigate(`/${FormLibrary.REACT_HOOK_FORM}/edit/${employee.id}`);
        }
    };

    const handleDeleteEmployee = async (employeeId: number) => {
        try {
            await deleteEmployee(employeeId);
            setEmployees((prevEmployees) =>
                prevEmployees.filter((employee) => employee.id !== employeeId)
            );
        } catch (error) {
            // Handle error (e.g., show a notification)
        }
    };


    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const employeesData = await getEmployees();
                setEmployees(employeesData);
            } catch (error) {
                // Handle error (e.g., show a notification)
            }
        };
        fetchEmployees();
    }, []);


    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'firstName', headerName: 'First Name', width: 150 },
        { field: 'lastName', headerName: 'Last Name', width: 150 },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'phoneNumber', headerName: 'Phone Number', width: 150 },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 150,
            cellClassName: 'actions',
            getActions: (params: { row: Employee; }) => {
                return [
                    <GridActionsCellItem
                        key={params.row.id}
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={() => handleEditEmployee(params.row)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        key={params.row.id}
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={() => handleDeleteEmployee(params.row.id)}
                        color="inherit"
                    />,
                ];
            },
        }
    ];

    return (
        <Box margin={"20px"}>
            {props.formLib === FormLibrary.FORMIK &&
                <Button variant="primary" href={`/${FormLibrary.FORMIK}/add`}>Add Employee</Button>
            }
            {props.formLib === FormLibrary.REACT_HOOK_FORM &&
                <Button variant="primary" href={`/${FormLibrary.REACT_HOOK_FORM}/add`}>Add Employee</Button>
            }
            <div style={{ height: 300, width: '100%' }}>
                <DataGrid style={{ marginTop: '20px' }} rows={employees} columns={columns} getRowId={(row) => row.id}
                />
            </div>
        </Box>


    );
};

export default EmployeeList;

