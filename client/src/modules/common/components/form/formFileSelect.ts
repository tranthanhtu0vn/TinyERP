import { Component, Input, Output, EventEmitter } from "@angular/core";
import { BaseControl } from "../../models/ui/baseControl";
import { FileUpload } from "../../models/media/fileUpload";
import fileHelper from "../../helpers/fileHelper";
import {FileSelectDisplayType, LayoutDirection} from "../../enum";
@Component({
    selector: "form-file-select",
    templateUrl: "src/modules/common/components/form/formFileSelect.html"
})
export class FormFileSelect extends BaseControl {
    @Input() labelText: string = String.empty;
    @Input() direction: LayoutDirection = LayoutDirection.Horizontal;
    @Input() display: FileSelectDisplayType=FileSelectDisplayType.Inline;
    @Input() cls: string = "icon-file-select";
    @Input() accept: string = "*/*";
    @Output() onFileSelected: EventEmitter<FileUpload> = new EventEmitter<FileUpload>();
    @Input() model: FileUpload;
    @Output() modelChange = new EventEmitter<FileUpload>();

    public ENUMS: any={
        LayoutDirection: LayoutDirection,
        FileSelectDisplayType:FileSelectDisplayType
    };
    public onChanged($ev: any) {
        if (!$ev || !$ev.target || $ev.target.files.length <= 0) { return; }
        let file: File = $ev.target.files[0];
        let self = this;
        fileHelper.readAsDataUrl(file).then((content: string) => {
            let fileUpload: FileUpload = new FileUpload();
            fileUpload.name = file.name;
            fileUpload.size = file.size;
            fileUpload.mimeType = file.type;
            fileUpload.content = content;
            self.onFileSelected.emit(fileUpload);
        });;
    }
    public onNewFileSelected(file: FileUpload){
        this.onFileSelected.emit(file);
        this.modelChange.emit(file);
    }
}