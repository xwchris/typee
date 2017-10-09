import React, { Component } from 'react';
import { connect } from 'react-redux';
import showLoginOrRegistPopup from 'services/loginService';

class Popup extends Component {
  constructor(props) {
    super(props);
    this.setate = {

    };
  }
  render() {
    const { dispatch, className, children, showPopup, popupKey } = this.props;

    return (
      <div
        className={`component-popup ${className || ''}${showPopup ? '' : ' hidden'}`}
        role="button"
        onClick={() => showLoginOrRegistPopup(dispatch, popupKey, false)}
      >
        <div
          className="popup-children"
          role="button"
          onClick={(e) => { e.stopPropagation(); }}
        >
          {children}
        </div>
      </div>
    );
  }
}

export default connect()(Popup);
