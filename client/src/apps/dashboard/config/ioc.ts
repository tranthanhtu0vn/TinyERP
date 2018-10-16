import {IoCNames, IoCLifeCycle, HttpConnector, ConsoleLogger, EventManager} from "@app/common";
let ioc: Array<any> = [
    { name: IoCNames.IConnector, instance: HttpConnector, lifeCycle: IoCLifeCycle.Singleton },
    { name: IoCNames.ILogger, instance: ConsoleLogger, lifeCycle: IoCLifeCycle.Singleton },
    { name: IoCNames.IEventManager, instance: EventManager, lifeCycle: IoCLifeCycle.Singleton }
];
export default ioc;