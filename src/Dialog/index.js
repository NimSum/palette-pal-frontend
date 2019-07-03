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
  }

  render() {
    return (
      <div className="dialog-overlay">
        <div className="popup">
          <i className="fas fa-times" onClick={this.props.closeDialog}></i>
          <h3>Save New Palette</h3>
          <label htmlFor="palette-name-input">Palette Name:</label>
          <input className="dropdown-input palette-name-input" name="paletteName" onChange={this.handleChange}></input>
          <label htmlFor="project-input">Project:</label>
          <select className="dropdown-input project-input" name="project" onChange={this.handleChange}></select>
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
