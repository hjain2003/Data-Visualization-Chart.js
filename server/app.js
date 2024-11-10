import express from 'express';
import dotenv from 'dotenv';
import dataRouter from './routes/data.js';
import cors from 'cors';

const app =  express();
dotenv.config({ path: './config.env' });

//middlewares
app.use(cors({
    origin: 'http://localhost:3000',
    // credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use('/company',dataRouter);

app.get('/', (req, res) => {
    res.send(`Hello world app`);
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`server up and running  at ${PORT}`);
});