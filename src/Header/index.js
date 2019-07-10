import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Dialog from '../Dialog';

class Header extends Component {
	state = {
		showLogin: false,
		showSignup: false
	}

  render() {
    const loggedIn = JSON.parse(localStorage.getItem('user_token'));
    let dialog = null;
    let links;
    
    if (!loggedIn) {
      links = <>
        <p role="link" className="nav-link auth-link" onClick={() => this.setState({ showLogin: true, showSignup: false })}>Log in</p>
        <p className="spacer">/</p>
        <p role="link" className="nav-link auth-link" onClick={() => this.setState({ showSignup: true, showLogin: false })}> Sign up</p>
        </>
    } else {
      links = <p role="link" className="nav-link auth-link" onClick={this.props.logUserOut}>Log out</p>
    }

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
              {links}
            </div>
					</nav>
				</div>
			</header>
		);
	}
}

export default Header;
