import { Discord, loadEnv, log } from "./deps.ts";
import { TrainLine } from './types.ts';

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

export async function ensureEnvs(envs: string[]) {
  await loadEnv({export: true});
  for (const env of envs) {
    if (!Deno.env.get(env)) {
      log.getLogger("errors").error(`Environment variable ${env} is not set.`);
      throw new Error(`Environment variable ${env} is not set.`);
    }
  }
}

export function sendErrorMessage(level: string, message: string) {
  fetch(Deno.env.get("LOGGING_WEBHOOK")!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: message,
      username: "cta-discord-bot ERROR",
      embeds: [
        {
          title: level,
          description: message,
        }
      ]
    }),
  });
}
