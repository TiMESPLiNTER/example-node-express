import CarRepository from "../repository/carRepository";
import { Pimple, ServiceProvider } from '@timesplinter/pimple';

export default class RepositoryServiceProvider implements ServiceProvider
{
    public register(container: Pimple): void {
        container.set('repository.car', () => {
            return new CarRepository();
        });
    }
}
