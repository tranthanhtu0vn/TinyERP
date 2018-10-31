export const AppConst = {
    EventSeperator: "_"
}

export const LoadingIndicatorEvent = {
    Show: "show",
    Hide: "hide"
};


export const AuthenticatedEvent = {
    AuthenticationChanged: "AuthenticationChanged"
};

export const ApplicationStateEvent = {
    Init: "ApplicationStateEvent.Init",
    BeforeReady: "ApplicationStateEvent.BeforeReady",
    Ready: "ApplicationStateEvent.Ready",
    Unload: "ApplicationStateEvent.Unload",
    UnAuthorizeRequest: "UnAuthorizeRequest"
};

export const LANG = {
    EN: "en"
};

export enum InputValueType {
    Text,
    Currency
};
export enum HttpStatusCode {
    OK = 200
};
export const Guid = {
    Empty: "00000000-0000-0000-0000-000000000000"
};

export const HttpCode = {
    NotFound: 404,
    UnAuthorized: 401,
    BadRequest: 400
};

export enum FormMode {
    None,
    AddNew,
    Edit,
    View
};

export const Locale = {
    Setting: "setting",
    Common: "common",
    Security: "security"
};

export const DomainKey = {
    Support: "App.Support",
    Security: "App.Security",
    Learning: "App.Learning",
    LearningDashboard:"App.LearningDashboard",
    Setting:"App.Setting"

};
export const ModuleNames = {
    Security: "security",
    Setting: "setting",
    Common: "common",
    CustomerManagement: "customerManagement",
    Dashboard: "dashboard",
    Order: "orderManagement",
    Learning: "learning",
    LearningDashboard:"learningDashboard",
    Support:"support",
    Auth:"auth",
    HRM:"hrm"
};

export const AppThemeType = {
    Default: "default",
    Education: "education"
};

export enum PageActionItemType {
    Button,
    Dropdown
}

export const VisibilityType = {
    Hidden: "hidden",
    Visible: "visible"
};

export const NotificationEvent={
    Information:"NotificationEvent.Information"
};

export const NotificationType = {
    InCommingNotification: "NotificationType.InCommingNotification",
    IncreaseNotification: "NotificationType.IncreaseNotification",
    DecreaseNotification: "NotificationType.DecreaseNotification"
}

export const RouteSetting = {
    SegmentSeparator: "/",
    ParameterPrefix: ":"
};

export const PatternSetting = {
    ModulePattern: "src/modules/{0}/{0}Module.js#{1}Module",
    ThemePathPattern: "src/themes/{0}/index.js#{1}Theme"
};

export const FormInputType = {
    Text: "text",
    Password: "password",
    Email: "email",
    Radio: "radio",
    Date:"date",
    Number:"number"
};

export const SessionVariables = {
    ReturnURL: "ReturnURL"
};
export enum ToggleState {
    Expand,
    Collapse,
    Check,
    UnCheck
};
export enum ActiveOrInActiveToggleState {
    Active =0,
    InActive=1
};

export enum VideoToggleState {
    Play = 0,
    Pause = 1
};

export enum ToggleType {
    PlusMinus = 1,
    Video = 2,
    List = 4,
    Check = 8,
    ActiveOrInActive=16
};
export const EventNames = {
    Resize: "resize",
    LOAD:"load"
};

export enum NavMode {
    Default,
    Icon
}
export const DelayInterval = {
    SMALL: 100
};

export enum VideoSourceType {
    None = 0,
    File = 1,
    Youtube = 2
}

export enum MessageType {
    Infomation = 1,
    Warning = 2,
    Error = 4,
    Danger = 8
}

export const MediaType = {
    Image: "image/*",
    //video/mp4,video/x-m4v,video/* for multiple value
    Video: "video/mp4"
};

export const AppSettingType = {
    DEFAULT_URL: "DEFAULT_URL",
    NoPhoto: "NoPhoto",
    ResourceUri: "ResourceUri",
    RootUri: "RootUri",
    MediaUri: "MediaUri",
    LEARNING_STUDENT_INVITATION_LINK: "LEARNING_STUDENT_INVITATION_LINK",
    //this setting should be set in appropriated module loaded event
    QnAUrl:"Support.QnAUrl",
    SECURITY_USER_DETAIL_URL:"SECURITY_USER_DETAIL_URL",
    LOGIN_URI:"AUTH_LOGIN_URI",
    COURSE_PREVIEW_URI:"COURSE_PREVIEW_URI",
    STORAGE_AUTHORIZATION_CODE_RECEIVE_URL:"STORAGE_AUTHORIZATION_CODE_RECEIVE_URL",
    SUBSCRIPTION_POINT_PER_PERIOD:"SUBSCRIPTION_POINT_PER_PERIOD",
    SUBSCRIPTION_DAYS_PER_PERIOD:"SUBSCRIPTION_DAYS_PER_PERIOD",

    COMMON_UNAUTHORIZE_ACCESS_URI:"AUTH_UNAUTHORIZE_ACCESS_URI"
};
export enum PanelCommandType {
    LogOut = 1
}

export enum ComponentState {
    Hidden = 1,
    Visible = 2
}

export enum LayoutDirection {
    Vertical = 1,
    Horizontal = 2
}

export enum LayoutPosition {
    Top = 1,
    Right = 2,
    Bottom = 3,
    Left = 4,
    TopRight = 5,
    BottomRight = 6,
    BottomLeft = 7,
    TopLeft = 8
}

export enum TabDirection {
    Vertical = 1,
    Horizontal = 2
}

export enum ItemAlign {
    Left = 1,
    Right = 2,
    Center = 4
}

export enum EditorState {
    View,
    Edit,
    AddNew
}

export enum AlertType {
    Primary,
    Danger,
    Secondary,
    Success,
    Warning,
    Info,
    Error
}

export enum CopyableComponentType {
    Text = 1
}
/// WILL RMEOVE DATE, FULL in future
export const DatetimeFormat = {
    DATE_ONLY:"yyyy/mm/dd",
    Date: "yyyy/mm/dd",
    Full:"yyyy/mm/dd HH:MM:ss"
}

export enum FormEditorType {
    Simple = 1
}
export enum Color {
    Default,
    White
}

export const ErrorType = {
    UnAuthorizedAccess: "unAuthorizedAccess",
    OnEventHandlerNotFound: "onEventHandlerNotFound"
};

export enum RegistrationMode {
    Default,
    Invitation
}
export enum EventHandlerType {
    Multiple,
    OnlyOne
}

export enum DeploymentMode {
    PROD,
    DEV
}

export enum PublishState {
    UnPublish = 1,
    Publish = 2
}
export const YoutubeVideoPattern = {
    AutoPlayVideoUrl: "https://www.youtube.com/embed/{0}?autoplay=1&controls=1&rel=0",
    NotAutoPlayVideoUrl: "https://www.youtube.com/embed/{0}?autoplay=0&controls=1&rel=0",
    DefaultVideoUrl: "https://www.youtube.com/embed/{0}?autoplay={1}&controls=0&rel=0"
};

export enum IconSize {
    Small = 0,
    Medium= 1,
    Large = 2
}

export enum CourseStatus{
    None=0,
    Draft = 1,
    RequestForReview = 2,
    Validation = 3,
    Approve = 4,
    Publish = 5,
    UnPublish = 6,
    Delete = 7
}
export enum AccountStatus{
    None = 0,
    Active = 1,
    InActive = 2,
    Pending = 3,
    Deleted = 4,
    WaittingForActivation = 5
}

export enum FileSelectDisplayType{
    Form, 
    Inline
}

export enum StorageStatus{
    // created and do nothing
    None=0,
    // process authorized and fail
    AuthorizedFail=1,
    //just have authorize code
    HasAuthorizeCode=2,
    // have access token.
    HasAccessToken=4
}

export enum StorageType{
    OneDrive=1,
    GoogleDrive=2
}
export enum DialogSize{
    Small=1,
    Large=2
}

export enum FormSelectType{
    Single=1,
    Multiple=2
}


export enum UIControlType{
    Primary,
    Danger
}

export  const UIControlCls={
    Danger:"btn-danger",
    Default:"btn-default"
};

export interface IInfoNotification{
    title:string;
    content:string;
    type: AlertType
}
export enum SubscriptionStatus{
    None = 0,
    Expired = 1,
    Activated = 2,
    WaitForApproval = 4,
    Rejected = 8
}
export const HTMLConst={
    HEAD:"html head"
};

export enum InvitationStatus{
    None = 0,
    Joined = 1,
    SendEmail = 2,
    ResendEmail = 4
}