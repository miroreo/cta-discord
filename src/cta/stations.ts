import _stops from './stops.json' assert { type: "json" };
import _stations from './stations.json' assert { type: "json" };
import {StationStop, TrainLine} from '../../types.ts';

export const stops: StationStop[] = _stops.map(s => {
    const stop: StationStop = {
        stopId: parseInt(s.stop_id),
        directionId: s.direction_id as "N" | "S" | "E" | "W",
        stopName: s.stop_name,
        stationName: s.station_name,
        stationDescriptiveName: s.station_descriptive_name,
        mapId: parseInt(s.map_id),
        ADA: s.ada,
        lines: [],
        location: {
            latitude: parseFloat(s.location.latitude),
            longitude: parseFloat(s.location.longitude),
        },
    };
    if(s.red) stop.lines.push(TrainLine.RED);
    if(s.blue) stop.lines.push(TrainLine.BLUE);
    if(s.g) stop.lines.push(TrainLine.GREEN);
    if(s.brn) stop.lines.push(TrainLine.BROWN);
    if(s.p) stop.lines.push(TrainLine.PURPLE);
    if(s.pexp) stop.lines.push(TrainLine.PURPLE_EXPRESS);
    if(s.y) stop.lines.push(TrainLine.YELLOW);
    if(s.pnk) stop.lines.push(TrainLine.PINK);
    if(s.o) stop.lines.push(TrainLine.ORANGE);
    return stop;
})
const stations: {idFromName: {[key: string]: number}, nameFromId: {[key: number]: string}} = _stations;

export const getStop = (id: number): StationStop | undefined => {
    return stops.find(s => s.stopId === id);
}
export const getStopByName = (name: string): StationStop => {
    console.log(name);
    return stops.find(s => s.stationName === name) || {
        stationDescriptiveName: "Loop",
        stationName: "Loop",
        ADA: false,
    } as StationStop;
}

export const stopHasLine = (id: number, line: TrainLine): boolean => {
    const stop = getStop(id);
    return stop?.lines.includes(line) || false;
}

export const getStation = (id: number) => {
    return stations.nameFromId[id];
}
export const searchStations = (query: string): {id: number, name: string}[] => {
    let results: {id: number, name: string}[] = [];
    if(stations.idFromName[query]) return [{id: stations.idFromName[query], name: query}];

    Object.keys(stations.idFromName).forEach(key => {
        if(key.toLowerCase().includes(query.toLowerCase())) {
            results.push({
                id: stations.idFromName[key],
                name: key
            });
        }
    })
    return results;
}

export const stopsAtStation = (id: number): StationStop[] => {
    return stops.filter(s => s.mapId === id);
}
