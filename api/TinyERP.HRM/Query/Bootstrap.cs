namespace TinyERP.HRM.Query
{
    using TinyERP.Common.DI;
    using TinyERP.Common.Tasks;
    public class Bootstrap:BaseTask<ITaskArgument>, IBootstrapper<ITaskArgument>
    {
        public Bootstrap():base(Common.ApplicationType.All){}
        public override void Execute(ITaskArgument context)
        {
            if (!this.IsValid(context.Type)) { return; }
            IBaseContainer container = context.Context as IBaseContainer;
            container.RegisterTransient<IStaffQuery, StaffQuery>();
        }
    }
}
