import React, { Component } from 'react';

class SubHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      format: '',
      mode: '',
      filter: ''
    }
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
    this.props.setOption({ [target.name]: target.value });
  }
    
  render() {
    const btnName = this.props.title === "Pick New Palette" ? "Generate New Palette" : "Create New Project";

    const projectOptions = this.props.data.map(project => <option value={project.id} key={project.id} >{project.name}</option>)

    const filters = this.props.title === "Pick New Palette" ?  <>
        <p className="dropdown-label">Format:</p><select className="dropdown-input" type="text" name="format"/>
        <p className="dropdown-label">Mode:</p><select className="dropdown-input" type="text" name="mode"/>
    </>
      : <>
        <p className="dropdown-label">Filter:</p>
        <select
          className="dropdown-input"
          type="text"
          name="filter"
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
          {filters}
        </div>
      </section>
    );
  }
}

export default SubHeader;