let rgb2hex = (r, g, b) => "#" + [r, g, b].map(x => Math.round(x * 255).toString(16).padStart(2, 0)).join('');

let rgbStr2Hex = (rgbStr) => rgbStr && '#' + rgbStr.slice(4, -1).split(',').map(x => (+x).toString(16).padStart(2, '0')).join('');

const hsl2rgb = hslStr => {
  const values = hslStr.split(',');
  const h = +values[0].split('(')[1].trim();
  const s = +values[1].split('%')[0].trim();
  const l = +values[2].split('%')[0].trim();

  const a = s * Math.min(l, 1 - l);
  const f = (n, k = (n + h / 30) % 12) => l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  return [f(0), f(8), f(4)];
} 

const colorContraster = color => {
  // if (color.includes('rgb')) {
  //   color = rgbStr2Hex(color);
  // } else if (color.includes('hsl')) {
  //   color = rgb2hex(...hsl2rgb(color))
  // }

  color = color.replace("#", "");
  var r = parseInt(color.substr(0, 2), 16);
  var g = parseInt(color.substr(2, 2), 16);
  var b = parseInt(color.substr(4, 2), 16);
  var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return (yiq >= 128) ? 'black' : 'white';
}

export default colorContraster;