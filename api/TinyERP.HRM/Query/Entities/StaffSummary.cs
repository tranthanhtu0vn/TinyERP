namespace TinyERP.HRM.Query.Entities
{
    using Common.MVC.Attributes;
    using Context;
    using System;
    using TinyERP.Common;
    [DbContext(Use = typeof(IHRMQueryContext))]
    internal class StaffSummary: AggregateSummaryEntity
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Department { get; set; }
        public string Email { get; set; }

        public StaffSummary(Guid aggregateId):base(aggregateId){}
    }
}
