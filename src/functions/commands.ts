import { bot, Markup } from "./telegraf";
import reddit from "./reddit";
import * as config from "../config";
import { launchPolling } from "./luncher";

const start = async (): Promise<void> => {
    bot.start((ctx) => {
        const firstName = ctx.message.from.first_name.toString();
        ctx.telegram.sendMessage(
            ctx.message.chat.id,
            `*Hello ${firstName}*!\nWelcome to Subredditor✨\n`,
            {
                parse_mode: "Markdown",
            }
        );
    });
};

const launch = async (): Promise<void> => {
    const mode = config.nodeEnv;
    if (mode === "production") {
        // launchWebhook();
    } else {
        launchPolling();
    }
};

export { launch, start };
export default launch;
