"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.launchPolling = void 0;
const telegraf_1 = __importDefault(require("./telegraf"));
const launchPolling = () => {
    telegraf_1.default.launch();
};
exports.launchPolling = launchPolling;
