import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

/*Page*/
import { Page } from "./components/page/page";
import { PageActions } from "./components/page/pageActions";
/*Form*/
import { HorizontalForm } from "./components/form/horizontalForm";
import { FormPrimaryButton } from "./components/form/formPrimaryButton";
import { FormDefaultButton } from "./components/form/formDefaultButton";
import { FormDefaultLink } from "./components/form/formDefaultLink";
import { FormButton } from "./components/form/formButton";
import { FormInput } from "./components/form/formInput";
import { FormTextInput } from "./components/form/formTextInput";
import { FormDateInput } from "./components/form/formDateInput";
import { FormTextArea } from "./components/form/formTextArea";
import { FormPasswordInput } from "./components/form/formPasswordInput";
import { FormEmailInput } from "./components/form/formEmailInput";
import { FormRadioInput } from "./components/form/formRadioInput";
import { FormEditor } from "./components/form/formEditor";
import { FormDropdown } from "./components/form/formDropdown";
import { FormTextSearch } from "./components/form/formTextSearch";
import { FormNumberInput } from "./components/form/formNumberInput";
import {FormSelect}  from "./components/form/formSelect";

import { FormDialog } from "./components/formDialog";

import { Validation } from "./components/validation";
import { UIToggle } from "./components/toggle/uitoggle";
import { Message } from "./components/notification/message";
import { Alert } from "./components/notification/alert";
import {Notification} from "./components/notification/notification";
import { ErrorMessage } from "./components/error/errorMessage";

import { Panel } from "./components/panel";
import { PanelCommand } from "./components/panelCommand";

import { FormFileSelect } from "./components/form/formFileSelect";

import { Commands } from "./components/commands";
/*Media */
import { VideoPlayer } from "./components/media/videoPlayer";
import { Image } from "./components/media/image";
import { Video } from "./components/media/video";
/*List */
import { List } from "./components/repeater/list";
/*Common*/
import { Style } from "./components/style";
import { Script } from "./components/script";

/*Grid*/
import { Grid } from "./components/grid/grid";

import { BaseModule } from "./baseModule";
import { ModuleNames, AppSettingType } from "./enum";
import { ModuleConfig } from "./models/moduleConfig";

import ioc from "./ioc/iocConfig";

/* auth */
import { LoginForm } from "./components/auth/loginForm";
import { RegisterForm } from "./components/account/registerForm";

/* icon */
import { IconBack } from "./components/icons/back";
import { IconSignOut } from "./components/icons/signOut";
import { IconAdd } from "./components/icons/add";
import { BaseIcon } from "./components/icons/baseIcon";
import { IconSave } from "./components/icons/save";
import { IconCancel } from "./components/icons/cancel";
import { IconDelete } from "./components/icons/delete";
import { IconEdit } from "./components/icons/edit";
import { IconCopy } from "./components/icons/copy";
import { IconHome } from "./components/icons/home";
import { IconApprove } from "./components/icons/approve";
import { IconApproved } from "./components/icons/approved";
import { IconHelp } from "./components/icons/help";
import {IconSubscribe} from "./components/icons/subscribe";

import { DatetimeFormatter } from "./pipes/datetimeFormatter";

import { Copyable } from "./components/common/copyable";

import { Tabs } from "./components/tab/tabs";
import { Tab } from "./components/tab/tab";

import {ApplicationContainerComponent} from "./components/container/applicationContainerComponent";

import { Draggable } from "./components/dragnDrop/draggable";
import { Droppable } from "./components/dragnDrop/droppable";
import { Sortable } from "./components/sortable";

import { MultiColumns } from "./components/layout/multiColumns";
import { Column } from "./components/layout/column";

import { IEventManager } from "./event/ieventManager";
import { IoCNames } from "./ioc/enum";
import { ErrorType } from "./enum";
import { EventFacade } from "./eventFacade";

@NgModule({
    imports: [CommonModule, FormsModule, HttpModule, RouterModule],
    declarations: [
        /*layout */
        MultiColumns, Column,
        Commands,
        /*Form*/
        FormButton, FormTextArea, Validation, HorizontalForm, FormPrimaryButton, FormInput, FormDefaultButton, FormTextInput, FormPasswordInput,
        FormDefaultLink, FormEmailInput, FormRadioInput, FormFileSelect, FormEditor, FormDropdown, FormDialog,FormTextSearch,FormSelect, FormDateInput, FormNumberInput, 
        /*Grid*/
        Grid,
        /*Common*/
        Page, Style, Script, PageActions, List, Message, Panel, PanelCommand,
        UIToggle,
        /* drag and drop */
        Draggable, Droppable, Sortable,
        /*Media*/
        VideoPlayer, Image, Video,
        /* Auth */
        LoginForm,
        /* account */
        RegisterForm,
        /*icon*/
        IconSignOut, BaseIcon, IconAdd, IconBack, IconSave, IconCancel, IconDelete, IconEdit, IconCopy, IconHome, IconApprove, IconApproved, IconHelp, IconSubscribe,
        /*pipe */
        DatetimeFormatter,
        /*tab*/
        Tabs, Tab,
        /*notification & error */
        Alert, ErrorMessage, Notification,
        /*common */
        Copyable,
        /* container */
        ApplicationContainerComponent
    ],
    exports: [
        /*layout */
        MultiColumns, Column,
        Commands,
        /*icon*/
        IconSignOut, BaseIcon, IconAdd, IconBack, IconSave, IconCancel, IconDelete, IconEdit, IconCopy, IconHome, IconApprove, IconApproved, IconHelp, IconSubscribe,
        /*pipe */
        DatetimeFormatter,
        /*Re-Export module**/
        FormsModule, HttpModule, RouterModule,
        /*Form*/
        FormTextArea, Validation, HorizontalForm, FormPrimaryButton, FormDefaultButton, FormInput, FormTextInput, FormPasswordInput,
        FormDefaultLink, FormEmailInput, FormRadioInput, FormFileSelect, FormEditor, FormDropdown, FormDialog,FormTextSearch, FormSelect, FormDateInput, FormNumberInput,
        /* drag and drop */
        Draggable, Droppable, Sortable,
        /**Grid */
        Grid,
        /**Common */
        Page, Style, Script, PageActions, List, Message, Panel, PanelCommand,
        UIToggle,
        /*Media*/
        VideoPlayer, Image, Video,
        /* Auth */
        LoginForm,
        /* account */
        RegisterForm,
        /*tab*/
        Tabs, Tab,
        /*notification & error */
        Alert, ErrorMessage, Notification,
        /*common */
        Copyable,
        /* container */
        ApplicationContainerComponent
    ],
    entryComponents: [Tab],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppCommon extends BaseModule {
    constructor() {
        super(new ModuleConfig(ModuleNames.Common, ioc));
    }

    protected registerModuleEvents(): void {
        super.registerModuleEvents();
        let eventManager: IEventManager = window.ioc.resolve(IoCNames.IEventManager);
        eventManager.subscribeIfNotExist(ErrorType.OnEventHandlerNotFound, EventFacade.onEventHandlerNotFound);
        // eventManager.subscribeIfNotExist(HttpError.BadRequest, EventFacade.onBadRequest);
        // eventManager.subscribeIfNotExist(HttpError.NotFound, EventFacade.onResourceNotFound);
        // eventManager.subscribeIfNotExist(HttpError.UnAuthorized, EventFacade.onUnAuthorizedRequest);
        //eventManager.subscribeIfNotExist(HttpError.GenericError, EventFacade.onGenericError);
    }
}