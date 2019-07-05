import React, { Component } from 'react';

class PickerColor extends Component {
  constructor(props) {
    super(props);
  }

  // toggleHold = () => {
  //   this.props.toggleHold(this.props.id);
  // }

  render() {
    let checkbox;
    let holdClass;

    if (this.props.held) {
      checkbox = 'far fa-check-square';
      holdClass = 'hold';
    } else {
      checkbox = 'far fa-square';
      holdClass = null; 
    }

    return (
      <div className="picker-color" style={{ backgroundColor: this.props.color, color: this.props.color }}>
        <p className="picker-color-value">{this.props.color}</p>
        <p className={`picker-hold ${holdClass}`} onClick={() => this.props.toggleHold(this.props.id)}><i className={checkbox}></i>HOLD</p>
      </div>
    );
  }
}

export default PickerColor;