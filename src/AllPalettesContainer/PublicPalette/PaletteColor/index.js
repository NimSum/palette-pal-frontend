import React, { Component } from 'react';
import colorFormatter from '../../../utils/colorFormatter';
import colorContraster from '../../../utils/colorContraster';

class PaletteColor extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div
        className="PaletteColor"
        key={this.props.id}
        style={{ backgroundColor: this.props.color }}
      >
        <p
          className="color-hex"
          style={{ color: colorContraster(this.props.color) }}
        >
          {colorFormatter(this.props.color, this.props.format)}
        </p>
      </div>
    );
  }
}

export default PaletteColor;