using TinyERP.Common.DI;
using TinyERP.Common.Event;
using TinyERP.Common.Tasks;

namespace TinyERP.HRM.Event
{
    public class Bootstrap : BaseTask<ITaskArgument>, IBootstrapper<ITaskArgument>
    {
        public Bootstrap() : base(Common.ApplicationType.All) { }
        public override void Execute(ITaskArgument arg)
        {
            if (!this.IsValid(arg.Type)) { return; }
            IBaseContainer container = arg.Context as IBaseContainer;
            container.RegisterTransient<IEventHandler<OnStaffCreated>, StaffEventHandler>("TinyERP.HRM.Staff.OnStaffCreated");
            container.RegisterTransient<IEventHandler<OnStaffBasicInforChanged>, StaffEventHandler>("TinyERP.HRM.Staff.OnStaffBasicInforChanged");
        }
    }
}
