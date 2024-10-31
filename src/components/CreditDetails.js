import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreditDetails.css';

const CreditDetails = () => {
    const navigate = useNavigate(); // Hook para la navegación
    const [identifications, setIdentifications] = useState([]); // Lista de identificaciones de usuarios
    const [selectedIdentification, setSelectedIdentification] = useState(''); // Identificación seleccionada
    const [creditData, setCreditData] = useState(null); // Datos de créditos del usuario
    const [error, setError] = useState(''); // Error de consulta

    // Cargar identificaciones de los usuarios al montar el componente
    useEffect(() => {
        const fetchIdentifications = async () => {
            try {
                const response = await axios.get('https://app-bakend.onrender.com/api/user/identifications');
                setIdentifications(response.data);
            } catch (error) {
                console.error('Error al cargar identificaciones:', error);
                setError('Error al cargar las identificaciones');
            }
        };
        fetchIdentifications();
    }, []);

    // Consultar los créditos cuando cambia la identificación seleccionada
    const fetchCredits = async (idNumber) => {
        try {
            const response = await axios.get(`https://app-bakend.onrender.com/api/credit/${idNumber}/credits`);
            setCreditData(response.data);
            setError('');
        } catch (error) {
            console.error('Error al obtener créditos:', error);
            setError('Usuario o créditos no encontrados');
            setCreditData(null);
        }
    };

    const handleSelectChange = (e) => {
        const idNumber = e.target.value;
        setSelectedIdentification(idNumber);
        if (idNumber) {
            fetchCredits(idNumber);
        }
    };

    const handleBackButtonClick = () => {
        navigate(-1); // Vuelve a la página anterior
    };

    // Función para calcular la cuota mensual
    const calculateMonthlyInstallment = (loanAmount, interestRate, installments) => {
        const principalPerInstallment = loanAmount / installments; // Monto del préstamo por cuota
        const interest = (interestRate / 100) * loanAmount; // Interés aplicado al monto del préstamo
        const monthlyInstallment = principalPerInstallment + interest; // Sumar ambos valores
        return monthlyInstallment.toFixed(2); // Redondear a dos decimales
    };

    return (
        <div className="credit-details-container">
            <h2>Consulta de Créditos</h2>
           
            <label>
                Número de Identificación:
                <select value={selectedIdentification} onChange={handleSelectChange}>
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
                        {creditData.credits.map((credit, index) => {
                            const monthlyInstallment = calculateMonthlyInstallment(credit.loanAmount, credit.interestRate, credit.installments);
                            return (
                                <div key={index} className="credit-item">
                                    <p><strong>Monto del Préstamo:</strong> {credit.loanAmount}</p>
                                    <p><strong>Tasa de Interés:</strong> {credit.interestRate}%</p>
                                    <p><strong>Total de Cuotas:</strong> {credit.installments}</p>
                                    <p><strong>Cuotas Restantes:</strong> {credit.installments}</p>
                                    <p><strong>Cuota Mensual:</strong> {monthlyInstallment}</p> {/* Muestra la cuota calculada */}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Botón de regreso */}
            <button onClick={handleBackButtonClick} style={{ marginTop: '20px' }}>
                Regresar
            </button>
        </div>
    );
};

export default CreditDetails;
