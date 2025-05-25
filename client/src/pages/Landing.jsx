import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="bg-gradient-to-b from-blue-300 to-white text-gray-800 min-h-screen flex flex-col">
      <div className="flex flex-col items-center justify-center flex-1 text-center px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-semibold text-blue-600 mb-6">
            Bienvenido a AnyTasks
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-xl mx-auto">
            Organiza tus tareas de forma sencilla y eficiente. Mantén el control
            de tu productividad en un solo lugar.
          </p>

          <div className="flex gap-6 justify-center">
            <Link
              to="/login"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-xl transition duration-300"
            >
              Iniciar sesión
            </Link>
            <Link
              to="/register"
              className="border border-blue-600 hover:bg-blue-50 text-blue-600 font-semibold py-3 px-8 rounded-xl transition duration-300"
            >
              Registrarse
            </Link>
          </div>
        </div>
      </div>

      <footer className="bg-gray-800 text-white py-4">
        <p className="text-center text-sm">
          &copy; 2025 AnyTasks. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
};

export default Landing;
