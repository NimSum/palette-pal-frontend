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
      format: ''
    }
  }

  closeDialog = () => {
    this.setState({showDialog: false})
  }

  render() {
    const dialog = this.state.showDialog ? <Dialog
      title="Create New Project"
      closeDialog={this.closeDialog}
      primaryAction={this.props.updateProjectData}
    /> : null;

    const data = !this.state.filter ? this.props.data
      : this.props.data.filter(i => i.id === +this.state.filter);
    
    const projects = data.map(project => <Project
      data={project}
      key={project.id}
      format={this.state.format}
      updateProjectData={this.props.updateProjectData}
      updatePaletteData={this.props.updatePaletteData}
      getContrastColor={this.props.getContrastColor}
    />).reverse();

    
    return (
      <>
        {dialog}
        <SubHeader
          title="My Projects"
          handleClick={() => this.setState({ showDialog: true })} btnTitle="Create New Project"
          data={this.props.data}
          setOption={filter => this.setState(filter)}
        />
        <section className="project-container">
          {projects}
        </section>
      </>
    );
  }
}

export default ProjectsScreen;