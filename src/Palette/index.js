import React from 'react';
import colorFormatter from '../utils/colorFormatter';
import colorContraster from '../utils/colorContraster';

function Palette(props) {
  const colorDivs = [];

  // const formatted = colorFormatter(props.data, props.format)
  
  for (let i = 1; i <= 5; i++) {
    const color = props.data[`color_${i}`]
    colorDivs.push(
      <div className="color" key={props.data.name + color} style={{ backgroundColor: color }}>
        <p className="color-hex" style={{ color: colorContraster(color) }}>{colorFormatter(color, props.format)}</p>
      </div>
    )
  }

  return (
    <div className="Palette" >
      <i className="fas fa-times-circle" onClick={() => {
        props.updatePaletteData({ ...props.data, project_id: props.projectID }, 'delete');
      }}/>
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