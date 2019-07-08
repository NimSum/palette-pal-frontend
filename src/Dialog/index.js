import React, { Component } from 'react';

class Dialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      paletteName: '',
      projectName: '',
      projectID: 1,
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
    const { paletteName, projectID, newProject, projectName } = this.state;
    let data;

    if (this.props.title === 'Save New Palette' && this.state.newProject) {
      const res = await this.props.updateProjectData({ project_name: newProject }, 'add');
      data = { ...this.props.colors, palette_name: paletteName, project_id: res[0] };
    } else if (this.props.title === 'Save New Palette') {
      data = { ...this.props.colors, palette_name: paletteName, project_id: projectID };
    } else if (this.props.title === 'Create New Project') {
      data = { project_name: projectName };
    }
    
    this.props.primaryAction(data, 'add');
    this.setState({
      paletteName: '',
      projectName: '',
      projectID: '',
      newProject: ''
    })
  }

  getPaletteFields = () => {
    let paletteFields = null; 

    if (this.props.title === 'Save New Palette') {
      const colors = Object.values(this.props.colors);
      const colorDivs = colors.map(color => <div className="preview-color" key={color} style={{ backgroundColor: color }}></div>);
      const projectOptions = this.props.data.map(i => <option key={i.id} id={i.id} value={i.id}>{i.name}</option>);

      paletteFields = (
        <>
        <div className="palette-preview">
          {colorDivs}
        </div>
        <label htmlFor="projectID">Choose A Project</label>
          <select className="dropdown-input project-input existing-project" value={this.state.projectID} name="projectID" onChange={this.handleChange}>
            <option key={projectOptions[0].id} value={projectOptions[0].id}>{projectOptions[0].name}</option>
          {projectOptions}
        </select>
        <div className="dialog-divider"><hr /><p>OR</p><hr /></div>
        <label htmlFor="newProject">Create New Project</label>
          <input className="project-input new-project-name" name="newProject" placeholder="Enter Project Name..." maxLength="15" onChange={this.handleChange} value={this.state.newProject}></input>
        </>
      )
    }
    return paletteFields;
  }

  render() {
    const type = this.props.title === "Save New Palette" ? "palette" : "project";
    return (
      <div className="dialog-overlay">
        <div className="popup">
          <i className="fas fa-times" onClick={this.props.closeDialog}></i>
          <h3>{this.props.title}</h3>
          <input maxLength="15" className="dropdown-input name-input" name={`${type}Name`} placeholder={`Enter ${type} name...`} onChange={this.handleChange}></input>
            {this.getPaletteFields()}
          <div className="dialog-btns">
            <button className="dialog-btn cancel-btn" type="button" onClick={this.props.closeDialog} >
              Cancel
            </button>
            <button className="dialog-btn save-btn" type="button" onClick={this.handleClick}>
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Dialog;
