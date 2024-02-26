import { log } from "./deps.ts";

interface DiscordLogHandlerOptions extends log.BaseHandlerOptions {
    webhookUrl: string;
    loggerName: string;
    useColors?: boolean
}

export class DiscordLogHandler extends log.BaseHandler {
    webhookUrl: string;
    loggerName: string;
    #useColors = true;

    constructor(levelName: log.LevelName, options: DiscordLogHandlerOptions) {
        super(levelName, options);
        this.webhookUrl = options.webhookUrl;
        this.loggerName = options.loggerName;
    }
    getColor(level: log.LevelName): number {
        switch(level) {
            case "DEBUG":
                return 0x00FF00;
            case "INFO":
                return 0x0000FF;
            case "WARN":
                return 0xFFFF00;
            case "ERROR":
                return 0xFF0000;
            case "CRITICAL":
                return 0xFF0000;
            default:
                return 0xFFFFFF;

        }
    }
    override log(msg: string) {
        const level = msg.split(" ")[0] as log.LevelName;
        const color = this.getColor(level);
        const errorContent = msg.split(" ").slice(1).join(" ");

        if(!this.webhookUrl) return console.log(msg);
        fetch(this.webhookUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                embeds: [{
                    title: `${this.loggerName} ${level}`,
                    description: "```\n" + errorContent + "\n```",
                    color: color,
                    timestamp: new Date().toISOString(),
                }]
            })
        })
    }
}
export const initLog = () => log.setup({
    handlers: {
        discord: new DiscordLogHandler("DEBUG", {
            webhookUrl: Deno.env.get("LOGGING_WEBHOOK")!,
            loggerName: "cta-discord-bot"
        }),
        console: new log.ConsoleHandler("DEBUG")
    },
    loggers: {
        default: {
            level: "DEBUG",
            handlers: ["console"],
        },
        errors: {
            level: "DEBUG",
            handlers: ["discord", "console"],
        }
    }
});
export const discordLog = log.getLogger("errors");
