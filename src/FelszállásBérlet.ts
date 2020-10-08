import Felszállás from "./Felszállás";

export default class FelszállásBérlet extends Felszállás {
    private _típus: string;
    private _érvényes: Date;
    constructor(sor: string) {
        super(sor); // ősosztály konstruktorát hívja meg
        const m: string[] = sor.split(" ");
        this._típus = m[3];
        const év = parseInt(m[1].substr(0, 4));
        const hónap = parseInt(m[1].substr(4, 2)) - 1; // TS-JS hónapok számozása 0-val indul!!!
        const nap = parseInt(m[4].substr(6, 2));
        this._érvényes = new Date(év, hónap, nap);
    }
}
