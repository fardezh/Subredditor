import {
    Telegraf,
    Markup,
    Context,
    session,
    Scenes,
} from "telegraf";
import { message } from "telegraf/filters";
import { token } from "../config";

const bot = new Telegraf(token);

export { bot, Markup, message, Context, session, Scenes };
export default bot;
