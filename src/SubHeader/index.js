import React, { Component } from 'react';

class SubHeader extends Component {
  state = {
    format: '',
    mode: '',
    filter: ''
  }

  render() {
    return (
      <section className="SubHeader">
        <div className="subheader-left">
          <h2 className="page-title">Pick New Palette</h2>
          <button className="subheader-btn"><i className="fas fa-play" aria-hidden="true"></i>Generate New Palette</button>
        </div>
        <div className="subheader-right">
          <p className="dropdown-label">Values:</p> <select className="dropdown-input" type="text"/>
          <p className="dropdown-label">Mode:</p> <select className="dropdown-input" type="text"/>
        </div>
      </section>
    );
  }
}

export default SubHeader;