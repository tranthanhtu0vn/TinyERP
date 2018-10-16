export const SecurityRoleType = {
    Any: "",
    ActiveSubscription:"ActiveSubscription",
    Administrator: "Administrator",
    SuperUser: "SuperUser",
    User: "User",
    Student:"Student",
    Tutor:"Tutor"
};

export enum AuthorizationResult {
    OK,
    LOGIN_REQUIRED,
    UNAUTHORIZE
}
export const AuthorizeResponseType={
    CODE:"code"
};

export const AuthorizeGrantType={
    AUTHORIZATION_CODE:"authorization_code"
};