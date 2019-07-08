import React from 'react';
import PaletteColor from './PaletteColor';

function Palette(props) {
	const paletteColors = [];

  for (let i = 1; i <= 5; i++) {
    const color = props.data[`color_${i}`];
    
    paletteColors.push(<PaletteColor
      color={color}
      palette_id={props.data.id}
      id={`color_${i}`}
      key={`color_${i}`}
      project_id={props.projectID}
      updatePaletteData={props.updatePaletteData}
      format={props.format}
    />);
	}

	return (
		<div className="Palette">
			<i
				className="fas fa-times-circle"
				onClick={() => {
					props.updatePaletteData({ ...props.data, project_id: props.projectID }, 'delete');
				}}
			/>
			{paletteColors}
			<p
				className="palette-title"
				contentEditable
				suppressContentEditableWarning
				onBlur={e =>
					props.updatePaletteData(
						{
							palette_name: e.target.textContent,
							id: props.data.id,
							project_id: props.projectID
						},
						'update'
					)}
				onKeyDown={e => {
					if (e.keyCode === 13 || (e.target.textContent.length >= 15 && e.keyCode !== 8)) {
						e.preventDefault();
						props.updatePaletteData(
							{
								palette_name: e.target.textContent,
								id: props.data.id,
								project_id: props.projectID
							},
							'update'
						);
					}
				}}>
				{props.data.name}
			</p>
		</div>
	);
}

export default Palette;
