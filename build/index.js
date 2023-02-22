"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = require("telegraf");
const filters_1 = require("telegraf/filters");
const { reply, fork } = telegraf_1.Telegraf;
const RedditService_1 = __importDefault(require("./services/RedditService"));
const env_1 = require("./config/env");
// reddit service instance
const reddit = new RedditService_1.default();
// Create your bot and tell it about your context type
const bot = new telegraf_1.Telegraf(env_1.token);
// Make session data available
bot.use((0, telegraf_1.session)());
bot.start((ctx) => {
    const firstName = ctx.message.from.first_name.toString();
    ctx.replyWithMarkdown(`*Hello ${firstName}*!\nWelcome to Subredditor✨\n\nEnter any subreddit name:`, telegraf_1.Markup.keyboard([]));
});
// toggle including nsfw result in the search
bot.command("includeNsfw", async (ctx) => {
    var _a;
    (_a = ctx.session) !== null && _a !== void 0 ? _a : (ctx.session = { includeNsfw: false });
    ctx.session.includeNsfw = !ctx.session.includeNsfw;
    await ctx.reply(`NSFW posts set to ${ctx.session.includeNsfw ? "On" : "Off"}.`);
});
// getting the subreddit chosen!
bot.hears(/\/^🎈$|^(🎈).*\1$/, (ctx) => {
    const subreddit = ctx.message.text.replaceAll("🎈", "");
    reddit.getSubPosts(subreddit, 10, "hot").then((res) => {
        res.forEach((post) => {
            ctx.sendPhoto(post.link);
        });
    });
});
// searching subreddits
bot.on((0, filters_1.message)("text"), (ctx) => {
    var _a;
    const query = ctx.message.text.toLowerCase();
    reddit
        .searchSubreddits(query, (_a = ctx.session) === null || _a === void 0 ? void 0 : _a.includeNsfw)
        .then((res) => {
        res = res.map((item) => "🎈" + item + "🎈");
        ctx.reply("Here's what i found:", telegraf_1.Markup.keyboard(res.sort()).oneTime().resize());
    });
});
// Register middleware
// bot.on(message("text"), async (ctx) => {
//     // set a default value
//     ctx.session ??= { page: 0, allowNsfw: false };
//     ctx.session.page++;
//     await ctx.reply(`Seen ${ctx.session.page} messages.`);
// });
// bot.on(message("text"), (ctx) => {
//     // reddit.searchSubreddits(ctx.message.text).then((subs) => {
//     //     ctx.reply(
//     //         "Nice",
//     //         Markup.keyboard(subs, {
//     //             columns: 5,
//     //         })
//     //     );
//     // });
//     // reddit.getTopSubreddits(10).then(() => {
//     //     ctx.reply(
//     //         "Send me a Subreddit name or you can send one from the list below",
//     //         Markup.keyboard(["1", "2", "3"], {
//     //             columns: 3,
//     //         })
//     //     );
//     // });
// });
// middlewares
bot.use((0, telegraf_1.session)());
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
