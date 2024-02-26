import { loadEnv } from "./deps.ts";
import * as utils from "./utils.ts";
import { stops } from "./stations.ts";
import { getStop } from "./stations.ts";
import { TrainPosition } from "./types.ts";

await loadEnv({export: true});
const CTA_API_KEY = Deno.env.get('CTA_API_KEY');

type CTAArrivalsResponse = {
    ctatt: {
        tmst: string,
        errCd: string,
        errNm: string | null,
        eta: RawArrival[]
    }
}
type RawArrival = {
    staId: string,
    stpId: string,
    staNm: string,
    stpDe: string,
    rn: string,
    rt: string,
    destSt: string,
    destNm: string,
    trDr: string,
    prdt: string,
    arrT: string,
    isApp: string,
    isSch: string,
    isDly: string,
    isFlt: string,
    flags: null,
    lat: string,
    lon: string,
    heading: string,
}


export type Arrival = TrainPosition &  {
    stationId: number,
    stopId: number,
    stationName: string,
    stopDescription: string,
    trainDirection: string,
    isFaulted: boolean,
}
const parseArrival = (raw: RawArrival): Arrival => {
    console.log(raw);
    return {
        trainNumber: parseInt(raw.rn),
        route: utils.getTrainLine(raw.rt),
        destination: getStop(parseInt(raw.destSt)) || {
            stationName: "Loop",
            stationDescriptiveName: "Loop",
            
        },
        predictionTime: new Date(raw.prdt),
        arrivalTime: new Date(raw.arrT),
        isScheduled: raw.isSch === "1",
        isApproaching: raw.isApp === "1",
        isDelayed: raw.isDly === "1",
        isFaulted: raw.isFlt === "1",
        location: {
            latitude: parseFloat(raw.lat),
            longitude: parseFloat(raw.lon),
            heading: parseFloat(raw.heading)
        },
        stationId: parseInt(raw.staId),
        stopId: parseInt(raw.stpId),
        stationName: raw.staNm,
        stopDescription: raw.stpDe,
        trainDirection: raw.trDr as "N" | "S" | "E" | "W",
    } as Arrival;
}
export const getArrivalsForStation = async (stationId: number): Promise<Arrival[]> => {
    const url = `http://lapi.transitchicago.com/api/1.0/ttarrivals.aspx?key=${CTA_API_KEY}&mapid=${stationId}&outputType=JSON`;
    const response = await fetch(url);
    const data: CTAArrivalsResponse = await response.json();
    if(parseInt(data.ctatt.errCd) !== 0) {
        throw new Error(data.ctatt.errNm || "Unknown API Error");
    }
    return data.ctatt.eta.map(parseArrival);
}

