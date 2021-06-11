import { Request, Response } from 'express';
import Car from '../entity/car';
import CarRepository from '../repository/carRepository';
import ControllerInterface from './controllerInterface';
import PlainToClassSerializer from '../serialization/plainToClassSerializer';
import ClassToPlainSerializer from '../serialization/classToPlainSerializer';
import UuidFactory from '../factory/uuidFactory';

export default class CreateCarController implements ControllerInterface
{
    private carRepository: CarRepository;

    private plainToClassSerializer: PlainToClassSerializer;

    private classToPlainSerializer: ClassToPlainSerializer;

    private uuidFactory: UuidFactory;

    constructor(
        carRepository: CarRepository, 
        plainToClassSerializer: PlainToClassSerializer, 
        classToPlainSerializer: ClassToPlainSerializer,
        uuidFactory: UuidFactory
    ) {
        this.carRepository = carRepository;
        this.plainToClassSerializer = plainToClassSerializer;
        this.classToPlainSerializer = classToPlainSerializer;
        this.uuidFactory = uuidFactory;
    }

    public execute(req: Request, res: Response): void 
    {
        console.log(req.body);

        const car = this.plainToClassSerializer.transform(Car, {
            id: this.uuidFactory.create(),
            ...req.body
        });

        console.log(car);

        this.carRepository.add(car);
        
        console.log(`Added car ${car.getMaker()} ${car.getModel()} to the list`);

        res.status(201).json(this.classToPlainSerializer.transform(car));
    }
}
