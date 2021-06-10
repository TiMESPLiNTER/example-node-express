import { Request, Response } from 'express';
import Car from '../entity/car';
import CarRepository from '../repository/carRepository';
import ControllerInterface from './controllerInterface';
import PlainToClassSerializer from '../serialization/plainToClassSerializer';
import ClassToPlainSerializer from '../serialization/classToPlainSerializer';

export default class CreateCarController implements ControllerInterface
{
    private carRepository: CarRepository;

    private plainToClassSerializer: PlainToClassSerializer;

    private classToPlainSerializer: ClassToPlainSerializer;

    constructor(carRepository: CarRepository, plainToClassSerializer: PlainToClassSerializer, classToPlainSerializer: ClassToPlainSerializer)
    {
        this.carRepository = carRepository;
        this.plainToClassSerializer = plainToClassSerializer;
        this.classToPlainSerializer = classToPlainSerializer;
    }

    public execute(req: Request, res: Response): void 
    {
        console.log(req.body)
        const car = this.plainToClassSerializer.transform(Car, req.body)

        console.log(car);

        this.carRepository.add(car);
        console.log(`Added car ${car.getMaker()} ${car.getModel()} to the list`)

        res.status(201).json(this.classToPlainSerializer.transform(car));
    }
}
