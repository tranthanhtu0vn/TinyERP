import { HelperFacade } from "./models/helperFacade";

export * from "./components/page/page";

export * from "./commonModule";
export * from "./exception";
export * from "./enum";
export * from "./baseModule";
export * from "./resourceManager";
export * from "./iresourceManager";

export * from "./ioc/enum";

export * from "./connectors/httpConnector";
export * from "./connectors/iconnector";

export * from "./models/promise";
export * from "./models/ui";
export * from "./models/baseModel";
export * from "./models/menu/appMenuItem";
export * from "./models/moduleConfig";
export * from "./models/imoduleConfigItem";
export * from "./models/ui/baseLayout";
export * from "./models/ui/baseTheme";
export * from "./models/ui/baseApplication";
export * from "./models/notificationFactory";

export * from "./application/iappConfig";

export * from "./auth/iauthService";
export * from "./auth/authToken";
export * from "./auth/onLoginRequired";
export * from "./auth/onAccountLoginSuccess";
export * from "./auth/events/onLogoutRequired";
export * from "./auth/iloginRequest";

export * from "./auth/events/onProfileAvatarChanged";
export * from "./auth/events/onProfileDetailRequired";

export * from "./auth/strategy/iauthorizeStrategy";
export * from "./auth/strategy/authorizeStrategyFactory";
export * from "./auth/strategy/onedrive/accessTokenResponse";
export * from "./auth/strategy/onedrive/iaccquireAccessTokenResponse";

export * from "./storage/isession";

export * from "./services/logger/consoleLogger";
export * from "./services/baseService";
export * from "./services/cache/cacheService";
export * from "./services/routeService";
export * from "./services/iaccountService";

export * from "./event/eventManager";
export * from "./event/ieventManager";
export * from "./event/baseEvent";
export * from "./event/ibaseEvent";
export * from "./event/onUnAuthorizedAccess";
export * from "./event/onModuleLoaded";
export * from "./event/enum";

export * from "./components/media/videoPlayerOption";
export * from "./models/media/fileUpload";
export * from "./models/pageActivator";
export * from "./auth/enum";
export * from "./route/defaultRouteReuseStrategy";

export * from "./components/grid/grid";

export * from "./loader/defaultResourceLoader";

/*components */
export * from "./components/media/video";
export * from "./components/container/applicationContainerComponent";
export * from "./components/form/dropdownFormItem";
export * from "./components/grid/enum";
export * from "./components/formDialog";
export * from "./components/error/errorMessage";

/*support */
export * from "./support/isupportService";
export * from "./support/enum";

/*validation*/
export * from "./exception/decorators/required";
export * from "./exception/decorators/valueInRange";


import iocHelper from "./ioc/iocHelper";
import appHelper from "./application/appHelper";
import routerHelper from "./helpers/routerHelper";
import domHelper from "./helpers/domHelper";
import moduleHelper from "./helpers/moduleHelper";
import urlHelper from "./helpers/urlHelper";
import objectHelper from "./helpers/objectHelper";
import userProfileHelper from "./helpers/userProfileHelper";
import scheduleHelper from "./helpers/scheduleHelper";
import devideHelper from "./helpers/deviceHelper";
import randomHelper from "./helpers/randomHelper";
import templateHelper from "./helpers/templateHelper";
import settingHelper from "./helpers/settingHelper";
import mediaHelper from "./helpers/mediaHelper";
import guidHelper from "./helpers/guidHelper";
import jsonHelper from "./helpers/jsonHelper";
import authHelper from "./auth/authHelper";
import videoHelper from "./helpers/videoHelper";
import themeHelper from "./helpers/themeHelper";
import uiHelper from "./helpers/uiHelper";


let helperFacade: HelperFacade= new HelperFacade();
helperFacade.uiHelper = uiHelper;
helperFacade.iocHelper = iocHelper;
helperFacade.appHelper = appHelper;
helperFacade.routeHelper = routerHelper;
helperFacade.domHelper = domHelper;
helperFacade.moduleHelper = moduleHelper;
helperFacade.urlHelper = urlHelper;
helperFacade.objectHelper = objectHelper;
helperFacade.userProfileHelper = userProfileHelper;
helperFacade.scheduleHelper = scheduleHelper;
helperFacade.deviceHelper = devideHelper;
helperFacade.randomHelper = randomHelper;
helperFacade.templateHelper = templateHelper;
helperFacade.settingHelper = settingHelper;
helperFacade.mediaHelper = mediaHelper;
helperFacade.guidHelper = guidHelper;
helperFacade.jsonHelper = jsonHelper;
helperFacade.authHelper = authHelper;
helperFacade.videoHelper = videoHelper;
helperFacade.themeHelper=themeHelper;
export default helperFacade;
