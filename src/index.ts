import {
    Composer,
    Scenes,
    session,
    Telegraf,
    Markup,
} from "telegraf";
import { message } from "telegraf/filters";

import RedditService from "./services/RedditService";
import {
    token,
    nodeEnv,
    webhookDomain,
    port,
} from "./config/env";

const reddit: RedditService = new RedditService();
const bot = new Telegraf(token);

bot.on(message("text"), (ctx) => {
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
        console.log(
            `There was an error starting the bot:\n${err}`
        );
    });

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
