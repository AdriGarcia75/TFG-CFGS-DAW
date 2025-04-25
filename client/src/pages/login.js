export default function Login() {
	return (
		<div className="flex justify-center items-center min-h-screen bg-gray-100">
			<a
				href="http://localhost:3000"
				style={{ textDecoration: 'none' }}
				className="absolute top-4 left-4 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
			>
				Volver a la Landing Page
			</a>

			<div className="w-full max-w-lg p-8 bg-white shadow-lg rounded-lg">
				<h2 className="text-3xl font-bold text-gray-800 mb-4">Iniciar sesión</h2>
				<form>
					<div className="mb-4">
						<label htmlFor="email" className="block text-sm font-medium text-gray-600">Correo electrónico</label>
						<input
							type="email"
							id="email"
							name="email"
							className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
							required
						/>
					</div>
					<div className="mb-6">
						<label htmlFor="password" className="block text-sm font-medium text-gray-600">Contraseña</label>
						<input
							type="password"
							id="password"
							name="password"
							className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
							required
						/>
					</div>
					<button
						type="submit"
						className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
					>
						Iniciar sesión
					</button>
				</form>
			</div>
		</div>
	);
}
