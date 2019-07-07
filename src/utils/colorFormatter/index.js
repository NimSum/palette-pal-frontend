import color from 'color';

// function formatColor(colorsObj, type) {
//   for (let hue in colorsObj ) {
//     let editable = colorsObj.name === colorsObj[hue] || colorsObj.id === colorsObj[hue];
//     if (type === 'hsl' && !editable) {
//       colorsObj[hue] = (color(colorsObj[hue]).hsl().round().string());
//     } else if (type === 'rgb' && !editable) {
//       colorsObj[hue] = (color(colorsObj[hue]).rgb().string());
//     } else if (type === 'hex' && !editable) {
//       colorsObj[hue] = (color(colorsObj[hue]).hex());
//     }
//   }
//   return colorsObj;
// }

function formatColor(value, type) {
  // for (let hue in colorsObj) {
    // let editable = colorsObj.name === color || colorsObj.id === color;
    if (type === 'hsl') {
      value = (color(value).hsl().round().string());
    } else if (type === 'rgb') {
      value = (color(value).rgb().string());
    } else if (type === 'hex') {
      value = (color(value).hex());
    }
  // }
  return value;
}

export default formatColor;