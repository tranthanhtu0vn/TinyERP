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

export class HttpConnector implements IConnector {
    private conenctionNumber: number;
    private static NoConnectionInstances: number = 0;
    private static eventManager: IEventManager;
    constructor() {
        this.conenctionNumber = HttpConnector.NoConnectionInstances++;
        if (!HttpConnector.eventManager) {
            HttpConnector.eventManager = window.ioc.resolve(IoCNames.IEventManager);
        }
    }
    public getJSON(jsonPath: string) {
        let def = PromiseFactory.create();
        let headers = new JsonHeaders(false);
        let http: Http = window.ioc.resolve(Http);
        http.get(jsonPath, { headers: headers })
            .map((response: any) => response.json())
            .subscribe((data: any) => { def.resolve(data); });
        return def;
    }

    public post(url: string, data: any={}): Promise {
        HttpConnector.eventManager.publish(LoadingIndicatorEvent.Show, this.conenctionNumber);
        let def = PromiseFactory.create();
        let headers: Headers = this.getHeader();
        let dataToSend = this.getContent(data);//JSON.stringify(data);
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
        return new JsonHeaders();
    }

    public put(url: string, data: any): Promise {
        HttpConnector.eventManager.publish(LoadingIndicatorEvent.Show, this.conenctionNumber);
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
        HttpConnector.eventManager.publish(LoadingIndicatorEvent.Show, this.conenctionNumber);
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
        HttpConnector.eventManager.publish(LoadingIndicatorEvent.Show, this.conenctionNumber);
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
        HttpConnector.eventManager.publish(LoadingIndicatorEvent.Hide, this.conenctionNumber);
        if (response.errors.length === 0) {
            HttpConnector.eventManager.publish(ValidationEvent.ValidationSuccess);
            def.resolve(response.data);
            return;
        }
        let validationEror: ValidationException = this.getValidationExceptionFromResponse(response.errors);
        HttpConnector.eventManager.publish(ValidationEvent.ValidationFail, validationEror);
        def.reject(response.errors);
    }
    private handleException(def: Promise, exception: any) {
        HttpConnector.eventManager.publish(LoadingIndicatorEvent.Hide, this.conenctionNumber);
        let error: ValidationException = this.getError(exception);
        def.reject(error);
        // if(!error.hasError()){
        //     return;
        // }
        // let errors: Array<ValidationError> = error.errors;
        // errors.forEach((item: ValidationError)=>{
        //     let eventKey = String.format("{0}_{1}", ValidationEvent.ValidationFail, item.key);
        //     HttpConnector.eventManager.publish(eventKey, error);
        // });
        HttpConnector.eventManager.publish(error.validationType, error);
    }
    private getValidationExceptionFromResponse(responseErrors: Array<any>) {
        let validationEror: ValidationException = new ValidationException();
        responseErrors.forEach(function (errorItem: any) {
            validationEror.add(errorItem.key, errorItem.params);
        });
        return validationEror;
    }
    private getError(exception: any): ValidationException {
        let validationEror: ValidationException = new ValidationException();
        switch (exception.status) {
            case HttpStatusCode.BadRequest:
                validationEror = exception.json().errors && exception.json().errors.length ?
                    this.getValidationExceptionFromResponse(exception.json().errors) :
                    (() => { validationEror.validationType = HttpError.BadRequest; return validationEror; })();
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