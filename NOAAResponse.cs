using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Xml;
using System.Xml.Linq;
using System.Xml.Serialization;

namespace React_app
{
    [XmlTypeAttribute(AnonymousType = true)]
    public class ForecastData
    {
        [XmlElement("forecast")]
        public List<ForecastDatum> Forecast { get; set; }

        public ForecastData()
        {
            Forecast = new List<ForecastDatum>();
        }
    }
    public class ForecastDatum
    {
        [XmlElement(ElementName = "primary")]
        public string stage { get; set; }

        [XmlElement(ElementName = "secondary")]
        public string flow { get; set; }

        [XmlElement(ElementName = "valid")]
        public DateTime dateTime { get; set; }


    }
}

