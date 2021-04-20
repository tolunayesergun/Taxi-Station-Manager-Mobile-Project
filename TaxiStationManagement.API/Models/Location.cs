using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TaxiStationManagement.API.Models
{
    public class Location
    {

        public int LocationId { get; set; }
        public string Borough { get; set; }
        public string Zone { get; set; }
    }
}
