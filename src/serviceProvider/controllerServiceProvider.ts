import CreateCarController from '../controller/createCarController';
import GetCarsController from '../controller/getCarsController';
import { Pimple, ServiceProvider } from '@timesplinter/pimple';

export default class ControllerServiceProvider implements ServiceProvider
{
    public register(container: Pimple): void {
        container.set('controller.createCar', () => {
            return new CreateCarController(
                // eslint-disable-next-line
                container.get('repository.car'),
                // eslint-disable-next-line
                container.get('serializer.plainToClass'),
                // eslint-disable-next-line
                container.get('serializer.classToPlain'),
                // eslint-disable-next-line
                container.get('factory.uuid'),
            );
        });

        container.set('controller.getCars', () => {
            return new GetCarsController(
                // eslint-disable-next-line
                container.get('repository.car'),
                // eslint-disable-next-line
                container.get('serializer.classToPlain'),
            );
        });
    }
}
