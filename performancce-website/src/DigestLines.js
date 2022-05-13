import React, { Component } from "react";
import { Space, Card } from "antd";
import PerformanceLine from "./PerformanceLine";

class DigestLines extends Component {
  render() {
    return (<Space direction="vertical" size="middle" style={{ width: "100%", display: "flex" }} >
      	      <Card title="16 bytes" size="middle">
      	        <PerformanceLine data={this.props.data} yfield="Bytes16" ytitle="处理速度(B/s)" />
      	      </Card>
      	      <Card title="64 bytes" size="middle">
      	        <PerformanceLine data={this.props.data} yfield="Bytes64" ytitle="处理速度(B/s)" />
      	      </Card>
      	      <Card title="256 bytes" size="middle">
      	        <PerformanceLine data={this.props.data} yfield="Bytes256" ytitle="处理速度(B/s)" />
      	      </Card>
      	      <Card title="1024 bytes" size="middle">
      	        <PerformanceLine data={this.props.data} yfield="Bytes1024" ytitle="处理速度(B/s)" />
      	      </Card>
      	      <Card title="8192 bytes" size="middle">
      	        <PerformanceLine data={this.props.data} yfield="Bytes8192" ytitle="处理速度(B/s)" />
      	      </Card>
      	      <Card title="16384 bytes" size="middle">
      	        <PerformanceLine data={this.props.data} yfield="Bytes16384" ytitle="处理速度(B/s)" />
      	      </Card>
	   </Space>);
  }
}
export default DigestLines;

