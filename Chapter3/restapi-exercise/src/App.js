import express from 'express';

// create a new Express app
const app = express();

// define routes on the Express app. Define a GET route
app.get('/', (req, res) => {
  res.send('Hello from Express');
});

// export the app to use with other files
export { app };

