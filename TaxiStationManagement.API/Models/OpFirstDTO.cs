using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TaxiStationManagement.API.Models
{
    public class OpFirstDTO
    {
        public int passenger_count { get; set; }
        public DateTime tpep_pickup_datetime { get; set; }

    }
}
