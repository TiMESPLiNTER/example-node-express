import { ClassConstructor, ClassTransformOptions, plainToClass } from "class-transformer";

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
}
