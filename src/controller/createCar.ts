import { Request, Response } from 'express';
import { plainToClass } from 'class-transformer';
import Car from '../entity/car';
import CarRepository from '../storage/carRepository';
import ControllerInterface from './controllerInterface';

export default class CreateCarController implements ControllerInterface
{
    private carRepository: CarRepository;

    constructor(carRepository: CarRepository)
    {
        this.carRepository = carRepository;
    }

    public execute(req: Request, res: Response): void 
    {
        console.log(req.body)
        const car = plainToClass(Car, req.body/*, { excludeExtraneousValues: true }*/)

        console.log(car);

        this.carRepository.add(car);
        console.log(`Added car ${car.getMaker()} ${car.getModel()} to the list`)

        res.sendStatus(201);
    }
}
