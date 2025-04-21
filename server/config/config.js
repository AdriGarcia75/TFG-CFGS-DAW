// this .env file is local, you can create one yourself or hardcode the needed values here, if not, migrations might fail
require('dotenv').config();

module.exports = {
    development: {
        username: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || null,
        database: process.env.DB_NAME || 'anytasks',
        host: process.env.DB_HOST || '127.0.0.1',
        dialect: process.env.DB_DIALECT || 'mysql'
    },
    // Podés agregar "test" y "production" si los necesitás
};
