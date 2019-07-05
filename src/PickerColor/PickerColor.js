import React, { Component } from 'react';

class PickerColor extends Component {
  constructor(props) {
    super(props);


  }
  
  render() {
    return (
      <div className="picker-color" style={{ backgroundColor: this.props.color, color: this.props.color }}>
        <p className="picker-color-value">{this.props.color}</p>
        <p className="picker-hold"><i className="far fa-square"></i>HOLD</p>
      </div>
    );
  }
}

export default PickerColor;