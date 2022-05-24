import React, { Component } from "react";

import { Layout, Menu, /*message,*/ Breadcrumb, Button, Tooltip } from "antd";
import { LineChartOutlined, SearchOutlined } from "@ant-design/icons";
import { DatePicker, Space } from "antd";
import { Route, Routes, NavLink, Navigate } from 'react-router-dom';
import { useLocation, useNavigate, useParams } from "react-router-dom";

import SymmetricEncryptionLines from "./SymmetricEncryptionLines";
import SignatureLines from "./SignatureLines";
import DigestLines from "./DigestLines";
import KeyExchangeLines from "./KeyExchangeLines";
import PHELines from "./PHELines";

import "antd/dist/antd.min.css";
import './App.css';

import "moment/locale/zh-cn";
import locale from "antd/es/date-picker/locale/zh_CN";


const { RangePicker } = DatePicker;
const { Header, Content, Footer, Sider } = Layout;

const NavItems = [
  { key: "index", label: <a href="https://babassl.github.io/" target="_blank" rel="noopener noreferrer">首页</a> },
  { key: "docs", label: <a href="https://babassl.github.io/doc/" target="_blank" rel="noopener noreferrer">文档</a> },
  { key: "performance", label: <a href="/performance">性能</a> },
  { key: "github", label: <a href="https://github.com/BabaSSL/BabaSSL" target="_blank" rel="noopener noreferrer">github</a> }
];

const MenuItems = [
  {
    key: "symmetric_encryption",
    icon: React.createElement(LineChartOutlined),
    label: <NavLink to="/performance/symmetric_encryption">对称加密算法</NavLink>
  },
  {
    key: "signature",
    icon: React.createElement(LineChartOutlined),
    label: <NavLink to="/performance/signature">数字签名算法</NavLink>
  },
  {
    key: "digest",
    icon: React.createElement(LineChartOutlined),
    label: <NavLink to="/performance/digest">摘要算法</NavLink>
  },
  {
    key: "key_exchange",
    icon: React.createElement(LineChartOutlined),
    label: <NavLink to="/performance/key_exchange">密钥交换算法</NavLink>
  },
  {
    key: "phe",
    icon: React.createElement(LineChartOutlined),
    label: <NavLink to="/performance/phe">半同态加密算法</NavLink>
  }
];

document.title = 'BabaSSL 性能数据展示';

//请配置数据 API 接口的地址
const DataAddr = "";

class App extends Component {
  state = {
    data: []
  }

  constructor(props) {
    super(props);
    this.handleMenuClick = this.handleMenuClick.bind(this);
    var pathname = this.props.location.pathname;
    var menuKey = pathname.substring(pathname.lastIndexOf('/') + 1);
    if (!menuKey || menuKey.length === 0 || menuKey === 'performance') {
      menuKey = "symmetric_encryption";
    }
    this.menuKey = menuKey;
    this.state = {
      data: []
    }
  }

  fetchData(algo, argStr) {
    var dataUrl = DataAddr + algo;
    if (argStr !== '') {
      dataUrl += "?" + argStr;
    }
    fetch(dataUrl)
      .then((res) => res.json())
      .then((json) => {
                this.setState({data: json});
            })
      .catch(function (err) {
                console.log("Fetch错误:" + err);
            });
  }

  handleMenuClick = (item) => {
    this.menuKey = item.key
    this.fetchData(item.key, '');
  };

  handleSelectTime = (value, dateString) => {
    this.searchTime = dateString;
  }

  handleSearch = (item) => {
    if (this.searchTime && this.searchTime.length !== 0) {
      var argv = []
      if (this.searchTime[0] !== '') {
        argv.push('start_time=' + this.searchTime[0])
      }
      if (this.searchTime[1] !== '') {
        argv.push('end_time=' + this.searchTime[1])
      }
      this.fetchData(this.menuKey, argv.join('&'));
    }
  };

  componentDidMount() {
    this.fetchData(this.menuKey, '');
  }

  render() {
    return (
      <Layout>
        <Header className="header">
          <div
            className="logo"
            style={{
              color: "green",
              backgroundColor: "transparent",
              textAlign: "center",
              width: "160px",
              fontSize: "30px",
              lineHeight: "30px"
            }}
          >
            BabaSSL
          </div>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["performance"]}
            items={NavItems}
          />
        </Header>
        <Content
          style={{
            padding: "0 50px"
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0"
            }}
          ></Breadcrumb>
          <Layout
            className="site-layout-background"
            style={{
              padding: "24px 0"
            }}
          >
            <Sider className="site-layout-background" width={200}>
              <Menu
                mode="inline"
                defaultSelectedKeys={[this.menuKey]}
                defaultOpenKeys={[this.menuKey]}
                style={{
                  height: "100%"
                }}
                items={MenuItems}
                onClick={this.handleMenuClick}
              />
            </Sider>
            <Content
              style={{
                padding: "0 24px",
                minHeight: 280
              }}
            >
              <Space
                align="end"
                direction="vertical"
                size="middle"
                style={{ width: "100%", display: "flex", marginBottom: "10px" }}
              >
                <Space
                  align="end"
                  direction="horizontal"
                  size="small"
                  style={{ display: "flex" }}
                >
                  <RangePicker locale={locale} showTime onChange={this.handleSelectTime} />
                <Tooltip title="查询">
                  <Button shape="circle" icon={<SearchOutlined />} onClick={this.handleSearch} />
                </Tooltip>
                </Space>
              </Space>
            <Routes>
              <Route exact path="/performance" element={<Navigate to="/performance/symmetric_encryption"/>} />
              <Route path="/performance/symmetric_encryption" element={<SymmetricEncryptionLines data={this.state.data} />} />
              <Route path="/performance/signature" element={<SignatureLines data={this.state.data} />} />
              <Route path="/performance/digest" element={<DigestLines data={this.state.data} />} />
              <Route path="/performance/key_exchange" element={<KeyExchangeLines data={this.state.data} />} />
              <Route path="/performance/phe" element={<PHELines data={this.state.data} />} />
            </Routes>
            </Content>
          </Layout>
        </Content>
        <Footer
          style={{
            textAlign: "center"
          }}
        >
          BabaSSL ©2022 Created by BabaSSL Team
        </Footer>
      </Layout>
    );
  }
}


function withRouter(Component) {
    return (props) => (
      <Component
        {...props}
        params={useParams()}
        location={useLocation()}
        navigate={useNavigate()}
      />
    );
}

export default withRouter(App);
