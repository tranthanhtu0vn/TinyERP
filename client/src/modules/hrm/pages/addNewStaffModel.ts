import { BaseModel, required, valueInRange } from "@app/common";

export class AddNewStaffModel extends BaseModel{
    @valueInRange(1, 5,"hrm.addNewStaff.firstNameMax5Letter")
    @required("hrm.addNewStaff.firstNameWasRequired")
    public firstName:string;
    @required("hrm.addNewStaff.lastNameWasRequired")
    public lastName:string;
}