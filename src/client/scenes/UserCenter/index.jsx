import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tabs } from 'antd';
import BaseInfo from './components/BaseInfo';
import getData from './services/getUserInfo';

const { TabPane } = Tabs;

class UserCenter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tabIndex: 1,
    };
  }

  componentWillMount() {
    // 获取数据
    getData(this.props);
  }

  // 渲染
  render() {
    // 切换面板
    const tabData = [
      {
        title: '基本信息',
        children: <BaseInfo />,
      },
      {
        title: '历史数据',
        children: <div>尚未开发...</div>,
      },
    ];

    return (
      <div className="user-center-container">
        <Tabs className="tabs" defaultActiveKey="tab_index_1" tabPosition="left">
          {
            tabData.map((item, index) => (
              <TabPane tab={item.title} key={`tab_index_${index + 1}`}>
                {item.children}
              </TabPane>
            ))
          }
        </Tabs>
      </div>
    );
  }
}

export default connect()(UserCenter);
