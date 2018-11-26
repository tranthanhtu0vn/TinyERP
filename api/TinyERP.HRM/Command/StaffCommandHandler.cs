namespace TinyERP.HRM.Command
{
    using TinyERP.Common.Command;
    using Staff;
    using Common.Helpers;
    using Common.Validation;
    using Common.Data;
    using Repository;
    using Common.DI;
    using TinyERP.Security.Share.Facade;
    using TinyERP.Security.Share.Account.Command;
    using TinyERP.Common;
    using TinyERP.Security.Share.Account;

    internal class StaffCommandHandler : BaseCommandHandler, IStaffCommandHandler
    {
        public CreateStaffResponse Handle(CreateStaffRequest command)
        {
            this.Validate(command);
            IAccountFacade accountFacade = IoC.Container.Resolve<IAccountFacade>();
            using (IUnitOfWork uow = this.CreateUnitOfWork<TinyERP.HRM.Aggregate.Staff>()) {
                CreateAccountRequest createAccountRequest = new CreateAccountRequest(command.FirstName, command.LastName, command.Email, command.Password, command.Password);
                createAccountRequest.Roles.Add(new Role(SecurityRoleType.Administrator, SecurityRoleType.Administrator, SecurityRoleType.Administrator, Modules.All, TinyERP.Common.ItemStatus.Active));
                CreateAccountResponse createAccountResponse = accountFacade.CreateAccount(createAccountRequest);
                TinyERP.HRM.Aggregate.Staff staff = new Aggregate.Staff();
                staff.UpdateBasicInfo(command);
                staff.UpdateAccount(createAccountResponse.AccountId);
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
