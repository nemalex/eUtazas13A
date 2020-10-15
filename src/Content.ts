import fs from "fs";
import http from "http";
import Megoldás from "./Megoldás";

export default class Content {
    public content(req: http.IncomingMessage, res: http.ServerResponse): void {
        // favicon.ico kérés kiszolgálása:
        if (req.url === "/favicon.ico") {
            res.writeHead(200, { "Content-Type": "image/x-icon" });
            fs.createReadStream("favicon.ico").pipe(res);
            return;
        }
        // Weboldal inicializálása + head rész:
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.write("<!DOCTYPE html>");
        res.write("<html lang='hu'>");
        res.write("<head>");
        res.write("<style>input, pre {font-family:monospace; font-size:1em; font-weight:bold;}</style>");
        res.write("<meta name='viewport' content='width=device-width, initial-scale=1.0'>");
        res.write("<title>eUtazás</title>");
        res.write("</head>");
        res.write("<body><form><pre class='m-3'>");

        // Kezd a kódolást innen -->

        //1. feladat - adatok beolvasása tárolása
        const megold: Megoldás = new Megoldás("utasadat.txt");

        //2. feladat
        res.write(`2. feladat\nA buszra ${megold.felszállókSzáma} utas akart felszállni.\n`);

        //3. feladat
        res.write(`3. feladat\nA buszra ${megold.érvénytelenFelszállás} utas nem szállhatott fel.\n`);

        //4. feladat, első megoldás (array)
        res.write(`4. feladat Array-el\nA legtöbb utas (${megold.maxKeresArray.maxFelszállók} fő) a ${megold.maxKeresArray.maxElsőMegálló} megállóban próbált felszállni.\n`);

        //4. feladat, második megoldás (map)
        res.write(`4. feladat Map-pel\nA legtöbb utas (${megold.maxKeresMap.maxFelszállók} fő) a ${megold.maxKeresMap.maxElsőMegálló} megállóban próbált felszállni.\n`);

        //5. feladat
        res.write(`5. feladat\nIngyenesen utazók száma: ${megold.ingyenesenUtazók} fő\nKedvezményesen utazók száma: ${megold.kedvezményesenUtazók} fő`);

        //7. feladat
        megold.figyelmeztetéseketÁllománybaÍr("figyelmeztetes.txt");

        // <---- Fejezd be a kódolást

        res.write("</pre></form>");
        res.write("</body></html>");
        res.end();
    }
}
