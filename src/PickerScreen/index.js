import React, { Component } from 'react';
import SubHeader from '../SubHeader';
import Dialog from '../Dialog';
import PickerColor from '../PickerColor';
import color from 'color';

class PickerScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      colors: {},
      held: [],
      showSaveDialog: false,
      option: ''
    }
  }

  componentDidMount() {
    this.generatePalette();
    window.addEventListener('keydown', this.refreshUnheldColors);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.refreshUnheldColors);
  }

  getRandomColor = () => {
    return "#" + Math.random().toString(16).slice(2, 8);
  }

  generatePalette = () => {
    this.setState({
      colors: {
        color_1: this.getRandomColor(),
        color_2: this.getRandomColor(),
        color_3: this.getRandomColor(),
        color_4: this.getRandomColor(),
        color_5: this.getRandomColor()
      },
      held: []
    })
  }

  toggleHold = color => {
    let held = [...this.state.held];

    this.state.held.includes(color) ? held.splice(held.indexOf(color), 1)
    : held.push(color);

    this.setState({ held })
  }

  refreshUnheldColors = e => {
    if (e.keyCode === 32) {
    const colors = Object.entries(this.state.colors);
    let updatedColors = { ...this.state.colors };

    colors.forEach(color => {
      if (!this.state.held.includes(color[0])) {
        updatedColors[color[0]] = this.getRandomColor();
      } 
    })
    this.setState({ colors: updatedColors });
    }
  }

  closeDialog = () => {
    this.setState({showSaveDialog: false})
  }

  changeFormat(type) {
    const colors = {...this.state.colors};
    for (let hue in colors ) {
      if (type === 'hsl') {
        colors[hue] = (color(colors[hue]).hsl().round().string());
      } else if (type === 'rgb') {
        colors[hue] = (color(colors[hue]).rgb().string());
      } else if (type === 'hex') {
        colors[hue] = (color(colors[hue]).hex());
      }
    }
    this.setState({ colors });
    console.log(colors);
  }

  setOption = (option) => {
    this.setState({ option });
    if (option.format) {
      this.changeFormat(option.format)
    }
  }

  render() {
    const saveDialog = this.state.showSaveDialog ? <Dialog
      title="Save New Palette"
      closeDialog={this.closeDialog}
      refreshUnheldColors={this.refreshUnheldColors}
      updateProjectData={this.props.updateProjectData}
      primaryAction={this.props.updatePaletteData}
      colors={this.state.colors}
      data={this.props.data}
    /> : null;

    const colors = Object.keys(this.state.colors).map(color =>
      <PickerColor
        color={this.state.colors[color]}
        key={color}
        id={color}
        toggleHold={this.toggleHold}
        held={this.state.held.includes(color)}
        getContrastColor={this.props.getContrastColor}
      />);

    return (
      <>
        {saveDialog}
        <SubHeader
          title="Pick New Palette"
          handleClick={this.generatePalette}
          btnTitle="Generate New Palette"
          data={this.props.data}
          setOption={this.setOption}
        />
        <section className="PickerScreen">
          <div className="palette-display">
            {colors}
          </div>
          <div className="picker-footer">
            <p className="instructions"><i className="fas fa-sync-alt" aria-hidden="true"></i>Press <strong>space</strong> to refresh unselected colors</p>
            <button className="save-btn" onClick={() => this.setState({showSaveDialog: true})}>
              <i className="far fa-save" aria-hidden="true"></i>Save Palette
            </button>
          </div>
        </section>
      </>
    );
  }
}

export default PickerScreen;