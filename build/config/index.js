"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rdRefreshToken = exports.rdClientSecret = exports.rdClientId = exports.rdAccessToken = exports.nodeEnv = exports.webhookDomain = exports.token = exports.port = void 0;
const { PORT, BOT_TOKEN, WEBHOOK_DOMAIN, NODE_ENV: nodeEnv, REDDIT_CLIENT_ID, REDDIT_CLIENT_SECRET, REDDIT_REFRESH_TOKEN, REDDIT_ACCESS_TOKEN, } = process.env;
exports.nodeEnv = nodeEnv;
const errorHandler = (arg) => {
    if (arg === null || arg === "") {
        throw new Error(`"${arg}" env var is required!`);
    }
};
const port = Number(PORT);
exports.port = port;
const token = BOT_TOKEN || "";
exports.token = token;
const webhookDomain = WEBHOOK_DOMAIN || "";
exports.webhookDomain = webhookDomain;
const rdClientId = REDDIT_CLIENT_ID || "";
exports.rdClientId = rdClientId;
const rdAccessToken = REDDIT_ACCESS_TOKEN || "";
exports.rdAccessToken = rdAccessToken;
const rdClientSecret = REDDIT_CLIENT_SECRET || "";
exports.rdClientSecret = rdClientSecret;
const rdRefreshToken = REDDIT_REFRESH_TOKEN || "";
exports.rdRefreshToken = rdRefreshToken;
if (nodeEnv === "production" && !webhookDomain)
    throw new Error('"WEBHOOK_DOMAIN" env var is required!');
errorHandler(token);
errorHandler(rdClientId);
errorHandler(rdAccessToken);
errorHandler(rdClientSecret);
errorHandler(rdRefreshToken);
