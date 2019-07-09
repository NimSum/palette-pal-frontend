import React, { Component } from 'react';
import Header from '../Header';
import PickerScreen from '../PickerScreen';
import ProjectsScreen from '../ProjectsScreen';
import ErrorScreen from '../ErrorScreen';
import Dialog from '../Dialog'
import { Switch, Route } from 'react-router-dom';
import requests from '../utils/apiRequests';

class App extends Component {
	constructor(props) {
		super(props);

    this.state = {
      authorized: false,
      projectData: [],
      userData: [],
			loading: false,
			err: ''
		};
	}

	componentDidMount() {
		// this.getProjectData();
  }
  
  logUserIn = async user => {
    const res = requests.loginUser(user);
    console.log(res)
  }

  signUserUp = async user => {
    const res = await requests.postNewUser(user);
    console.log(res)
  }

	getProjectData = async () => {
    const res = await requests.getDetailedProjects();

    const projectData = res.reduce((acc, palette) => {
			const { project_id, project_name, palette_id, palette_name } = palette;
      const project = acc.find(proj => proj.id === project_id) || null;
      const paletteData = palette_id ? [{
        id: palette_id,
        name: palette_name,
        color_1: palette.color_1,
        color_2: palette.color_2,
        color_3: palette.color_3,
        color_4: palette.color_4,
        color_5: palette.color_5
      }] : [];

      if (!project) {
        acc.push({ id: project_id, name: project_name, palettes: paletteData });
      } else if (project) {
        project.palettes.push(paletteData[0]);
        project.palettes.sort((a, b) => a.id - b.id);
      }
      
			return acc;
		}, []);
		this.setState({ projectData, loading: false });
	};

	updateProjectData = async (proj, action) => {
    let projectData = this.state.projectData;
    const { id, project_name } = proj;
		let res;

    if (action === 'add') {
      res = await requests.postProject(proj).catch(err => this.setState({err}));
			projectData.push({ name: project_name, id: res[0], palettes: [] });
    } else if (action === 'delete') {
      res = await requests.deleteProject(id).catch(err => this.setState({err}));
      projectData = projectData.filter(i => i.id !== id);
		} else if (action === 'update') {
      res = await requests.putProject(proj).catch(err => this.setState({err}));
			projectData[projectData.findIndex(i => i.id === id)].name = project_name;
		}
		this.setState({ projectData });
		return res;
	};

  updatePaletteData = async (palette, action) => {
    const projectData = this.state.projectData;
    const { id, palette_name, project_id } = palette;
    const project = projectData.find(proj => +proj.id === +project_id);
    const projIndex = projectData.findIndex(proj => +proj.id === +project.id);
    let res;
    
    if (action === 'add') {
      res = await requests.postPalette(palette).catch(err => this.setState({ err }));
      projectData[projIndex].palettes.push({
        name: palette_name,
        id: res,
        color_1: palette.color_1,
        color_2: palette.color_2,
        color_3: palette.color_3,
        color_4: palette.color_4,
        color_5: palette.color_5
      });
    } else if (action === 'delete') {
      res = await requests.deletePalette(id)
        .catch(err => this.setState({ err }));
      
      projectData[projIndex].palettes = projectData[projIndex].palettes
        .filter(i => i.id !== id);
    } else if (action === 'update') {
      res = await requests.putPalette(palette)
        .catch(err => this.setState({ err }));
      
      const palIndex = projectData[projIndex].palettes
        .findIndex(pal => +pal.id === +id);
      
      projectData[projIndex].palettes[palIndex] = {
        ...projectData[projIndex].palettes[palIndex],
        ...palette,
        name: palette_name
      };
		}
		this.setState({ projectData });
  };

	render() {
		const content = this.state.loading ? (
			<div className="loading-screen">
				<img
					src="https://66.media.tumblr.com/09dc11b8b4b4e1be71dba1c570882308/tumblr_naksdbfjZp1sa11jco1_500.gif"
					alt="Loading icon"
				/>
        <h2>Loading...</h2>
			</div>
		) : (
			<div className="App">
				<Header />
				<main className="main">
					<Switch>
						<Route
							exact
							path="/"
							component={() => (
                <PickerScreen
                  data={this.state.projectData}
                  updateProjectData={this.updateProjectData}
                  updatePaletteData={this.updatePaletteData}
                />
							)}
						/>
						<Route
							exact
							path="/projects"
							component={() => (
								<ProjectsScreen
									data={this.state.projectData}
									updateProjectData={this.updateProjectData}
                  updatePaletteData={this.updatePaletteData}
								/>
							)}
						/>
						{/* <Route render={ErrorScreen} /> */}
            </Switch>
            <Route path="/login" render={() => <Dialog title="Log In" type="login" primaryAction={this.logUserIn} />} />
            <Route path="/signup" render={() => <Dialog title="Sign Up" primaryAction={this.signUserUp} type="signup" />} />
				</main>
			</div>
		);

		return content;
	}
}

export default App;
