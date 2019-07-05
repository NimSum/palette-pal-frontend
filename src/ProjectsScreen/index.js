import React, { Component } from 'react';
import SubHeader from '../SubHeader';

class ProjectsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projects: []
    }
  }

  componentDidMount() {
    this.getProjects();
  }

  getProjects = async () => {
    const projectFetch = await fetch('https://palette-pal-be.herokuapp.com/api/v1/projects')
    let projects = await projectFetch.json();

    const paletteFetch = await fetch('https://palette-pal-be.herokuapp.com/api/v1/palettes')
    const palettes = await paletteFetch.json();

    projects = projects.map(project => {
      project.palettes = palettes.filter(pal => pal.project_id === project.id);
      return project;
    })
    
    this.setState({projects}, () => console.log(projects))
  }

  createNewProject = () => {
    console.log('poop')
  }

  render() {
    return (
      <>
        <SubHeader title="My Projects" handleClick={this.createNewProject} btnTitle="Create New Project"/>
        <section className="ProjectsScreen">
          <div className="project-container">
            {/* //below can go in Project component */}
            <div className="Project">
              <div className="project-heading">
                <div className="project-heading-left">
                  <i className="fas fa-folder-open"></i>
                  <h3 className="project-title">Movie Tracker</h3>
                </div>
                <i className="fas fa-ellipsis-h"></i>
              </div>
              <div className="project-palettes">
                {/* //below can go in ProjectPalette component */}
                <div className="project-palette">
                  <div className="color" style={{ backgroundColor: '#214046', fontColor: '#214046'}}>
                    <p className="color-hex">#214046</p>
                  </div>
                  <div className="color" style={{ backgroundColor: '#05596A' }}>
                    <p className="color-hex">#05596A</p>
                  </div>
                  <div className="color" style={{ backgroundColor: '#6BCBA5' }}>
                    <p className="color-hex">#6BCBA5</p>
                  </div>
                  <div className="color" style={{ backgroundColor: '#9EE6A9' }}>
                    <p className="color-hex">#9EE6A9</p>
                  </div>
                  <div className="color" style={{ backgroundColor: '#CBF3C3' }}>
                    <p className="color-hex">#CBF3C3</p>
                  </div>
                  <p className="palette-title">Home Page</p>
                </div>
                <div className="project-palette">
                  <div className="color" style={{ backgroundColor: '#214046' }}></div>
                  <div className="color" style={{ backgroundColor: '#05596A' }}></div>
                  <div className="color" style={{ backgroundColor: '#6BCBA5' }}></div>
                  <div className="color" style={{ backgroundColor: '#9EE6A9' }}></div>
                  <div className="color" style={{ backgroundColor: '#CBF3C3' }}></div>
                </div>
                <div className="project-palette add-palette-btn">
                  <p className="plus-txt">+</p>
                  <p className="add-palette-txt">Add New<br/>Palette</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default ProjectsScreen;