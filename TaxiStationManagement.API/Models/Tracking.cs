using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TaxiStationManagement.API.Models
{
    public class Tracking
    {
        public int DOLocationID { get; set; }
        public int PULocationID { get; set; }
        public int passenger_count { get; set; }
        public double total_amount { get; set; }
        public DateTime tpep_dropoff_datetime { get; set; }
        public DateTime tpep_pickup_datetime { get; set; }
        public double trip_distance { get; set; }
    }
}
