import RedditService from "../services/RedditService";
import * as config from "../config";

const reddit = new RedditService(
    config.rdClientId,
    config.rdClientSecret,
    config.rdAccessToken,
    config.rdRefreshToken
);

export default reddit;
