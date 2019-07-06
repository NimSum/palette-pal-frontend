import React from 'react';
import { NavLink } from 'react-router-dom';
import Palette from '../Palette';
import requests from '../utils/apiRequests';

function Project(props) {
  const palettes = props.data.palettes.map(palette => <Palette data={palette} key={palette.id} />);

  return (
    <article className="Project">
      <div className="project-heading">
        <div className="project-heading-left">
          <i className="fas fa-folder-open" />
          <h3
            className="project-title"
            contentEditable
            suppressContentEditableWarning
            onBlur={e => requests.putProject({
              project_name: e.target.textContent,
              id: props.data.id
            })}
            onKeyDown={e => {
              if (e.keyCode === 13) {
                e.preventDefault();
                requests.putProject({
                  project_name: e.target.textContent,
                  id: props.data.id
                })
              }
            }}>
            {props.data.name}
          </h3>
        </div>
        <i className="fas fa-trash" onClick={() => requests.deleteProject(props.data.id)} />
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

export default Project;
