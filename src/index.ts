import 'dotenv/config';
import cors from 'cors';
import contentTypeMiddleware from './middleware/contentTypeMiddleware';
import express from 'express';
import Car from './entity/car';
import CarRepository from './storage/carRepository';
import CreateCarController from './controller/createCar';
import GetCarsController from './controller/getCars';

const APP_PORT = process.env.PORT;
const app = express();


let carRepository: CarRepository = new CarRepository();

carRepository.add(new Car('Aston Martin', 'Vengeance', 'me'));

// Middlewares
app.use(cors())
app.use(contentTypeMiddleware)
app.use(express.json())

// Routes
app.get('/car', (req, res) => (new GetCarsController(carRepository)).execute(req, res));
app.post('/car', (req, res) => (new CreateCarController(carRepository)).execute(req, res));

app.listen(APP_PORT, () =>
    console.log(`Example app listening on port ${APP_PORT}!`),
);
