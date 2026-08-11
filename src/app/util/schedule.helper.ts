import { Block } from "../model/block";

export class ScheduleHelper {

    private static readonly HOURS_TRANSFORMER_AM : Map<string, string> = new Map()
    .set("01", "13")
    .set("02","14")
    .set("03", "15")
    .set("04", "16")
    .set("05", "17")
    .set("06", "18")
    .set("07", "19")
    .set("08", "20")
    .set("09", "21")
    .set("10", "22")
    .set("11", "23")
    .set("12", "24");

    private static readonly BLOCKS : Block[] = [
        Block.create("A", "08:10", "09:40"),
        Block.create("B", "09:55", "11:25"),
        Block.create("C", "11:40", "13:10"),
        Block.create("D", "14:30", "16:00"),
        Block.create("E", "16:15", "17:45"),
        Block.create("F", "18:00", "19:30"),
        Block.create("G", "19:45", "21:15")
    ];

    /*public static getHours(lapse : string) : string[] {
        let blocks : string[] = [];
        let hours = lapse.split("-");

        if(hours.length == 1){
            return blocks;
        }

        let initialHour = this.standardizeHour(hours[0].trim());
        let finalHour = this.standardizeHour(hours[1].trim());

        let initialBlock = this.getNameBlock(initialHour);

        let finalBlock = this.getNameBlock(finalHour); 
        
        while(true) {
            blocks.push(initialBlock);
            if(initialBlock == finalBlock) {
                break;
            }
            initialBlock = this.nextBlock(initialBlock);
        }
        return blocks;
    }*/

    public static getHours(block : string) {
        var result = [block];
        return result;
    }

    public static standardizeHour(hour : string){
        console.log(hour);
        if(hour.includes('AM')){
            return hour.split(' ')[0];
        }
        hour = hour.split(' ')[0];
        let fragmentHour = hour.split(':');
        let literalHour = fragmentHour[0]; 

        let literalHourTransformed = this.HOURS_TRANSFORMER_AM.get(literalHour);
        if(literalHourTransformed == undefined) {
            return hour;
        }
        return literalHourTransformed + ":" + fragmentHour[1];
    }

    public static getNameBlock(hour : string) {
        for(let block of this.BLOCKS) {
                if(this.hourIsMajor(hour, block.getHourInitial()) 
                && this.hourIsMajor(block.getHourFinal(), hour)) {
                return block.getType();
           }
        }
        return "A"; 
    }

    public static hourIsMajor(hour1: string, hour2: string): boolean {
        const [h1, m1] = hour1.split(":").map(Number);
        const [h2, m2] = hour2.split(":").map(Number);
    
        return h1 > h2 || (h1 === h2 && m1 >= m2);
    }

    public static nextBlock(blockName : string) : string {
        if(blockName > "G" || blockName < "A") {
            blockName = "A";
        }
        return String.fromCharCode(blockName.charCodeAt(0) + 1);
    }

    public static getBlockAsInt(blockName : string) : number {
        return blockName.charCodeAt(0) - 65;
    }

}