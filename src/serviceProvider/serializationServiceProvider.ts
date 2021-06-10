import { Pimple, ServiceProvider } from "@timesplinter/pimple";
import ClassToPlainSerialzer from "../serialization/classToPlainSerializer";
import PlainToClassSerializer from "../serialization/plainToClassSerializer";

export default class SerializationServiceProvider implements ServiceProvider
{
    register(container: Pimple): void {
        container.set('serializer.plainToClass', () => {
            return new PlainToClassSerializer({ excludeExtraneousValues: true });
        });

        container.set('serializer.classToPlain', () => {
            return new ClassToPlainSerialzer();
        });
    }
}
