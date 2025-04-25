const express = require('express');
const router = express.Router();
const { register } = require("../controllers/authController")

router.post('/register', register)

// router.post('/login', register)

module.exports = router;
