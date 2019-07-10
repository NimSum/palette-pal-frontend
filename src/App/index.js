import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import requests from '../utils/apiRequests';
import Header from '../Header';
import PickerScreen from '../PickerScreen';
import ProjectsScreen from '../ProjectsScreen';
import ErrorScreen from '../ErrorScreen';
import Dialog from '../Dialog'
import cleanCombinedData from '../utils/cleaners';

class App extends Component {
	constructor(props) {
		super(props);

    this.state = {
      authorized: false,
      projectData: [],
      userData: [],
			loading: false,
      err: '',
      showAcctDialog: false
		};
	}

  componentDidMount() {
    this.checkForLogin();
  }

  checkForLogin = async () => {
    if (JSON.parse(localStorage.getItem('user_token'))) {
      const res = await requests.getDetailedProjects()
        .catch(err => this.setState({ err }));;

      this.setState({ userData: cleanCombinedData(res) });
    }
  }
  
  logUserIn = async user => {
    const res = await requests.loginUser(user)
      .catch(err => this.setState({ err }));

    if (res) {
      this.setState({ userData: cleanCombinedData(res.projects) });
      localStorage.setItem('user_token', JSON.stringify(await res.token))
    }
    return res;
  }

  signUserUp = async user => {
    const res = await requests.postNewUser(user)
      .catch(err => this.setState({ err }));
    
    if (res) console.log(res);
  }

  logUserOut = () => {
    localStorage.setItem('user_token', JSON.stringify(''))
    
    this.setState({ userData: [] })
  }

	updateProjectData = async (proj, action) => {
    let userData = this.state.userData;
    const { id, project_name } = proj;
		let res;

    if (action === 'add') {
      res = await requests.postProject(proj).catch(err => this.setState({ err }));
			userData.push({ name: project_name, id: res, palettes: [] });
    } else if (action === 'delete') {
      res = await requests.deleteProject(id).catch(err => this.setState({err}));
      userData = userData.filter(i => i.id !== id);
		} else if (action === 'update') {
      res = await requests.putProject(proj).catch(err => this.setState({err}));
			userData[userData.findIndex(i => i.id === id)].name = project_name;
		}
		this.setState({ userData });
		return res;
	};

  updatePaletteData = async (palette, action) => {
    const userData = this.state.userData;
    const { id, palette_name, project_id } = palette;
    const project = userData.find(proj => +proj.id === +project_id);
    const projIndex = userData.findIndex(proj => +proj.id === +project.id);
    let res;
    
    if (action === 'add') {
      res = await requests.postPalette(palette).catch(err => this.setState({ err }));
      await userData[projIndex].palettes.push({
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
      
      userData[projIndex].palettes = userData[projIndex].palettes
        .filter(i => i.id !== id);
    } else if (action === 'update') {
      res = await requests.putPalette(palette)
        .catch(err => this.setState({ err }));
      
      const palIndex = userData[projIndex].palettes
        .findIndex(pal => +pal.id === +id);
      
      userData[projIndex].palettes[palIndex] = {
        ...userData[projIndex].palettes[palIndex],
        ...palette,
        name: palette_name
      };
    }
    this.setState({ userData });
    return res;
  };

  render() {
    const acctDialog = this.state.showAcctDialog ? <Dialog type='account' title="Account Needed" closeDialog={() => this.setState({ showAcctDialog: false })} /> : null;

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
          {acctDialog}
          <Header logUserIn={this.logUserIn} signUserUp={this.signUserUp} logUserOut={this.logUserOut} />
				<main className="main">
					<Switch>
              <Route
                exact
                path="/"
                component={() => (
                  <PickerScreen
                    data={this.state.userData}
                    updateProjectData={this.updateProjectData}
                    updatePaletteData={this.updatePaletteData}
                    showAcctDialog={() => this.setState({showAcctDialog: true})}
                />
                )}
                />
						<Route
							exact
							path="/projects"
							component={() => (
                <ProjectsScreen
                data={this.state.userData}
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
