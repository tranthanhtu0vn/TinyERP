import { AppSettingType } from "@app/common";
let settings: Array<IAppSettingItem>= [
    { name: AppSettingType.DEFAULT_URL, value: "/" },
    { name: AppSettingType.RootUri, value: "/" },
    { name: AppSettingType.ResourceUri, value: "src/resources" },
    { name: AppSettingType.NoPhoto, value: "src/resources/images/no-photo.svg" },
    { name: AppSettingType.MediaUri, value: "http://api.tinyerp.com/api/medias/" }
];
export default settings;