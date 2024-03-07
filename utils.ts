import { Discord, loadEnv, log as log_} from "./deps.ts";
import { TrainLine } from './types.ts';
import { discordLog, initLog } from "./logging.ts";

export const startTime = Date.now();

export function getTrainLine(lineString: string) {
  lineString = lineString.toLowerCase();
  switch (lineString) {
    case "red":
      return TrainLine.RED;
    case "blue":
      return TrainLine.BLUE;
    case "g":
      return TrainLine.GREEN;
    case "brn":
      return TrainLine.BROWN;
    case "p":
      return TrainLine.PURPLE;
    case "pexp":
      return TrainLine.PURPLE_EXPRESS;
    case "y":
      return TrainLine.YELLOW;
    case "pnk":
      return TrainLine.PINK;
    case "pink":
      return TrainLine.PINK;
    case "o":
      return TrainLine.ORANGE;
    case "org":
      return TrainLine.ORANGE;
    default:
      return TrainLine.UNDEFINED;
  }
}
export function trainLineString(trainLine: TrainLine) {
  switch (trainLine) {
    case TrainLine.RED:
      return "Red";
    case TrainLine.BLUE:
      return "Blue";
    case TrainLine.GREEN:
      return "Green";
    case TrainLine.BROWN:
      return "Brown";
    case TrainLine.PURPLE:
      return "Purple";
    case TrainLine.PURPLE_EXPRESS:
      return "Purple Express";
    case TrainLine.YELLOW:
      return "Yellow";
    case TrainLine.PINK:
      return "Pink";
    case TrainLine.ORANGE:
      return "Orange";
    case TrainLine.UNDEFINED:
      return "Undefined";
  }
}
export const lineColor = (line: TrainLine) => {
	switch(line) {
		case TrainLine.BLUE:
			return 0x00a1de;
		case TrainLine.RED:
			return 0xc60c30;
		case TrainLine.GREEN:
			return 0x009b3a;
		case TrainLine.ORANGE:
			return 0xf9461c;
		case TrainLine.YELLOW:
			return 0xf9e300;
		case TrainLine.PURPLE:
			return 0x522398;
		case TrainLine.BROWN:
			return 0x62361b;
		case TrainLine.PURPLE_EXPRESS:
			return 0x522398;
		case TrainLine.PINK:
			return 0xe27ea6;
		default:
			return 0x000000;
	}
}
export async function ensureEnvs(envs: string[]) {
  const config = await loadEnv({export: true});
  for (const env of envs) {
    if (!Deno.env.has(env)) {
      log.error(`Environment variable ${env} is not set.`);
      throw new Error(`Environment variable ${env} is not set.`);
    }
  }
  return config;
}
initLog();
export const log = {
  info: (message: string) => {
    log_.info(message);
  },
  warn: (message: string) => {
    discordLog.warn(message);

  },
  error: (message: string) => {
    discordLog.error(message);
  }
}