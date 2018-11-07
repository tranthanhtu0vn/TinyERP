namespace TinyERP.HRM.Query
{
    using TinyERP.Common.Data;
    using TinyERP.Search.Share;
    internal interface IStaffQuery : IBaseQueryRepository<TinyERP.HRM.Query.Entities.StaffSummary>
    {
        ISearchResult<TResult> Search<TResult>();
    }
}
