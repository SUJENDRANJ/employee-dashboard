import axios from 'axios'

// json-server base url
const BASE_URL = 'http://localhost:5000'

// get all employees
export const getEmployees = () => {
  return axios.get(BASE_URL + '/employees')
}

// add a new employee
export const addEmployee = (employee) => {
  return axios.post(BASE_URL + '/employees', employee)
}

// update an existing employee
export const updateEmployee = (id, employee) => {
  return axios.put(BASE_URL + '/employees/' + id, employee)
}

// delete an employee
export const deleteEmployee = (id) => {
  return axios.delete(BASE_URL + '/employees/' + id)
}
