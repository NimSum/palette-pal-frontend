import React, { Component } from 'react';
import SubHeader from '../SubHeader';
import Dialog from '../Dialog';
import PickerColor from '../PickerColor';

class PickerScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      colors: {},
      held: [],
      showSaveDialog: false
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
    if (e.keyCode == 32) {
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

  saveNewPalette = details => {
    fetch('http://localhost:3005/api/v1/palettes', {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        name: details.paletteName,
        //replace below line with arg when ready
        project_id: details.projectID,
        ...this.state.colors
      })
    })

    this.closeDialog();
  }

  render() {
    const saveDialog = this.state.showSaveDialog ? <Dialog closeDialog={this.closeDialog} refreshUnheldColors={this.refreshUnheldColors} primaryAction={this.saveNewPalette} colors={this.state.colors} /> : null;

    const colors = Object.keys(this.state.colors).map(color =>
      <PickerColor
        color={this.state.colors[color]}
        key={color}
        id={color}
        toggleHold={this.toggleHold}
        held={this.state.held.includes(color)}
      />);

    return (
      <>
        {saveDialog}
        <SubHeader title="Pick New Palette" handleClick={this.generatePalette} btnTitle="Generate New Palette"/>
        <section className="PickerScreen">
          <div className="palette-display">
            {colors}
          </div>
          <div className="picker-footer">
            <p className="instructions"><i className="fas fa-sync-alt" aria-hidden="true"></i>Press <strong onClick={this.refreshUnheldColors}>space</strong> to refresh unselected colors</p>
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