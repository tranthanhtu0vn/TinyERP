namespace TinyERP.HRM.Repository
{
    using TinyERP.Common.Data;
    internal class StaffRepository:BaseCommandRepository<TinyERP.HRM.Aggregate.Staff>, IStaffRepository
    {
        public StaffRepository():base(){}
        public StaffRepository(IUnitOfWork uow):base(uow.Context){}
    }
}
