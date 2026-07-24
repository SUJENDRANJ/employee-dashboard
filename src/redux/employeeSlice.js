import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from "../services/api.js";

export const fetchEmployees = createAsyncThunk(
  "employees/fetchEmployees",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getEmployees();
      return response.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue("Something went wrong while fetching employees.");
    }
  },
);

// add a new employee
export const createEmployee = createAsyncThunk(
  "employees/createEmployee",
  async (employeeData, { rejectWithValue }) => {
    try {
      const response = await addEmployee(employeeData);
      return response.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue("Failed to add employee");
    }
  },
);

// update an existing employee
export const editEmployee = createAsyncThunk(
  "employees/editEmployee",
  async ({ id, employeeData }, { rejectWithValue }) => {
    try {
      const response = await updateEmployee(id, employeeData);
      return response.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue("Failed to update employee");
    }
  },
);

// delete an employee
export const removeEmployee = createAsyncThunk(
  "employees/removeEmployee",
  async (id, { rejectWithValue }) => {
    try {
      await deleteEmployee(id);
      return id;
    } catch (err) {
      console.log(err);
      return rejectWithValue("Failed to delete employee");
    }
  },
);

const initialState = {
  list: [],
  loading: false,
  error: "",
};

const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ---------- fetch employees ----------
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ---------- add employee ----------
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })

      // ---------- update employee ----------
      .addCase(editEmployee.fulfilled, (state, action) => {
        const index = state.list.findIndex(
          (emp) => emp.id === action.payload.id,
        );
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })

      // ---------- delete employee ----------
      .addCase(removeEmployee.fulfilled, (state, action) => {
        state.list = state.list.filter((emp) => emp.id !== action.payload);
      });
  },
});

export default employeeSlice.reducer;
