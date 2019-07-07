import React, { Component } from 'react';
import SubHeader from '../SubHeader';
import Project from '../Project';
import Dialog from '../Dialog';
import requests from '../utils/apiRequests';

class ProjectsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDialog: false,
      filter: '',
      option: {
        format: 'hex',
        project: ''
      }
    }
  }

  closeDialog = () => {
    this.setState({showDialog: false})
  }

  setProjectOption = option => {
    this.setState({ option });
  }

  render() {
    const dialog = this.state.showDialog ? <Dialog
      title="Create New Project"
      closeDialog={this.closeDialog}
      primaryAction={this.props.updateProjectData}
    /> : null;

    const data = !this.state.option.project ? this.props.data
      : this.props.data.filter(i => i.id === +this.state.option.project);
    
    const projects = data.map(project => <Project
      data={project}
      key={project.id}
      format={this.state.option.format}
      updateProjectData={this.props.updateProjectData}
      updatePaletteData={this.props.updatePaletteData}
    />).reverse();

    
    return (
      <>
        {dialog}
        <SubHeader
          title="My Projects"
          handleClick={() => this.setState({ showDialog: true })} btnTitle="Create New Project"
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