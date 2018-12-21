namespace TinyERP.HRM.Command.Staff
{
    using Common.Validation.Attribute;
    using TinyERP.Common.Command;
    public class CreateStaffRequest: IBaseCommand
    {
        [Required("hrm.addNewStaff.firstNameWasRequired")]
        public string FirstName { get; set; }
        [Required("hrm.addNewStaff.lastNameWasRequired")]
        public string LastName { get; set; }
        public string Email { get; set; }
        public CreateStaffRequest(string firstName, string lastName, string email)
        {
            this.FirstName = firstName;
            this.LastName = lastName;
            this.Email = email;
        }
    }
}
