import fs from "fs";
import Felszállás from "./Felszállás";

export default class Megoldás {
    private _utasAdatok: Felszállás[] = [];
    constructor(forrás: string) {
        fs.readFileSync(forrás)
            .toString()
            .split("\n")
            .forEach(i => {});
    }
}
