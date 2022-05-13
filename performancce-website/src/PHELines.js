import React, { Component } from "react";
import { Space, Card } from "antd";
import PerformanceLine from "./PerformanceLine";

class PHELines extends Component {
  render() {
    return (<Space direction="vertical" size="middle" style={{ width: "100%", display: "flex" }} >
      	      <Card title="decrypt/s" size="middle">
      	        <PerformanceLine data={this.props.data} yfield="DecryptQPS" ytitle="处理速度(次/s)" />
      	      </Card>
      	      <Card title="encrypt/s" size="middle">
      	        <PerformanceLine data={this.props.data} yfield="EncryptQPS" ytitle="处理速度(次/s)" />
      	      </Card>
	   </Space>);
  }
}
export default PHELines;

