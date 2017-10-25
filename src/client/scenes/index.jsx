import React, { Component } from 'react';
import { renderRoutes } from 'react-router-config';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Login from '../components/Login';
import Regist from '../components/Regist';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Layout className="index-container">
        <Login />
        <Regist />
        <Header />
        <main className="main">
          {renderRoutes(this.props.route.routes)}
        </main>
        <Footer />
      </Layout>
    );
  }
}

export default connect()(App);
