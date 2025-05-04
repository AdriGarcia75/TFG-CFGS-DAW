import React from 'react';

const BackToLandingPage = () => {
	return (
		<a
			href="http://localhost:3000"
			style={{ textDecoration: 'none' }}
			className="absolute top-4 left-4 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
		>
			Volver a la Landing Page
		</a>
	);
};

export default BackToLandingPage;
