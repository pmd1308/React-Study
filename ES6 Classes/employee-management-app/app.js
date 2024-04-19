import React, { useState, useEffect } from 'react';
import EmployeeList from './src/components/EmployeeList';
import EmployeeForm from './src/components/EmployeeForm';
import EmployeeService from './services/EmployeeService';
import './App.css';

function App() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // Carregar a lista de funcionários ao montar o componente
    loadEmployees();
  }, []);

  // Função para carregar a lista de funcionários
  const loadEmployees = async () => {
    try {
      const data = await EmployeeService.listAllEmployees();
      setEmployees(data);
    } catch (error) {
      console.error('Erro ao carregar funcionários:', error);
    }
  };

  // Função para buscar funcionários pelo nome
  const searchEmployeeByName = async (name) => {
    try {
      const data = await EmployeeService.searchEmployeeByName(name);
      setEmployees(data);
    } catch (error) {
      console.error('Erro ao buscar funcionários por nome:', error);
    }
  };

  // Função para buscar um funcionário pelo ID
  const getEmployeeById = async (employeeId) => {
    try {
      const data = await EmployeeService.getEmployeeById(employeeId);
      setEmployees([data]);
    } catch (error) {
      console.error('Erro ao buscar funcionário por ID:', error);
    }
  };

  // Função para atualizar um funcionário
  const updateEmployee = async (employeeId, updatedData) => {
    try {
      await EmployeeService.updateEmployee(employeeId, updatedData);
      loadEmployees();
    } catch (error) {
      console.error('Erro ao atualizar funcionário:', error);
    }
  };

  // Função para adicionar um novo funcionário
  const addEmployee = async (employeeData) => {
    try {
      const newEmployee = await EmployeeService.addEmployee(employeeData);
      setEmployees([...employees, newEmployee]);
    } catch (error) {
      console.error('Erro ao adicionar funcionário:', error);
    }
  };

  // Função para deletar um funcionário
  const deleteEmployee = async (employeeId) => {
    try {
      const success = await EmployeeService.deleteEmployee(employeeId);
      if (success) {
        setEmployees(employees.filter(employee => employee.id !== employeeId));
      } else {
        console.error('Erro ao deletar funcionário.');
      }
    } catch (error) {
      console.error('Erro ao deletar funcionário:', error);
    }
  };

  return (
    <div className="App">
      <h1>Lista de Funcionários</h1>
      <EmployeeList employees={employees} onDeleteEmployee={deleteEmployee} />
      <EmployeeForm
        onAddEmployee={addEmployee}
        onSearchByName={searchEmployeeByName}
        onSearchById={getEmployeeById}
        onUpdateEmployee={updateEmployee}
      />
    </div>
  );
}

export default App;
