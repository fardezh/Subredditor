"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.text = void 0;
const telegraf_1 = __importDefault(require("./telegraf"));
const text = async () => {
    telegraf_1.default.on("text", (ctx) => {
        ctx.telegram.sendMessage(ctx.message.chat.id, `Your text --> ${ctx.update.message.text}`);
    });
};
exports.text = text;
exports.default = text;
