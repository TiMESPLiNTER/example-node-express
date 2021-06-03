import { classToPlain } from "class-transformer";
import CarRepository from "../storage/carRepository";
import { Request, Response } from 'express';
import ControllerInterface from "./controllerInterface";

export default class GetCarsController implements ControllerInterface
{
    private carRepository: CarRepository;

    constructor(carRepository: CarRepository)
    {
        this.carRepository = carRepository;
    }

    public execute(req: Request, res: Response): void
    {
        res.setHeader('Content-Type', 'application/json')
    
        res.send(JSON.stringify(classToPlain(this.carRepository.getAll())))
    }
}
