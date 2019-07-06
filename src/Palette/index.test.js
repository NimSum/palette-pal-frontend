import React from 'react';
import Palette from './index';
import { shallow } from 'enzyme';
import mockData from '../utils/mockData';

describe('Palette', () => {
  let wrapper;
  let mockPalette = mockData.mockPalettes[0];

  beforeEach(() => {
    wrapper = shallow(< Palette data={ mockPalette }/>);
  })
  it('shoud match component Palette snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
})