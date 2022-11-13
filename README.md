# Norsk Display Desktop App
Desktop app using: 
* Electron
* Lit and lit-html (web components)
* TailwindCSS
* Serialport

## Develop
Start: `npm start`
Build: `npm run build`

## Build and Package
`npm run package`
Use RC Edit to rename and brand the application: https://github.com/electron/rcedit


https://medium.com/jspoint/packaging-and-distributing-electron-applications-using-electron-builder-311fc55178d9


https://github.com/electron-userland/electron-builder

https://www.electron.build/icons

https://stackoverflow.com/questions/64545042/nodejs-serial-port-to-tcp

* Kjøre applikasjonen når PC starter (ikke viktig)

Starte med TCP protokollen (kan legge til andre valg senere)
Trenger: IP, nettverksmaske, port. Portnummer 65535.

Når TCP valgt: fjerne badu rate etc

skal kunne velge "Gate" på sikt eks 00 = default,  01 = Luke 1 etc (dette må konfigurers)


Program can be long running process. Should not close window.
can cache text history - text displayed
merge fields burde oppdateres i interval - eks $h = hours akkurat nå

https://stackoverflow.com/questions/73087378/node-js-how-to-send-and-receive-one-byte-to-a-device-through-serial-port
```javascript
const s = require('net').Socket();
s.connect(5555, '127.0.0.1');

s.on('data', function(d){
    console.log('Got', d);
    if(d.equals(Buffer.from([0x80]))) {
        s.write(Buffer.from([0x81]));
    } else if(d.equals(Buffer.from([0x81]))) {
        s.write(Buffer.alloc(10000, 1));
    }
});```