using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TaxiStationManagement.API.Models
{
    public class OpSecondDTO
    {
        public DateTime tpep_pickup_datetime { get; set; }
        public double total_amount { get; set; }
    }
}
