import bot from "./telegraf";
import * as config from "../config";

const launchPolling = (): void => {
    bot.launch();
};

export { launchPolling };
