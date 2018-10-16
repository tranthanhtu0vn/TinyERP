import { IoCNames, IoCLifeCycle } from "./enum";
import { HttpConnector } from "../connectors/httpConnector";
import { ConsoleLogger } from "../services/logger/consoleLogger";
import { EventManager, GenericEventManager } from "../event/eventManager";
import { ResourceManager } from "../resourceManager";
import { CacheService } from "../services/cache/cacheService";
import { RouteService } from "../services/routeService";
import { AuthService } from "../auth/authService";
import { Session } from "../storage/session";
import { AccountService } from "../services/accountService";
import {MediaService} from "../services/media/mediaService";
import {DragnDropManager} from "../components/dragnDrop/dragndropManager";
import {ApplicationService} from "../application/applicationService";
import {SupportService} from "../support/supportService";
let ioc = [
    // { name: IoCNames.IConnector, instance: HttpConnector, lifeCycle: IoCLifeCycle.Singleton },
    // { name: IoCNames.ILogger, instance: ConsoleLogger, lifeCycle: IoCLifeCycle.Singleton },
    // { name: IoCNames.IEventManager, instance: EventManager, lifeCycle: IoCLifeCycle.Singleton },
    { name: IoCNames.IGenericEventManager, instance: GenericEventManager, lifeCycle: IoCLifeCycle.Transient },
    { name: IoCNames.IResource, instance: ResourceManager, lifeCycle: IoCLifeCycle.Singleton },
    { name: IoCNames.ICacheService, instance: CacheService, lifeCycle: IoCLifeCycle.Singleton },
    { name: IoCNames.IRouteService, instance: RouteService, lifeCycle: IoCLifeCycle.Singleton },
    { name: IoCNames.IAuthService, instance: AuthService, lifeCycle: IoCLifeCycle.Singleton },
    { name: IoCNames.ISession, instance: Session, lifeCycle: IoCLifeCycle.Singleton },
    { name: IoCNames.IAccountService, instance: AccountService, lifeCycle: IoCLifeCycle.Singleton },
    { name: IoCNames.IMediaService, instance: MediaService, lifeCycle: IoCLifeCycle.Singleton },
    { name: IoCNames.IDragnDropManager, instance: DragnDropManager, lifeCycle: IoCLifeCycle.Transient },
    { name: IoCNames.IApplicationService, instance: ApplicationService, lifeCycle: IoCLifeCycle.Singleton },
    { name: IoCNames.ISupportService, instance: SupportService, lifeCycle: IoCLifeCycle.Transient }
];
export default ioc;