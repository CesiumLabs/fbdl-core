const fetch = require("node-fetch");
const https = require("https");
const http = require("http");
const { JSDOM } = require("jsdom");
const safeEval = require("safe-eval");
const { Readable } = require("stream");

class FBDL {

    constructor() {
        throw new Error(`The ${this.constructor.name} class may not be instantiated!`);
    }

    /**
     * Validates facebook url
     * @param {string} url URL to validate
     */
    static validateURL(url) {
        const REGEX = /(https?:\/\/)(www\.|m\.)?(facebook|fb).com\/.*\/videos\/.*/;
        if (!url || typeof url !== "string") return false;
        return REGEX.test(url);
    }

    /**
     * Downloads facebook video
     * @param {string} url Video url to download
     * @returns {Promise<Readable>}
     */
    static download(url) {
        return new Promise(async (resolve, reject) => {
            if (!FBDL.validateURL(url)) reject(new Error("Invalid url."));
            const info = await FBDL.getInfo(url);
            if (!info || !info.streamURL) return reject(new Error("video not found"));
            const link = info.streamURL;
            let req = https;

            if (link.startsWith("http://")) req = http;

            req.get(link, res => {
                resolve(res);
            });
        });
    }

    /**
     * Fetches facebook video info
     * @param {string} url Facebook video url
     */
    static async getInfo(url) {
        if (!FBDL.validateURL(url)) throw new Error("Invalid url.");
        try {
            const html = await FBDL._parseHTML(url);
            const document = new JSDOM(html).window.document;
            const rawdata = document.querySelector('script[type="application/ld+json"]').innerHTML;
            const json = JSON.parse(rawdata);

            const reactions = html.split('top_reactions:{edges:')[1].split('},associated_video')[0];
            const reactionData = safeEval(reactions);

            const obj = {
                name: json.name,
                title: document.querySelector('meta[property="og:title"]').attributes.item(1).value,
                description: json.description,
                rawVideo: json.contentUrl,
                thumbnail: json.thumbnailUrl,
                uploadedAt: new Date(json.uploadDate),
                duration: FBDL.parseTime(json.duration),
                interactionCount: json.interactionCount,
                streamURL: json.url,
                publishedAt: new Date(json.datePublished),
                width: json.width,
                height: json.height,
                nsfw: !json.isFamilyFriendly,
                genre: json.genre,
                keywords: json.keywords ? json.keywords.split(", ") : [],
                comments: json.commentCount,
                size: json.contentSize,
                quality: json.videoQuality,
                author: {
                    type: json.author["@type"],
                    name: json.author.name,
                    url: json.author.url
                },
                publisher: {
                    type: json.publisher["@type"],
                    name: json.publisher.name,
                    url: json.publisher.url,
                    avatar: json.publisher.logo.url,
                    name: json.publisher.name,
                    url: json.publisher.url
                },
                url: html.split('",page_uri:"')[1].split('",')[0],
                reactions: {
                    total: parseInt(html.split(',reaction_count:')[1].split('},')[0].split(':')[1]) || 0,
                    like: reactionData.find(x => x.node.reaction_type === "LIKE").reaction_count || 0,
                    love: reactionData.find(x => x.node.reaction_type === "LOVE").reaction_count || 0,
                    care: reactionData.find(x => x.node.reaction_type === "SUPPORT").reaction_count || 0,
                    wow: reactionData.find(x => x.node.reaction_type === "WOW").reaction_count || 0,
                    haha: reactionData.find(x => x.node.reaction_type === "HAHA").reaction_count || 0,
                    sad: reactionData.find(x => x.node.reaction_type === "SORRY").reaction_count || 0,
                    angry: reactionData.find(x => x.node.reaction_type === "ANGER").reaction_count || 0

                },
                shares: html.split(',share_count:{')[1].split('},')[0].split(':')[1],
                views: html.split(',video_view_count:')[1].split(',')[0]
            };

            return obj;
        } catch(e) {
            return null;
        }
    }

    /**
     * Parses time in ms
     * @param {string} duration Raw duration to parse
     * @returns {string}
     */
    static parseTime(duration) {
        if (typeof duration !== "string") return duration;
        duration = duration.toUpperCase().replace("T", "");
        return duration.split("").map((x, y) => !parseInt(x) ? (y === duration.length - 1 ? "" : ":") : x).join("");
    }

    /**
     * @ignore
     * @param {string} url website url to parse html
     */
    static async _parseHTML(url) {
        let res = await fetch(url.replace("/m.", "/"));
        return await res.text();
    }

}

module.exports = FBDL;