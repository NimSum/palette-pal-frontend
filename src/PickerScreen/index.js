import React, { Component } from 'react';
import SubHeader from '../SubHeader';

class PickerScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      colors: []
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
      colors: [
        this.getRandomColor(),
        this.getRandomColor(),
        this.getRandomColor(),
        this.getRandomColor(),
        this.getRandomColor()
      ]
    })
  }

  render() {
    return (
      <>
        <SubHeader title="Pick New Palette" handleClick={this.generatePalette} />
        <section className="PickerScreen">
          <div className="palette-display">
            <div className="color" style={{ backgroundColor: this.state.colors[0] }}>
              <p className="color-value">#214046</p>
              <p className="hold"><i className="far fa-check-square"></i>HOLD</p>
            </div>
            <div className="color" style={{backgroundColor: this.state.colors[1]}}>

            </div>
            <div className="color" style={{ backgroundColor: this.state.colors[2] }}>

            </div>
            <div className="color" style={{ backgroundColor: this.state.colors[3] }}>

            </div>
            <div className="color" style={{ backgroundColor: this.state.colors[4] }}>

            </div>
          </div>
          <div className="picker-footer">
            <p className="instructions"><i className="fas fa-sync-alt" aria-hidden="true"></i>Press <strong>space</strong> to refresh unselected colors</p>
            <button className="save-btn">
              <i className="far fa-save" aria-hidden="true"></i>Save Palette
            </button>
          </div>
        </section>
      </>
    );
  }
}

export default PickerScreen;