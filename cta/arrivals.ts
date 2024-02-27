import { loadEnv, log } from "../deps.ts";
import * as utils from "../utils.ts";
import { stops, searchStations } from "./stations.ts";
import { getStop, getStopByName } from "./stations.ts";
import { StationStop, TrainPosition } from "../types.ts";
import { initLog, discordLog } from "../logging.ts";

// initLog();

try {
	await utils.ensureEnvs(["CTA_API_KEY"]);
} catch(error) {
	discordLog.error(error);
	Deno.exit(1);
}
const CTA_API_KEY = Deno.env.get("CTA_API_KEY");

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
    
    const destination = getStop(parseInt(raw.destSt)) || getStopByName(raw.destNm);
    // console.log(raw);
    return {
        trainNumber: parseInt(raw.rn),
        route: utils.getTrainLine(raw.rt),
        destination,
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
        discordLog.error(`Unknown API Error: ${data.ctatt.errNm} for station ${stationId}`);
    }
    return data.ctatt.eta.map(parseArrival);
}

export const getArrivalsForStop = async (stopId: number): Promise<Arrival[]> => {
    const url = `http://lapi.transitchicago.com/api/1.0/ttarrivals.aspx?key=${CTA_API_KEY}&stpid=${stopId}&outputType=JSON`;
    const response = await fetch(url);
    const data: CTAArrivalsResponse = await response.json();
    if(parseInt(data.ctatt.errCd) !== 0) {
        discordLog.error(`Unknown API Error: ${data.ctatt.errNm} for station ${stopId}`);
    }
    return data.ctatt.eta.map(parseArrival);
}
