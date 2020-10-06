import fs from "fs";
import http from "http";
import url from "url";

// Függvény definiálása:
function összead(a: number, b: number): number {
    return a + b;
}

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
        res.write("<title>Jedlik Ts Template</title>");
        res.write("</head>");
        res.write("<body><form><pre class='m-3'>");
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const params = url.parse(req.url as string, true).query;

        // Kezd a kódolást innen -->

        // Egyszerű üzenet megjelenítése a weboldalom
        res.write("Próba\n");
        res.write("Próba2\n");

        // Ez egy egysoros megjegyzés
        /* Ez
        egy
        többsoros megjegyzés */

        // var
        // var message: string = "Hello World";
        // Unexpected var, use let or const instead.
        // res.write(message);

        // Változó típus nélkül (Any)
        const a = 10;
        res.write(`${a}\n`);

        // Beépített típusok
        const szám: number = 34.23424;
        res.write(`${szám}\n`);

        const logikai: boolean = true;
        res.write(`${logikai}\n`);

        const pii: number = 3.14;
        res.write(`${pii === 3.14}\n`);

        // typeof operátor
        res.write(`${typeof szám}\n`);
        res.write(`${typeof logikai}\n`);

        // if
        if (szám > 0) {
            res.write("A szám pozitív!\n");
        }

        // for
        const num: number = 5;
        let factorial: number = 1;
        let i: number = 2;
        for (;;) {
            factorial *= i;
            i++;
            if (i > num) {
                break;
            }
        }
        res.write(`${num}!=${factorial}\n`);

        // for in - for of
        const nevek: string[] = ["Alex", "Márk", "Bence", "Olga"];
        // for in -> adatszerkezet index értékeit veszi fel i
        for (const i in nevek) {
            res.write(`${i}. -> ${nevek[i]}\n`);
        }
        // for of == c# foreach
        for (const i of nevek) {
            res.write(`${i}\n`);
        }

        // Függvény hívása
        const op1: number = 5;
        const op2: number = 20;
        res.write(`${op1} + ${op2} = ${összead(op1, op2)}\n`);

        // <---- Fejezd be a kódolást

        res.write("</pre></form>");
        res.write("</body></html>");
        res.end();
    }
}
