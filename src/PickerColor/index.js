import React from 'react';

function PickerColor(props){
	const checkbox = props.held ? 'far fa-check-square' : 'far fa-square';
  const holdClass = props.held ? 'hold' : null;

	return (
		<div className="picker-color" style={{ backgroundColor: props.color }}>
      <p className="picker-color-value" style={{ color: props.getContrastColor(props.color) }}>{props.color}</p>
      <p className={`picker-hold ${holdClass}`} style={{ color: props.getContrastColor(props.color) }} onClick={() => props.toggleHold(props.id)}>
				<i className={checkbox} />HOLD
			</p>
		</div>
	);
}

export default PickerColor;
