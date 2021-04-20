using Microsoft.AspNetCore.Mvc;
using System.Linq;
using TaxiStationManagement.API.Helper;
using TaxiStationManagement.API.Models;

namespace TaxiStationManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OperationOneController : ControllerBase
    {
        [HttpGet]
        public IActionResult index()
        {
            var Locations = FireBaseContext.Locations;
            var Trackings = FireBaseContext.Trackings;

            var result = Trackings
           .GroupBy(x => new { x.tpep_pickup_datetime.Date })
           .Select(cl => new OpFirstDTO
           {
               tpep_pickup_datetime = cl.Key.Date,
               passenger_count = cl.Sum(x => x.passenger_count)
           })
           .OrderByDescending(x => x.passenger_count).Take(5).ToList();

            return Ok(result);
        }
    }
}
