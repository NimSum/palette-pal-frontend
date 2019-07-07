import React, {Component} from 'react';
import colorContraster from '../utils/colorContraster';
import colorFormatter from '../utils/colorFormatter';
import { PhotoshopPicker } from 'react-color';

class PickerColor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showPicker: false,
      update: ''
    }
  }

  handleChangeComplete = color => {
    this.setState({update: color.hex})
  }

  updateColor = () => {
    this.props.updateColor(this.state.update, this.props.id);
    this.setState({update: '', showPicker: false})
  }

  render() {
    const checkbox = this.props.held ? 'far fa-check-square' : 'far fa-square';
    const holdClass = this.props.held ? 'hold' : null;
    const picker = this.state.showPicker ? (
      <div className="picker-wrapper">
        <PhotoshopPicker
          header="Choose new color"
          className="PhotoshopPicker"
          color={this.state.update || this.props.color}
          onChangeComplete={this.handleChangeComplete}
          onAccept={this.updateColor}
          onCancel={() => this.setState({ showPicker: !this.state.showPicker, update: '' })}
        />
      </div>
    ) : null;

    return (
      <div
        className="PickerColor"
        style={{ backgroundColor: this.props.color }}
      >
        <i
          className="fas fa-pencil-alt"
          style={{ color: colorContraster(this.props.color) }}
          onClick={() => this.setState({ showPicker: !this.state.showPicker })}
        />
        {picker}
        <p
          className="picker-color-value"
          style={{ color: colorContraster(this.props.color) }}
        >
          {colorFormatter(this.props.color, this.props.format)}
        </p>
        <p
          className={`picker-hold ${holdClass}`}
          style={{ color: colorContraster(this.props.color) }}
          onClick={() => this.props.toggleHold(this.props.id)}
        >
				  <i className={checkbox} />HOLD
			  </p>
		  </div>
	  );
  }
}

export default PickerColor;
