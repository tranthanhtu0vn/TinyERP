namespace TinyERP.HRM.Command
{
    using TinyERP.Common.Command;
    using TinyERP.HRM.Command.Staff;
    internal interface IStaffCommandHandler: 
        IBaseCommandHandler<CreateStaffRequest, CreateStaffResponse>
    {
    }
}
