import CarRepository from "../repository/carRepository";
import { Request, Response } from 'express';
import ControllerInterface from "./controllerInterface";
import ClassToPlainSerializer from "../serialization/classToPlainSerializer";

export default class GetCarsController implements ControllerInterface
{
    private carRepository: CarRepository;

    private serializer: ClassToPlainSerializer;

    public constructor(carRepository: CarRepository, serializer: ClassToPlainSerializer)
    {
        this.carRepository = carRepository;
        this.serializer = serializer;
    }

    public execute(req: Request, res: Response): void
    {
        res.json(this.serializer.transform(this.carRepository.getAll()));
    }
}
