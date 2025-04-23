import express from 'express';
import cors from 'cors';
import { existsSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const app = express();

const PORT = 3000;
// this value must be the same used in client's npm start, if not, CORS will block any requests from the frontend
const FRONTEND_PORT = 8080;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const attachmentsPath = join(__dirname, 'attachments');

// this checks if it exists an attachments folder (used to save all the files attached to any task)
if (!existsSync(attachmentsPath)) {
    mkdirSync(attachmentsPath, { recursive: true });
    console.log('La carpeta "attachments/" en "./server/" ha sido creada');
}

app.listen(PORT, () => {
    console.log(`Servidor Express corriendo en http://localhost:${PORT}`)
});

app.use(cors({
    origin: `http://localhost:${FRONTEND_PORT}`
}))

app.get('/', (req, res) => {
    res.send('Hola desde el backend de Express')
});

app.get('/data', (req, res) => {
    res.json({ message: 'Hola desde el backend de Express' })
});
