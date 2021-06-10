import { Request, Response } from 'express';
import Car from '../entity/car';
import CarRepository from '../repository/carRepository';
import ControllerInterface from './controllerInterface';
import PlainToClassSerializer from '../serialization/plainToClassSerializer';

export default class CreateCarController implements ControllerInterface
{
    private carRepository: CarRepository;

    private plainToClassSeralizer: PlainToClassSerializer;

    constructor(carRepository: CarRepository, plainToClassSeralizer: PlainToClassSerializer)
    {
        this.carRepository = carRepository;
        this.plainToClassSeralizer = plainToClassSeralizer;
    }

    public execute(req: Request, res: Response): void 
    {
        console.log(req.body)
        const car = this.plainToClassSeralizer.transform(Car, req.body)

        console.log(car);

        this.carRepository.add(car);
        console.log(`Added car ${car.getMaker()} ${car.getModel()} to the list`)

        res.sendStatus(201);
    }
}
