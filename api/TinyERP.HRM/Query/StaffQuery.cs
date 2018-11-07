namespace TinyERP.HRM.Query
{
    using Common.Data;
    using TinyERP.HRM.Query.Entities;
    using Search.Share;
    using System.Linq;
    using System.Collections.Generic;
    using Common.Extensions;

    internal class StaffQuery : BaseQueryRepository<StaffSummary>, IStaffQuery
    {
        public StaffQuery() : base() { }
        public StaffQuery(IUnitOfWork uow) : base(uow.Context) { }

        public ISearchResult<TResult> Search<TResult>()
        {
            IList<TResult> items = this.DbSet.AsQueryable().ToList().Cast<StaffSummary, TResult>();
            ISearchResult<TResult> result = new SearchResult<TResult>(items, items.Count);
            return result;
        }
    }
}
