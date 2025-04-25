import React, { useState } from 'react';
import RegisterForm from '../components/RegisterForm';
import BackToLandingPage from '../components/BackToLandingPage';

const Register = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch('http://localhost:3000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: username, email, password })
            });

            const data = await res.json();

            if (res.ok) {
                alert('Registro exitoso');
            } else {
                alert(data.error || 'Error al registrarse');
            }
        } catch (err) {
            console.error(err);
            alert('Ha ocurrido un error a la hora de registrarse');
        }
    };

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <BackToLandingPage/>

            <RegisterForm
                email={email}
                password={password}
                handleEmailChange={handleEmailChange}
                handleUsernameChange={handleUsernameChange}
                handlePasswordChange={handlePasswordChange}
                handleSubmit={handleSubmit}
            />
        </div>
    );
};

export default Register;
