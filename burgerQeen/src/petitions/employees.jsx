import "../admi/admi.css";
import Button from "../components/buttons";
import { useState, useEffect } from "react";
import axios from "axios";
import Admin from "../admi/admi";
import { Link } from "react-router-dom";
const Employees = () => {
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get("http://localhost:8080/users", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setEmployees(response.data);
        console.log("Mostrando los employees");
      } catch (error) {
        console.error(error);
      }
    };
    fetchEmployees();
  }, []);
  const handleEditEmployee = async (id, updatedData) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.patch(
        `http://localhost:8080/users/${id}`,
        updatedData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Actualizar el estado sin recargar la página
      setEmployees((prevEmployees) =>
        prevEmployees.map((employee) =>
          employee.id === id ? { ...employee, ...updatedData } : employee
        )
      );
      console.log(response);
      // Maneja la respuesta de la API después de editar el empleado
    } catch (error) {
      console.error(error);
    }
  };
  const handleDeleteEmployee = async (id) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.delete(`http://localhost:8080/users/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      // Eliminar el empleado del estado sin recargar la página
      setEmployees((prevEmployees) =>
        prevEmployees.filter((employee) => employee.id !== id)
      );
      console.log("Empleado eliminado exitosamente");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
    <h1 className="admi">Administradores</h1>
      <table className="items-users">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Rol</th>
            <th>Editar</th>
            <th>Eliminar</th>
          </tr>
        </thead>
      </table>
      <div className="more-user-products">
      <img src="/src/assets/adduser.png" alt="add-user" className="add-user" />
        <Button className="btn-add-products" id="products" text="Productos" />
        </div>
        <Link to="/">
          <img src="/src/assets/flecha.png" alt="" className="botton-back-admi" />
        </Link>
      <div className="container-user">
        {employees.map((user) => (
          <Admin
            key={user.id}
            user={user}
            handleEditEmployee={handleEditEmployee}
            handleDeleteEmployee={handleDeleteEmployee}
          />
        ))}
      </div>
    </>
  );
};
export default Employees;