const express = require('express');
const cors = require('cors');

const app = express();

const fs = require('fs');
const path = require('path');

const attachmentsPath = path.join(__dirname, 'attachments');

if (!fs.existsSync(attachmentsPath)) {
    fs.mkdirSync(attachmentsPath, { recursive: true });
    console.log('La carpeta "attachments/" en "AnyTasks/server/" ha sido creada');
}

const port = 3000;

app.listen(port, () => {
    console.log(`Servidor Express corriendo en http://localhost:${port}`)
});

app.use(cors({
    // cambiar luego cuando tengas front
    origin: '*'
}))

app.get('/', (req, res) => {
    res.send('Hola desde el backend de Express')
});

app.get('/data', (req, res) => {
    res.json({ message: 'Hola desde el backend de Express' })
});
