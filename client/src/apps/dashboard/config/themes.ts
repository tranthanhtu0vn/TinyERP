import { ITheme, AppThemeType, ModuleNames } from "@app/common";
let themes: Array<ITheme> = [
    { 
        name: AppThemeType.Default, 
        isDefault:true,
        urlPrefix: AppThemeType.Default, 
        modules: [
            {name: ModuleNames.Support, isDefault:true},
            {name:ModuleNames.HRM}
        ]
    }
];
export default themes;