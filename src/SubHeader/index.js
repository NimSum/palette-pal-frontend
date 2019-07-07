import React, { Component } from 'react';

class SubHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      format: 'hex',
      mode: 'random',
      project: ''
    }
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
    this.props.setOption({ [target.name]: target.value });
  }
    
  render() {
    const btnName = this.props.title === "Pick New Palette" ? "Generate New Palette" : "Create New Project";

    const projectOptions = this.props.data.map(project => <option value={project.id} key={project.id} >{project.name}</option>)

    const options = this.props.title === "Pick New Palette" ?  <>
      <p className="dropdown-label">Mode:</p>
      <select
        className="dropdown-input"
        type="text"
        name="mode"
        value={this.state.mode}
        onChange={this.handleChange}
      >
        <option value='random'>random</option>
        <option value='complementary'>complimentary</option>
        <option value='gradient'>gradient</option>
      </select>
    </>
      : <>
        <p className="dropdown-label">Project:</p>
        <select
          className="dropdown-input"
          type="text"
          name="project"
          value={this.state.filter}
          onChange={this.handleChange}
        >
          <option value=''>All Projects</option>
          {projectOptions}
        </select>
    </>

    return (
      <section className="SubHeader">
        <div className="subheader-left">
          <h2 className="page-title">{this.props.title}</h2>
          <button className="subheader-btn" onClick={this.props.handleClick}><i className="fas fa-play" aria-hidden="true"></i>{btnName}</button>
        </div>
        <div className="subheader-right">
          <p className="dropdown-label">Format:</p>
          <select
            className="dropdown-input"
            type="text"
            name="format"
            value={this.state.format}
            onChange={this.handleChange}
          >
            <option value='hex'>hex</option>
            <option value='hsl'>hsl</option>
            <option value='rgb'>rgb</option>
          </select>
          {options}
        </div>
      </section>
    );
  }
}

export default SubHeader;