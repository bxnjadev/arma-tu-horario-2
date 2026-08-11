export class Block {

    private readonly type : string;
    private readonly hourInitial : string;
    private readonly hourFinal : string;

    constructor(type : string, hourInitial : string
        , hourFinal : string) {
            this.type = type;
            this.hourInitial = hourInitial;
            this.hourFinal = hourFinal;
        }

    public getType() : string {
        return this.type;
    }

    public getHourInitial() : string {
        return this.hourInitial;
    }

    public getHourFinal() : string {
        return this.hourFinal;
    }

    public static create(type : string, hourInitial : string
        , hourFinal : string) : Block {
            return new Block(type, hourInitial, hourFinal);
        }

}