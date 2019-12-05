import { useState, useEffect } from 'react';
import { loadModules } from 'esri-loader';
import { useGlobal } from 'reactn';

const GagePoint = (props) => {

    // hooks for local state for graphic for gage point
    const [graphic, setGraphic] = useState(null);
    
    // hooks for global currentGageID and currentGageName state
    const [ currentGageID, setGageID ] = useGlobal('currentGageID');
    const [ currentGageName, setGageName ] = useGlobal('currentGageName');
    const [ currentGageDatum, setGageDatum ] = useGlobal('currentGageDatum');

    // hook for global sidebar toggle state
    const [ sidebarOpen, setSidebarState] = useGlobal('sidebarOpen');


    const toggleDrawer = (open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        setSidebarState(open);
        // setState({ left: open });
      };

    useEffect(() => {
        loadModules(['esri/Graphic', "esri/widgets/Zoom"]).then(([Graphic, Zoom]) => {
            // Create a point geometry
            var point = {
                type: "point",
                longitude: props.gageInfo.longitude,
                latitude: props.gageInfo.lat
              };

            // create symbol for point  
            var simpleMarkerSymbol = {
                type: "simple-marker",
                color: [58, 193, 240],  // orange
                outline: {
                    color: [255, 255, 255], // white
                    width: 3
                }
            };
            
            // set attributes for gage point
            var gageAttr = {
                name: props.gageInfo.name,
                id: props.gageID,
                datum: props.gageInfo.datum,
                location: {longitude: props.gageInfo.longitude,
                    latitude: props.gageInfo.lat}
            };
            
            // create graphics for point
            var pointGraphic = new Graphic({
                geometry: point,
                symbol: simpleMarkerSymbol,
                attributes: gageAttr,
                // popupTemplate: {
                //     title: "{name}",
                // //     content: [
                // //     ]
                // } 
            });            
            // set the graphic and add to view
            setGraphic(pointGraphic);
            props.view.graphics.add(pointGraphic);

            // add click listener to view and then hit test to see if point clicked
            props.view.on("click", function(evt) {
                var screenPoint = evt.screenPoint;        
                // esri hitTest() methodchecks to see if any graphics in the view
                // intersect the given screen point
                props.view.hitTest(screenPoint)
                  .then(getGraphics)
                  toggleDrawer(true);
            });

            // if gage clicked, set global state for currentGage to selected gage
            // then update flow data (to update the dashboard display)
            function getGraphics(response) {
                // the topmost graphic from the click location
                // and display select attribute values from the
                // graphic to the user
                var graphic = response.results[0].graphic;
                var attributes = graphic.attributes;
                // set the global gageID and gageName state to attributes of selected gage
                setGageID(attributes.id);
                setGageName(attributes.name);
                setGageDatum(attributes.datum);
              }


        }).catch((err) => console.error(err));

        return function cleanup() {
            props.view.graphics.remove(graphic);
        };
    }, []);

    return null;

}

export default GagePoint;