[assembly: Microsoft.Owin.OwinStartup(typeof(TinyERP.Api.WebApiApplication))]
namespace TinyERP.Api
{
    using TinyERP.Common.Application;
    using TinyERP.Common;
    public class WebApiApplication : BaseWebApiApplication
    {
        public WebApiApplication() : base() { }
        protected override ApplicationType GetApplicationType()
        {
            return ApplicationType.WebApi;
        }

        protected virtual void Application_Start()
        {
            this.application.OnApplicationStarted();
        }
    }
}
