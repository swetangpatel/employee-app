import axios from 'axios';
import { Employee } from './types/Employee';
import { environment } from './evironment';


const BASE_URL = environment.apiBaseUrl;

export const getEmployees = () => {
  return axios.get<Employee[]>(`${BASE_URL}/employee`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching employees:', error);
      throw error;
    });
};

export const getEmployeeById = (id: number) => {
  return axios.get<Employee>(`${BASE_URL}/employee/${id}`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching employee by ID:', error);
      throw error;
    });
};

export const addEmployee = (employee: Employee) => {
  return axios.post<Employee>(`${BASE_URL}/employee`, employee)
    .then(response => response.data)
    .catch(error => {
      console.error('Error adding employee:', error);
      throw error;
    });
};

export const updateEmployee = (id: number, employee: Employee) => {
  return axios.put<Employee>(`${BASE_URL}/employee/${id}`, employee)
    .then(response => response.data)
    .catch(error => {
      console.error('Error updating employee:', error);
      throw error;
    });
};

export const deleteEmployee = (id: number) => {
  return axios.delete(`${BASE_URL}/employee/${id}`)
    .catch(error => {
      console.error('Error deleting employee:', error);
      throw error;
    });
};
