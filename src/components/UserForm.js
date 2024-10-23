import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './UserForm.css'; // Asegúrate de crear este archivo CSS

const UserForm = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [identificationNumber, setIdentificationNumber] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate(); // Hook para la navegación

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await axios.post('http://localhost:5000/api/user/register', {

                fullName,
                email,
                identificationNumber,
                phone,
                address,
            });

            setSuccess('Usuario creado exitosamente!');
            setFullName('');
            setEmail('');
            setIdentificationNumber('');
            setPhone('');
            setAddress('');
        } catch (error) {
            console.error(error);
            if (error.response) {
                setError(error.response.data.message);
            } else {
                setError('Error desconocido al crear el usuario.');
            }
        }
    };

    const handleBack = () => {
        navigate(-1); // Navega a la página anterior
    };

    return (
        <div className="user-form-container">
            <h2>Crear Usuario</h2>
            <form onSubmit={handleSubmit} className="user-form">
                <div className="form-group">
                    <label htmlFor="fullName" >Nombre completo</label> <br/>
                    <input
                        type="text"
                        id="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required placeholder=' Nombre completo'
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <br />
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder='Correo Electronico'
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="identificationNumber">Número de identificación</label>
                    <br />
                    <input
                        type="text"
                        id="identificationNumber"
                        value={identificationNumber}
                        onChange={(e) => setIdentificationNumber(e.target.value)}
                        required
                        placeholder='Ingresar identificación'
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Teléfono</label>
                    <br />
                    <input
                        type="text"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        placeholder='Ingresar Teléfono'
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Dirección</label><br />
                    <input
                        type="text"
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                          placeholder='Ingresar Dirección'
                    />
                </div>
                <button type="submit" className="submit-button">Crear Usuario</button>
                <button type="button" onClick={handleBack} className="back-button">Volver atrás</button>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
            </form>
        </div>
    );
};

export default UserForm;
