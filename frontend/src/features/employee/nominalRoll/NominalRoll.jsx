// import React from 'react';
// import { useNominalRoll } from './useNominalRoll';

// const NominalRoll = () => {
//   const { data: staffList, isLoading, error } = useNominalRoll();

//   if (isLoading) return <p>Loading staff...</p>;
//   if (error) return <p className="text-red-500">{error}</p>;

//   return (
//     <div className="p-4 overflow-x-auto">
//       <h2 className="text-xl font-bold mb-4">Nominal Roll</h2>
//       <table className="w-full border-collapse border text-sm">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="border px-2 py-1">First Name</th>
//             <th className="border px-2 py-1">Last Name</th>
//             <th className="border px-2 py-1">State of Origin</th>
//             <th className="border px-2 py-1">Date of Birth</th>
//             <th className="border px-2 py-1">Age at Appointment</th>
//             <th className="border px-2 py-1">Years Left Until Retirement</th>
//             <th className="border px-2 py-1">File Number</th>
//             <th className="border px-2 py-1">IPPIS Number</th>
//             <th className="border px-2 py-1">Date of First Appointment</th>
//             <th className="border px-2 py-1">Unit</th>
//             <th className="border px-2 py-1">Designation</th>
//             <th className="border px-2 py-1">Salary Structure</th>
//             <th className="border px-2 py-1">Status</th>
//             <th className="border px-2 py-1">Employment Type</th>
//             <th className="border px-2 py-1">Grade Level</th>
//             <th className="border px-2 py-1">Step</th>
//             <th className="border px-2 py-1">Date of Last Promotion</th>
//             <th className="border px-2 py-1">Expected Date of Retirement</th>
//           </tr>
//         </thead>
//         <tbody>
//           {staffList.map((staff, index) => (
//             <tr key={index}>
//               <td className="border px-2 py-1">{staff.f_name}</td>
//               <td className="border px-2 py-1">{staff.l_name}</td>
//               <td className="border px-2 py-1">{staff.state_of_origin}</td>
//               <td className="border px-2 py-1">{staff.date_of_birth}</td>
//               <td className="border px-2 py-1">{staff.age_at_appointment}</td>
//               <td className="border px-2 py-1">{staff.years_left_until_retirement}</td>
//               <td className="border px-2 py-1">{staff.file_number}</td>
//               <td className="border px-2 py-1">{staff.ippis_number}</td>
//               <td className="border px-2 py-1">{staff.dofa}</td>
//               <td className="border px-2 py-1">{staff.unit}</td>
//               <td className="border px-2 py-1">{staff.designation}</td>
//               <td className="border px-2 py-1">{staff.salary_structure}</td>
//               <td className="border px-2 py-1">{staff.status}</td>
//               <td className="border px-2 py-1">{staff.employment_type}</td>
//               <td className="border px-2 py-1">{staff.grade_level}</td>
//               <td className="border px-2 py-1">{staff.step}</td>
//               <td className="border px-2 py-1">{staff.dolp}</td>
//               <td className="border px-2 py-1">{staff.edor}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default NominalRoll;


// import React from 'react';
// import { useNominalRoll } from './useNominalRoll'; // relative import

// const NominalRoll = () => {
//   const { data: staffList, isLoading, error } = useNominalRoll();

//   if (isLoading) return <p>Loading staff...</p>;
//   if (error) return <p className="text-red-500">{error}</p>;

//   return (
//     <div className="p-4 overflow-x-auto">
//       <h2 className="text-xl font-bold mb-4">Nominal Roll</h2>
//       <table className="w-full border-collapse border text-sm">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="border px-2 py-1">First Name</th>
//             <th className="border px-2 py-1">Last Name</th>
//             <th className="border px-2 py-1">State of Origin</th>
//             <th className="border px-2 py-1">Date of Birth</th>
//             <th className="border px-2 py-1">Age at Appointment</th>
//             <th className="border px-2 py-1">Years Left Until Retirement</th>
//             <th className="border px-2 py-1">File Number</th>
//             <th className="border px-2 py-1">IPPIS Number</th>
//             <th className="border px-2 py-1">Date of First Appointment</th>
//             <th className="border px-2 py-1">Unit</th>
//             <th className="border px-2 py-1">Designation</th>
//             <th className="border px-2 py-1">Salary Structure</th>
//             <th className="border px-2 py-1">Status</th>
//             <th className="border px-2 py-1">Employment Type</th>
//             <th className="border px-2 py-1">Grade Level</th>
//             <th className="border px-2 py-1">Step</th>
//             <th className="border px-2 py-1">Date of Last Promotion</th>
//             <th className="border px-2 py-1">Expected Date of Retirement</th>
//           </tr>
//         </thead>
//         <tbody>
//           {staffList.map((staff, index) => (
//             <tr key={index}>
//               <td className="border px-2 py-1">{staff.f_name}</td>
//               <td className="border px-2 py-1">{staff.l_name}</td>
//               <td className="border px-2 py-1">{staff.state_of_origin}</td>
//               <td className="border px-2 py-1">{staff.date_of_birth}</td>
//               <td className="border px-2 py-1">{staff.age_at_appointment}</td>
//               <td className="border px-2 py-1">{staff.years_left_until_retirement}</td>
//               <td className="border px-2 py-1">{staff.file_number}</td>
//               <td className="border px-2 py-1">{staff.ippis_number}</td>
//               <td className="border px-2 py-1">{staff.dofa}</td>
//               <td className="border px-2 py-1">{staff.unit}</td>
//               <td className="border px-2 py-1">{staff.designation}</td>
//               <td className="border px-2 py-1">{staff.salary_structure}</td>
//               <td className="border px-2 py-1">{staff.status}</td>
//               <td className="border px-2 py-1">{staff.employment_type}</td>
//               <td className="border px-2 py-1">{staff.grade_level}</td>
//               <td className="border px-2 py-1">{staff.step}</td>
//               <td className="border px-2 py-1">{staff.dolp}</td>
//               <td className="border px-2 py-1">{staff.edor}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default NominalRoll;



import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useNominalRoll } from "./useNominalRoll"; // relative import

// Define column metadata
const columns = [
  { id: "f_name", label: "First Name", minWidth: 120 },
  { id: "l_name", label: "Last Name", minWidth: 120 },
  { id: "designation", label: "Designation", minWidth: 150 },
  { id: "salary_structure", label: "Salary Structure", minWidth: 180 },
  { id: "grade_level", label: "Grade Level", minWidth: 150 },
  { id: "step", label: "Step", minWidth: 100 },
  { id: "state_of_origin", label: "State of Origin", minWidth: 150 },
  { id: "date_of_birth", label: "Date of Birth", minWidth: 150 },
  { id: "age_at_appointment", label: "Age at Appointment", minWidth: 180 },
  { id: "years_left_until_retirement", label: "Years Left Until Retirement", minWidth: 200 },
  { id: "file_number", label: "File Number", minWidth: 150 },
  { id: "ippis_number", label: "IPPIS Number", minWidth: 150 },
  { id: "dofa", label: "Date of First Appointment", minWidth: 200 },
  { id: "unit", label: "Unit", minWidth: 150 },
  { id: "status", label: "Status", minWidth: 120 },
  { id: "employment_type", label: "Employment Type", minWidth: 180 },
  { id: "dolp", label: "Date of Last Promotion", minWidth: 200 },
  { id: "edor", label: "Expected Date of Retirement", minWidth: 220 },
];

export default function NominalRoll() {
  const { data: staffList, isLoading, error } = useNominalRoll();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (isLoading) return <p>Loading staff...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label="nominal roll table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align || "left"}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {staffList
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((staff, index) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  {columns.map((column) => {
                    const value = staff[column.id];
                    return (
                      <TableCell key={column.id} align={column.align || "left"}>
                        {value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={staffList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

