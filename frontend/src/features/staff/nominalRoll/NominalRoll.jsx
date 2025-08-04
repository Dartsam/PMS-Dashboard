import React from 'react';
import { useNominalRoll } from './useNominalRoll';

const NominalRoll = () => {
  const { data, isLoading, error } = useNominalRoll();

  if (isLoading) return <div>Loading staff records...</div>;
  if (error) return <div>Error loading data: {error.message}</div>;

  return (
    <div>
      <h1>Nominal Roll</h1>
      <table>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Staff ID</th>
            <th>Department</th>
            {/* Add more fields as needed */}
          </tr>
        </thead>
        <tbody>
          {data.map((staff) => (
            <tr key={staff.id}>
              <td>{staff.first_name} {staff.last_name}</td>
              <td>{staff.staff_id}</td>
              <td>{staff.department}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NominalRoll;
