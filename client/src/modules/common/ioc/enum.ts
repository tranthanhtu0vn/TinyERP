export const IoCNames = {
    IUserService: "IUserService",
    IConnector: "IConnector",
    IEventManager: "IEventManager",
    IGenericEventManager: "IGenericEventManager",
    IResource: "IResource",
    ILogger: "ILogger",
    ISettingService: "ISettingService",
    ICacheService: "ICacheService",
    IRouteService: "IRouteService",
    IPermissionService: "IPermissionService",
    ICustomerService: "ICustomerService",
    IOrderService: "IOrderService",
    ICourseService: "ICourseService",
    IAuthService: "IAuthService",
    IAccountService: "IAccountService",
    ISession: "ISession",
    IMediaService: "IMediaService",
    IDragnDropManager: "IDragnDropManager",
    ICoursePricingPlanService:"ICoursePricingPlanService",
    IApplicationService: "IApplicationService",
    ISupportService:"ISupportService"
};

export enum IoCLifeCycle {
    Transient = 1,
    Singleton = 2
}