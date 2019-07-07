import React from 'react';
import { NavLink } from 'react-router-dom';
import Palette from '../Palette';

function Project(props) {
  const palettes = props.data.palettes.map(palette =>
    <Palette
      data={palette}
      key={palette.id}
      format={props.format}
      projectID={props.data.id}
      updatePaletteData={props.updatePaletteData}
    />);
  
  const trash = props.data.id !== 1 ? <i
    className="fas fa-trash"
    onClick={() => props.updateProjectData(props.data, 'delete')}
  /> : null;

  return (
    <article className="Project">
      <div className="project-heading">
        <div className="project-heading-left">
          <i className="fas fa-folder-open" />
          <h3
            className="project-title"
            contentEditable
            suppressContentEditableWarning
            onBlur={e => props.updateProjectData({
              project_name: e.target.textContent,
              id: props.data.id
            }, 'update')
            }
            onKeyDown={e => {
              if (e.keyCode === 13 || (e.target.textContent.length >= 15 && e.keyCode !== 8)) {
                e.preventDefault();
                props.updateProjectData({
                  project_name: e.target.textContent,
                  id: props.data.id
                }, 'update');
              }
            }}>
            {props.data.name}
          </h3>
        </div>
        {trash}
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
