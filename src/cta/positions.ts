import { StationStop, TrainLine, TrainPosition } from '../../types.ts';
import { CTATTResponse } from "../../types.ts";
import {getStop, stops} from './stations.ts';
import { loadEnv, log } from "../../deps.ts";
import * as utils from "../utils.ts";

try {
	await utils.ensureEnvs(["CTA_API_KEY"]);
} catch(error) {
    log.getLogger("errors").error("Error loading environment variables.");
	// console.error(error);
	// Deno.exit(1);
}

const API_KEY = Deno.env.get("CTA_API_KEY");

const all_routes = "red,blue,brn,g,org,p,pink,y"
const url = `http://lapi.transitchicago.com/api/1.0/ttpositions.aspx?key=${API_KEY}&rt=${all_routes}&outputType=JSON`;

let trainPositions: TrainPosition[] = [];

function trainsOnLine(line: TrainLine) {
    return trainPositions.filter(train => train.route == line).length
}
export async function updatePositions() {
    const response = await fetch(url);
    const data = (await response.json()) as CTATTResponse;
    if(data.ctatt.errNm !== null) 
        throw new Error("Error thrown by CTA TrainTracker API. Error Number: " + data.ctatt.errNm);
    const lines = translateCTATT(data);
    lines.forEach(line => line.trains.forEach(t => trainPositions.push(t)));

    console.log("✅ Updated positions of trains. 🚇");
    console.log(`${trainsOnLine(TrainLine.RED) == 0 ? "❌" : "🚇"} ${trainsOnLine(TrainLine.RED)} Red line`);
    console.log(`${trainsOnLine(TrainLine.BLUE) == 0 ? "❌" : "🚇"} ${trainsOnLine(TrainLine.BLUE)} Blue line`);
    console.log(`${trainsOnLine(TrainLine.GREEN) == 0 ? "❌" : "🚇"} ${trainsOnLine(TrainLine.GREEN)} Green line`);
    console.log(`${trainsOnLine(TrainLine.BROWN) == 0 ? "❌" : "🚇"} ${trainsOnLine(TrainLine.BROWN)} Brown line`);
    console.log(`${trainsOnLine(TrainLine.PURPLE) == 0 ? "❌" : "🚇"} ${trainsOnLine(TrainLine.PURPLE)} Purple line`);
    console.log(`${trainsOnLine(TrainLine.YELLOW) == 0 ? "❌" : "🚇"} ${trainsOnLine(TrainLine.YELLOW)} Yellow line`);
    console.log(`${trainsOnLine(TrainLine.PINK) == 0 ? "❌" : "🚇"} ${trainsOnLine(TrainLine.PINK)} Pink line`);
    console.log(`${trainsOnLine(TrainLine.ORANGE) == 0 ? "❌" : "🚇"} ${trainsOnLine(TrainLine.ORANGE)} Orange line`);
    return trainPositions;
}
function translateCTATT(res: CTATTResponse) {
    const lines: {
        line: TrainLine, 
        trains: TrainPosition[]
    }[] = res.ctatt.route.map(line => {
        if(!line.train) 
            return {line: utils.getTrainLine(line["@name"]), trains: []};
        if(!Array.isArray(line.train)) 
            line.train = (Array.from([line.train]) as Array<any>);
        // console.log(line.train);
        const trains: TrainPosition[] = line.train?.map(train => {
            return {
                trainNumber: parseInt(train.rn),
                route: utils.getTrainLine(line["@name"]),
                destination: getStop(parseInt(train.destSt)),
                nextStation: getStop(parseInt(train.nextStpId)),
                predictionTime: new Date(train.prdt),
                arrivalTime: new Date(train.arrT),
                isScheduled: false,
                isApproaching: train.isApp == "1",
                isDelayed: train.isDly == "1",
                location: {
                    latitude: parseFloat(train.lat),
                    longitude: parseFloat(train.lon),
                    heading: parseInt(train.heading),
                }
            } as TrainPosition
        })
        return {
            line: utils.getTrainLine(line["@name"]),
            trains,
        };
    });
    return lines;
}
export function outOfPlaceTrains(positions: TrainPosition[]) {
    let badTrains: TrainPosition[] = [];

    positions.forEach(train => {
        if(!train.nextStation) return;
        if(train.nextStation.lines.indexOf(train.route) == -1) {
            if(train.route == TrainLine.PURPLE && train.nextStation.lines.indexOf(TrainLine.PURPLE_EXPRESS) != -1) return;
            badTrains.push(train);
            // console.log("⚠️ TRAIN OUT OF PLACE ⚠️");
            // console.log(`🚇 ${utils.trainLineString(train.route)} line train #${train.trainNumber}. Next Station ${train.nextStation.stopName}`);
        }
    });
    return badTrains;
};

function checkForOutOfPlaceTrains() {
    let found = false;
    trainPositions.forEach(train => {
        if(!train.nextStation) return;
        if(train.nextStation.lines.indexOf(train.route) == -1) {
            if(train.route == TrainLine.PURPLE && train.nextStation.lines.indexOf(TrainLine.PURPLE_EXPRESS) != -1)return;
            console.log(train.nextStation.lines)
            found = true;
            console.log("⚠️ TRAIN OUT OF PLACE ⚠️");
            console.log(`🚇 ${utils.trainLineString(train.route)} line train #${train.trainNumber}. Next Station ${train.nextStation.stopName}`);
        }
    });
    if(!found) console.log("✅ No trains out of place right now.")
}
function checkRunNumbers() {
    let runIssue = false;
    trainPositions.forEach(train => {
        let susNumber = false;
        if (train.trainNumber == 1225){
            console.log("🎄 Holiday Train Detected 🎄")
            return;
        }
        switch(train.route) {
            case TrainLine.RED:
                if(train.trainNumber < 800 || train.trainNumber > 999) susNumber = true;
                break;
            case TrainLine.BLUE:
                if(train.trainNumber < 100 || train.trainNumber > 299) susNumber = true;
                break;
            case TrainLine.GREEN:
                if(train.trainNumber > 99 && train.trainNumber < 600 || train.trainNumber > 699) susNumber = true;
                break;
            case TrainLine.BROWN:
                if(train.trainNumber < 400 || train.trainNumber > 499) susNumber = true;
                break;
            case TrainLine.PURPLE:
                if(train.trainNumber < 500 || train.trainNumber > 590) susNumber = true;
                break;
            case TrainLine.PURPLE_EXPRESS:
                if(train.trainNumber < 500 || train.trainNumber > 590) susNumber = true;
                break;
            case TrainLine.YELLOW:
                if(train.trainNumber < 590 || train.trainNumber > 599) susNumber = true;
                break;
            case TrainLine.PINK:
                if(train.trainNumber < 300 || train.trainNumber > 399) susNumber = true;
                break;
            case TrainLine.ORANGE:
                if(train.trainNumber < 700 || train.trainNumber > 799) susNumber = true;
                break;
            default: 
                susNumber = true;
        }
        if(susNumber) {
            runIssue = true;
            console.log("⚠️ Run number mismatch detected ⚠️");
            console.log(`🚇 Run ${train.trainNumber} is a ${utils.trainLineString(train.route)} line train.`);
        } 
    })
    if(!runIssue) console.log("✅ No run number mismatches detected right now.")
}
export function getBadRunNumbers(positions: TrainPosition[]) {
    let badTrains: TrainPosition[] = [];
    positions.forEach(train => {
        let susNumber = false;
        if (train.trainNumber == 1225){
            // console.log("🎄 Holiday Train Detected 🎄")
            return;
        }
        switch(train.route) {
            case TrainLine.RED:
                if(train.trainNumber < 800 || train.trainNumber > 999) susNumber = true;
                break;
            case TrainLine.BLUE:
                if(train.trainNumber < 100 || train.trainNumber > 299) susNumber = true;
                break;
            case TrainLine.GREEN:
                if(train.trainNumber > 99 && train.trainNumber < 600 || train.trainNumber > 699) susNumber = true;
                break;
            case TrainLine.BROWN:
                if(train.trainNumber < 400 || train.trainNumber > 499) susNumber = true;
                break;
            case TrainLine.PURPLE:
                if(train.trainNumber < 500 || train.trainNumber > 590) susNumber = true;
                break;
            case TrainLine.PURPLE_EXPRESS:
                if(train.trainNumber < 500 || train.trainNumber > 590) susNumber = true;
                break;
            case TrainLine.YELLOW:
                if(train.trainNumber < 590 || train.trainNumber > 599) susNumber = true;
                break;
            case TrainLine.PINK:
                if(train.trainNumber < 300 || train.trainNumber > 399) susNumber = true;
                break;
            case TrainLine.ORANGE:
                if(train.trainNumber < 700 || train.trainNumber > 799) susNumber = true;
                break;
            default: 
                susNumber = true;
        }
        if(susNumber) {
            badTrains.push(train);
            // console.log("⚠️ Run number mismatch detected ⚠️");
            // console.log(`🚇 Run ${train.trainNumber} is a ${utils.trainLineString(train.route)} line train.`);
        } 
    })
    return badTrains;
}
function checkDelays() {
    let delayFound = false;
    trainPositions.forEach(train => {
        if(train.isDelayed) {
            delayFound = true;
            console.log("⚠️ Train Delayed ⚠️");
            console.log(`🚇 ${utils.trainLineString(train.route)} Line Train ${train.trainNumber} is delayed, its next station should be ${train.nextStation?.stopName}`);
        }
    })
}
await updatePositions();
// checkForOutOfPlaceTrains();
// checkRunNumbers();
// checkDelays();