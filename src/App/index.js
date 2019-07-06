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

  deleteProject = id => {
    this.setState({projectData: this.state.projectData.filter(project => project.id !== id)})
  }

  render() {
    const content = this.state.loading ?
      <div className="loading-screen"><img src="https://66.media.tumblr.com/09dc11b8b4b4e1be71dba1c570882308/tumblr_naksdbfjZp1sa11jco1_500.gif" alt="Loading icon" /></div>
      : (
      <div className="App">
        <Header />
        <main className="main">
          <Switch>
              <Route exact path="/" component={() => <PickerScreen data={this.state.projectData}/>} />
              <Route exact path="/projects" component={() => <ProjectsScreen data={this.state.projectData} deleteProject={this.deleteProject} />} />
            <Route render={ErrorScreen} />
          </Switch>
        </main>
      </div>
      );
    
    return content;
  }
}

export default App;
