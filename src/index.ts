import { Context, Markup, session, Telegraf } from "telegraf";
import { message } from "telegraf/filters";
const { reply, fork } = Telegraf;

import RedditService from "./services/RedditService";
import {
    token,
    nodeEnv,
    webhookDomain,
    port,
} from "./config/env";

interface SessionData {
    includeNsfw: boolean;
}

interface CustomContext extends Context {
    session?: SessionData;
}

// reddit service instance
const reddit: RedditService = new RedditService();
// Create your bot and tell it about your context type
const bot = new Telegraf<CustomContext>(token);

// Make session data available
bot.use(session());

bot.start((ctx) => {
    const firstName = ctx.message.from.first_name.toString();
    ctx.replyWithMarkdown(
        `*Hello ${firstName}*!\nWelcome to Subredditor✨\n\nEnter any subreddit name:`,
        Markup.keyboard([])
    );
});

// toggle including nsfw result in the search
bot.command("includeNsfw", async (ctx) => {
    ctx.session ??= { includeNsfw: false };
    ctx.session.includeNsfw = !ctx.session.includeNsfw;
    await ctx.reply(
        `NSFW posts set to ${
            ctx.session.includeNsfw ? "On" : "Off"
        }.`
    );
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
bot.on(message("text"), (ctx) => {
    const query = ctx.message.text.toLowerCase();
    reddit
        .searchSubreddits(query, ctx.session?.includeNsfw)
        .then((res) => {
            res = res.map((item) => "🎈" + item + "🎈");
            ctx.reply(
                "Here's what i found:",
                Markup.keyboard(res.sort()).oneTime().resize()
            );
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
bot.use(session());
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
