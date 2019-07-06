import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Palette from '../Palette';

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

	render() {
		const palettes = this.props.data.palettes.map(palette => <Palette data={palette} />);

		return (
			<article className="Project">
				<div className="project-heading">
					<div className="project-heading-left">
						<i className="fas fa-folder-open" />
						<h3 className="project-title">{this.props.data.name}</h3>
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
