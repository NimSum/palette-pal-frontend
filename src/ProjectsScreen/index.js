import React, { Component } from 'react';
import SubHeader from '../SubHeader';
import Project from '../Project';

class ProjectsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDialog: false
    }
  }

  createNewProject = () => {
    console.log('poop')
  }

  render() {
    const projects = this.props.data.map(project => <Project data={project} />);

    return (
      <>
        <SubHeader title="My Projects" handleClick={this.createNewProject} btnTitle="Create New Project"/>
        <section className="project-container">
          {projects}
        </section>
      </>
    );
  }
}

export default ProjectsScreen;