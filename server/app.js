const express = require('express');
const cors = require('cors');
const { existsSync, mkdirSync } = require('fs');
const { join } = require('path');
const { sequelize } = require('./models/index.js');
const authMiddleware = require('./middlewares/auth.js');
const authRoutes = require('./routes/authRoutes.js');
const columnsRoutes = require('./routes/columns.js');
const boardsRoutes = require('./routes/boards.js');

const app = express();

const PORT = 3000;
// warning, this MUST be the same port used in client's npm start, but I advise to not use any port other than 8080
const FRONTEND_PORT = 8080;

const attachmentsPath = join(__dirname, 'attachments');

// this checks if it exists an attachments folder (used to save all the files attached to any task)
if (!existsSync(attachmentsPath)) {
	mkdirSync(attachmentsPath, { recursive: true });
	console.log('La carpeta "attachments/" en "./server/" ha sido creada');
}

// middlewares
app.use(cors({ origin: `http://localhost:${FRONTEND_PORT}` }));
app.use(express.json());
app.use(express.static(join(__dirname, 'landing')));

// unprotected routes
app.get('/', (req, res) => {
	res.sendFile(join(__dirname, 'landing', 'index.html'));
});

app.use('/api/auth', authRoutes);

app.get('/test', (req, res) => {
	res.json({ message: 'test' });
});

// protected routes
app.use('/api/columns', authMiddleware, columnsRoutes);

app.use('/api/boards', authMiddleware, boardsRoutes);

app.get('/api/test', authMiddleware, (req, res) => {
	res.json({ message: 'protected test' });
});

// start only after establishing connection with DB
sequelize.authenticate()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Accede a la landing page de la página desde http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Error al conectar a la base de datos:', err);
        // terminate the node process
        process.exit(1);
    });
