import React, { Component } from 'react';

class Dialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      palette_name: '',
      project_name: '',
      project_id: '',
      new_proj_name: '',
      username: '',
      password: '',
      email: ''
    }
  }

  componentDidMount() {
    if (this.props.title === "Save New Palette") {
      window.removeEventListener('keydown', this.props.refreshUnheldColors);
    }
  }

  componentWillUnmount() {
    if (this.props.title === "Save New Palette") {
      window.addEventListener('keydown', this.props.refreshUnheldColors);
    }
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });

    if (target.name === 'project_id') {
      this.setState({project_name: ''})
    } else if (target.name === 'project_name') {
      this.setState({project_id: ''})
    }
  }
  
  handleClick = async () => {
    const { palette_name, project_id, project_name, email, username, password } = this.state;
    const { type, primaryAction } = this.props;

    if (type === "newProject") {
      primaryAction({ project_name }, 'add');
    } else if (type === "newPalette" && project_name) {
      const res = await this.props.updateProjectData({ project_name }, 'add');
      primaryAction({ ...this.props.colors, palette_name, project_id: res }, 'add');
    } else if (type === "newPalette") {
      primaryAction({ ...this.props.colors, palette_name, project_id }, 'add');
    } else if (type === "login") {
      primaryAction({ email, password })
    } else if (type === "signup") {
      primaryAction({ email, username, password });
    }

    this.setState({
      palette_name: '',
      project_name: '',
      project_id: '',
      username: '',
      password: '',
      email: ''
    })
  }


  getAuthFields = () => {
    let usernameField;
    if (this.props.type === "signup") {
      usernameField = <>
        <input name="username" placeholder="Enter username..." maxLimit="40" onChange={this.handleChange}></input>
      </>
    } 

    return (
      <>
        {usernameField}
        <input name="password" placeholder="Enter password..." maxLimit="40" onChange={this.handleChange}></input>
      </>
    )
  }
  
  
  
  getPaletteFields = () => {
    const { colors, data } = this.props;
    const colorDivs = Object.values(colors).map(color => <div className="preview-color" key={color} style={{ backgroundColor: color }}></div>);
    const projOptions = data.map(i => <option key={i.id} id={i.id} value={i.id}>{i.name}</option>);

    return (
      <>
      <div className="palette-preview">
        {colorDivs}
      </div>
      <label htmlFor="project_id">Choose A Project</label>
        <select className="dropdown-input project-input existing-project" value={this.state.project_id} name="project_id" onChange={this.handleChange}>
          <option key={projOptions[0].id} value={projOptions[0].id}>{projOptions[0].name}</option>
        {projOptions}
      </select>
      <div className="dialog-divider"><hr /><p>OR</p><hr /></div>
      <label htmlFor="project_name">Create New Project</label>
        <input className="project-input new-project-name" name="project_name" placeholder="Enter project name..." maxLength="15" onChange={this.handleChange} value={this.state.project_name}></input>
      </>
    )
  }

  getPrimaryField = () => {
    const { type } = this.props;
    let primaryField = "palette name";
    let fieldName = "palette_name";

    if (type === "newProject") {
      primaryField = "project name";
      fieldName = "project_name";
    } else if (type === "login" || type === "signup") {
      primaryField = "email";
      fieldName = "email";
    }

    return (
      <input
        maxLength={this.props.type === "login" || this.props.type === "signup" ? "40" : "15"}
        className="dropdown-input name-input"
        name={`${fieldName}`}
        placeholder={`Enter ${primaryField}...`}
        onChange={this.handleChange}
      />
    )
  }

  render() {
    const { type, title, closeDialog } = this.props;
    const primaryBtn = type === "signup" || type === "login" ? "Go" : "Save";
    const palFields = type === "newPalette" ? this.getPaletteFields() : null;
    const authFields = type === "signup" || type === "login" ? this.getAuthFields() : null;
    
    return (
      <div className="dialog-overlay">
        <div className="popup">
          <i className="fas fa-times" onClick={closeDialog}></i>
          <h3>{title}</h3>
          {this.getPrimaryField()}
          {palFields}
          {authFields}
          <div className="dialog-btns">
            <button className="dialog-btn cancel-btn" type="button" onClick={closeDialog} >
              Cancel
            </button>
            <button className="dialog-btn save-btn" type="button" onClick={this.handleClick}>
              {primaryBtn}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Dialog;
