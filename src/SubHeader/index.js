import React, { Component } from 'react';

class SubHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      format: '',
      mode: '',
      filter: ''
    }
  }
    
  render() {
    const btnName = this.props.title === "Pick New Palette" ? "Generate New Palette" : "Create New Project";

    const filters = this.props.title === "Pick New Palette" ?  <>
        <p className="dropdown-label">Values:</p> <select className="dropdown-input" type="text" />
        <p className="dropdown-label">Mode:</p> <select className="dropdown-input" type="text" />
    </>
      : <>
        <p className="dropdown-label">Filter:</p> <select className="dropdown-input" type="text" />
    </>

    return (
      <section className="SubHeader">
        <div className="subheader-left">
          <h2 className="page-title">{this.props.title}</h2>
          <button className="subheader-btn" onClick={this.props.handleClick}><i className="fas fa-play" aria-hidden="true"></i>{btnName}</button>
        </div>
        <div className="subheader-right">
          {filters}
        </div>
      </section>
    );
  }
}

export default SubHeader;