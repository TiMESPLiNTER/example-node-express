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
import FactoryServiceProvider from './serviceProvider/factoryServiceProvider';
import UuidFactory from './factory/uuidFactory';
import GetCarsController from "./controller/getCarsController";
import CreateCarController from "./controller/createCarController";

const APP_PORT = process.env.PORT;

const container = new Pimple();
const app = express();

container
    .register(new ControllerServiceProvider())
    .register(new RepositoryServiceProvider())
    .register(new SerializationServiceProvider())
    .register(new FactoryServiceProvider())
;

// eslint-disable-next-line
const carRepository: CarRepository = container.get('repository.car');
// eslint-disable-next-line
const uuidFactory: UuidFactory = container.get('factory.uuid');

carRepository.add(new Car(uuidFactory.create(), 'Aston Martin', 'Vengeance', 'me'));

// Middlewares
app
    .use(cors())
    .use(contentTypeMiddleware)
    .use(express.json())
;

// Routes
app.get('/car', (req, res) => {
    // eslint-disable-next-line
    const controller: GetCarsController = container.get('controller.getCars');
    return controller.execute(req, res);
});
app.post('/car', (req, res) => {
    // eslint-disable-next-line
    const controller: CreateCarController = container.get('controller.createCar')
    return controller.execute(req, res)
});

app.listen(APP_PORT, () =>
    console.log(`Example app listening on port ${APP_PORT}!`),
);
