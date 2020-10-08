import fs from "fs";
import Felszállás from "./Felszállás";
import FelszállásBérlet from "./FelszállásBérlet";
import FelszállásJegy from "./FelszállásJegy";

interface Imaxkeresés {
    maxFelszállók: number;
    maxElsőMegálló: number;
}

export default class Megoldás {
    private _utasAdatok: Felszállás[] = [];

    public get felszállókSzáma(): number {
        return this._utasAdatok.length;
    }

    public get érvénytelenFelszállás(): number {
        return this._utasAdatok.filter(x => !x.érvényesFelszállás).length;
    }

    public get maxKeresArray(): Imaxkeresés {
        const max: Imaxkeresés = { maxFelszállók: -1, maxElsőMegálló: -1 };
        const statArray: number[] = new Array(30).fill(0);
        this._utasAdatok.forEach(i => {
            statArray[i.megállóSorszáma]++;
        });
        max.maxFelszállók = Math.max(...statArray);
        for (const i in statArray) {
            if (statArray[i] === max.maxFelszállók) {
                max.maxFelszállók = parseInt(i);
                break;
            }
        }
        return max;
    }

    constructor(forrás: string) {
        fs.readFileSync(forrás)
            .toString()
            .split("\n")
            .forEach(i => {
                const aktSor: string = i.trim();
                const aktTípus: string = aktSor.split(" ")[3];
                if (aktTípus === "JGY") {
                    this._utasAdatok.push(new FelszállásJegy(aktSor));
                } else if (["FEB", "TAB", "NYB", "NYP", "RVS", "GYK"].includes(aktTípus)) {
                    this._utasAdatok.push(new FelszállásBérlet(aktSor));
                }
            });
    }
}
