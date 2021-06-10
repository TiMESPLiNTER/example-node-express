import { Request, Response } from 'express';
import { mock } from 'jest-mock-extended';
import CreateCarController from '../../src/controller/createCarController';
import Car from '../../src/entity/car';
import CarRepository from '../../src/repository/carRepository';
import PlainToClassSerializer from '../../src/serialization/plainToClassSerializer';

describe('createCarController', () => {

    it('it stores new car', async () => {
        const car = new Car('Aston Martin', 'Vengeance', null);
        const requestBody = {
            maker: 'Aston Martin',
            model: 'Vengeance'
        };

        const mockPlainToClassSerializer = mock<PlainToClassSerializer>();
        mockPlainToClassSerializer.transform.calledWith(Car, requestBody).mockReturnValue(car);

        const mockCarRepository = mock<CarRepository>();
        mockCarRepository.add.calledWith(car);

        const mockRequest = mock<Request>();
        mockRequest.body = requestBody;

        const mockResponse = mock<Response>();
        mockResponse.sendStatus.calledWith(201);

        const controller = new CreateCarController(mockCarRepository, mockPlainToClassSerializer);

        controller.execute(mockRequest, mockResponse);

        expect(mockCarRepository.add).toHaveBeenCalledTimes(1);
        expect(mockPlainToClassSerializer.transform).toHaveBeenCalledTimes(1);
    });
});
