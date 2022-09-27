"use strict";
exports.__esModule = true;
exports.defaultConfig = void 0;
exports.defaultConfig = {
    config: {
        baudRate: 9600,
        dataBits: 8,
        highWaterMark: 32,
        parity: "none",
        maxNumberOfDisplays: 100,
        stopBits: 1
    },
    userSettings: {
        port: "COM1",
        writeInterval: 500
    },
    displays: []
};
