import React, { Component } from 'react';

class Dialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      paletteName: '',
      project: ''
    }
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  }
  
  handleClick = e => {
    this.props.primaryAction(this.state);
    this.setState({
      paletteName: '',
      project: ''
    })
  }

  render() {
    const colors = Object.values(this.props.colors)

    return (
      <div className="dialog-overlay">
        <div className="popup">
          <i className="fas fa-times" onClick={this.props.closeDialog}></i>
          <h3>Save New Palette</h3>
          {/* <label htmlFor="palette-name-input">Palette Name:</label> */}
          <input className="dropdown-input palette-name-input" name="paletteName" placeholder="Enter Palette Name..." onChange={this.handleChange}></input>
          <div className="palette-preview">
            <div className="preview-color" style={{ backgroundColor: colors[0] }}></div>
            <div className="preview-color" style={{ backgroundColor: colors[1] }}></div>
            <div className="preview-color" style={{ backgroundColor: colors[2] }}></div>
            <div className="preview-color" style={{ backgroundColor: colors[3] }}></div>
            <div className="preview-color" style={{ backgroundColor: colors[4] }}></div>
          </div>
          <label htmlFor="project">Choose A Project</label>
          <select className="dropdown-input project-input" name="project" onChange={this.handleChange}></select>
          <div className="dialog-divider"><hr /><p>OR</p><hr /></div>
          <label htmlFor="new-project">Create New Project</label>
          <input className="project-input" name="new-project" placeholder="Enter Project Name..." onChange={this.handleChange}></input>
          <div className="dialog-btns">
            <button className="dialog-btn cancel-btn" type="button" onClick={this.props.closeDialog} >
              Cancel
            </button>
            <button className="dialog-btn" type="button" onClick={this.handleClick}>
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Dialog;
