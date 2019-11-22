export default {
    // basic data for roanoke gages, pulled from USGS - see notes.md for more info
    gageData: function(){
        return(
        [
        {id: "02054750", name: "ROANOKE RIVER AT ROUTE 117 AT ROANOKE, VA", lat: 37.27155556, long: "-80.00788889", datum: null},
        {id: "02055000", name: "ROANOKE RIVER AT ROANOKE, VA", lat: 37.25847085, long: -79.9386485, datum: 906.4},
        {id: "02055080", name: "ROANOKE RIVER AT THIRTEENTH ST BR AT ROANOKE, VA", lat: 37.26419444, long: -79.9154444, datum: null},
        {id: "02056000", name: "ROANOKE RIVER AT NIAGARA, VA", lat: 37.2551384, long: -79.87142539, datum: 819.50}
    ])
    },
    stageLevelData: function(){
        return(
            {
                "02054750": {normal: 1, monitor: 2, minor: 3, moderate: 5, major: 6},
                "02055000": {normal: 2, monitor: 3, minor: 4, moderate: 5, major: 7},
                "02055080": {normal: 1, monitor: 1.4, minor: 2.6, moderate: 3.6, major: 4.8},
                "02056000": {normal: 3, monitor: 4, minor: 5, moderate: 6, major: 8}
        
            }
        )
    }

}
