import { Link } from 'react-router-dom';

const BackToLandingPage = () => {
  return (
    <div className="absolute top-6 left-6">
      <Link
        to="/"
        className="bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-2 px-4 rounded-xl transition duration-300 shadow"
      >
        Volver a la Landing
      </Link>
    </div>
  );
};

export default BackToLandingPage;
