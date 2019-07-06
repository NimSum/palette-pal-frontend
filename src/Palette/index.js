import React from 'react';
import requests from '../utils/apiRequests';

function Palette(props) {
  const {
    color_1,
    color_2,
    color_3,
    color_4,
    color_5
  } = props.data;

  return (
    <div className="Palette" >
      <i className="fas fa-times-circle" onClick={() => {
        props.updatePaletteData(props.data, 'delete');
      }}></i>
      <div className="color" style={{ backgroundColor: color_1 }}>
        <p className="color-hex">{color_1}</p>
      </div>
      <div className="color" style={{ backgroundColor: color_2 }}>
        <p className="color-hex">{color_2}</p>
      </div>
      <div className="color" style={{ backgroundColor: color_3 }}>
        <p className="color-hex">{color_3}</p>
      </div>
      <div className="color" style={{ backgroundColor: color_4 }}>
        <p className="color-hex">{color_4}</p>
      </div>
      <div className="color" style={{ backgroundColor: color_5 }}>
        <p className="color-hex">{color_5}</p>
      </div>
      <p
        className="palette-title"
        contentEditable
        suppressContentEditableWarning
        onBlur={e => props.updatePaletteData({palette_name: e.target.textContent, id: props.data.id}, 'update')}
        onKeyDown={e => {
          if (e.keyCode === 13) {
            e.preventDefault()
            props.updatePaletteData({ palette_name: e.target.textContent, id: props.data.id }, 'update')
          }
        }}
      >
        {props.data.name}
      </p>
  </div>
  );
};

export default Palette;