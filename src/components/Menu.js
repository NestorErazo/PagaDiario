import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Menu.css'; // Importa el archivo CSS para estilizar el menú
import { FaUser, FaSolarPanel } from "react-icons/fa"; // Importar íconos
import { FcMoneyTransfer } from "react-icons/fc";

const Menu = () => {
    const navigate = useNavigate();

    // Función de logout
    const handleLogout = () => {
        // Aquí puedes agregar la lógica para limpiar los datos de sesión
        localStorage.removeItem('token'); // Ejemplo para limpiar el token de sesión
        navigate('/'); // Redirige a la página de inicio de sesión
    };

    return (
        <div className="menu-container">
            <h2>Menú de la Aplicación</h2>
            <nav className="navbar">
                <ul>
                    <li>
                        <Link to="/UserForm">Crear Usuario</Link>
                        <FaUser className='icon' />
                    </li>
                    <li>
                        <Link to="/CreditForm">Gestión de Préstamos</Link>
                        <FcMoneyTransfer />
                    </li>
                    <li>
                        <Link to="/CreditDetails">Validar Préstamos</Link>
                        <FaSolarPanel className='icon' />
                    </li>
                    <li>
                        <Link to="/Manager">Panel Manager</Link>
                        <FaSolarPanel className='icon' />
                    </li>
                </ul>
                {/* Botón de logout */}
                <button onClick={handleLogout} className="logout-button">
                    Logout
                </button>
            </nav>
        </div>
    );
};

export default Menu;
