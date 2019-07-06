import React, { Component } from 'react';
import requests from '../utils/apiRequests';

class Dialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      paletteName: '',
      projectID:'',
      newProject: ''
    }
  }

  componentDidMount() {
    window.removeEventListener('keydown', this.props.refreshUnheldColors);
  }

  componentWillUnmount() {
    window.addEventListener('keydown', this.props.refreshUnheldColors);
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });

    if (target.name === 'projectID') {
      this.setState({newProject: ''})
    } else if (target.name === 'newProject') {
      this.setState({projectID: ''})
    }
  }
  
  handleClick = async () => {
    const { paletteName, projectID, newProject } = this.state;
    let data = { paletteName, projectID };

    if (this.state.newProject) {
      requests.postProject({name: newProject})
      data = { paletteName, projectID: test[0] }
    }
    
    this.props.primaryAction(data);
    this.setState({
      paletteName: '',
      projectID: '',
      newProject: ''
    })
  }

  render() {
    const colors = Object.values(this.props.colors);

    const colorDivs = colors.map(color => <div className="preview-color" key={color} style={{ backgroundColor: color }}></div>);

    const projectOptions = this.props.data.map(i => <option key={i.id} value={i.id}>{i.name}</option>);

    return (
      <div className="dialog-overlay">
        <div className="popup">
          <i className="fas fa-times" onClick={this.props.closeDialog}></i>
          <h3>Save New Palette</h3>
          <input className="dropdown-input palette-name-input" name="paletteName" placeholder="Enter Palette Name..." onChange={this.handleChange}></input>
          <div className="palette-preview">
            {colorDivs}
          </div>
          <label htmlFor="projectID">Choose A Project</label>
          <select className="dropdown-input project-input" value={this.state.projectID} name="projectID" onChange={this.handleChange}>
            <option key={-1} value=""></option>
            {projectOptions}
          </select>
          <div className="dialog-divider"><hr /><p>OR</p><hr /></div>
          <label htmlFor="newProject">Create New Project</label>
          <input className="project-input" name="newProject" placeholder="Enter Project Name..." onChange={this.handleChange} value={this.state.newProject}></input>
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
