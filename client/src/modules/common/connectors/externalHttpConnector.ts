import "rxjs/add/operator/map";
import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import { IConnector } from "./iconnector";
import { Promise, PromiseFactory } from "./../models/promise";
import { JsonHeaders } from "./jsonHeaders";
import { IEventManager } from "../event";
import { LoadingIndicatorEvent } from "../enum";
import { ValidationException, ValidationEvent } from "../exception";
import { HttpStatusCode, HttpError } from "./enum";
import { IoCNames } from "../ioc/enum";

export class ExternalHttpConnector implements IConnector {
    private conenctionNumber: number;
    private static NoConnectionInstances: number = 0;
    private static eventManager: IEventManager;
    constructor() {
        this.conenctionNumber = ExternalHttpConnector.NoConnectionInstances++;
        if (!ExternalHttpConnector.eventManager) {
            ExternalHttpConnector.eventManager = window.ioc.resolve(IoCNames.IEventManager);
        }
    }
    public getJSON(jsonPath: string):Promise {
        throw "method was not implemented";
    }

    public post(url: string, data: any={}): Promise {
        ExternalHttpConnector.eventManager.publish(LoadingIndicatorEvent.Show, this.conenctionNumber);
        let def = PromiseFactory.create();
        let headers: Headers = this.getHeader();
        let dataToSend = this.getContent(data);
        let http: Http = window.ioc.resolve(Http);
        http.post(url, dataToSend, { headers: headers })
            .map((response: any) => response.json())
            .subscribe(
            (data: any) => this.handleResponse(def, data),
            (exception: any) => this.handleException(def, exception)
            );
        return def;
    }
    protected getContent(data: any):string{
        return JSON.stringify(data);
    }
    protected getHeader(): Headers{
        return new JsonHeaders(false);
    }

    public put(url: string, data: any): Promise {
        ExternalHttpConnector.eventManager.publish(LoadingIndicatorEvent.Show, this.conenctionNumber);
        let def = PromiseFactory.create();
        let headers = new JsonHeaders();
        let dataToSend = JSON.stringify(data);
        let http: Http = window.ioc.resolve(Http);
        http.put(url, dataToSend, { headers: headers })
            .map((response: any) => response.json())
            .subscribe(
            (data: any) => this.handleResponse(def, data),
            (exception: any) => this.handleException(def, exception)
            );
        return def;
    }

    public get(url: string): Promise {
        ExternalHttpConnector.eventManager.publish(LoadingIndicatorEvent.Show, this.conenctionNumber);
        let def = PromiseFactory.create();
        let headers = new JsonHeaders();
        let http: Http = window.ioc.resolve(Http);
        http.get(url, { headers: headers })
            .map((response: any) => response.json())
            .subscribe(
            (data: any) => this.handleResponse(def, data),
            (exception: any) => this.handleException(def, exception)
            );
        return def;
    }

    public delete(url: string): Promise {
        ExternalHttpConnector.eventManager.publish(LoadingIndicatorEvent.Show, this.conenctionNumber);
        let def = PromiseFactory.create();
        let headers = new JsonHeaders();
        let http: Http = window.ioc.resolve(Http);
        http.delete(url, { headers: headers })
            .map((response: any) => response.json())
            .subscribe(
            (data: any) => this.handleResponse(def, data),
            (exception: any) => this.handleException(def, exception)
            );
        return def;
    }

    private handleResponse(def: Promise, response: any): any {
        ExternalHttpConnector.eventManager.publish(LoadingIndicatorEvent.Hide, this.conenctionNumber);
        ExternalHttpConnector.eventManager.publish(ValidationEvent.ValidationSuccess);
        def.resolve(response);
    }
    private handleException(def: Promise, exception: any) {
        ExternalHttpConnector.eventManager.publish(LoadingIndicatorEvent.Hide, this.conenctionNumber);
        let error: ValidationException = this.getError(exception);
        def.reject(error);
        ExternalHttpConnector.eventManager.publish(error.validationType, error);
    }
    private getError(exception: any): ValidationException {
        let validationEror: ValidationException = new ValidationException();
        switch (exception.status) {
            case HttpStatusCode.BadRequest:
                validationEror.validationType = HttpError.BadRequest;
                break;
            case HttpStatusCode.NotFound:
                validationEror.validationType = HttpError.NotFound;
                break;
            case HttpStatusCode.UnAuthorized:
                //validationEror = new ValidationException(HttpError.UnAuthorized);
                validationEror.validationType = HttpError.UnAuthorized;
                break;
            default:
                //validationEror = new ValidationException(HttpError.GenericError);
                validationEror.validationType = HttpError.GenericError;
                break;
        }
        return validationEror;
    }
}