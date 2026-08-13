import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import http from 'http';
import authRoute from './routes/authRoute.js';
import restaurantRoute from './routes/restaurantRoutes.js';
import staffRoute from './routes/staffRoutes.js';
import orderRoute from './routes/orderRoutes.js';
import tableRoute from './routes/tableRoutes.js';
import menuRoute from './routes/menuRoutes.js';
import billsRoute from './routes/billsRoute.js';
import dashboard from './routes/dashboardRoute.js';
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
app.use('/res', restaurantRoute);
app.use('/staff', staffRoute);
app.use('/table', tableRoute);
app.use('/menu', menuRoute);
app.use('/order', orderRoute);
app.use('/bill', billsRoute);
app.use('/dashboard', dashboard);

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
