import React, { Component } from 'react';
import { connect } from 'react-redux';
import BaseInfo from './components/BaseInfo';
import getData from './services/getUserInfo';

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
        className: 'tab-first',
        children: <BaseInfo />,
      },
      {
        title: '历史数据',
        className: 'tab-second',
        children: <div />,
      },
    ];

    const { userInfo } = this.props;
    console.log('userInfo', userInfo);

    return (
      <div className="user-center-container container">
        <div className="inner-box clearfix container">
          <div className="section-nav pull-left">
            <div className="nav-title">个人中心</div>
            <div className="nav-list">
              {
                tabData.map((item, index) => (
                  <div
                    className="nav-item white-btn"
                    key={`user-center-tab-btn-${index + 1}`}
                    role="button"
                    onClick={() => this.setState({ tabIndex: index + 1 })}
                  >
                    {item.title || ''}
                  </div>
                ))
              }
            </div>
          </div>
          <div className="section-content">
            {
              tabData.map((item, index) => (
                <div className={`tab ${this.state.tabIndex === index + 1 ? '' : 'hidden'} ${item.className || ''}`} key={`user-center-tab-${index + 1}`}>{item.child || <div />}
                  <h2 className="tab-title">{item.title || ''}</h2>
                  <div className="tab-content">
                    {item.children || <div />}
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    userInfo: state.userInfo,
  }),
)(UserCenter);
