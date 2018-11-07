namespace TinyERP.HRM.Event
{
    using TinyERP.Common.Event;
    internal interface IStaffEventHandler: 
        IEventHandler<OnStaffCreated>,
        IEventHandler<OnStaffBasicInforChanged>
    {
    }
}
