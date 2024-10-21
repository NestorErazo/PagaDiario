import React, { useState } from 'react';
import axios from 'axios';
import './Register.css'; // Importar archivo CSS para estilos

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            const response = await axios.post('http://localhost:5000/api/register', {
                username,
                password,
            });

            // Mostrar mensaje de éxito
            setMessage(response.data.message);

            // Limpiar campos después de un registro exitoso
            setUsername('');
            setPassword('');
        } catch (error) {
            // Manejar el error y mostrar un mensaje específico
            if (error.response && error.response.data) {
                setError(error.response.data.message || 'Error al crear el administrador');
            } else {
                setError('Error al comunicarse con el servidor');
            }
        }
    };

    return (
        <div className="register-container">
            <h2>Registrar Admin</h2>
            <form onSubmit={handleRegister}>
                <div>
                    <label>Username:</label>
                    <input 
                        type="text" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        required 
                        placeholder='Ingresa Usuario'
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit">Registrar</button>
            </form>
            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default Register;
