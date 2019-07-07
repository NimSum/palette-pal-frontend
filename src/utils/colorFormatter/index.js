import color from 'color';

function formatColor(value, type) {
    if (type === 'hsl') {
      value = (color(value).hsl().round().string());
    } else if (type === 'rgb') {
      value = (color(value).rgb().string());
    } else if (type === 'hex') {
      value = (color(value).hex());
    }
  return value;
}

export default formatColor;