import axios from "axios";

// json-server base url
// const BASE_URL = "https://6a6361f3b30b52361e1a36a0.mockapi.io/api/v1";
// const BASE_URL = "http://localhost:5000";
const BASE_URL = "https://employee-dashboard-server.onrender.com";

// get all employees
export const getEmployees = () => {
  return axios.get(BASE_URL + "/employees", { withCredentials: true });
};

// add a new employee
export const addEmployee = (employee) => {
  return axios.post(
    BASE_URL + "/employees",
    {
      id: Date.now().toString(),
      ...employee,
    },
    {},
  );
};

// update an existing employee
export const updateEmployee = (id, employee) => {
  console.log(id, employee);

  return axios.put(BASE_URL + "/employees/" + id, employee);
};

// delete an employee
export const deleteEmployee = (id) => {
  return axios.delete(BASE_URL + "/employees/" + id);
};
