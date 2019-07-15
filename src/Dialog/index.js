import React, { Component } from 'react';

class Dialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      palette_name: '',
      project_name: '',
      project_id: '',
      user_name: '',
      password: '',
      email: '',
      showConf: false,
      error: ''
    }
  }

  componentDidMount() {
    if (this.props.type === 'newPalette') {
      window.removeEventListener('keydown', this.props.refreshUnheldColors);
    }
    this.setDefaultProjectOption();
  }

  componentWillUnmount() {
    if (this.props.type === 'newPalette') {
      window.addEventListener('keydown', this.props.refreshUnheldColors);
    }
  }

  setDefaultProjectOption = () => {
    if (this.props.data) {
      this.setState({ project_id: this.props.data[0].id })
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
  
  handleClick = () => {
    const { type, projects } = this.props;
    const { project_name, user_name, password, email, palette_name, project_id } = this.state;
    let error;

    if (type === 'newPalette' && (!palette_name || (!project_name && !project_id))) {
      error = 'Please enter a palette name and project';
    } else if (type === 'newProject' && !project_name) {
      error = 'Please enter a project name';
    } else if (type === 'newProject' && projects.includes(project_name)) {
      error = 'Project name already in use';
    }else if (type === 'login' && (!email || !password)) {
      error = 'Please enter both an email and password';
    } else if (type === 'signup' && (!email || !password || !user_name)) {
      error = 'Please enter your email, a username, and a password';
    } else if (type !== 'account') {
      error = '';
      this.sendFormData();
    }
    this.setState({ error }) 
  }

  sendFormData = async () => {
    const { palette_name, project_id, project_name, email, user_name, password } = this.state;
    const { type, primaryAction } = this.props;
    let result;

    if (type === "newProject") {
      result = await primaryAction({ project_name }, 'add');
    } else if (type === "newPalette" && project_name) {
      const res = await this.props.updateProjectData({ project_name }, 'add');
      result = await primaryAction({ ...this.props.colors, palette_name, project_id: res }, 'add');
    } else if (type === "newPalette") {
      result = await primaryAction({ ...this.props.colors, palette_name, project_id }, 'add');
    } else if (type === "login") {
      result = await primaryAction({ email, password });
    } else if (type === "signup") {
      result = await primaryAction({ email, user_name, password }).catch(error => this.setState({error}));
    }
    this.conveyResult(result);
  }

  conveyResult = result => {
    if (!result) {
      this.setState({ showError: true });
    } else {
      this.setState({
        palette_name: '',
        project_name: '',
        project_id: '',
        user_name: '',
        password: '',
        email: '',
        showConf: true
      }, () => setTimeout(() => {
        this.props.closeDialog();
        this.setState({ showConf: false })
      }, 2000))
    }
  }


  getAuthFields = () => {
    let usernameField;
    if (this.props.type === "signup") {
      usernameField = <>  
        <label htmlFor="user_name">Username:</label>
        <input className="username" name="user_name" onChange={this.handleChange}></input>
      </>
    } 

    return (
      <>
        {usernameField}
        <label htmlFor="password">Password:</label>
        <input name="password" type="password" onChange={this.handleChange}></input>
      </>
    )
  }
  
  getPaletteFields = () => {
    const { colors, data } = this.props;
    const colorDivs = Object.values(colors).map(color =>
      <div
        className="preview-color"
        key={color}
        style={{ backgroundColor: color }}>
      </div>);
    const projOptions = data.map(i => <option key={i.id} id={i.id} value={i.id}>{i.name}</option>);

    return (
      <>
      <div className="palette-preview">
        {colorDivs}
      </div>
      <label htmlFor="project_id">Choose A Project:</label>
        <select className="dropdown-input project-input existing-project" value={this.state.project_id} name="project_id" onChange={this.handleChange}>
          <option key={projOptions[0].id} value={projOptions[0].id}>{projOptions[0].name}</option>
        {projOptions}
      </select>
      <div className="dialog-divider"><hr /><p>OR</p><hr /></div>
      <label htmlFor="project_name">Create New Project:</label>
        <input className="project-input new-project-name" name="project_name" maxLength="15" onChange={this.handleChange} value={this.state.project_name}></input>
      </>
    )
  }

  getPrimaryField = () => {
    const { type } = this.props;
    let primaryField = "Palette Name";
    let fieldName = "palette_name";

    if (type === 'account') {
      return <p className="dialog-msg">Please Log In or Sign Up for an account to access this feature.</p>
    } else if (type === "newProject") {
      primaryField = "Project Name";
      fieldName = "project_name";
    } else if (type === "login" || type === "signup") {
      primaryField = "Email";
      fieldName = "email";
    } 

    return (
      <>
        <label htmlFor={`${fieldName}`}>{primaryField}:</label>
        <input
          maxLength={this.props.type === "login" || this.props.type === "signup" ? "40" : "15"}
          className="dropdown-input name-input"
          name={`${fieldName}`}
          onChange={this.handleChange}
          />
      </>
    )
  }

  getConfMessage = () => {
    const { type } = this.props;
    let message;

    if (type === 'signup' || type === 'login') {
      message = "Successfully logged in!";
    } else {
      const record = type.split('w')[1];
      message = `${record} successfully created!`;
    }
    return message;
  }

  render() {
    let content; 
    const { type, title, closeDialog } = this.props;

    if (!this.state.showConf) {
      const primaryBtn = type === "signup" || type === "login" ? "Go" : "Save";
      const palFields = type === "newPalette" ? this.getPaletteFields() : null;
      const authFields = type === "signup" || type === "login" ? this.getAuthFields() : null;
      const error = this.state.error ? <div className="form-error">! {this.state.error}</div> : null;

      const buttons = type !== 'account' ? <>
        <button
          className="dialog-btn cancel-btn"
          type="button"
          onClick={closeDialog}
        >Cancel</button >
        <button
          className="dialog-btn save-btn"
          type="button"
          onClick={this.handleClick}
        >{primaryBtn}</button>
      </> : null;
      
      content = (
        <>
          <h3>{title}</h3>
          {this.getPrimaryField()}
          {palFields}
          {authFields}
          {error}
          <div className="dialog-btns">
            {buttons}
          </div>
        </>
      );
    } else {
      content = this.getConfMessage();
    }

  
    return (
      <div className="dialog-overlay">
        <div className="popup">
          <i className="fas fa-times" onClick={closeDialog}></i>
          {content}
        </div>
      </div>
    )
  }
}

export default Dialog;
