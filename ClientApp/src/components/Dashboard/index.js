import React, {useState, useCallback, useMemo, useEffect} from 'react';
import SmallFlowchart from '../SmallFlowchart';
import SmallStagechart from '../SmallStagechart';
import LargeFlowChart from '../LargeFlowChart';
import LargeStageChart from '../LargeStageChart';
import Modal from "../Modal";
import useToggle from '../UseModal';
import API from '../../utils/api';
import { useGlobal } from 'reactn';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import moment from 'moment';



const Dashboard = (props) => {

  // hooks for global gage state and local flow data state
  const [ currentGageID, setGageID ] = useGlobal('currentGageID');
  const [ currentGageName, setGageName] = useGlobal('currentGageName');

  // hooks for local flow and stage data for selected gage
  const [flowData, setFlowData] = useState(null);
  const [stageData, setStageData] = useState(null);

  // hooks for local modal state (shown or hidden)
  const [open, setOpen] = useToggle(false);
  const [type, setChartType] = useState(null);

  
  // get gage data objects from API response
  function cleanGageData(data) {
    let gageData = data.data.value.timeSeries[0].values[0].value;
    return gageData;
  }

  function handleChartClick(type) {
    setChartType(type)
    setOpen()
  }

  function largeChart() {
    if({type} === 'flow') {
      return <LargeFlowChart></LargeFlowChart>
    } else if ({type} === 'stage') {
      return <LargeStageChart></LargeStageChart>
    }
  }


  // update info displayed in dashboard when currentGage
  useEffect(() => {

    if (currentGageID) {
      // clean and set flow data for selected gage, if available
      API.getGagesHistory(currentGageID, "flow").then(response => {
        if (response.data.value.timeSeries[0]) {
          // let val = response.data.value.timeSeries[0].values[0].value[0].value;
          setFlowData(cleanGageData(response));
        } else {
          setFlowData("no flow data available");
        }
      });
      // clean and set stage data for selected gage, if available
      API.getGagesHistory(currentGageID, "stage").then(response => {
        if (response.data.value.timeSeries[0]) {
          // let val = response.data.value.timeSeries[0].values[0].value[0].value;
          setStageData(cleanGageData(response));
        } else {
          setStageData("no flow data available");
        }
      });

    }

  },[currentGageID]);

  return (
    <div>
    {/* if a gage is selected (props passed w/ current gage name), return dashboard container.  Else return empty fragment. */}
    {currentGageName ? 
        <Container className="dashboardWrapper"> 
          <h5 id="dashboardTitle">{currentGageName}</h5>
          <p>gage #{currentGageID}</p>
          
          <Row>
            <Col >
              <div className="dashboardItem">
                <h6>Current Status</h6>
                <img src=""></img>
                <p>
                  Stage: { (stageData &&  stageData[stageData.length - 1 ].value) ? stageData[stageData.length - 1 ].value + " ft" : "no stage data available"}
                  <br></br>
                  Flow: {(flowData && flowData[flowData.length - 1 ].value) ? flowData[flowData.length - 1 ].value + " cfs": "no flow data available"}
                </p>
                <small>last reading: 
                  { (stageData && stageData[stageData.length - 1 ].dateTime) ? "   " + moment(stageData[stageData.length - 1 ].dateTime).format('D MMM HH:mm')
                    : null
                  }
                </small>
              </div>
            </Col>
            <Col>
              <div key={"flow"} className="dashboardItem" onClick={() => handleChartClick('flow')}>
                <h6>Flow Chart (cfs) </h6>
                {(flowData && flowData[flowData.length - 1 ].value) ?
                <div>
                  <SmallFlowchart data={flowData}>
                  </SmallFlowchart>
                </div>
                :
                <small>no flow data for this gage</small>
              }
              </div>
            </Col>
            <Col>
            <div key={"stage"} className="dashboardItem" onClick={() => handleChartClick('stage')}>
              <h6>Stage Hydrograph (ft)</h6>
              { (stageData &&  stageData[stageData.length - 1 ].value) ? 
              <div>
              <SmallStagechart data={stageData}>
              </SmallStagechart>
              </div>
              :
              <p>no stage data for this gage</p>
            }
            </div>
            </Col>
          </Row>
          <Modal
            open={open} 
            toggle={setOpen}
          >
            <div>
            {type === 'stage' ?
              <div> 
              <h2>Stage Chart</h2>
              <LargeStageChart data={stageData}></LargeStageChart> 
              </div>
              : 
              <div>
              <h2>Flow Chart</h2>
              <LargeFlowChart data={flowData}></LargeFlowChart>
              </div>
            }</div>
          </Modal>
        </Container>
    :
            <div></div>

    }
    
    </div>

    
  );
};

export default Dashboard;