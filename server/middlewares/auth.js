const jwt = require('jsonwebtoken');

function auth(req, res, next) {
	const authHeader = req.headers['authorization'];
	// this is needed as the token format is the following: "bearer <token>"
	const token = authHeader && authHeader.split(' ')[1];

	if (!token) return res.status(401).json({ message: "No se ha encontrado el token de autenticación"});

	jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
		if (err) return res.status(403).json({ message: "Token inválido" });
		req.user = user;
		next();
	});
}

module.exports = auth;
