import 'dotenv/config';
import cors from 'cors';
import express from 'express';

const APP_PORT = process.env.PORT;
const app = express();

// Middlewares
app.use(cors());

// Routes
app.get('/', (req, res) => {
    const responseContent = {
        "content": "Hello world",
    };

    res.setHeader('Content-Type', 'application/json');
    res.send(responseContent);
});

app.listen(APP_PORT, () =>
    console.log(`Example app listening on port ${APP_PORT}!`),
);
