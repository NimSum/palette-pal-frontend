import React, { Component } from 'react';
import { PhotoshopPicker } from 'react-color';
import colorFormatter from '../../../../utils/colorFormatter';
import colorContraster from '../../../../utils/colorContraster';

class PaletteColor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showPicker: false,
      update: ''
    }
  }

  handleChangeComplete = color => {
    this.setState({ update: color.hex })
  }

  updateColor = () => {
    const { palette_id, palette_name, project_id } = this.props;
    this.props.updatePaletteData({id: palette_id, [this.props.id]: this.state.update, project_id, palette_name}, 'update');
    this.setState({ update: '', showPicker: false })
  }

  render() {
    const picker = this.state.showPicker ? (
      <PhotoshopPicker
        header="Choose new color"
        className="PhotoshopPicker"
        color={this.state.update || this.props.color}
        onChangeComplete={this.handleChangeComplete}
        onAccept={this.updateColor}
        onCancel={() => this.setState({ showPicker: !this.state.showPicker, update: '' })}
      />
    ) : null;

    return (
      <div
        className="PaletteColor"
        key={this.props.id}
        style={{ backgroundColor: this.props.color }}
      >
        {picker}
        <p
          className="color-hex"
          style={{ color: colorContraster(this.props.color) }}
        >
          {colorFormatter(this.props.color, this.props.format)}
          <i
            className="fas fa-pencil-alt"
            onClick={() => this.setState({showPicker: !this.state.showPicker})}
          />
        </p>
      </div>
    );
  }
}

export default PaletteColor;