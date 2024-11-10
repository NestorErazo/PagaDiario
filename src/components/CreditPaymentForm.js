import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreditPaymentForm.css';
const CreditPaymentForm = () => {
    const [creditId, setCreditId] = useState('');
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate(); 
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar que el monto sea un número mayor que 0
        const parsedAmount = parseFloat(amount);
        if (isNaN(parsedAmount) || parsedAmount <= 0) {
            setMessage('El monto debe ser un número positivo.');
            return;
        }

        setIsLoading(true);
        try {
            // Realizar la solicitud al backend para hacer el abono
            const response = await fetch(`https://app-bakend.onrender.com/api/credit/${creditId}/payment`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount: parsedAmount }),
            });

            const data = await response.json();
            if (response.ok) {
                setMessage('Abono realizado con éxito.');
            } else {
                setMessage(data.message || 'Hubo un error al realizar el abono.');
            }
        } catch (error) {
            setMessage('Error en el servidor, por favor intente nuevamente.');
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };
    const handleBack = () => {
        navigate(-1); 
    };

    return (
        <div className="credit-payment-form">
            <h2>Formulario de Abono a Crédito</h2>
            <form onSubmit={handleSubmit}>
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
                        min="1"
                    />
                </div>

                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Realizando abono...' : 'Realizar Abono'}
                </button>
                <button type="button" onClick={handleBack} className="back-button">Volver atrás</button>

            </form>

            {message && <p className={`message ${message.includes('éxito') ? 'success' : 'error'}`}>{message}</p>}
        </div>
        
    );
};

export default CreditPaymentForm;
