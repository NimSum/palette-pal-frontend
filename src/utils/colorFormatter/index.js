import color from 'color';

function formatColor(colorsObj, type) {
  for (let hue in colorsObj ) {
    let editable = colorsObj.name === colorsObj[hue] || colorsObj.id === colorsObj[hue];
    if (type === 'hsl' && !editable) {
      colorsObj[hue] = (color(colorsObj[hue]).hsl().round().string());
    } else if (type === 'rgb' && !editable) {
      colorsObj[hue] = (color(colorsObj[hue]).rgb().string());
    } else if (type === 'hex' && !editable) {
      colorsObj[hue] = (color(colorsObj[hue]).hex());
    }
  }
  return colorsObj;
}

export default formatColor;