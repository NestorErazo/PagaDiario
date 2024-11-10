
import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.css'; // Importa el archivo CSS para estilizar el menú
import { FaUser  ,FaSolarPanel     } from "react-icons/fa"; // Importar íconos
import { FcMoneyTransfer } from "react-icons/fc";

const Menu = () => {
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
                        <FcMoneyTransfer   />
                    </li>
                    <li>
                        <Link to="/CreditDetails">Validar de Prestamos</Link>
                        <FaSolarPanel      className='icon'/>
                    </li>
                    <li>
                        <Link to="/Manager">Panel Manager</Link>
                        <FaSolarPanel      className='icon'/>
                    </li>
                    
                </ul>
            </nav>
        </div>
    );
    
};

export default Menu;
