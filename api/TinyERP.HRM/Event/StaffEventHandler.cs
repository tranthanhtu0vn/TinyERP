namespace TinyERP.HRM.Event
{
    using System;
    using Common.Data;
    using Common.DI;
    using Query;
    using Query.Entities;
    using TinyERP.Common.Event;
    internal class StaffEventHandler : BaseEventHandler, IStaffEventHandler
    {
        public void Execute(OnStaffBasicInforChanged ev)
        {
            using (IUnitOfWork uow = this.CreateUnitOfWork<StaffSummary>())
            {
                IStaffQuery query = IoC.Container.Resolve<IStaffQuery>(uow);
                StaffSummary staff = query.GetByAggregateId(ev.StaffId.ToString());
                staff.FirstName = ev.FirstName;
                staff.LastName = ev.LastName;
                staff.Email = ev.Email;
                query.Update(staff);
                uow.Commit();
            }
        }

        public void Execute(OnStaffCreated ev)
        {
            using (IUnitOfWork uow = this.CreateUnitOfWork<StaffSummary>())
            {
                StaffSummary summary = new StaffSummary(ev.StaffId);
                IStaffQuery query = IoC.Container.Resolve<IStaffQuery>(uow);
                query.Add(summary);
                uow.Commit();
            }
        }
    }
}
