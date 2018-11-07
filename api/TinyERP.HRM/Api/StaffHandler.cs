namespace TinyERP.HRM.Api
{
    using Common.DI;
    using Query;
    using Search.Share;
    using Share.Staff;
    using System.Web.Http;
    using TinyERP.Common.MVC;
    using TinyERP.Common.MVC.Attributes;
    [RoutePrefix("api/hrm/staffs")]
    public class StaffHandler: BaseApiController
    {
        [Route("")]
        [HttpGet()]
        [ResponseWrapper()]
        public ISearchResult<StaffListItem> GetStaffs() {
            IStaffQuery query = IoC.Container.Resolve<IStaffQuery>();
            return query.Search<StaffListItem>();
        }
    }
}
