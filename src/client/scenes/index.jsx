import React from 'react';
import { renderRoutes } from 'react-router-config';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Login from '../components/Login';
import Regist from '../components/Regist';

const App = () => (
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

export default connect()(App);
