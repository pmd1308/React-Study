import React from 'react';
import '../assets/EmployeeList.css';


function EmployeeList({ employees, onDelete }) {
  return (
    <ul className="employee-list">
      {employees.map((employee) => (
        <li key={employee.id}>
          <span>{employee.name}</span>
          <span>{employee.position}</span>
          <span>{employee.salary}</span>
          <span>{employee.hireDate}</span>
          <button type="button" onClick={() => onDelete(employee.id)}>Excluir</button>
        </li>
      ))}
    </ul>
  );
}

export default EmployeeList;