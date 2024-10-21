import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css'; // Importar el archivo CSS del segundo código
import { FaUser, FaLock } from "react-icons/fa"; // Importar íconos

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Hook para la navegación

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('http://localhost:5000/api/admin/login', {
                username,
                password,
            });

            // Guardar el token en localStorage o en el estado global
            localStorage.setItem('token', response.data.token);
            navigate('/menu'); // Redirigir al menú
        } catch (error) {
            setError('Credenciales incorrectas');
        }
    };

    return (
        <div className='wrapper'>
            <form onSubmit={handleLogin}>
                <h1>Login PAgaDiario</h1>

                <div className="input-box">
                    <input 
                        type="text" 
                        placeholder='Use Name' 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        required 
                    />
                    <FaUser className='icon' />
                </div>

                <div className="input-box">
                    <input 
                        type="password" 
                        placeholder='Password' 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                    <FaLock className='icon' />
                </div>

        
                <button type="submit">Login</button>

                {error && <p style={{ color: 'red' }}>{error}</p>}

          </form>
        </div>
    );
};

export default Login;
