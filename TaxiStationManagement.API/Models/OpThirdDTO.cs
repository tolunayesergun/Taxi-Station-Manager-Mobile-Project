using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaxiStationManagement.API.Controllers;

namespace TaxiStationManagement.API.Models
{
    public class OpThirdDTO
    {
        public ParsedLocation minTripStartCoordinate { get; set; }
        public ParsedLocation minTripFnishCoordinate { get; set; }
        public ParsedLocation maxTripStartCoordinate { get; set; }
        public ParsedLocation maxTripFnishCoordinate { get; set; }

    }
}
