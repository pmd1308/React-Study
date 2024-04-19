class EmployeeService {
  // Atualiza informações de funcionarios existentes
  static async updateEmployee(employeeId, updateData) {
    try {
      const response = await fetch(`http://localhost:3000/api/employees/${employeeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async addEmployee(employeeData) {
    try {
      const response = await fetch('http://localhost:3000/api/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employeeData),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }  

  static async deleteEmployee(employeeID) {
    try {
      const response = await fetch(`http://localhost:3000/api/employees/${employeeID}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async getEmployee(employeeID) {
    try {
      const response = await fetch(`http://localhost:3000/api/employees/${employeeID}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async searchEmployeesByName() {
    try {
      const response = await fetch('http://localhost:3000/api/employees?name=${name}');
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async listAllEmployees() {
      try {
        const response = await fetch('http://localhost:3000/api/employees');
        const data = await response.json();
        return data;
      } catch (error) {
        console.log(error);
        return null;
      }




    }
  }
  