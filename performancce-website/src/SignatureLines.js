import React, { Component } from "react";
import { Space, Card } from "antd";
import PerformanceLine from "./PerformanceLine";

class SignatureLines extends Component {
  render() {
    return (<Space direction="vertical" size="middle" style={{ width: "100%", display: "flex" }} >
      	      <Card title="sign(s)" size="middle">
      	        <PerformanceLine data={this.props.data} yfield="SignTime" ytitle="耗时(s)" />
      	      </Card>
      	      <Card title="verify(s)" size="middle">
      	        <PerformanceLine data={this.props.data} yfield="VerifyTime" ytitle="耗时(s)" />
      	      </Card>
      	      <Card title="sign/s" size="middle">
      	        <PerformanceLine data={this.props.data} yfield="SignQPS" ytitle="处理速度(次/s)" />
      	      </Card>
      	      <Card title="verify/s" size="middle">
      	        <PerformanceLine data={this.props.data} yfield="VerifyQPS" ytitle="处理速度(次/s)" />
      	      </Card>
	   </Space>);
  }
}
export default SignatureLines;

