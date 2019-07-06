import React from 'react';

function Palette(props) {
  const colorDivs = [];

  for (let i = 1; i <= 5; i++) {
    const color = props.data[`color_${i}`]
    colorDivs.push(
      <div className="color" key={props.data.name + color} style={{ backgroundColor: color }}>
        <p className="color-hex" style={{ color: props.getContrastColor(color) }}>{color}</p>
      </div>
    )
  }

  return (
    <div className="Palette" >
      <i className="fas fa-times-circle" onClick={() => {
        props.updatePaletteData({ ...props.data, project_id: props.projectID }, 'delete');
      }}></i>
      {colorDivs}
      <p
        className="palette-title"
        contentEditable
        suppressContentEditableWarning
        onBlur={e => props.updatePaletteData({
          palette_name: e.target.textContent,
          id: props.data.id,
          project_id: props.projectID
        }, 'update')}
        onKeyDown={e => {
          if (e.keyCode === 13 || (e.target.textContent.length >= 15 && e.keyCode !== 8)) {
            e.preventDefault()
            props.updatePaletteData({
              palette_name: e.target.textContent,
              id: props.data.id,
              project_id: props.projectID
            }, 'update')
          }
        }}
      >
        {props.data.name}
      </p>
  </div>
  );
};

export default Palette;