const {
    PORT,
    BOT_TOKEN,
    WEBHOOK_DOMAIN,
    NODE_ENV: nodeEnv,
    REDDIT_CLIENT_ID,
    REDDIT_CLIENT_SECRET,
    REDDIT_REFRESH_TOKEN,
    REDDIT_ACCESS_TOKEN,
} = process.env;

const errorHandler = (arg: any) => {
    if (arg === null || arg === "") {
        throw new Error(`"${arg}" env var is required!`);
    }
};

const port: number = Number(PORT);
const token: string = BOT_TOKEN || "";
const webhookDomain: string = WEBHOOK_DOMAIN || "";
const rdClientId: string = REDDIT_CLIENT_ID || "";
const rdAccessToken: string = REDDIT_ACCESS_TOKEN || "";
const rdClientSecret: string = REDDIT_CLIENT_SECRET || "";
const rdRefreshToken: string = REDDIT_REFRESH_TOKEN || "";

if (nodeEnv === "production" && !webhookDomain)
    throw new Error('"WEBHOOK_DOMAIN" env var is required!');

errorHandler(token);
errorHandler(rdClientId);
errorHandler(rdAccessToken);
errorHandler(rdClientSecret);
errorHandler(rdRefreshToken);

export {
    port,
    token,
    webhookDomain,
    nodeEnv,
    rdAccessToken,
    rdClientId,
    rdClientSecret,
    rdRefreshToken,
};
