import { BaseModel, required } from "@app/common";

export class AddNewStaffModel extends BaseModel{
    @required("hrm.addNewStaff.firstNameWasRequired")
    public firstName:string;
    @required("hrm.addNewStaff.lastNameWasRequired")
    public lastName:string;
}