import { classToPlain, ClassTransformOptions } from "class-transformer";

export default class ClassToPlainSerializer
{
    private options?: ClassTransformOptions;

    constructor(options?: ClassTransformOptions)
    {
        this.options = options;
    }

    public transformFromClass<T>(object: T): Record<string, any>
    {
        return classToPlain(object, this.options);
    }
}
