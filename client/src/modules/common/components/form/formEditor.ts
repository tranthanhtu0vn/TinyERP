import { Component, Input, Output, EventEmitter } from "@angular/core";
import { BaseControl } from "../../models/ui";
import { LayoutDirection, FormEditorType } from "../../enum";
import scheduleHelper from "../../helpers/scheduleHelper";
@Component({
    selector: "form-editor",
    templateUrl: "src/modules/common/components/form/formEditor.html"
})
export class FormEditor extends BaseControl {
    @Input() type: FormEditorType = FormEditorType.Simple;
    @Input() labelText: string = String.empty;
    @Input() readOnly: boolean = false;
    @Input() model: any;
    @Output() modelChange = new EventEmitter();
    @Input() direction: LayoutDirection = LayoutDirection.Horizontal;
    private editor: any;
    public ENUMS: any = {
        LayoutDirection: LayoutDirection
    };

    protected onReady(): void {
        let editorOption: any = this.getEditorOption();
        this.initEditor(editorOption);
    }
    protected onModelChanged(newVal:string){
        let self=this;
        if(!!self.editor){
            self.editor.setContent(newVal);
            return;
        }
        // scheduleHelper.run(()=>{
        //     self.editor.setContent(newVal);
        // }, 1000);
    }
    private initEditor(option: any): void {
        if(window.tinymce){
            window.tinymce.init(option);
            return;
        }
        scheduleHelper.run(()=>{window.tinymce.init(option);}, 500);
    }
    private getEditorOption(): any {
        let option: any = {};
        switch (this.type) {
            case FormEditorType.Simple:
            default:
                option = this.getOptionForSimpleEditor();
                break;
        }
        return option;
    }
    private getOptionForSimpleEditor(): any {
        let self=this;
        return {
            selector: String.format("#{0} textarea", this.id),
            height: 200,
            menubar: false,
            setup:(editor: any)=>{
                self.editor=editor;
                editor.on("keyup change", ()=>{
                    let contentOfEditor = editor.getContent();
                    self.onValueChanged(contentOfEditor);
                });
            },
            plugins: [
                'fullscreen paste code help wordcount'
            ],
            toolbar: 'undo redo |  formatselect | bold italic backcolor  | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | fullscreen | help',
            content_css: [
                '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
                '//www.tinymce.com/css/codepen.min.css']
        };
    }
    public onValueChanged(newVal: string) {
        this.modelChange.emit(newVal);
    }
}