import Snoowrap from "snoowrap";
import * as config from "../config";

type redditPostDataList = {
    [key: string]: any;
}[];

class RedditService {
    private reddit: Snoowrap;

    public constructor(
        clientId: string,
        clientSecret: string,
        accessToken: string,
        refreshToken: string
    ) {
        this.reddit = new Snoowrap({
            userAgent: "user-agent",
            clientId: clientId,
            clientSecret: clientSecret,
            refreshToken: refreshToken,
            accessToken: accessToken,
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
            });

        return searchedSubreddit;
    }
}

export default RedditService;
