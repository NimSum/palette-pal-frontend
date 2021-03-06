import React, { Component } from 'react';
import SubHeader from '../SubHeader';
import Project from './Project';
import Dialog from '../Dialog';

class ProjectsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDialog: false,
      filter: '',
      format: 'hex',
      project: ''
    }
  }

  closeDialog = () => {
    this.setState({showDialog: false})
  }

  showDialog = () => {
    this.setState({ showDialog: true })
  }

  setProjectOption = option => {
    this.setState(option);
  }


  render() {
    let dialog = null;
    
    
    if (this.state.showDialog && this.props.data.length) {
      dialog = <Dialog
        title="Create New Project"
        type="newProject"
        projects={this.props.data.map(i => i.name)}
        closeDialog={this.closeDialog}
        primaryAction={this.props.updateProjectData}
      />
    } else if (this.state.showDialog && !this.props.data.length) {
      dialog = <Dialog
        type="account"
        title="Account Needed"
        closeDialog={() => this.setState({ showDialog: false })}
      />
    }

    const data = !this.state.project ? this.props.data
      : this.props.data.filter(i => i.id === +this.state.project);
    
    let projects = data.map(project => <Project
      data={project}
      key={project.id}
      format={this.state.format}
      updateProjectData={this.props.updateProjectData}
      updatePaletteData={this.props.updatePaletteData}
    />).reverse();

    if (!this.props.data.length) {
      projects = <p className="no-projects-msg">Please Log In or Sign Up for an account to save projects and palettes.</p>
    }
    
    return (
      <>
        {dialog}
        <SubHeader
          title="My Projects"
          handleClick={this.showDialog}
          btnTitle="Create New Project"
          data={this.props.data}
          setOption={this.setProjectOption}
        />
        <section className="project-container">
          {projects}
        </section>
      </>
    );
  }
}

export default ProjectsScreen;