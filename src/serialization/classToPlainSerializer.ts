import { classToPlain, ClassTransformOptions } from "class-transformer";

export default class ClassToPlainSerializer
{
    private options?: ClassTransformOptions;

    constructor(options?: ClassTransformOptions)
    {
        this.options = options;
    }

    public transform<T, V>(object: T): V
    {
        return classToPlain(object, this.options) as V;
    }
}
