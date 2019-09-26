import React from 'react';
import PaletteColor from './PaletteColor';

function Palette(props) {
	const paletteColors = [];

  for (let i = 1; i <= 5; i++) {
    const color = props.data[`color_${i}`];
    
    paletteColors.push(<PaletteColor
      color={color}
      palette_id={props.data.id}
      palette_name={props.data.name}
      id={`color_${i}`}
      key={`color_${i}`}
      project_id={props.projectID}
      updatePaletteData={props.updatePaletteData}
      format={props.format}
    />);
	}

	return (
		<div className="Palette">
			{paletteColors}
			<p
				className="palette-title"
        >
				{props.data.name}
			</p>
		</div>
	);
}

export default Palette;
