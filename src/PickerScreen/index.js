import React, { Component } from 'react';
import SubHeader from '../SubHeader';
import Dialog from '../Dialog';
import PickerColor from './PickerColor';
import colorFormatter from '../utils/colorFormatter';
import color from 'color';

class PickerScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      colors: {
        color_1: '#fff',
        color_2: '#fff',
        color_3: '#fff',
        color_4: '#fff',
        color_5: '#fff'
      },
      held: [],
      showSaveDialog: false,
      format: 'hex',
      mode: 'random'
    }
  }

  componentDidMount() {
    this.generateNewPalette();
    window.addEventListener('keydown', this.refreshUnheldColors);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.refreshUnheldColors);
  }

  getRandomColor = () => {
    return "#" + Math.random().toString(16).slice(2, 8);
  }

  getComplementaryPalette = () => {   
    const colors = this.state.colors;
    colors.color_1 = this.getRandomColor();
    colors.color_5 = color(colors.color_1).negate();
    colors.color_3 = color(colors.color_1).mix(colors.color_5);
    colors.color_2 = color(colors.color_1).mix(colors.color_3);
    colors.color_4 = color(colors.color_3).mix(colors.color_5);

    for (var c in colors) {
      colors[c] = colorFormatter(colors[c], 'hex')
    }
    return colors;
  }

  getGradientPalette = () => {
    const colors = this.state.colors;
    colors.color_1 = this.getRandomColor();
    colors.color_2 = color(colors.color_1).rotate(30);
    colors.color_3 = color(colors.color_2).rotate(30);
    colors.color_4 = color(colors.color_3).rotate(30);
    colors.color_5 = color(colors.color_4).rotate(30);

    for (var c in colors) {
      colors[c] = colorFormatter(colors[c], 'hex')
    }
    return colors;
  }

  getRandomPalette = () => {
    const colors = this.state.colors;
    colors.color_1 = this.getRandomColor();
    colors.color_2 = this.getRandomColor();
    colors.color_3 = this.getRandomColor();
    colors.color_4 = this.getRandomColor();
    colors.color_5 = this.getRandomColor();
    
    return colors;
  }

  generateNewPalette = () => {
    const { mode } = this.state;
    let colors = {};

    if (mode === 'random') {
      colors = this.getRandomPalette();
    } else if (mode === 'complementary') {
      colors = this.getComplementaryPalette();
    } else if (mode === 'gradient') {
      colors = this.getGradientPalette();
    }
    this.setState({ colors, held: [] });
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

  setPickerOption = option => {
    this.setState(option);
    if (Object.keys(option)[0] === 'mode') {
      this.generateNewPalette();
    }
  }

  updateColor = (color, id) => {
    const colors = this.state.colors;
    colors[id] = color;
    this.setState({ colors });
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
        updateColor={this.updateColor}
        format={this.state.format}
      />);

    return (
      <>
        {saveDialog}
        <SubHeader
          title="Pick New Palette"
          handleClick={this.generateNewPalette}
          btnTitle="Generate New Palette"
          data={this.props.data}
          setOption={this.setPickerOption}
        />
        <section className="PickerScreen">
          <div className="palette-display">
            {colors}
          </div>
          <div className="picker-footer">
            <p className="instructions">
              <i className="fas fa-sync-alt" aria-hidden="true" />
              Press <strong>space</strong> to refresh unselected colors
            </p>
            <button className="save-btn" onClick={() => this.setState({showSaveDialog: true})}>
              <i className="far fa-save" aria-hidden="true"/>Save Palette
            </button>
          </div>
        </section>
      </>
    );
  }
}

export default PickerScreen;