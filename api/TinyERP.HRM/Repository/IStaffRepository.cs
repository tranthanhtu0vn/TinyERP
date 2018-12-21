namespace TinyERP.HRM.Repository
{
    using TinyERP.Common.Data;
    internal interface IStaffRepository : IBaseCommandRepository<TinyERP.HRM.Aggregate.Staff>
    {
        bool Exists(string firstName, string lastName);
    }
}
