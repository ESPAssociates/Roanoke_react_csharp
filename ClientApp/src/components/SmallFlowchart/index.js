import React, { PureComponent } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import moment from 'moment';



export default class Example extends PureComponent {

  render() {
    return (
      <LineChart 
        width={230}
        height={100}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="dateTime"
          tickFormatter={timeStr => moment(timeStr).format('D MMM HH:mm')} 
          allowDuplicatedCategory={false}
        />
        <YAxis  />
        {/* <Legend /> */}
        <Line type="monotone" dataKey="value" data={this.props.data}  dot={false} stroke="#8884d8" name="history" key="history" />
        <Line type="monotone" dataKey="value" data={this.props.forecastData} dot={false} stroke="#82ca9d" name="forecast" key="forecast" />

     </LineChart>
    );
  }
}
