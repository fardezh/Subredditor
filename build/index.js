"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = require("telegraf");
const filters_1 = require("telegraf/filters");
const RedditService_1 = __importDefault(require("./services/RedditService"));
const env_1 = require("./config/env");
const reddit = new RedditService_1.default();
const bot = new telegraf_1.Telegraf(env_1.token);
bot.on((0, filters_1.message)("text"), (ctx) => {
    // reddit.searchSubreddits(ctx.message.text).then((subs) => {
    //     ctx.reply(
    //         "Nice",
    //         Markup.keyboard(subs, {
    //             columns: 5,
    //         })
    //     );
    // });
    // reddit.getTopSubreddits(10).then(() => {
    //     ctx.reply(
    //         "Send me a Subreddit name or you can send one from the list below",
    //         Markup.keyboard(["1", "2", "3"], {
    //             columns: 3,
    //         })
    //     );
    // });
});
// bot.on(message("text"), (ctx) => {
//     const sub = ctx.message.text;
//     console.log(sub);
//     // reddit.getSubPosts(sub, 10, "hot").then((posts) => {
//     //     posts?.forEach((p) => {
//     //         ctx.sendMediaGroup(p.link);
//     //     });
//     // });
// });
// middlewares
// bot.use(session());
// bot.use(stage.middleware());
// starting bot!
bot.launch()
    .then(() => {
    console.log("Bot is running🚀");
})
    .catch((err) => {
    console.log(`There was an error starting the bot:\n${err}`);
});
// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
