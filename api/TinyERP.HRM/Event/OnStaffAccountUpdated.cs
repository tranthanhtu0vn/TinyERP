namespace TinyERP.HRM.Event
{
    using System;
    using TinyERP.Common.Event;
    internal class OnStaffAccountUpdated : BaseEvent
    {
        public Guid StaffId { get; private set; }
        public Guid AccountId { get; private set; }
        public OnStaffAccountUpdated(Guid staffId, Guid accountId)
        {
            this.StaffId = staffId;
            this.AccountId = accountId;
        }
    }
}
