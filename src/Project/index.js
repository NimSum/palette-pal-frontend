import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Palette from '../Palette';
import requests from '../utils/apiRequests';

class Project extends Component {
	constructor(props) {
		super(props);

		this.state = {
			showMenu: false
		};
	}

	toggleMenu = () => {
		this.setState({ showMenu: !this.state.showMenu });
	};

  updateProjectName = e => {
    requests.putProject({ project_name: e.target.textContent, id: this.props.data.id });
	};

	render() {
		const palettes = this.props.data.palettes.map(palette => <Palette data={palette} key={palette.id} />);

		return (
			<article className="Project">
				<div className="project-heading">
					<div className="project-heading-left">
						<i className="fas fa-folder-open" />
						<h3
              className="project-title"
              contentEditable
              suppressContentEditableWarning
              onBlur={this.updateProjectName}
              onKeyDown={e => {
                if (e.keyCode === 13) {
                  e.preventDefault();
                  this.updateProjectName(e);
                }
              }}>
							{this.props.data.name}
						</h3>
					</div>
					<i className="fas fa-ellipsis-h" onClick={this.toggleMenu} />
				</div>
				<div className="project-palettes">
					{palettes}
					<NavLink exact to="/" className="Palette add-palette-btn">
						<p className="plus-txt">+</p>
						<p className="add-palette-txt">
							Add New<br />Palette
						</p>
					</NavLink>
				</div>
			</article>
		);
	}
}

export default Project;
