import React, { Component } from 'react';
import SubHeader from '../SubHeader';

class PickerScreen extends Component {

  render() {
    return (
      <>
        <SubHeader />
        <section className="PickerScreen">
          <div className="palette-display">
            <div className="color color1">
              <p className="color-value">#214046</p>
              <p className="hold"><i className="far fa-check-square"></i>HOLD</p>
            </div>
            <div className="color color2">

            </div>
            <div className="color color3">

            </div>
            <div className="color color4">

            </div>
            <div className="color color5">

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