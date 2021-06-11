import { ClassConstructor, ClassTransformOptions, plainToClass, plainToClassFromExist } from 'class-transformer';

export default class PlainToClassSerializer
{
    private options?: ClassTransformOptions;

    constructor(options?: ClassTransformOptions)
    {
        this.options = options;
    }

    public transform<T, V>(cls: ClassConstructor<T>, plain: V): T
    {
        return plainToClass(cls, plain, this.options);
    }

    public transformFromExisting<T, V>(clsObject: T, plain: V): T
    {
        return plainToClassFromExist(clsObject, plain, this.options);
    }
}
