namespace TinyERP.Api.Controllers
{
    using System.Web.Http;
    using TinyERP.Common.MVC;
    using TinyERP.Common.MVC.Attributes;

    [System.Web.Http.RoutePrefix("api/system")]
    public class SystemController : BaseApiController
    {
        [Route("getMyName")]
        [HttpGet()]
        [ResponseWrapper()]
        public string GetMyName() {
            return "TU Tran";
        }
    }
}
