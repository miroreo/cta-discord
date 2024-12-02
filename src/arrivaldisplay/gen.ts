/// <reference types="npm:@svgdotjs/svg.js" />
import { registerWindow, SVG, Svg } from "npm:@svgdotjs/svg.js";
/// <reference types="https://cdn.skypack.dev/@types/svgdom?dts" />
import { createSVGDocument, createSVGWindow } from "npm:svgdom";
import { initialize, svg2png } from "./svg2png.ts";
import { Arrival } from "../cta/arrivals.ts";
import { trainLineString } from "../utils.ts";
import { TrainLine } from "../../types.ts";
import * as utils from "../utils.ts";
import { getArrivalsForStop } from "../cta/arrivals.ts";

await initialize(Deno.readFile("./wasm/svg2png.wasm")).catch(() => {});

// await initialize(fetch('https://unpkg.com/svg2png-wasm/svg2png_wasm_bg.wasm')).catch(() => {});

const win = createSVGWindow();
registerWindow(win as unknown as Window, win.document);

const canvas: Svg = SVG(win.document.documentElement) as Svg;

export const generateArrivalsBoard = async (
  stopDescription: string,
  arrivals: Arrival[],
) => {
  canvas.clear();
  const clock = canvas.symbol().viewbox(0, 0, 15, 15);

  clock.path(
    "m7.50078,15.00156c-4.2,0 -7.5,-3.4 -7.5,-7.5s3.3,-7.5 7.5,-7.5c4.1,0 7.5,3.3 7.5,7.5s-3.4,7.5 -7.5,7.5zm0,-14c-3.6,0 -6.5,2.9 -6.5,6.5s2.9,6.5 6.5,6.5c3.6,0 6.5,-2.9 6.5,-6.5s-2.9,-6.5 -6.5,-6.5z",
  );
  clock.path(
    "m7.00078,8.00156c-0.1,0 -0.1,0 -0.2,-0.1c-0.2,-0.1 -0.3,-0.4 -0.2,-0.6l2.5,-4.7c0.1,-0.2 0.4,-0.3 0.6,-0.2c0.2,0.1 0.3,0.4 0.2,0.6l-2.5,4.7c-0.1,0.2 -0.2,0.3 -0.4,0.3z",
  )
    .opacity(0.6);
  clock.path(
    "m7.10078,8.00156c-0.1,0 -0.1,0 0,0c-0.3,0 -0.5,-0.2 -0.5,-0.5l0.4,-5.3c0,-0.3 0.2,-0.5 0.5,-0.4c0.3,0 0.5,0.2 0.4,0.5l-0.4,5.2c0,0.3 -0.2,0.5 -0.4,0.5z",
  )
    .opacity(0.3);
  clock.path(
    "m7.10078,8.00156c-0.1,0 -0.3,-0.1 -0.4,-0.2c-0.2,-0.2 -0.1,-0.5 0.1,-0.7l4.3,-3.2c0.2,-0.2 0.5,-0.1 0.7,0.1c0.2,0.2 0.1,0.5 -0.1,0.7l-4.4,3.2c0,0 -0.1,0.1 -0.2,0.1z",
  );

  const tracking = canvas.symbol().viewbox(0, 0, 20, 20);
  tracking.path(
    "M7.7,18c0-3.1-2.5-5.6-5.6-5.7l0,0c-0.2,0-0.4,0-0.6-0.2l0,0v0c-0.3-0.3-0.3-0.7,0-1l0,0C1.6,11,1.7,11,1.9,10.9l0,0c0,0,0,0,0,0h0c0,0,0,0,0,0l0,0c0,0,0.1,0,0.1,0l0,0c3.9,0,7.1,3.2,7.1,7.1l0,0c0,0.4-0.3,0.7-0.7,0.7l0,0C8,18.7,7.7,18.4,7.7,18L7.7,18z M17.9,18C17.9,9.2,10.8,2.1,2,2.1l0,0v0c-0.4,0-0.7-0.3-0.7-0.7l0,0C1.3,1,1.6,0.7,2,0.7l0,0c9.5,0,17.3,7.7,17.3,17.3l0,0c0,0.4-0.3,0.7-0.7,0.7l0,0C18.2,18.7,17.9,18.4,17.9,18L17.9,18z",
  );
  tracking.path(
    "M12.8,18C12.8,12.1,8,7.3,2.1,7.2l0,0c-0.3,0-0.6-0.1-0.7-0.4l0,0c-0.2-0.4,0-0.8,0.3-1l0,0c0,0-0.1,0,0.3-0.1l0,0c6.7,0,12.2,5.4,12.2,12.2l0,0c0,0.4-0.3,0.7-0.7,0.7l0,0C13.1,18.7,12.8,18.4,12.8,18L12.8,18z",
  );

  const numberOfArrivals = arrivals.length;
  arrivals = arrivals.slice(0, 8);
  let canvasHeight = 900;
  if (numberOfArrivals < 8) {
    canvasHeight = 65 + (numberOfArrivals * 105);
  }
  canvas.rect(1200, canvasHeight).fill("#1e1e1e").move(0, 0);
  canvas.text(stopDescription)
    .move(25, 30)
    .font({ size: 25, weight: "bold" })
    .fill("#FFF");
  arrivals.forEach((arrival, i) => {
    let toLoop = false;
    let inverse = false;
    switch (arrival.route) { // handle trains that go around the loop
      case TrainLine.BROWN:
        if (
          arrival.trainDirection == "5" &&
          arrival.destination.stationName == "Kimball"
        ) {
          toLoop = true;
        }
        break;
      case TrainLine.PURPLE:
        if (
          arrival.trainDirection == "5" &&
          arrival.destination.stationName == "Linden"
        ) {
          toLoop = true;
        }
        break;
      case TrainLine.PURPLE_EXPRESS:
        if (
          arrival.trainDirection == "5" &&
          arrival.destination.stationName == "Linden"
        ) {
          toLoop = true;
        }
        break;
      case TrainLine.PINK:
        if (
          arrival.trainDirection == "1" &&
          arrival.destination.stationName == "54th/Cermak"
        ) {
          toLoop = true;
        }
        break;
      case TrainLine.ORANGE:
        if (
          arrival.trainDirection == "1" &&
          arrival.destination.stationName == "Midway"
        ) {
          toLoop = true;
        }
        break;
      default:
        break;
    }
    if (
      ["Cottage Grove", "UIC-Halsted"].includes(arrival.destination.stationName) 
    ) {
      inverse = true;
    }
    canvas.rect(1200, 100)
      .fill(
        "#" +
          (inverse
            ? "FFF"
            : utils.lineColor(arrival.route).toString(16).padStart(6, "0")),
      )
      .move(0, 65 + (i * 105));
    canvas.text(`${toLoop ? "Loop" : arrival.destination.stationName}`)
      .move(25, 115 + (i * 105))
      .font({ size: 48, weight: "bold" })
      .fill(
        inverse
          ? "#" + utils.lineColor(arrival.route).toString(16).padStart(6, "0")
          : (arrival.route == TrainLine.YELLOW ? "#000" : "#FFF"),
      );
    canvas.text(
      `${trainLineString(arrival.route)} Line #${
        arrival.trainNumber.toString().padStart(3, "0")
      } to`,
    )
      .move(25, 75 + (i * 105))
      .font({ size: 20 })
      .fill(
        inverse
          ? "#" + utils.lineColor(arrival.route).toString(16).padStart(6, "0")
          : (arrival.route == TrainLine.YELLOW ? "#000" : "#FFF"),
      );

    if (minutesUntil(arrival.arrivalTime) < 2) {
      canvas.text("Due")
        .move(1130, 115 + (i * 105))
        .font({ size: 48, weight: "bold", anchor: "end" })
        .fill(
          inverse
            ? "#" + utils.lineColor(arrival.route).toString(16).padStart(6, "0")
            : (arrival.route == TrainLine.YELLOW ? "#000" : "#FFF"),
        );
    } else {
      canvas.text(`${minutesUntil(arrival.arrivalTime)} min`)
        .move(1130, 115 + (i * 105))
        .font({ size: 48, weight: "bold", anchor: "end" })
        .fill(
          inverse
            ? "#" + utils.lineColor(arrival.route).toString(16).padStart(6, "0")
            : (arrival.route == TrainLine.YELLOW ? "#000" : "#FFF"),
        );
    }
    if (arrival.isScheduled) {
      canvas.use(clock)
        .scale(0.5, 0.5, 1150, 100 + (i * 105))
        // clock.addTo(canvas)
        .move(1150, 100 + (i * 105))
        .fill(
          inverse
            ? "#" + utils.lineColor(arrival.route).toString(16).padStart(6, "0")
            : (arrival.route == TrainLine.YELLOW ? "#000" : "#FFF"),
        );
    } else {
      canvas.use(tracking)
        .scale(0.5, 0.5, 1150, 100 + (i * 105))
        .move(1150, 100 + (i * 105))
        .fill(
          inverse
            ? "#" + utils.lineColor(arrival.route).toString(16).padStart(6, "0")
            : (arrival.route == TrainLine.YELLOW ? "#000" : "#FFF"),
        );
    }
  });
  return await svg2png(canvas.svg(), {
    width: 1200,
    height: canvasHeight,
    fonts: await Promise.all([
      Deno.readFile("./ttf/Helvetica.ttf"),
      Deno.readFile("./ttf/Helvetica-Bold.ttf"),
      Deno.readFile("./ttf/Helvetica-BoldOblique.ttf"),
      Deno.readFile("./ttf/Helvetica-Light.ttf"),
    ]),
    defaultFontFamily: {
      sansSerifFamily: "Helvetica",
      serifFamily: "Helvetica",
      cursiveFamily: "Helvetica",
      fantasyFamily: "Helvetica",
      monospaceFamily: "Helvetica",
    },
  });
};

const fakeArrivals: Arrival[] = [{
  arrivalTime: new Date(new Date().setMinutes(new Date().getMinutes() + 1)),
  destination: {
    stationName: "95th/Dan Ryan",
    stationDescriptiveName: "95th/Dan Ryan",
  },
  isScheduled: false,
  route: TrainLine.RED,
  trainNumber: 919,
} as Arrival, {
  arrivalTime: new Date(new Date().setMinutes(new Date().getMinutes() + 7)),
  destination: {
    stationName: "UIC-Halsted",
    stationDescriptiveName: "UIC-Halsted",
  },
  isScheduled: true,
  route: TrainLine.BLUE,
  trainNumber: 112,
} as Arrival];
// const arrivals = await getArrivalsForStop(30075);
// arrivals.sort((a, b) => a.arrivalTime.getTime() - b.arrivalTime.getTime());
// generateArrivalsBoard(arrivals[0].stopDescription, arrivals);
// generateArrivalsBoard("Service at Inner Loop platform", fakeArrivals);
// const png =

function minutesUntil(arrival: Date) {
  const now = new Date();
  const diff = arrival.getTime() - now.getTime();
  return Math.ceil(diff / 60000);
}

// Deno.writeFile("test.png", await generateArrivalsBoard("Service at Inner Loop platform", fakeArrivals));
