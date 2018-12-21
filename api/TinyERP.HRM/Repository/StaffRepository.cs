namespace TinyERP.HRM.Repository
{
    using System.Linq;
    using TinyERP.Common.Data;
    internal class StaffRepository:BaseCommandRepository<TinyERP.HRM.Aggregate.Staff>, IStaffRepository
    {
        public StaffRepository():base(){}
        public StaffRepository(IUnitOfWork uow):base(uow.Context){}

        public bool Exists(string firstName, string lastName)
        {
            return this.DbSet.AsQueryable().Any(item=> item.FirstName==firstName && item.LastName==lastName);
        }
    }
}
