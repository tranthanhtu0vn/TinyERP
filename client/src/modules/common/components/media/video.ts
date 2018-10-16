import { Component, Input, Output, EventEmitter } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { BaseControl, MediaType, IoCNames, VideoSourceType } from "@app/common";
import fileHelper from "../../helpers/fileHelper";
import { FileUpload } from "../../models/media/fileUpload";
import { IMediaService } from "../../services/media/imediaService";
import videoHelper from "../../helpers/videoHelper";
@Component({
    selector: "media-video",
    templateUrl: "src/modules/common/components/media/video.html"
})
export class Video extends BaseControl {
    @Input() readOnly: boolean = true;
    @Input() src: string;
    @Input() cls: string = "video--thumbnail";
    @Input() width: string = "100%";
    @Input() height: string = "100%";
    @Input() accept: string = MediaType.Video;
    @Input() source: VideoSourceType = VideoSourceType.File;
    public autoPlay: boolean = false;
    public youtubeVideoUrl: any;
    public Enums: any = {
        VideoSourceType: VideoSourceType
    };
    private sanitizer: DomSanitizer;
    constructor(sanitier: DomSanitizer) {
        super();
        this.sanitizer = sanitier;
    }
    public onSourceChanged(newVal: VideoSourceType) {
        if (newVal != VideoSourceType.Youtube) { return; }
        this.youtubeVideoUrl = this.getYoutubeVideoUrl(this.src, false);
    }
    public onSrcChanged(newVal: string) {
        if (this.source != VideoSourceType.Youtube) { return; }
        this.youtubeVideoUrl = this.getYoutubeVideoUrl(newVal, false);
    }
    /*
        video:{
            source: VideoSourceType (File|Youtube),
            youtubeId: new value,
            autoPlay: bool,
            src: id of media
        }
    */
    public setVideo(video: any): void {
        this.source = video.source || VideoSourceType.File;
        if (video.source == VideoSourceType.File) {
            this.src = video.url;
            return;
        }
        if (video.source == VideoSourceType.Youtube) {
            this.youtubeVideoUrl = this.getYoutubeVideoUrl(video.youtubeId, video.autoPlay);
        }
    }
    private getYoutubeVideoUrl(youtubeId: string, autoplay: boolean) {
        let youtubeVideoUrl: string = videoHelper.resolveVideoUrl({ youtubeId: youtubeId, source: VideoSourceType.Youtube, autoPlay: autoplay });
        return this.sanitizer.bypassSecurityTrustResourceUrl(youtubeVideoUrl);
    }
    // public onSrcChanged(newVal: string) {
    //     if (this.source != VideoSourceType.Youtube) { return; }
    //     let youtubeVideoUrl: string = videoHelper.resolveVideoUrl({ youtubeId: newVal, source: VideoSourceType.Youtube, autoPlay: this.autoPlay });
    //     this.youtubeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(youtubeVideoUrl);
    // }
    @Output() onChanged: EventEmitter<FileUpload> = new EventEmitter<FileUpload>();
    public onNewFileSelected($ev: FileUpload): void {
        let self = this;
        self.uploadFile($ev);
    }
    private uploadFile(file: FileUpload): void {
        let mediaService: IMediaService = window.ioc.resolve(IoCNames.IMediaService);
        let self = this;
        mediaService.upload(file).then((uploadResponse: any) => {
            file.serverResponse = uploadResponse;
            self.onChanged.emit(file);
        });
    }
    public onVideoPlayed(video: any) {
        if (video && video.pause) { video.pause(); }
    }
}