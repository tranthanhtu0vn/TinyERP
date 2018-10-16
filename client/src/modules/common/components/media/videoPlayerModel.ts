import { VideoSourceType } from "../../enum";
import videoHelper from "../../helpers/videoHelper";
export class VideoPlayerModel {
    private sanitizer: any;
    public url: string;
    public source: VideoSourceType = VideoSourceType.File;
    public setSanitizer(sanitizer: any) {
        this.sanitizer = sanitizer;
    }
    public setVideo(video: any) {
        this.source = video.source;
        let videoUrl: string = videoHelper.resolveVideoUrl(video);
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
        console.log("Video url", this.url);
    }
    // public setVideoSource(videoSource: VideoSourceType) {
    //     this.source = videoSource;
    // }
}