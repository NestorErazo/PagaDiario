import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreditForm.css'; 

const CreditForm = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [loanAmount, setLoanAmount] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const navigate = useNavigate(); // Hook para la navegación

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('https://app-bakend.onrender.com/api/user'); // Cambia esta ruta según tu API
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleUserChange = (e) => {
        const userId = e.target.value;
        const user = users.find((user) => user.identificationNumber === userId);
        setSelectedUser(user);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedUser || !loanAmount || !interestRate) {
            alert('Faltan campos requeridos');
            return;
        }

        try {
            const response = await axios.post(`https://app-bakend.onrender.com/api/credit/${selectedUser.identificationNumber}/add-credit`, {
                loanAmount: parseFloat(loanAmount),
                interestRate: parseFloat(interestRate),
            });
            alert(response.data.message);
        } catch (error) {
            console.error('Error adding credit:', error);
            alert('Error al añadir el crédito');
        }
    };

    const handleBack = () => {
      // eslint-disable-next-line no-undef
      navigate(-1); // Navega a la página anterior
  };

    return (
        <div className="credit-form-container">
            <h2>Agregar Crédito</h2>
            <form onSubmit={handleSubmit} className="credit-form">
                <label>
                    Seleccionar Usuario por Número de Identificación:
                    <select onChange={handleUserChange} required className="select-user">
                        <option value="">Seleccione...</option>
                        {users.map((user) => (
                            <option key={user._id} value={user.identificationNumber}>
                                {user.identificationNumber} - {user.fullName}
                            </option>
                        ))}
                    </select>
                </label>

                {selectedUser && (
                    <div className="user-details">
                        <h3>Detalles del Usuario</h3>
                        <p><strong>Nombre:</strong> {selectedUser.fullName}</p>
                        <p><strong>Email:</strong> {selectedUser.email}</p>
                        <p><strong>Teléfono:</strong> {selectedUser.phone}</p>
                    </div>
                )}

                <label>
                    Monto del Préstamo:
                    <input
                        type="number"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(e.target.value)}
                        required
                        className="input-field"
                    />
                </label>

                <label>
                    Tasa de Interés:
                    <input
                        type="number"
                        value={interestRate}
                        onChange={(e) => setInterestRate(e.target.value)}
                        required
                        className="input-field"
                    />
                </label>
                <br/>
                <button type="submit" className="submit-button">Agregar Crédito</button>
                <button type="button" onClick={handleBack} className="back-button">Volver atrás</button>
            </form>
        </div>
    );
};

export default CreditForm;
