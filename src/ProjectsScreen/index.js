import React, { Component } from 'react';
import SubHeader from '../SubHeader';

class ProjectsScreen extends Component {

  render() {
    return (
      <>
        <SubHeader title="My Projects"/>
        <section className="ProjectsScreen">
          <div className="palette-display">
            
          </div>
          <div className="Projects-footer">
            <p className="instructions"><i className="fas fa-sync-alt" aria-hidden="true"></i>Press <strong>space</strong> to refresh unselected colors</p>
            <button className="save-btn">
              <i className="far fa-save" aria-hidden="true"></i>Save Palette
            </button>
          </div>
        </section>
      </>
    );
  }
}

export default ProjectsScreen;