import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../components/Navbar.jsx";
import AnalyticsCards from "../components/AnalyticsCards.jsx";
import Charts from "../components/Charts.jsx";
import SearchFilter from "../components/SearchFilter.jsx";
import DepartmentTabs from "../components/DepartmentTabs.jsx";
import EmployeeTable from "../components/EmployeeTable.jsx";
import Pagination from "../components/Pagination.jsx";
import EmployeeFormModal from "../components/EmployeeFormModal.jsx";
import Toast from "../components/Toast.jsx";
import {
  fetchEmployees,
  createEmployee,
  editEmployee,
  removeEmployee,
} from "../redux/employeeSlice.js";

const RECORDS_PER_PAGE = 10;

function Dashboard() {
  const dispatch = useDispatch();

  const employees = useSelector((state) => state.employees.list);
  const loading = useSelector((state) => state.employees.loading);
  const error = useSelector((state) => state.employees.error);

  const [searchText, setSearchText] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);

  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [toast, setToast] = useState(null);

  const showToast = (message, type) => {
    setToast({ message: message, type: type });
  };

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchText, departmentFilter, statusFilter]);

  let filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchText.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchText.toLowerCase());

    const matchesDepartment =
      departmentFilter === "All" || emp.department === departmentFilter;

    const matchesStatus = statusFilter === "All" || emp.status === statusFilter;

    return matchesSearch && matchesDepartment && matchesStatus;
  });

  // pagination
  const totalPages = Math.ceil(filteredEmployees.length / RECORDS_PER_PAGE);
  const startIndex = (currentPage - 1) * RECORDS_PER_PAGE;
  const paginatedEmployees = filteredEmployees.slice(
    startIndex,
    startIndex + RECORDS_PER_PAGE,
  );

  const departments = [...new Set(employees.map((emp) => emp.department))];

  const handleAddClick = () => {
    setSelectedEmployee(null);
    setShowModal(true);
  };

  const handleEditClick = (emp) => {
    setSelectedEmployee(emp);
    setShowModal(true);
  };

  const handleSave = async (employeeData) => {
    try {
      if (selectedEmployee) {
        await dispatch(
          editEmployee({ id: selectedEmployee.id, employeeData }),
        ).unwrap();
        showToast("Employee updated successfully", "success");
      } else {
        await dispatch(createEmployee(employeeData)).unwrap();
        showToast("Employee added successfully", "success");
      }
      setShowModal(false);
    } catch (err) {
      showToast(err, "error");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?",
    );
    if (!confirmDelete) {
      return;
    }

    try {
      await dispatch(removeEmployee(id)).unwrap();
      showToast("Employee deleted", "success");
    } catch (err) {
      showToast(err, "error");
    }
  };

  return (
    <div className="min-h-screen bg-paper dark:bg-ink transition-colors relative">
      {/* faint grid / squares texture on the background, matches login page */}
      <div
        className="fixed inset-0 opacity-[0.04] dark:opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          color: "#0D1117",
        }}
      ></div>

      <div className="relative z-10">
        <Navbar />

        <div className="p-4 sm:p-6 max-w-[1400px] mx-auto">
          <div className="min-w-0">
            {loading && (
              <p className="text-ink dark:text-paper text-sm">
                &gt; loading records<span className="cursor-blink">_</span>
              </p>
            )}

            {!loading && error && (
              <p className="text-rust dark:text-rust-light text-sm mb-4">
                {error}
              </p>
            )}

            {!loading && !error && (
              <>
                <p className="font-serif italic text-muted dark:text-muted-light text-sm mb-4">
                  inspecting {filteredEmployees.length} of {employees.length}{" "}
                  records
                  {departmentFilter !== "All"
                    ? ` — filtered to ${departmentFilter}`
                    : ""}
                </p>

                <AnalyticsCards employees={employees} />

                <Charts employees={employees} />

                <div className="flex flex-wrap justify-between items-center gap-3 mb-2">
                  <h2 className="text-ink dark:text-paper text-xs tracking-widest">
                    EMPLOYEE_TABLE
                  </h2>
                  <button
                    onClick={handleAddClick}
                    className="bg-signal text-ink px-4 py-2 text-xs tracking-widest hover:opacity-80 transition-opacity"
                  >
                    + ADD RECORD
                  </button>
                </div>

                <SearchFilter
                  searchText={searchText}
                  setSearchText={setSearchText}
                  statusFilter={statusFilter}
                  setStatusFilter={setStatusFilter}
                />

                <DepartmentTabs
                  departments={departments}
                  departmentFilter={departmentFilter}
                  setDepartmentFilter={setDepartmentFilter}
                />

                <EmployeeTable
                  employees={paginatedEmployees}
                  onEdit={handleEditClick}
                  onDelete={handleDelete}
                  startIndex={startIndex}
                />

                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  setCurrentPage={setCurrentPage}
                />
              </>
            )}
          </div>
        </div>
      </div>

      {showModal && (
        <EmployeeFormModal
          editEmployee={selectedEmployee}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

export default Dashboard;
