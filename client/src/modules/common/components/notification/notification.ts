import { Directive, Input } from "@angular/core";
import { HttpError } from "../../connectors/enum";
import {BaseControl} from "../../models/ui/baseControl";
import { LayoutPosition, AlertType } from "../../enum";
import { IEventManager } from "../../event/ieventManager";
import { IoCNames } from "../../ioc/enum";
import {NotificationEvent, IInfoNotification} from "../../enum";
import domeHelper from "../../helpers/domHelper";

@Directive({
    selector:"[notification]"
})
export class Notification extends BaseControl{
    @Input("notification") option: NotificationOption;
    protected onInit(){
        domeHelper.createScript("/src/resources/libs/toastr/toastr.min.js");
        domeHelper.createStyle("/src/resources/libs/toastr/toastr.css");
    }

    protected onReady(){
        let self=this;
        let eventManager: IEventManager = window.ioc.resolve(IoCNames.IEventManager);
        eventManager.subscribeIfNotExist(HttpError.GenericError, ()=>{self.onGenericError();});
        eventManager.subscribeIfNotExist(HttpError.NotFound, ()=>{self.onNotFoundError();});
        eventManager.subscribeIfNotExist(HttpError.UnAuthorized, ()=>{self.onUnAuthorizedError();});
        eventManager.subscribeIfNotExist(HttpError.BadRequest, ()=>{self.onBadRequestError();});
        eventManager.subscribeIfNotExist(NotificationEvent.Information, (item: any)=>{self.onInfoNoticationReceived(item);});
    }
    private onInfoNoticationReceived(item: IInfoNotification):void{
        switch(item.type){
            case AlertType.Error:
                this.showError(item.title, item.content);
                break;
            case AlertType.Info:
            default:
                this.showInfo(item.title, item.content);
                break;
        }
        
    }
    
    private onNotFoundError():void{
        this.showError(this.i18n.common.httpError.notFoundExceptionTitle, this.i18n.common.httpError.notFoundExceptionContent);
    }
    private onUnAuthorizedError():void{
        this.showError(this.i18n.common.httpError.unAuthorizedErrorTitle, this.i18n.common.httpError.unAuthorizedErrorContent);
    }
    private onBadRequestError():void{
        this.showError(this.i18n.common.httpError.badRequestErrorTitle, this.i18n.common.httpError.badRequestErrorContent);
    }
    private onGenericError():void{
        this.showError(this.i18n.common.httpError.genericExceptionTitle, this.i18n.common.httpError.genericExceptionContent);
    }
    private showError(title:string, content:string){
        let options: any=this.getOption();
        window.toastr.error(content, title, options);
    }
    private showInfo(title:string, content:string){
        let options: any=this.getOption();
        window.toastr.info(content, title, options);
    }
    private getOption():any{
        return {
            "closeButton": true,
            "debug": false,
            "newestOnTop": true,
            "progressBar": true,
            "rtl": false,
            "positionClass": this.getPosition(),
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": 300,
            "hideDuration": 1000,
            "timeOut": 5000,
            "extendedTimeOut": 1000,
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
          };
    }
    private getPosition():string{
        if(!this.option){return NotificationPosition.BottomRight;}
        switch(this.option.position){
            case LayoutPosition.BottomRight:
            default:
            return NotificationPosition.BottomRight;
        }
    }
}
const NotificationPosition={
    BottomRight:"toast-bottom-right",
    BottomLeft:"toast-bottom-left",
    TopRight:"toast-top-right"
};
class NotificationOption{
    public position: LayoutPosition=LayoutPosition.BottomRight;
}