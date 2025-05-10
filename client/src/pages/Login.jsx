import React, { useState, useEffect } from 'react';
import LoginForm from '../components/LoginForm';
import BackToLandingPage from '../components/BackToLandingPage';
import { useNavigate } from 'react-router-dom';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	// check if a token already exists for the current user
	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
		  navigate('/dashboard');
		  alert("¡Debes cerrar tu sesión activa antes de volver a iniciar sesión!")
		}
	  }, [navigate]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			// fetch the login data to the API to validate and then save the register
			const res = await fetch('http://localhost:3000/api/auth/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, password }),
			});

			const data = await res.json();

			if (res.ok) {
				// save user login token on localStorage
				localStorage.setItem('token', data.token);
				localStorage.setItem('token_created_at', new Date().toString());

				alert('Inicio de sesión completado!');
				navigate('/dashboard');
			} else {
				alert(data.error || 'Error al iniciar sesión');
			}
		} catch (err) {
			console.error(err);
			alert('Ha ocurrido un error al iniciar sesión');
		}
	};

	const handleEmailChange = (e) => setEmail(e.target.value);
	const handlePasswordChange = (e) => setPassword(e.target.value);

	return (
		<div className="flex justify-center items-center min-h-screen bg-gray-100">
			<BackToLandingPage />

			<LoginForm
				email={email}
				password={password}
				handleEmailChange={handleEmailChange}
				handlePasswordChange={handlePasswordChange}
				handleSubmit={handleSubmit}
			/>
		</div>
	);
};

export default Login;
