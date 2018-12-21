namespace TinyERP.HRM.Command
{
    using TinyERP.Common.Command;
    using Staff;
    using Common.Helpers;
    using Common.Validation;
    using Common.Data;
    using Repository;
    using Common.DI;
    using Share;

    internal class StaffCommandHandler : BaseCommandHandler, IStaffCommandHandler
    {
        public CreateStaffResponse Handle(CreateStaffRequest command)
        {
            this.Validate(command);
            using (IUnitOfWork uow = this.CreateUnitOfWork<TinyERP.HRM.Aggregate.Staff>()) {
                TinyERP.HRM.Aggregate.Staff staff = new Aggregate.Staff();
                staff.UpdateBasicInfo(command);
                IStaffRepository repository = IoC.Container.Resolve<IStaffRepository>(uow);
                repository.Add(staff);
                uow.Commit();
                staff.PublishEvents();
                return ObjectHelper.Cast<CreateStaffResponse>(staff);
            }
        }

        private void Validate(CreateStaffRequest command)
        {
            IValidationException validator = ValidationHelper.Validate(command);
            if (string.Format("{0} {1}", command.FirstName, command.LastName).Length > HRMConst.MAX_FULLNAME_LEGNTH) {
                validator.Add(new ValidationError(
                    "hrm.addNewStaff.fullNameTooLong",
                    "MAX_FULLNAME_LENGTH",
                    HRMConst.MAX_FULLNAME_LEGNTH.ToString()
                    ));
            }

            IStaffRepository repo = IoC.Container.Resolve<IStaffRepository>();
            if (
                !string.IsNullOrWhiteSpace(command.FirstName) && 
                !string.IsNullOrWhiteSpace(command.LastName) && 
                repo.Exists(command.FirstName, command.LastName)) {
                validator.Add(new ValidationError(
                        "hrm.addNewStaff.fullNameWasExisted",
                        "FIRST_NAME", command.FirstName,
                        "LAST_NAME", command.LastName
                    ));
            }
            validator.ThrowIfError();
        }
    }
}
