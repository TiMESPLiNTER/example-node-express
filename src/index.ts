import 'dotenv/config';
import cors from 'cors';
import contentTypeMiddleware from './middleware/contentTypeMiddleware';
import express from 'express';
import { Pimple } from '@timesplinter/pimple';
import Car from './entity/car';
import CarRepository from './repository/carRepository';
import ControllerServiceProvider from './serviceProvider/controllerServiceProvider';
import RepositoryServiceProvider from './serviceProvider/repositoryServiceProvider';
import SerializationServiceProvider from './serviceProvider/serializationServiceProvider';

const APP_PORT = process.env.PORT;

const container = new Pimple();
const app = express();

container
    .register(new ControllerServiceProvider())
    .register(new RepositoryServiceProvider())
    .register(new SerializationServiceProvider())
;

const carRepository: CarRepository = container.get('repository.car');

carRepository.add(new Car('Aston Martin', 'Vengeance', 'me'));

// Middlewares
app
    .use(cors())
    .use(contentTypeMiddleware)
    .use(express.json())
;

// Routes
app.get('/car', (req, res) => container.get('controller.getCars').execute(req, res));
app.post('/car', (req, res) => container.get('controller.createCar').execute(req, res));

app.listen(APP_PORT, () =>
    console.log(`Example app listening on port ${APP_PORT}!`),
);
