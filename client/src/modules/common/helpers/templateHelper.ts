import objectHelper from "./objectHelper";
let templateHelper = {
    compile: compile,
    configCacheTemplates: configCacheTemplates
};
export default templateHelper;
function configCacheTemplates(templates: any) {
    window['$templateCache'] = templates;
}
function compile(msg: string, context: any) {
    if (!context || String.isNullOrWhiteSpace(msg)) { return msg; }
    let result: string = msg;
    let patterns: Array<string> = getPatterns(msg);
    patterns.forEach((name: string) => {
        let key = String.format("{{{0}}}", name);
        let value: any = objectHelper.getByPath(context, name);
        result = result.replace(key, value);
    });
    return result;
}
function getPatterns(msg: string): Array<string> {
    let reg: RegExp = new RegExp("\\{\\{([a-z,.,A-Z])+\\}\\}", "gmu");
    let matches: Array<string> = msg.match(reg);
    let result: Array<string> = [];
    if(!matches){return result;}
    matches.forEach((match: string) => {
        match = match.replace("{{", "");
        match = match.replace("}}", "");
        result.push(match);
    });
    return result;
}
