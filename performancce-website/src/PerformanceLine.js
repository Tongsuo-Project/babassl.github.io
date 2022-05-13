import React, { Component } from "react";
import { Empty } from "antd";
import { Line } from "@ant-design/plots";

class PerformanceLine extends Component {
  render() {
    const config = {
      data: this.props.data,
      autoFit: true,
      xField: 'JobDate',
      yField: this.props.yfield,
      seriesField: 'Algorithm',
      xAxis: {
        title: {
          text: "时间",
          position: "end",
        },
        label: {
          formatter: (v) => `${v}`.replace("T", " ").replace("Z", ""),
        },
      },
      yAxis: {
        title: {
          text: this.props.ytitle,
          position: "end",
          autoRotate: true,
        },
        label: {
          // 数值格式化为千分位
          formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
        },
      },
      tooltip: {
        enterable: true,
        formatter: (item) => {
          return {
            title: item.JobDate.replace("T", ' ').replace("Z", ""),
            name: item.Algorithm,
            value: !item[this.props.yfield] ? 0 : item[this.props.yfield].toLocaleString('en-US')
          };
        },
        customContent: (name, items) => {
          let commit = items.length > 0 ? items[0].data.MyCommit : '';
          const container = document.createElement('div');
          container.className = 'g2-tooltip';
          const title = `<div class="g2-tooltip-title" style="margin-top: 12px;margin-bottom: 12px;">
                           <a href="https://github.com/jinjiu/BabaSSL/commit/${commit}" title="点击进入 github commit" target="_blank">${name}</a>
                         </div>`;
          let listItem = '';
          items.forEach((item) => {
            listItem += `<li class="g2-tooltip-list-item" data-index={index} style="margin-bottom:4px;display:flex;align-items: center;">
                <span style="background-color:${item?.mappingData?.color || item?.color};" class="g2-tooltip-marker"></span>
                <span style="display:inline-flex;flex:1;justify-content:space-between">
                <span style="margin-right: 16px;">${item?.name}:</span><span>${item?.value}</span>
                </span>
            </li>`;
          });
          container.innerHTML = title + listItem;
          return container;
        }
      },
      legend: { position: 'top-right' },
      smooth: false,
      point: { visible: true }
    };
    return !this.props.data || this.props.data.length <= 0 ?
            (<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No Data" />) :
            (<Line {...config} onlyChangeData={true} style={{ width: "100%", display: "flex" }} />);
  }
}
export default PerformanceLine;

