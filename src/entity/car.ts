import { Exclude, Expose } from 'class-transformer';

@Exclude()
export default class Car
{
    @Expose()
    private maker: string;

    @Expose()
    private model: string;

    private owner: string | null;

    constructor(maker: string, model: string, owner: string | null)
    {
        this.maker = maker;
        this.model = model;
        this.owner = owner;
    }

    getMaker(): string
    {
        return this.maker;
    }

    getModel(): string
    {
        return this.model;
    }

    getOwner(): string | null
    {
        return this.owner;
    }
}
