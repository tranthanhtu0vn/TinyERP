import { Component, Input, Output, EventEmitter } from "@angular/core";
import { BaseControl, MediaType, IoCNames } from "@app/common";
import fileHelper from "../../helpers/fileHelper";
import { FileUpload } from "../../models/media/fileUpload";
import { IMediaService } from "../../services/media/imediaService";
@Component({
    selector: "media-image",
    templateUrl: "src/modules/common/components/media/image.html"
})
export class Image extends BaseControl {
    @Input() readOnly: boolean = true;
    @Input() src: string;
    @Input() alt: string;
    @Input() cls: string = "";
    @Input() width: string = "100%";
    @Input() height: string = "100%";
    @Input() accept: string = MediaType.Image;
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
}