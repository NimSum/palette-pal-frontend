import React, { Component } from 'react';

class PickerColor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hold: false
    }
  }

  toggleHold = () => {
    this.setState({ hold: !this.state.hold });
  }

  render() {
    let checkbox;
    let holdClass;

    if (this.state.hold) {
      checkbox = 'far fa-check-square';
      holdClass = 'hold';
    } else {
      checkbox = 'far fa-square';
      holdClass = null; 
    }

    return (
      <div className="picker-color" style={{ backgroundColor: this.props.color, color: this.props.color }}>
        <p className="picker-color-value">{this.props.color}</p>
        <p className={`picker-hold ${holdClass}`} onClick={this.toggleHold}><i className={checkbox}></i>HOLD</p>
      </div>
    );
  }
}

export default PickerColor;