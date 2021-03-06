﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Xml;
using System.Xml.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Net.Http.Headers;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Xml.Serialization;

namespace React_app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GagesController : ControllerBase
    {
        private static Dictionary<string, dynamic> gages = new Dictionary<string, dynamic>
        {
            {"02054750", new {name = "ROANOKE RIVER AT ROUTE 117 AT ROANOKE, VA", lat = "37.27155556", longitude = "-80.00788889", datum = "null"}},
            {"02055000", new {name = "ROANOKE RIVER AT ROANOKE, VA", lat = "37.25847085", longitude = "-79.9386485", datum = "906.4" }},
            {"02055080", new {name = "ROANOKE RIVER AT THIRTEENTH ST BR AT ROANOKE, VA", lat = "37.26419444", longitude = "-79.9154444", datum = "null"} },
            {"02056000", new {name = "ROANOKE RIVER AT NIAGARA, VA", lat = "37.2551384", longitude = "-79.87142539", datum = "819.50" } }
        };


        [HttpGet]
        public Dictionary<string, dynamic> GagesData()
        {
            return gages;
        }

        [HttpGet("{gageID}/{paramType}")]
        public async Task<IActionResult> ISingleGageData(string gageID, string paramType)
        {
            List<GageDatum> GageDataList = new List<GageDatum>();
            using (var httpClient = new HttpClient())
            {
                try
                {
                    using (var response = await httpClient.GetAsync($"https://waterservices.usgs.gov/nwis/iv/?format=json&sites={gageID}&period=P4D&parameterCd={paramType}"))
                    {
                        string apiResponse = await response.Content.ReadAsStringAsync();
                        var respData = JObject.Parse(apiResponse.ToString());
                        System.Diagnostics.Debug.WriteLine("above if statement", paramType);
                        if (respData["value"]["timeSeries"][0] != null && respData["value"]["timeSeries"][0]["values"] != null)
                        {
                            var respList = respData["value"]["timeSeries"][0]["values"][0]["value"];
                            GageDataList = JsonConvert.DeserializeObject<List<GageDatum>>(respList.ToString());
                        }
                        else
                        {
                            GageDataList = new List<GageDatum>();
                        }
                    }
                    return Ok(GageDataList);
                }
                catch (Exception exception)
                {
                    System.Diagnostics.Debug.WriteLine(exception);
                    return null;
                }
            }
        }

        [Route("~/api/gages/forecast")]
        [HttpGet]
        public async Task<IActionResult> ISingleGageForecast()
        { 
            System.Diagnostics.Debug.WriteLine("inside forecast");
            List<GageDatum> GageForecastList = new List<GageDatum>();
            using (var httpClient = new HttpClient())
            {
                try
                {
                    using (var response = await httpClient.GetAsync($"https://water.weather.gov/ahps2/hydrograph_to_xml.php?gage=ronv2"))
                    {
                        string apiResponse = await response.Content.ReadAsStringAsync();
                        //var respData = JObject.Parse(apiResponse.ToString());
                        var respXml = XElement.Parse(apiResponse);
                        var items = respXml.Descendants("forecast").Descendants("datum").Select(x => new {
                                dateTime = x.Element("valid").Value,
                                flow = x.Element("secondary").Value
                                })
                                .FirstOrDefault();
                        System.Diagnostics.Debug.WriteLine(items.ToString());

                        //GageForecastList = apiResponse;
                        //}
                        //else
                        //{
                        //    System.Diagnostics.Debug.WriteLine("in else statement", gageID);
                        //    System.Diagnostics.Debug.WriteLine(respData["value"]["timeSeries"][0]);
                        //    GageForecastList = new List<GageDatum>();
                        //}
                    }
                    return Ok(GageForecastList);
                }
                catch (Exception exception)
                {
                    System.Diagnostics.Debug.WriteLine(exception);
                    return null;
                }
            }
        }
    }
}