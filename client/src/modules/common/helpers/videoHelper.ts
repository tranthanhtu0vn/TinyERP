import { VideoSourceType, YoutubeVideoPattern } from "../enum";
import appHelper from "../application/appHelper";
import mediaHelper from "./mediaHelper";

let videoHelper = {
    resolveVideoUrl: resolveVideoUrl
};
export default videoHelper;
function resolveVideoUrl(video: any) {
    //let urlPattern: string = appHelper.getConfig().media.youtubeUrlPattern;
    let autoPlay: boolean = video.autoPlay != undefined ? video.autoPlay : true;
    switch (video.source) {
        case VideoSourceType.Youtube: {
            let urlPattern = YoutubeVideoPattern.DefaultVideoUrl;
            return String.format(urlPattern, video.youtubeId|| video.content, autoPlay);
        }
        case VideoSourceType.File:
        default:
            return mediaHelper.resolveUrl(video.mediaId);
    }
}