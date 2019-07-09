import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Dialog from '../Dialog';

class Header extends Component {
	state = {
		showLogin: false,
		showSignup: false
	};

	render() {
		let dialog = null;

		if (this.state.showLogin) {
      dialog = <Dialog title="Log In" type="login" primaryAction={this.props.logUserIn} closeDialog={() => this.setState({showLogin: false})}/>;
		} else if (this.state.showSignup) {
      dialog = <Dialog title="Sign Up" primaryAction={this.props.signUserUp} type="signup" closeDialog={() => this.setState({ showSignup: false })} />
		}

		return (
      <header className="Header">
        {dialog}
				<Link exact="true" to="/" className="header-left">
					<img className="logo-img" src={require('../images/logo.png')} alt="Palette pal logo of paint palette" />
					<h1 className="logo-text">Palette Pal</h1>
				</Link>
				<div className="header-right">
					<nav className="header-nav">
						<NavLink exact to="/" className="nav-link">
							Pick New Palette
						</NavLink>
						<NavLink exact to="/projects" className="nav-link">
							My Projects
						</NavLink>
            <div className="auth-links">
              <p role="link" className="nav-link auth-link" onClick={() => this.setState({showLogin: true})}>Log in</p><p className="spacer">/</p><p role="link" className="nav-link auth-link" onClick={() => this.setState({ showSignup: true })}> Sign up</p>
            </div>
					</nav>
				</div>
			</header>
		);
	}
}

export default Header;
