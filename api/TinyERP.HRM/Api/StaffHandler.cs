namespace TinyERP.HRM.Api
{
    using Common.DI;
    using Query;
    using Search.Share;
    using Share.Staff;
    using System.Web.Http;
    using TinyERP.Common.MVC.Attributes;
    using Command.Staff;
    using Common.Command;

    [RoutePrefix("api/hrm/staffs")]
    public class StaffHandler: CommandHandlerController<TinyERP.HRM.Aggregate.Staff>
    {
        [Route("")]
        [HttpGet()]
        [ResponseWrapper()]
        public ISearchResult<StaffListItem> GetStaffs() {
            IStaffQuery query = IoC.Container.Resolve<IStaffQuery>();
            return query.Search<StaffListItem>();
        }

        [Route("")]
        [HttpPost()]
        [ResponseWrapper()]
        public void CreateStaff(CreateStaffRequest request) {
            this.Execute<CreateStaffRequest, CreateStaffResponse>(request);
        }
    }
}
