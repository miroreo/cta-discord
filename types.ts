export enum TrainLine {
    RED,
    BLUE,
    GREEN,
    BROWN,
    PURPLE,
    PURPLE_EXPRESS,
    YELLOW,
    PINK,
    ORANGE,
    UNDEFINED
}
export type Routes = TrainLine[];
export type StationStop = {
    stopId: number;
    directionId: "N" | "S" | "E" | "W";
    stopName: string;
    stationName: string;
    stationDescriptiveName: string;
    mapId: number;
    ADA: boolean;
    lines: TrainLine[];
    location: {
        latitude: number;
        longitude: number;
    };
}
export type TrainPosition = {
    trainNumber: number,
    route: TrainLine;
    destination: StationStop,
    nextStation?: StationStop,
    predictionTime: Date,
    arrivalTime: Date,
    isScheduled: boolean,
    isApproaching: boolean,
    isDelayed: boolean,
    isFaulted?: boolean,
    flags?: null,
    location: {
        latitude: number,
        longitude: number,
        heading: number
    }
};

export type CTATTResponse = {
    ctatt: {
        tmst: string, // DateTime String
        errCd: string, // numeric error code
        errNm: string | null, // error message
        route: {
            "@name": string,
            train: {
                rn: string, // run number
                destSt: string, // destination station
                destNm: string, // destination station name
                trDr: string, // train direction
                nextStaId: string, // next station id
                nextStpId: string, // next stop id
                nextStaNm: string, // next station name
                prdt: string, // prediction time
                arrT: string, // arrival time
                isSch: string, // is scheduled
                isApp: string, // is approaching
                isDly: string, // is delayed
                flags: null, // flags
                lat: string, // latitude
                lon: string, // longitude
                heading: string // heading
            }[]
        }[]
    }
}
