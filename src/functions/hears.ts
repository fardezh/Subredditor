import bot from "./telegraf";

const text = async (): Promise<void> => {
    bot.on("text", (ctx) => {
        ctx.telegram.sendMessage(
            ctx.message.chat.id,
            `Your text --> ${ctx.update.message.text}`
        );
    });
};

export { text };
export default text;
