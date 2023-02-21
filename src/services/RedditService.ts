import Snoowrap from "snoowrap";
import {
    rdAccessToken,
    rdClientId,
    rdClientSecret,
    rdRefreshToken,
} from "../config/env";

type redditPostDataList = {
    [key: string]: any;
}[];

class RedditService {
    private clientId: string = rdClientId;
    private clientSecret: string = rdClientSecret;
    private accessToken: string = rdAccessToken;
    private refreshToken: string = rdRefreshToken;
    private reddit: Snoowrap;

    public constructor() {
        this.reddit = new Snoowrap({
            userAgent: "string!",
            clientId: this.clientId,
            clientSecret: this.clientSecret,
            refreshToken: this.refreshToken,
            accessToken: this.accessToken,
        });
    }

    private postMinifier(
        posts: Snoowrap.Listing<Snoowrap.Submission> | undefined
    ): redditPostDataList | [] {
        if (!posts) {
            return [];
        }

        let redditPostDataList: redditPostDataList = [];
        posts.forEach((post) => {
            redditPostDataList.push({
                link: post.url,
                text: post.title,
                score: post.score,
            });
        });

        return redditPostDataList;
    }

    public async getSubPosts(
        title: string,
        limit: number,
        sorting: "hot" | "new" | "controversial" | "top"
    ): Promise<redditPostDataList | []> {
        const subreddit = this.reddit.getSubreddit(title);
        let posts:
            | Snoowrap.Listing<Snoowrap.Submission>
            | undefined;
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

    public async getTopSubreddits(
        limit: number
    ): Promise<Snoowrap.Listing<Snoowrap.Subreddit>> {
        const popSubreddits =
            await this.reddit.getPopularSubreddits({ limit });

        return popSubreddits;
    }

    public async searchSubreddits(
        query: string
    ): Promise<string[]> {
        const searchedSubreddit =
            await this.reddit.searchSubredditNames({
                query,
                includeNsfw: true,
            });
        console.log(searchedSubreddit);

        return searchedSubreddit;
    }
}

export default RedditService;
