namespace TinyERP.HRM.Command.Staff
{
    using TinyERP.Common.Command;
    public class CreateStaffRequest: IBaseCommand
    {
        public string FirstName { get; set; }
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
