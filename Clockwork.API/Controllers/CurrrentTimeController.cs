using System;
using System.Net.Http;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using Newtonsoft.Json;
using Clockwork.API.Models;
using Clockwork.API.Common;


namespace Clockwork.API.Controllers
{
    [Route("api/[controller]")]
    public class CurrentTimeController : Controller
    {
        // GET api/currenttime
        [EnableCors("GetCurrentTime")]
        [HttpGet("GetCurrentTime")]
        [Produces("application/json")]
        public IActionResult Get([FromBody] string body)
        {
            var localDate = JsonConvert.DeserializeObject<List<LocalTime>>(body);
            var utcTime = DateTime.UtcNow;
            var serverTime = DateTime.Now;
            var ip = this.HttpContext.Connection.RemoteIpAddress.ToString();
            DateTime local = new DateTime(localDate[0].year, localDate[0].month, localDate[0].day, localDate[0].hours, localDate[0].minutes, localDate[0].seconds);
            TimeSpan offset = utcTime - local;

            var returnVal = new CurrentTimeQuery
            {
                UTCTime = utcTime,
                ClientIp = ip,
                ServerTime = serverTime,
                LocalTime = local,
                UTCOffset = offset.TotalHours
            };

            using (var db = new ClockworkContext())
            {
                db.CurrentTimeQueries.Add(returnVal);
                var count = db.SaveChanges();
                Console.WriteLine("{0} records saved to database", count);

                Console.WriteLine();
                foreach (var CurrentTimeQuery in db.CurrentTimeQueries)
                {
                    Console.WriteLine(" - {0}", CurrentTimeQuery.UTCTime);
                }
            }
            return Ok(returnVal);
        }
    }
}
