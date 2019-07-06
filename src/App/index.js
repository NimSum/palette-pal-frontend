import React, { Component } from 'react';
import './_App.scss';
import Header from '../Header';
import PickerScreen from '../PickerScreen';
import ProjectsScreen from '../ProjectsScreen';
import ErrorScreen from '../ErrorScreen';
import { Switch, Route } from 'react-router-dom';
import requests from '../utils/apiRequests';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			projectData: [],
			loading: true,
			error: ''
		};
	}

	componentDidMount() {
		this.getProjectData();
	}

	getProjectData = async () => {
    const res = await requests.getDetailedProjects();
    console.log(res)

    const projectData = res.reduce((acc, palette) => {
      console.log(palette.palette_id === null)
			const {
				project_id,
				project_name,
				palette_id,
				palette_name,
				color_1,
				color_2,
				color_3,
				color_4,
				color_5
			} = palette;

      const project = acc.find(proj => proj.id === project_id) || null;
      
      const paletteData = palette_id ? [{
        id: palette_id,
        name: palette_name,
        color_1,
        color_2,
        color_3,
        color_4,
        color_5
      }] : [];

      if (!project) {
        acc.push({ id: project_id, name: project_name, palettes: paletteData });
      } else if (project) {
        project.palettes.push(paletteData[0]);
      }

			return acc;
		}, []);
		this.setState({ projectData, loading: false });
	};

	updateProjectData = async (project, action) => {
		let projectData = this.state.projectData;
		let res;

		if (action === 'add') {
			try {
				res = await requests.postProject(project);
				projectData.push({
					name: project.project_name,
					id: res[0],
					palettes: []
				});
      } catch (error) {
				this.setState(error);
			}
		} else if (action === 'delete') {
      try {
				res = await requests.deleteProject(project.id);
				projectData = projectData.filter(i => i.id !== project.id);
      } catch (error) {
				this.setState(error);
			}
		} else if (action === 'update') {
			try {
				res = await requests.putProject(project);
				projectData[projectData.findIndex(i => i.id === project.id)].name = project.project_name;
      } catch (error) {
				this.setState(error);
			}
		}

		this.setState({ projectData });
		return res;
	};

	updatePaletteData = async (palette, action) => {
		let projectData = this.state.projectData;
		const projIndex = projectData.findIndex(proj => proj.palettes.map(pal => pal.id).includes(palette.id));
		let res;

		if (action === 'add') {
			projectData[projIndex].palettes.push(palette);
		} else if (action === 'delete') {
			projectData[projIndex].palettes = projectData[projIndex].palettes.filter(i => i.id !== palette.id);
		} else if (action === 'update') {
			const palIndex = projectData[projIndex].palettes.findIndex(pal => pal.id);

			projectData[projIndex].palettes[palIndex] = { ...projectData[projIndex].palettes[palIndex], palette };
		}

		this.setState({ projectData });
	};

	// deleteProjectData = id => {
	//   this.setState({projectData: this.state.projectData.filter(project => project.id !== id)})
	// }

	// saveProjectData = project => {
	//   this.setState({projectData: this.state.projectData.push(project)})
	// }

	// deletePaletteData = id => {
	//   const project = this.state.projectData.find(project => {
	//     return project.palettes.map(pal => pal.id).includes(id);
	//   })

	//   project.palettes = project.palettes.filter(pal => pal.id !== id);

	//   this.setState({ projectData: [...this.state.projectData, project] })
	// }

	// savePaletteData = project => {
	//   this.setState({ projectData: this.state.projectData.push(project) })
	// }

	render() {
		console.log(this.state.projectData);
		const content = this.state.loading ? (
			<div className="loading-screen">
				<img
					src="https://66.media.tumblr.com/09dc11b8b4b4e1be71dba1c570882308/tumblr_naksdbfjZp1sa11jco1_500.gif"
					alt="Loading icon"
				/>
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
                  updatePaletteData={this.updateProjectData}
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
						<Route render={ErrorScreen} />
					</Switch>
				</main>
			</div>
		);

		return content;
	}
}

export default App;
