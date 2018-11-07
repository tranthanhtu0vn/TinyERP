namespace TinyERP.HRM.Share.Task
{
    using Command.Staff;
    using Common.Command;
    using TinyERP.Common.Tasks;
    public class CreateDefaultStaff: BaseTask<ITaskArgument>, TinyERP.Common.Tasks.IApplicationReadyTask<ITaskArgument>
    {
        public CreateDefaultStaff():base(Common.ApplicationType.All){}
        public override void Execute(ITaskArgument context)
        {
            if (!this.IsValid(context.Type)) { return; }
            CreateStaffRequest request = new CreateStaffRequest("Tu", "Tran", "contact@tranthanhtu.vn");
            ICommandHandlerStrategy commandHandler = CommandHandlerStrategyFactory.Create<TinyERP.HRM.Aggregate.Staff>();
            CreateStaffResponse response = commandHandler.Execute<CreateStaffRequest, CreateStaffResponse>(request);
            this.Logger.Info("New staff (id: {0}) was created", response.Id);
        }
    }
}
