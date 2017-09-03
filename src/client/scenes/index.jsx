import React, { Component } from 'react';
import { renderRoutes } from 'react-router-config';
import Header from '../components/Header';
import Footer from '../components/Footer';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <div className="index-container">
        <Header />
        <main className="main">
          <div className="container">
            {renderRoutes(this.props.route.routes)}
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
