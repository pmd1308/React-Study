import React from 'React';
import '../assets/EmployeeForm.css';

function EmployeeForm({ onSubmit }) {
  const [name, setname] = useState('');
  const [position, setposition] = useState('');
  const [salary, setsalary] = useState('');
  const [hireDate, setsHireDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit({ name, position, salary, hireDate }); // Mudar para boolean
    setname('');
    setposition('');
    setsalary('');
    setsHireDate('');
  };

  return (
    <form className="employee-form" onSubmit={handleSubmit}>
      <input type="text" name="Nome" value={name} placeholder="Nome" onChange={(e) => setname(e.target.value)} /> 

      <input type="text" name="Posição" value={position} placeholder="Posição" onChange={(e) => setposition(e.target.value)} />

      <input type="text" name="Salário" value={salary} placeholder="Salário" onChange={(e) => setsalary(e.target.value)} />

      <input type="date" name="Data de contratação" value={hireDate} placeholder="Data de contratação" onChange={(e) => setsHireDate(e.target.value)} />
      <button type="submit">Salvar</button>
      </form>
  );
}

export default EmployeeForm;