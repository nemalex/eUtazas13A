import Felszállás from "./Felszállás";

export default class FelszállásBérlet extends Felszállás {
    private _típus: string;
    private _érvényes: Date;

    public get érvényesFelszállás(): boolean {
        //const érvényességLejár: number = this._érvényes.valueOf() + 24 * 60 * 60 * 1000; // egy napnyi ezred másodperc hozzáadása
        //return this._idő.valueOf() < érvényességLejár;
        return this._idő < this._érvényes;
    }

    constructor(sor: string) {
        super(sor); // ősosztály konstruktorát hívja meg
        const m: string[] = sor.split(" ");
        this._típus = m[3];
        const év: number = parseInt(m[4].substr(0, 4));
        const hónap: number = parseInt(m[4].substr(4, 2)) - 1; // TS-JS hónapok számozása 0-val indul!!!
        const nap: number = parseInt(m[4].substr(6, 2));
        this._érvényes = new Date(év, hónap, nap, 23, 59, 59, 999);
    }
}
