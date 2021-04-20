using Microsoft.AspNetCore.Mvc;
using System.Linq;
using TaxiStationManagement.API.Helper;
using TaxiStationManagement.API.Models;

namespace TaxiStationManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OperationTwoController : ControllerBase
    {
        [HttpGet]
        public IActionResult index()
        {
            var Locations = FireBaseContext.Locations;
            var Trackings = FireBaseContext.Trackings;

            var avgAmounts = Trackings
           .GroupBy(x => new { x.tpep_pickup_datetime.Date })
           .Select(cl => new OpSecondDTO
           {
               tpep_pickup_datetime = cl.Key.Date,
               total_amount = cl.Average(x => x.total_amount)
           })
           .OrderBy(x => x.total_amount).ToList();

            var minDate = avgAmounts.First();
            var secondMinDate = avgAmounts.Skip(1).First();

            var result = avgAmounts.Where(x => x.tpep_pickup_datetime >= minDate.tpep_pickup_datetime && x.tpep_pickup_datetime <= secondMinDate.tpep_pickup_datetime).ToList();

            return Ok(result);
        }
    }
}