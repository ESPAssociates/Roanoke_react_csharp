import React, { useState, useEffect, useCallback} from 'react';
import { useGlobal } from 'reactn';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { loadCss } from 'esri-loader';
import { Scene } from '@esri/react-arcgis';
import GagePoint from './components/Point';
import API from './utils/api';
import gageData from './utils/dummydata';
import Dashboard from './components/Dashboard2';
import SlimNav from './components/SlimNav';
import Nav from './components/Nav';


const App = () => {

    // get esrii default css
    loadCss();

    // hooks for local gages data state
    const [gagesData, setGagesData] = useState(null);


    // get dummy gage info(name, id, lat and long)
    const gageInfo = gageData.gageData();

    function updateGagesInfo(data) {
        setGagesData(data);
    }


    useEffect(() => {
        API.getAllGages()
            .then(response => response.json())
            .then(data => updateGagesInfo(data));
    });
   

    return (
      <div>
        {/* create as sceneview w/ full page map TODO: move styling to index.css */}
        <SlimNav></SlimNav>
        <Nav />
        <Scene 
          class="full-screen-map"
          style={{ width: '100vw', height: '100vh'}}
          mapProperties={{ basemap: 'topo-vector' }}
          viewProperties={{
            center: [-79.9414, 37.2710],
            zoom: 11,
            ui: {components: [] }
          }}
                  
        >
                {/* map through gage data and add points (component) for each gage to map.  Assume we will want to create a single layer for final version*/}
                {gagesData ?                    
                    (Object.keys(gagesData).map(gage => (
                        <GagePoint gageInfo={gagesData[gage]} key={gage} gageID={gage} allGages={gagesData} />
                    )))
                 : null
                }
        </Scene>
        {/* render dashboard component, pass selected gage info through*/}
        <Dashboard />
        {/* <Sidebar></Sidebar> */}
      </div>
      
    );

}

export default App;

