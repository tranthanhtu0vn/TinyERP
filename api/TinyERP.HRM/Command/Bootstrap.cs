using TinyERP.Common.Command;
using TinyERP.Common.DI;
using TinyERP.Common.Tasks;
using TinyERP.HRM.Command.Staff;

namespace TinyERP.HRM.Command
{
    public class Bootstrap: BaseTask<ITaskArgument>, IBootstrapper<ITaskArgument>
    {
        public Bootstrap():base(Common.ApplicationType.All){}
        public override void Execute(ITaskArgument arg)
        {
            if (!this.IsValid(arg.Type)) { return; }
            IBaseContainer container = arg.Context as IBaseContainer;

            container.RegisterTransient<IBaseCommandHandler<CreateStaffRequest, CreateStaffResponse>, StaffCommandHandler>();
        }
    }
}
