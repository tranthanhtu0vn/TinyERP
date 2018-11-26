namespace TinyERP.HRM.Aggregate
{
    using TinyERP.Common.Aggregate;
    using Command.Staff;
    using Event;
    using Common.MVC.Attributes;
    using Context;
    using System;

    [DbContext(Use = typeof(IHRMContext))]
    public class Staff: BaseAggregateRoot
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public Guid AccountId { get; set; }
        public Staff()
        {
            this.AddEvent(new OnStaffCreated(this.Id));
        }
        internal void UpdateBasicInfo(CreateStaffRequest command)
        {
            this.FirstName = command.FirstName;
            this.LastName = command.LastName;
            this.Email = command.Email;
            this.AddEvent(new OnStaffBasicInforChanged(this.Id, this.FirstName, this.LastName, this.Email));
        }

        internal void UpdateAccount(Guid accountId)
        {
            this.AccountId = accountId;
            this.AddEvent(new OnStaffAccountUpdated(this.Id, accountId));
        }
    }
}
