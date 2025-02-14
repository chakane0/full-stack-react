import { app } from './App.js';
import dotenv from 'dotenv';
import { initDatabase } from './db/init.js';
dotenv.config();



try {
    await initDatabase();

    // define a port number and have the Express instance listen to it
    const PORT = process.env.PORT;
    app.listen(PORT);
    console.info(`express server running on http://localhost:${PORT}`);
} catch (err) {
    console.error('error connecting to the DB --> check if DB is running: ', err);
}

