import CreateCarController from '../controller/createCarController';
import GetCarsController from '../controller/getCarsController';
import { Pimple, ServiceProvider } from '@timesplinter/pimple';

export default class ControllerServiceProvider implements ServiceProvider
{
    register(container: Pimple): void {
        container.set('controller.createCar', (container: Pimple) => {
            return new CreateCarController(container.get('repository.car'));
        });
        
        container.set('controller.getCars', (container: Pimple) => {
            return new GetCarsController(container.get('repository.car'));
        });
    }
}
