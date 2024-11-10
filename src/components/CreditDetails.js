import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreditDetails.css';


const CreditDetails = () => {
    const navigate = useNavigate();
    const [identifications, setIdentifications] = useState([]);
    const [selectedIdentification, setSelectedIdentification] = useState('');
    const [creditData, setCreditData] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Estado para el formulario de abono
    const [creditId, setCreditId] = useState('');
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleError = (message, errorObj = null) => {
        console.error(message, errorObj);
        setError(message);
        setLoading(false);
    };

    useEffect(() => {
        const fetchIdentifications = async () => {
            try {
                const response = await axios.get('https://app-bakend.onrender.com/api/user/identifications');
                setIdentifications(response.data);
            } catch (error) {
                handleError('Error al cargar las identificaciones', error);
            }
        };
        fetchIdentifications();
    }, []);

    const fetchCredits = useCallback(async (idNumber) => {
        setLoading(true);
        try {
            const response = await axios.get(`https://app-bakend.onrender.com/api/credit/${idNumber}/credits`);
            if (response.data && response.data.credits) {
                setCreditData(response.data);
                setError('');
            } else {
                throw new Error('No se encontraron créditos.');
            }
        } catch (error) {
            handleError('Usuario o créditos no encontrados', error);
            setCreditData(null);
        } finally {
            setLoading(false);
        }
    }, []);

    const handleSelectChange = (e) => {
        const idNumber = e.target.value;
        setSelectedIdentification(idNumber);
        if (idNumber) fetchCredits(idNumber);
    };

    const calcularCuotaMensual = (loanAmount, interestRate, installments) => {
        const rate = interestRate / 100 / 12;
        return ((loanAmount * rate) / (1 - Math.pow(1 + rate, -installments))).toFixed(2);
    };

    const handleBackButtonClick = () => {
        navigate(-1);
    };

    // Manejo del formulario de abono
    const handlePaymentSubmit = async (e) => {
        e.preventDefault();

        const parsedAmount = parseFloat(amount);
        if (isNaN(parsedAmount) || parsedAmount <= 0) {
            setMessage('El monto debe ser un número positivo.');
            return;
        }

        setIsLoading(true);
        try {
            const response = await axios.patch(`https://app-bakend.onrender.com/api/credit/${creditId}/payment`, {
                amount: parsedAmount,
            });

            const data = response.data;
            if (response.status === 200) {
                setMessage('Abono realizado con éxito.');
                fetchCredits(selectedIdentification); // Actualiza la lista de créditos después del abono
            } else {
                setMessage(data.message || 'Hubo un error al realizar el abono.');
            }
        } catch (error) {
            setMessage('Error ID del Crédito por favor ingressar ID del Crédito correcto.');
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="credit-details-container">
            <h2>Consulta de Créditos</h2>
            <label>
                Número de Identificación:
                <select value={selectedIdentification} onChange={handleSelectChange} disabled={loading}>
                    <option value="">Seleccione una identificación</option>
                    {identifications.map((user) => (
                        <option key={user.identificationNumber} value={user.identificationNumber}>
                            {user.identificationNumber} - {user.fullName}
                        </option>
                    ))}
                </select>
            </label>

            {error && <p className="error-message">{error}</p>}

            {creditData && (
                <div className="credit-info">
                    <h3>Créditos de {creditData.fullName}</h3>
                    <p><strong>Cédula:</strong> {creditData.identificationNumber}</p>
                    
                    <div className="credit-grid">
                        {creditData.credits.map((credit, index) => (
                            <div key={credit._id || index} className="credit-item">
                                <p><strong>ID del Crédito:</strong> {credit._id}</p>
                                <p><strong>Monto del Préstamo:</strong> ${credit.loanAmount}</p>
                                <p><strong>Tasa de Interés:</strong> {credit.interestRate}%</p>
                                <p><strong>Total de Cuotas:</strong> {credit.installments}</p>
                                <p><strong>Saldo Restante:</strong> ${credit.remainingBalance || 0}</p>
                                <p><strong>Cuota Mensual:</strong> ${calcularCuotaMensual(credit.loanAmount, credit.interestRate, credit.installments)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <h2> Abono a Crédito</h2>
            <form onSubmit={handlePaymentSubmit} className="credit-payment-form">
                <div className="form-group">
                    <label htmlFor="creditId">ID del Crédito</label>
                    <input
                        type="text"
                        id="creditId"
                        value={creditId}
                        onChange={(e) => setCreditId(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="amount">Monto del Abono</label>
                    <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                        min="0"
                    />
                </div>

                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Realizando abono...' : 'Realizar Abono'}
                </button>
                <button type="button" onClick={handleBackButtonClick} className="back-button">
                    Volver atrás
                </button>
            </form>

            {message && <p className={`message ${message.includes('éxito') ? 'success' : 'error'}`}>{message}</p>}
        </div>
    );
};

export default CreditDetails;
