import {LocalIoCNames} from "../enum";
import {IoCLifeCycle} from "@app/common";
import {StaffService} from "../services/staffService";
let ioc: Array<IIoCConfigItem> = [
    { name: LocalIoCNames.IStaffService, instance: StaffService, lifeCycle: IoCLifeCycle.Transient }
];
export default ioc;