import React, { Component } from 'react';
import SubHeader from '../SubHeader';
import Project from '../Project';
import Dialog from '../Dialog';
import requests from '../utils/apiRequests';

class ProjectsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDialog: false
    }
  }

  closeDialog = () => {
    this.setState({showDialog: false})
  }

  createNewProject = project => {
    requests.postProject(project);
  }

  render() {
    const dialog = this.state.showDialog ? <Dialog
      title="Create New Project"
      closeDialog={this.closeDialog}
      primaryAction={this.createNewProject}
    /> : null;

    const projects = this.props.data.map(project => <Project data={project} />);

    return (
      <>
        {dialog}
        <SubHeader title="My Projects" handleClick={() => this.setState({showDialog: true})} btnTitle="Create New Project"/>
        <section className="project-container">
          {projects}
        </section>
      </>
    );
  }
}

export default ProjectsScreen;