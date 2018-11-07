namespace TinyERP.HRM.Command
{
    using System;
    using TinyERP.Common.Command;
    using Staff;
    using Common.Helpers;
    using Common.Validation;
    using Common.Data;
    using Repository;
    using Common.DI;

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
            // and other business validations here, such as: unit first + last name, unit email, ....
            validator.ThrowIfError();
        }
    }
}
