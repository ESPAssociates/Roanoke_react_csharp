import axios from "axios";

export default {

    // get historical stage and flow data from USGS API
    getGagesHistory: function(gageID, paramType) {
        const paramID = paramType === 'flow' ? "00060" : "00065";
        const apiURL = 'https://waterservices.usgs.gov/nwis/iv/?format=json'
        const sites = '&sites=' + gageID;
        const DatePeriod = '&period=P4D';
        const typeParams = '&parameterCd=' + paramID;
        const siteStatus = '&siteStatus=all';

        let query = apiURL + sites + DatePeriod + typeParams + siteStatus;
        return axios.get(query);
    },

    getAllGages: function () {
        return fetch('api/gages');
    },

    getSingleGage: function (id, paramType) {
        return fetch(`api/gages/${id}/${paramType}`);
    },

    getSingleForecast: function () {
        return fetch('api/gages/forecast');
    },

    // TODO add call to NOAA
    getGagesForecast: axios.get('https://water.weather.gov/ahps2/hydrograph_to_xml.php?gage=ronv2'),

};