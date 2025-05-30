const express = require('express');
const cors = require('cors');
const { existsSync, mkdirSync } = require('fs');
const { join } = require('path');
const { sequelize } = require('./models/index.js');
const authMiddleware = require('./middlewares/auth.js');
const authRoutes = require('./routes/authRoutes.js');
const columnsRoutes = require('./routes/columnsRoutes.js');
const boardsRoutes = require('./routes/boardsRoutes.js');
const tasksRoutes = require('./routes/tasksRoutes.js');

const app = express();

const PORT = 3000;
// default port for backend connections, if changed, check all front-ends references to match the value here
const FRONTEND_PORT = 8080;

const uploadsAttachmentsPath = join(__dirname, 'uploads', 'attachments');

if (!existsSync(uploadsAttachmentsPath)) {
    mkdirSync(uploadsAttachmentsPath, { recursive: true });
    console.log('La carpeta "uploads/attachments/" ha sido creada');
}

// middlewares
app.use(cors({ origin: `http://localhost:${FRONTEND_PORT}` }));
app.use(express.json());
app.use(express.static(join(__dirname, 'landing')));

// unprotected routes
app.use('/api/auth', authRoutes);

app.get('/test', (req, res) => {
    res.json({ message: 'test' });
});

// protected routes
app.use('/api/columns', authMiddleware, columnsRoutes);
app.use('/api/boards', authMiddleware, boardsRoutes);
app.use('/api/tasks', authMiddleware, tasksRoutes);

app.get('/api/test', authMiddleware, (req, res) => {
    res.json({ message: 'protected test' });
});

// start only after establishing connection with DB
sequelize.authenticate()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Servidor ejecutandose en http://localhost:${PORT}, ejecuta npm start en /client para utilizar AnyTasks`);
        });
    })
    .catch((err) => {
        console.error('Error al conectar a la base de datos:', err);
        // terminate the node process
        process.exit(1);
    });
