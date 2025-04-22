const express = require('express');
const cors = require('cors');

const app = express();

const fs = require('fs');
const path = require('path');

const attachmentsPath = path.join(__dirname, 'attachments');

const port = 3000;

if (!fs.existsSync(attachmentsPath)) {
    fs.mkdirSync(attachmentsPath, { recursive: true });
    console.log('La carpeta "attachments/" en "AnyTasks/server/" ha sido creada');
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

process.on('SIGINT', () => {
    console.log('\n¿Estás seguro de que quieres salir? (y/n)');

    process.stdin.setEncoding('utf8');
    process.stdin.once('data', function (data) {
        const input = data.trim().toLowerCase();
        if (input === 's' || input === 'y') {
            console.log('Cerrando el servidor...');
            process.exit(0);
        } else {
            console.log('Cancelado. El servidor sigue corriendo.');
        }
    });
});
