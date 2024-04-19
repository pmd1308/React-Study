import React from 'react';
import '../assets/EmployeeStats.css';

function EmployeeStats({ employees }) {
  const totalEmployees = employees.length;
  const totalSalaries = employees.reduce((total, employee) => total + employee.salary, 0);
  const averageSalary = totalSalaries / totalEmployees || 0;

  return (
    <div className="employee-stats">
      <div className="employee-stats-item">
        <p>Total de funcionários: {totalEmployees}</p>
        <p>Salário Médio: ${averageSalary.toFixed(2)}</p>
      </div>
    </div>
  );
}

export default EmployeeStats;