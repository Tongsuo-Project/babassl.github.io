import React, { Component } from "react";
import { Space, Card } from "antd";
import PerformanceLine from "./PerformanceLine";

class KeyExchangeLines extends Component {
  render() {
    return (<Space direction="vertical" size="middle" style={{ width: "100%", display: "flex" }} >
      	      <Card title="op(s)" size="middle">
      	        <PerformanceLine data={this.props.data} yfield="OpTime" ytitle="耗时(s)" />
      	      </Card>
      	      <Card title="op/s" size="middle">
      	        <PerformanceLine data={this.props.data} yfield="OpQPS" ytitle="处理速度(次/s)" />
      	      </Card>
	   </Space>);
  }
}
export default KeyExchangeLines;

