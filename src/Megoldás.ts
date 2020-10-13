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
                max.maxElsőMegálló = parseInt(i);
                break;
            }
        }
        return max;
    }

    public get maxKeresMap(): Imaxkeresés {
        const max: Imaxkeresés = { maxFelszállók: -1, maxElsőMegálló: -1 };
        const statMap: Map<number, number> = new Map<number, number>();
        this._utasAdatok.forEach(i => {
            if (statMap.has(i.megállóSorszáma)) {
                statMap.set(i.megállóSorszáma, (statMap.get(i.megállóSorszáma) as number) + 1);
            } else {
                statMap.set(i.megállóSorszáma, 1);
            }
        });
        max.maxFelszállók = Math.max(...statMap.values());
        for (const [key, value] of statMap) {
            if (value === max.maxFelszállók) {
                max.maxElsőMegálló = key;
                break;
            }
        }
        return max;
    }

    public get ingyenesenUtazók(): number {
        return this._utasAdatok.filter(x => x.ingyenesUtazás).length;
    }

    public get kedvezményesenUtazók(): number {
        return this._utasAdatok.filter(x => x.kedvezményesUtazás).length;
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
