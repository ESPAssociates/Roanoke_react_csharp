import React, { PureComponent } from 'react';
import {
  Label, LineChart, Legend, Line, CartesianGrid, XAxis, YAxis, Tooltip, ReferenceArea,
} from 'recharts';
import moment from 'moment';
import Moment from 'react-moment';

const getAxisYDomain = (data, from, to, ref, offset) => {
  const refData = data.slice(from - 1, to);
  console.log(data, from, to, ref, offset);
  let [bottom, top] = [refData[0][ref], refData[0][ref]];
  refData.forEach((d) => {
    if (d[ref] > top) top = d[ref];
    if (d[ref] < bottom) bottom = d[ref];
  });

  return [(bottom | 0) - offset, (top | 0) + offset];
};

const initialState = {
  data: null,
  left: 'dataMin',
  right: 'dataMax',
  refAreaLeft: '',
  refAreaRight: '',
  top: 'dataMax+1',
  bottom: 'dataMin-1',
  animation: true,
};

export default class Example extends PureComponent {

  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount(){
    this.setState({data: this.props.data})
  };

  zoom() {
    let { refAreaLeft, refAreaRight, data } = this.state;

    if (refAreaLeft === refAreaRight || refAreaRight === '') {
      this.setState(() => ({
        refAreaLeft: '',
        refAreaRight: '',
      }));
      return;
    }

    // xAxis domain
    if (refAreaLeft > refAreaRight) [refAreaLeft, refAreaRight] = [refAreaRight, refAreaLeft];

    // yAxis domain
    const [bottom, top] = getAxisYDomain(this.props.data, refAreaLeft, refAreaRight, 'value', 1);

    this.setState(() => ({
      refAreaLeft: '',
      refAreaRight: '',
      data: data.slice(),
      left: refAreaLeft,
      right: refAreaRight,
      bottom,
      top,
    }));
  }

  zoomOut() {
    const { data } = this.state;
    this.setState(() => ({
      data: data.slice(),
      refAreaLeft: '',
      refAreaRight: '',
      left: 'dataMin',
      right: 'dataMax',
      top: 'dataMax+1',
      bottom: 'dataMin',
    }));
  }

  render() {
    const {
      data, barIndex, left, right, refAreaLeft, refAreaRight, top, bottom,
    } = this.state;

    return (
      <LineChart 
        width={420}
        height={240}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="dateTime"
          tickFormatter={timeStr => moment(timeStr).format('D MMM HH:mm')} 
          allowDuplicatedCategory={false}
        />
        <YAxis  />
        <Legend />
        <Line type="monotone" dataKey="value" data={this.props.data}  dot={false} stroke="#8884d8" name="actuals" key="actuals" />
        <Line type="monotone" dataKey="value" data={this.props.forecastData} dot={false} stroke="#82ca9d" name="forecast" key="forecast" />

      </LineChart>


    );
  }
}
