import { instanceToPlain, ClassTransformOptions } from "class-transformer";

export default class ClassToPlainSerializer
{
    private readonly options?: ClassTransformOptions;

    public constructor(options?: ClassTransformOptions)
    {
        this.options = options;
    }

    public transform<T, V>(object: T): V
    {
        return instanceToPlain(object, this.options) as V;
    }
}
