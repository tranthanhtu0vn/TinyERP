import { BaseModel, required, valueInRange, ValidationException } from "@app/common";
import {HrmConst} from "../_share/enum";

export class AddNewStaffModel extends BaseModel{
    @valueInRange(1,5,"hrm.addNewStaff.firstNameMax5Letter")
    @required("hrm.addNewStaff.firstNameWasRequired")
    public firstName:string;
    @required("hrm.addNewStaff.lastNameWasRequired")
    public lastName:string;
    protected getValidationErrors(): ValidationException {
        let validator:ValidationException = new ValidationException();
        let fullName=String.format("{0} {1}", this.firstName, this.lastName);
        if(fullName.length > HrmConst.MAX_FULLNAME_LEGNTH){
            validator.add(
                "hrm.addNewStaff.fullNameTooLong",[
                    {key:"MAX_FULLNAME_LENGTH", value: HrmConst.MAX_FULLNAME_LEGNTH}
                ]);
        }
        return validator;
    }
}