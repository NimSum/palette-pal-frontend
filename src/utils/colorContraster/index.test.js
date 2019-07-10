import colorContraster from './index';

describe('colorContraster', () => {
  it('should return white for dark colors passed', () => {
    const darkColor = '#3E107C';
    const result = colorContraster(darkColor);
    expect(result).toEqual('white');
  })

  it('should rturn black for light colors passed', () => {
    const lightColor = '#BDFCE7';
    const result = colorContraster(lightColor);
    expect(result).toEqual('black');
  })
})