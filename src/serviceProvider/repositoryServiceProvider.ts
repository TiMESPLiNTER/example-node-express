import CarRepository from "../repository/carRepository";
import { Pimple, ServiceProvider } from '@timesplinter/pimple';

export default class RepositoryServiceProvider implements ServiceProvider
{
    register(container: Pimple): void {
        container.set('repository.car', () => {
            return new CarRepository();
        });
    }
}