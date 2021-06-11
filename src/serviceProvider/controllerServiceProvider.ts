import CreateCarController from '../controller/createCarController';
import GetCarsController from '../controller/getCarsController';
import { Container, Pimple, ServiceProvider } from '@timesplinter/pimple';

export default class ControllerServiceProvider implements ServiceProvider
{
    register(container: Pimple): void {
        container.set('controller.createCar', (container: Container) => {
            return new CreateCarController(
                container.get('repository.car'), 
                container.get('serializer.plainToClass'),
                container.get('serializer.classToPlain'),
                container.get('factory.uuid'),
            );
        });
        
        container.set('controller.getCars', (container: Container) => {
            return new GetCarsController(
                container.get('repository.car'), 
                container.get('serializer.classToPlain'),
            );
        });
    }
}
