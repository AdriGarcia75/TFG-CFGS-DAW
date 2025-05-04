function RegisterForm({
    email,
    username,
    password,
    handleEmailChange,
    handleUsernameChange,
    handlePasswordChange,
    handleSubmit
}) {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 w-full">
            <div className="w-full max-w-lg p-8 bg-white shadow-lg rounded-lg">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Registrarse</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600">Correo electrónico</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={handleEmailChange}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-600">Nombre</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            onChange={handleUsernameChange}
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
                            value={password}
                            onChange={handlePasswordChange}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        Registrarse
                    </button>
                </form>
            </div>
        </div>
    );
}

export default RegisterForm;
