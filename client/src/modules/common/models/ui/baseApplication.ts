import { NgModuleFactoryLoader, Injector, ApplicationRef } from "@angular/core";
import { ITheme, IoCNames, IResourceManager, IAppConfig} from "@app/common";
import helperFacade from "@app/common";
import appHelper from "../../application/appHelper";
export class BaseApplication {
    protected readonly loader: NgModuleFactoryLoader;
    protected readonly injector: Injector;
    protected readonly appRef: ApplicationRef;
    protected readonly config: IAppConfig;
    constructor(config: IAppConfig, appRef: ApplicationRef, loader: NgModuleFactoryLoader, injector: Injector) {
        this.appRef = appRef;
        this.loader = loader;
        this.injector = injector;
        this.config=config;
        helperFacade.appHelper.setInjector(injector);
        let resourceManager: IResourceManager = window.ioc.resolve(IoCNames.IResource);
        resourceManager.load(this.config.localization.files);
    }

    public ngDoBootstrap(app: ApplicationRef): void {
        let self = this;
        let selectedTheme: ITheme = this.getTheme();
        this.loader.load(selectedTheme.path)
            .then((themeFactory: any) => {
                let theme = themeFactory.create(self.injector);
                theme.instance.setUrlPrefix(selectedTheme.urlPrefix);
                let bootstrapComponent = theme.instance.getBootstrapComponent();
                theme.instance.onLoading(self.appRef);
                self.appRef.bootstrap(bootstrapComponent);
                theme.instance.onLoaded(self.appRef);
            });
    }
    private getTheme():ITheme{
        let urlPath=window.location.pathname;
        if(urlPath=="/"){
            return this.config.defaultTheme;
        }
        let themeName = urlPath.split("/")[1];
        return appHelper.getThemeByPrefix(themeName);
    }
}