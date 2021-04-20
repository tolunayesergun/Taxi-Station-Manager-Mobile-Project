using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using TaxiStationManagement.API.Models;

namespace TaxiStationManagement.API.Helper
{
    public static class FireBaseContext
    {
        public static List<Tracking> Trackings = new List<Tracking>();
        public static List<Location> Locations = new List<Location>() ;

        public static string GetData(string url)
        {
            WebClient client = new WebClient();
            return client.DownloadString(url);
        }
   
        public static void CreateData()
        {
            Trackings = JsonConvert.DeserializeObject<List<Tracking>>(GetData("https://taxistationmanager-default-rtdb.firebaseio.com/Trackings.json"));
            Locations = JsonConvert.DeserializeObject<List<Location>>(GetData("https://taxistationmanager-default-rtdb.firebaseio.com/Locations.json"));
        }

    }
}
