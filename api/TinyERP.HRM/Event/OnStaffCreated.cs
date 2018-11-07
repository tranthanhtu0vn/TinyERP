namespace TinyERP.HRM.Event
{
    using System;
    using TinyERP.Common.Event;
    internal class OnStaffCreated: BaseEvent
    {
        public Guid StaffId { get; private set; }
        public OnStaffCreated(Guid staffId):base(Common.EventPriority.High){
            this.StaffId = staffId;
        }
    }
}
