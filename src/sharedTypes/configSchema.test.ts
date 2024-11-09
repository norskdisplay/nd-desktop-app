import { v4 } from "uuid"
import { Config, configSchema } from "./configSchema"

describe("configSchema", () => {
    const getValidConfig = ():Config => {
        return {
            displays: [],
            out: {
                comConfig: null,
                protocol: "TCP",
                refreshRate: 200,
                // tcpConfig: {
                //     ip: "192.168.0.1",
                //     networkMask: "255.255.255.0",
                //     port: 200,
                // }
            },
            user: {
                startAppOnOSLogin: false,
                startSendingOnAppStart: false
            }
        }
    }
    it("config schema does pass validation for tcp config when no displays", () => {
        const schema = getValidConfig()
        var res = configSchema.safeParse(schema)
        expect(res.success).toBe(true)
    })

    it("config schema does fail validation when no valid config in display", () => {
        const schema = getValidConfig()
        schema.displays.push({
            description: "some",
            name: "name",
            address: 1,
            characters: 0,
            addressGroup: 1,
            addressUnit: 3,
            id: v4()
        })
        var res = configSchema.safeParse(schema)
        expect(res.success).toBe(false)
    })

    it("config schema does pass validation for tcp config when there are valid displays", () => {
        const schema = getValidConfig()
        schema.displays.push({
            description: "some",
            name: "name",
            address: 1,
            characters: 2,
            ip: "192.168.0.1",
            // networkMask: "255.255.255.0",
            port: 1,
            addressGroup: 1,
            addressUnit: 3,
            id: v4()
        })
        var res = configSchema.safeParse(schema)
        expect(res.success).toBe(true)
    })

    it("config schema does pass validation for com config when there are valid displays", () => {
        const schema = getValidConfig()
        schema.out.comConfig = {
            baudRate: 9600,
            dataBits: "5",
            highWaterMark: 32,
            parity: "even",
            port: 2,
            stopBits: "1"
        }
        schema.out.protocol = "COM"
        schema.displays.push({
            description: "some",
            name: "name",
            address: 1,
            characters: 2,
            addressGroup: 1,
            addressUnit: 3,
            id: v4()
        })
        var res = configSchema.safeParse(schema)
        expect(res.success).toBe(true)
    })
})