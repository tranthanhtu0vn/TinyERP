namespace TinyERP.HRM.Context
{
    using Common;
    using Common.Helpers;
    using System.Data.Entity;
    using TinyERP.Common.Data.MSSQL;
    internal class HRMDbContext : MSSQLDbContext, IHRMContext
    {
        public IDbSet<TinyERP.HRM.Aggregate.Staff> Staffs { get; set; }
        public HRMDbContext() : this(IOMode.Read) { }
        public HRMDbContext(IOMode mode = IOMode.Read, string connstr = "") : base(ConnectionStringHelper.GetConnectionString<IHRMContext>(), mode)
        {
            System.Data.Entity.Database.SetInitializer(new DropCreateDatabaseIfModelChanges<HRMDbContext>());
        }
    }
}
