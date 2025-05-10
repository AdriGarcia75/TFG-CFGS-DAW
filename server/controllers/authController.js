const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models/index.js');

const register = async (req, res) => {
	const { name, email, password } = req.body;

	try {
		const filteredName = name ? name.replace(/\W/g, '') : 'Username';
		const filteredEmail = email ? email.trim() : null;

		const existingUser = await userExists(filteredEmail);
		if (existingUser) {
			return res
				.status(400)
				.json({ error: 'El correo electrónico ya está en uso.' });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = await User.create({
			name: filteredName,
			email: filteredEmail,
			password: hashedPassword,
		});

		const userResponse = { ...newUser.toJSON() };
		delete userResponse.password;

		return res.status(201).json(userResponse);
	} catch (error) {
		console.error(error);
		return res
			.status(500)
			.json({ error: 'Ha ocurrido un problema al registrar al usuario.' });
	}
};

const login = async (req, res) => {
	const { email, password } = req.body;

	try {
		const filteredEmail = email?.trim();

		const user = await userExists(filteredEmail);

		if (!user) {
			return res
				.status(400)
				.json({ error: 'El correo electrónico no está registrado.' });
		}

		const isMatchPassword = await bcrypt.compare(password, user.password);

		if (!isMatchPassword) {
			return res.status(400).json({ error: 'La contraseña es incorrecta.' });
		}

		const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, {
			expiresIn: '10s',
		});

		return res.status(200).json({
			message: 'Inicio de sesión exitoso',
			token,
		});
	} catch (error) {
		console.error(error);
		return res
			.status(500)
			.json({ error: 'Ha ocurrido un error al iniciar sesión.' });
	}
};

function userExists(filteredEmail) {
	return User.findOne({ where: { email: filteredEmail } });
}

module.exports = { register, login };
