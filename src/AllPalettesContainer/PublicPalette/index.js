import React from 'react';
import colorFormatter from '../../utils/colorFormatter';
import colorContraster from '../../utils/colorContraster';

function PublicPalette(props) {
	const paletteColors = [];

  for (let i = 1; i <= 5; i++) {
    const color = props.data[`color_${i}`];
    paletteColors.push(
      <div
        className="public-palette-color"
        key={props.data.id}
        style={{ backgroundColor: color }}
      >
        <p
          className="color-hex"
          style={{ color: colorContraster(color) }}
        >
          {colorFormatter(color, props.format)}
        </p>
      </div>);
	}

	return (
		<div className="PublicPalette">
			{paletteColors}
			<p
				className="public-palette-title"
        >
				{props.data.name}
			</p>
		</div>
	);
}

export default PublicPalette;
