import React, { PureComponent } from 'react';
import {
  AreaChart, Area, LineChart, Line, Legend, XAxis, YAxis, CartesianGrid, Tooltip,ReferenceArea
} from 'recharts';
import moment from 'moment';



export default class Example extends PureComponent {
     
  render() {

    return (
      <LineChart
        width={420}
        height={240}
        margin={{top: 5, right: 30, left: 20, bottom: 15}}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="dateTime" 
          tickFormatter={timeStr => moment(timeStr).format('D MMM HH:mm')}
          allowDuplicatedCategory={false}
        />
        <YAxis 
          domain={[0, this.props.levels.major]}
        />
        {this.props.forecastData && this.props.forecastData[0] ?
          <Legend  wrapperStyle={{ bottom: -10 }}/>
            :
          <div></div>
        }

        {/* <Tooltip color="#444444"/> */}
        <Line type="monotone" data={this.props.data} dataKey="value" dot={false} stroke="#111111" name="actuals" key="actuals"  strokeOpacity={1}/>
        <Line type="monotone" data={this.props.forecastData} dataKey="value" dot={false} stroke="#FF0000" name="forecast" key="forecast" strokeOpacity={1}/>
        <ReferenceArea y1={0} y2={this.props.levels.normal} alwaysShow fill="#28a745" strokeOpacity={0.3} label={{value: "Normal", fontSize: 9, position: 'insideTopRight'}}/>
        <ReferenceArea y1={this.props.levels.normal} y2={this.props.levels.monitor} alwaysShow fill="#ffc107" strokeOpacity={0.3} label={{value: "Monitor", fontSize: 9, position: 'insideTopRight'}}/>
        <ReferenceArea y1={this.props.levels.monitor} y2={this.props.levels.minor} alwaysShow fill="#ff9007" strokeOpacity={0.3} label={{value: "Minor", fontSize: 9, position: 'insideTopRight'}}/>
        <ReferenceArea y1={this.props.levels.minor} y2={this.props.levels.moderate} alwaysShow fill="#dc3545" strokeOpacity={0.3} label={{value: "Moderate", fontSize: 9, position: 'insideTopRight'}}/>
        <ReferenceArea y1={this.props.levels.moderate} y2={this.props.levels.major} alwaysShow fill="#7626bf" strokeOpacity={0.3} label={{value: "Major", fontSize: 9, position: 'insideTopRight'}}/>
      </LineChart>
    );
  }
}
