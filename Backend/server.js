import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import http from 'http';
import authRoute from './routes/authRoute.js';
import { setupTable } from './config/setupTables.js';


dotenv.config();
export const app = express();
export const server = http.createServer(app);


const port = process.env.PORT || 5000;
const frontend_url = process.env.FRONTEND_URL || 'http://localhost:5173';

app.use(cors({
    credentials: true,
    origin: frontend_url
}));
app.use(express.json());
app.use(cookieParser());
app.use('/auth', authRoute);

app.get('/', (req, res) => {
    res.sendFile('public/index.html', { root: import.meta.dirname });
});



async function startServer() {
    try {
        await setupTable();
        server.listen(port, () => {
            console.log(`Server is running on port ${port}.`);
        })
    } catch (err) {
        console.error(' Failed to setup DB:', err);
        process.exit(1);
    }
}

startServer();
