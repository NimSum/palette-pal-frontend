import React from 'react';
import { NavLink } from 'react-router-dom';
import Palette from '../Palette';

function Project(props) {
  console.log(props.data.palettes)
  const palettes = props.data.palettes.map(palette => <Palette data={palette} key={palette.id} projectID={props.data.id} updatePaletteData={props.updatePaletteData} />);

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
              if (e.keyCode === 13) {
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
        <i
          className="fas fa-trash"
          onClick={() => props.updateProjectData(props.data, 'delete')}
        />
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
