import express from 'express';
import { postsRoutes } from './routes/posts.js';

// create a new Express app
const app = express();
postsRoutes(app)

// define routes on the Express app. Define a GET route
app.get('/', (req, res) => {
  res.send('Hello from Express');
});

// export the app to use with other files
export { app };

