import { Component, Input, Output } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { BaseControl, VideoPlayerOption, EventNames } from "@app/common";
import domHelper from "../../helpers/domHelper";
import { VideoPlayerModel } from "./videoPlayerModel";
import { VideoSourceType } from "../../enum";

@Component({
    selector: "video-player",
    templateUrl: "src/modules/common/components/media/videoPlayer.html"
})
export class VideoPlayer extends BaseControl {
    @Input() cls: string = "video-player";
    @Input() options: VideoPlayerOption;
    @Input() videos: Array<any>;
    public Enums: any = {
        VideoSourceType: VideoSourceType
    };
    public video: VideoPlayerModel = new VideoPlayerModel();
    public videoUrl: string = "";
    public mediaHeight: number = 0;
    constructor(domSanitizer: DomSanitizer) {
        super();
        let self = this;
        self.video.setSanitizer(domSanitizer);
        this.mediaHeight = window.innerHeight;
        domHelper.registerEvent(window, EventNames.Resize, () => { self.onWindowResize(); });
    }
    private onWindowResize() {
        this.mediaHeight = window.innerHeight;
    }
    public onVideosChanged(newVideos: any, old: any) {
        if (!newVideos || !newVideos.length) { return; }
        this.videoUrl = newVideos[0].url;
        let video = newVideos[0];
        this.video.setVideo(video);
    }
}