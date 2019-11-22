import React, { PureComponent } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,ReferenceArea
} from 'recharts';
import moment from 'moment';



export default class Example extends PureComponent {

  render() {
    return (

       <AreaChart
       width={230}
       height={100}
          margin={{
            top: 10, right: 30, left: 0, bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="dateTime" 
            tickFormatter={timeStr => moment(timeStr).format('D MMM HH:mm')}
            allowDuplicatedCategory={false}

          />
          <YAxis 
            dataKey="value"
            domain={[0, this.props.levels.major]}
          />
          {/* <Tooltip /> */}
          <Area type="monotone" data={this.props.data} dataKey="value" dot={false} stroke="#444" fill="#014d6d" />
          <Area type="monotone" data={this.props.forecastData} dataKey="value" dot={false} stroke="#444" fill="#82ca9d" />
          <ReferenceArea y1={0} y2={this.props.levels.normal} alwaysShow fill="#28a745" strokeOpacity={0.3} />
          <ReferenceArea y1={this.props.levels.normal} y2={this.props.levels.monitor} alwaysShow fill="#ffc107" strokeOpacity={0.3} />
          <ReferenceArea y1={this.props.levels.monitor} y2={this.props.levels.minor} alwaysShow fill="#ff9007" strokeOpacity={0.3} />
          <ReferenceArea y1={this.props.levels.minor} y2={this.props.levels.moderate} alwaysShow fill="#dc3545" strokeOpacity={0.3} />
          <ReferenceArea y1={this.props.levels.moderate} y2={this.props.levels.major} alwaysShow fill="#7626bf" strokeOpacity={0.3} />

     </AreaChart>
    );
  }
}
