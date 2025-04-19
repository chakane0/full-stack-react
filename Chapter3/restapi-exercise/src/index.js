import { app } from './App.js';
import dotenv from 'dotenv';
import { initDatabase } from './db/init.js';
dotenv.config();

// define a port number and have the Express instance listen to it
const PORT = 3345;
app.listen(PORT);
console.info(`express server running on http://localhost:${PORT}`);


