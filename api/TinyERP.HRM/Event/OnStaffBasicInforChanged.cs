namespace TinyERP.HRM.Event
{
    using System;
    using TinyERP.Common.Event;
    public class OnStaffBasicInforChanged : BaseEvent
    {
        public string Email { get; private set; }
        public string FirstName { get; private set; }
        public string LastName { get; private set; }
        public Guid StaffId { get; private set; }
        public OnStaffBasicInforChanged(Guid staffId, string firstName, string lastName, string email)
        {
            this.StaffId= staffId;
            this.FirstName = firstName;
            this.LastName = lastName;
            this.Email = email;
        }
    }
}
