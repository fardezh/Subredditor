"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const snoowrap_1 = __importDefault(require("snoowrap"));
const env_1 = require("../config/env");
class RedditService {
    constructor() {
        this.clientId = env_1.rdClientId;
        this.clientSecret = env_1.rdClientSecret;
        this.accessToken = env_1.rdAccessToken;
        this.refreshToken = env_1.rdRefreshToken;
        this.reddit = new snoowrap_1.default({
            userAgent: "string!",
            clientId: this.clientId,
            clientSecret: this.clientSecret,
            refreshToken: this.refreshToken,
            accessToken: this.accessToken,
        });
    }
    postMinifier(posts) {
        if (!posts) {
            return [];
        }
        let redditPostDataList = [];
        posts.forEach((post) => {
            redditPostDataList.push({
                link: post.url,
                text: post.title,
                score: post.score,
            });
        });
        return redditPostDataList;
    }
    async getSubPosts(title, limit, sorting) {
        const subreddit = this.reddit.getSubreddit(title);
        let posts;
        switch (sorting) {
            case "hot":
                posts = await subreddit.getHot({ limit });
                break;
            case "new":
                posts = await subreddit.getNew({ limit });
                break;
            case "controversial":
                posts = await subreddit.getControversial({
                    limit,
                });
                break;
            case "top":
                posts = await subreddit.getTop({ limit });
                break;
            default:
                break;
        }
        const customPosts = this.postMinifier(posts);
        return customPosts;
    }
    async getTopSubreddits(limit) {
        const popSubreddits = await this.reddit.getPopularSubreddits({ limit });
        return popSubreddits;
    }
    async searchSubreddits(query) {
        const searchedSubreddit = await this.reddit.searchSubredditNames({
            query,
            includeNsfw: true,
        });
        console.log(searchedSubreddit);
        return searchedSubreddit;
    }
}
exports.default = RedditService;
