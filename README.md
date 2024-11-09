# Norsk Display Desktop App
Desktop app using: 
* Electron
* React
* TailwindCSS
* Serialport

## Develop
Start: `npm run electron:dev`
Build: `npm run electron:build`

## Build and Package
1) Run `npm run electron:build` to build the frontend, copy required files and build the electron app
2) `.exe` file can be found withing the `dist` folder when task successfully completes
`npm run package`
Use RC Edit to rename and brand the application: https://github.com/electron/rcedit

## Ny feature
Under configuration kan man velge mellom "COM" og Ethernet. 
* Der lister vi ut 
* Alle displayer skal ha en adresse (to separate felter - group og unit) begge felter mellom 0 og 255 (default 0 på begge)
* eget felt for navn (tekst) for å kjenne igjen
* Hvis eteret
* ipadresse
* port
* nettverksmaske

max antall displayer: 16
antall displayer settes opp under config

COM: alle felter er globale (som i dag)
TCP: IP og nettverksmaske og port er per dispay.

Com-port er global.

Home page:
* kun tekst som skal kunne endres
* ingen redigering el skal kunne gjøres her
* lage en liten preview av tekst? kunne vært kult med tekst som "ruller"

* Nytt  valg for at vindu alltid skal være på toppen

## Fremtid (ønskeliste):
Kunne kjøre flere instanser av appen med ulikt oppsett.


https://medium.com/jspoint/packaging-and-distributing-electron-applications-using-electron-builder-311fc55178d9


https://github.com/electron-userland/electron-builder

https://www.electron.build/icons

https://stackoverflow.com/questions/64545042/nodejs-serial-port-to-tcp

* Kjøre applikasjonen når PC starter (ikke viktig)

Starte med TCP protokollen (kan legge til andre valg senere)
Trenger: IP, nettverksmaske, port. Portnummer 65535.

Når TCP valgt: fjerne badu rate etc

skal kunne velge "Gate" på sikt eks 00 = default,  01 = Luke 1 etc (dette må konfigurers)