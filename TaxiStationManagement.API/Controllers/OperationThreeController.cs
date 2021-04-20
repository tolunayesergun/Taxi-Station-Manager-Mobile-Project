using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using TaxiStationManagement.API.Helper;
using TaxiStationManagement.API.Models;

namespace TaxiStationManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OperationThreeController : ControllerBase
    {
        [HttpGet]
        public IActionResult index()
        {
            var Locations = FireBaseContext.Locations;
            var Trackings = FireBaseContext.Trackings;
            var minThreePassangerTrips = Trackings.Where(x => x.passenger_count >= 3).ToList();
            var minDistance = minThreePassangerTrips.OrderBy(x => x.trip_distance).Take(1).First();
            var maxDistance = minThreePassangerTrips.OrderByDescending(x => x.trip_distance).Take(1).First();

            var minTripStartBorough = Locations.Where(l => l.LocationId == minDistance.PULocationID).Select(x => x.Borough).FirstOrDefault();
            var minTripFnishBorough = Locations.Where(l => l.LocationId == minDistance.DOLocationID).Select(x => x.Borough).FirstOrDefault();
            var minTripStartZone = Locations.Where(l => l.LocationId == minDistance.PULocationID).Select(x => x.Zone).FirstOrDefault();
            var minTripFnishZone = Locations.Where(l => l.LocationId == minDistance.DOLocationID).Select(x => x.Zone).FirstOrDefault();
            var maxTripStartBorough = Locations.Where(l => l.LocationId == maxDistance.PULocationID).Select(x => x.Borough).FirstOrDefault();
            var maxTripFnishBorough = Locations.Where(l => l.LocationId == maxDistance.DOLocationID).Select(x => x.Borough).FirstOrDefault();
            var maxTripStartZone = Locations.Where(l => l.LocationId == maxDistance.PULocationID).Select(x => x.Zone).FirstOrDefault();
            var maxTripFnishZone = Locations.Where(l => l.LocationId == maxDistance.DOLocationID).Select(x => x.Zone).FirstOrDefault();

            var result = new OpThirdDTO
            {
                minTripStartCoordinate = Get(minTripStartBorough + " " + minTripStartZone),
                minTripFnishCoordinate = Get(minTripFnishBorough + " " + minTripFnishZone),
                maxTripStartCoordinate = Get(maxTripStartBorough + " " + maxTripStartZone),
                maxTripFnishCoordinate = Get(maxTripFnishBorough + " " + maxTripFnishZone),
            };
            return Ok(result);
        }

        public static ParsedLocation Get(string adress)
        {
            var client = new HttpClient();
            HttpResponseMessage request = client.GetAsync("https://maps.googleapis.com/maps/api/geocode/json?address=" + adress + "&key=AIzaSyCYuFfaU5oUcaSj5Oou5rvfciKKGtD4pGM").Result;
            var jsonResult = request.Content.ReadAsStringAsync().Result;
            return JsonConvert.DeserializeObject<Root>(jsonResult).results[0].geometry.location;
        }
    }
}
