const bcrypt = require('bcryptjs');
const { User } = require('../models/index.js');

const register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const filteredName = name.replace(/\W/g, '');
        const filteredEmail = email.trim();

        const existingUser = await User.findOne({ where: { email: filteredEmail } });
        if (existingUser) {
            return res.status(400).json({ error: 'El correo electrónico ya está en uso.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await User.create({
            name: filteredName,
            email: filteredEmail,
            password: hashedPassword
        });

        const userResponse = { ...newUser.toJSON() };
        delete userResponse.password;

        return res.status(201).json(userResponse);
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: 'Ha ocurrido un problema al registrar al usuario.' });
    }
};

module.exports = { register }
