import React, { Component } from 'react';
import SubHeader from '../SubHeader';
import Dialog from '../Dialog';

class PickerScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      colors: {},
      showSaveDialog: false
    }
  }

  componentDidMount() {
    this.generatePalette();
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
      }
    })
  }

  getSaveDialog = () => {

  }

  closeDialog = () => {
    this.setState({showSaveDialog: false})
  }

  saveNewPalette = async details => {
    const response = await fetch('http://localhost:5555/api/v1/palettes', {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        name: details.paletteName,
        //replace below line with arg when ready
        project_id: 1,
        ...this.state.colors
      })
    })

    this.closeDialog();
  }

  render() {
    const saveDialog = this.state.showSaveDialog ? <Dialog closeDialog={this.closeDialog} primaryAction={this.saveNewPalette} /> : null;

    return (
      <>
        {saveDialog}
        <SubHeader title="Pick New Palette" handleClick={this.generatePalette} />
        <section className="PickerScreen">
          <div className="palette-display">
            <div className="color" style={{ backgroundColor: this.state.colors.color_1 }}>
              <p className="color-value">#214046</p>
              <p className="hold"><i className="far fa-check-square"></i>HOLD</p>
            </div>
            <div className="color" style={{backgroundColor: this.state.colors.color_2}}>

            </div>
            <div className="color" style={{ backgroundColor: this.state.colors.color_3 }}>

            </div>
            <div className="color" style={{ backgroundColor: this.state.colors.color_4 }}>

            </div>
            <div className="color" style={{ backgroundColor: this.state.colors.color_5 }}>

            </div>
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