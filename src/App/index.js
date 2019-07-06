import React, { Component } from 'react';
import './_App.scss';
import Header from '../Header';
import PickerScreen from '../PickerScreen';
import ProjectsScreen from '../ProjectsScreen';
import ErrorScreen from '../ErrorScreen';
import { Switch, Route } from 'react-router-dom';
import requests from '../utils/apiRequests'

class App extends Component {
  constructor(props) {
    super(props); 

    this.state = {
      projectData: [],
      loading: true
    }
  }

  componentDidMount() {
    this.getProjectData();
  }

  getProjectData = async () => {
    const response = await requests.getDetailedProjects();

    const projectData = response.reduce((acc, palette) => {
      const project = acc.find(project => project.id === palette.project_id) || null;

      const paletteData = {
        id: palette.palette_id,
        name: palette.palette_name,
        color_1: palette.color_1,
        color_2: palette.color_2,
        color_3: palette.color_3,
        color_4: palette.color_4,
        color_5: palette.color_5
      }

      if (!project) {
        acc.push({
          id: palette.project_id,
          name: palette.project_name,
          palettes: [paletteData]
        })
      } else {
        project.palettes.push(paletteData)
      }
      return acc;
    }, [])

    this.setState({ projectData, loading: false });
  }

  updateProjectData = (project, action) => {
    let projectData = this.state.projectData;

    if (action === 'save') {
      projectData.push(project);
    } else if (action === 'delete') {
      projectData.filter(i => i.id !== project.id);
    } else if (action === 'update') {
      projectData[projectData.findIndex(i => i.id === project.id)].name = project.name;
    }
     
    this.setState({ projectData })
  }

  updatePaletteData = (palette, action) => {
    let projectData = this.state.projectData;
    const projIndex = projectData.findIndex(proj => proj.palettes.map(pal => pal.id).includes(palette.id));

    if (action === 'save') {
      projectData[projIndex].palettes.push(palette);
    } else if (action === 'delete') {
      projectData[projIndex].palettes = projectData[projIndex].palettes.filter(i => i.id !== palette.id);
    } else if (action === 'update') {
      const palIndex = projectData[projIndex].palettes.findIndex(pal => pal.id);

      projectData[projIndex].palettes[palIndex] = {...projectData[projIndex].palettes[palIndex], palette }
    }

    this.setState({ projectData })
  }

  deleteProjectData = id => {
    this.setState({projectData: this.state.projectData.filter(project => project.id !== id)})
  }

  saveProjectData = project => {
    this.setState({projectData: this.state.projectData.push(project)})
  }

  deletePaletteData = id => {
    const project = this.state.projectData.find(project => {
      return project.palettes.map(pal => pal.id).includes(id);
    })

    project.palettes = project.palettes.filter(pal => pal.id !== id);

    this.setState({ projectData: [...this.state.projectData, project] })
  }

  savePaletteData = project => {
    this.setState({ projectData: this.state.projectData.push(project) })
  }

  render() {
    const content = this.state.loading ?
      <div className="loading-screen"><img src="https://66.media.tumblr.com/09dc11b8b4b4e1be71dba1c570882308/tumblr_naksdbfjZp1sa11jco1_500.gif" alt="Loading icon" /></div>
      : (
      <div className="App">
        <Header />
        <main className="main">
          <Switch>
              <Route exact path="/" component={() =>
                <PickerScreen data={this.state.projectData}  updateProjectData={this.updateProjectData} />}
              />
              <Route exact path="/projects" component={() =>
                <ProjectsScreen
                  data={this.state.projectData}
                  updateProjectData={this.updateProjectData}
                  updatePaletteData={this.updatePaletteData}
                />}
              />
            <Route render={ErrorScreen} />
          </Switch>
        </main>
      </div>
      );
    
    return content;
  }
}

export default App;
