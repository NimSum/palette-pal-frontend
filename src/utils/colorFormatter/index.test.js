import colorFormatter from './index';

describe('colorFormatter', () => {
  it('should format hex to hsl', () => {
    const hex = '#2F2EB5';
    const output = colorFormatter(hex, 'hsl');
    const expected = "hsl(240, 59%, 45%)";
    expect(output).toEqual(expected);
  })

  it('should format hex to rgb', () => {

  })

  it('should format hsl to hex', () => {

  })

  it('should format rgb to hex', () => {

  })

  it('should format hsl to rgb', () => {

  })

  it('should format rgb to hsl', () => {

  })
})