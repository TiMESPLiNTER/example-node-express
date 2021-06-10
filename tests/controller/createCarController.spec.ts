import { Request, Response } from 'express';
import { mock } from 'jest-mock-extended';
import CreateCarController from '../../src/controller/createCarController';
import Car from '../../src/entity/car';
import CarRepository from '../../src/repository/carRepository';
import ClassToPlainSerializer from '../../src/serialization/classToPlainSerializer';
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

        const mockClassToPlainSerializer = mock<ClassToPlainSerializer>();
        mockClassToPlainSerializer.transform.calledWith(car).mockReturnValue(requestBody);

        const mockCarRepository = mock<CarRepository>();
        mockCarRepository.add.calledWith(car);

        const mockRequest = mock<Request>();
        mockRequest.body = requestBody;

        const mockResponse = mock<Response>();
        mockResponse.status.calledWith(201).mockReturnValue(mockResponse);
        mockResponse.json.calledWith(requestBody).mockReturnValue(mockResponse);

        const controller = new CreateCarController(
            mockCarRepository, 
            mockPlainToClassSerializer, 
            mockClassToPlainSerializer
        );

        controller.execute(mockRequest, mockResponse);

        expect(mockCarRepository.add).toHaveBeenCalledTimes(1);
        expect(mockPlainToClassSerializer.transform).toHaveBeenCalledTimes(1);
    });
});
