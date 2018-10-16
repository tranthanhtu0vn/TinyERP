import { IInfoNotification, AlertType } from "../enum";

export class NotificationFactory{
    public static create(option: any):IInfoNotification{
        return <IInfoNotification>{
            type: !option.type?AlertType.Info:option.type,
            title: option.title,
            content: option.content
        };
    }
}