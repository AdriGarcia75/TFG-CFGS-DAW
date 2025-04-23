const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();

const port = 3000;

const attachmentsPath = path.join(__dirname, 'attachments');

// this checks if it exists an attachments folder (used to save all the files attached to any task)
if (!fs.existsSync(attachmentsPath)) {
    fs.mkdirSync(attachmentsPath, { recursive: true });
    console.log('La carpeta "attachments/" en "./server/" ha sido creada');
}

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
