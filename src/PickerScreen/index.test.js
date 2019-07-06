import React from 'react';
import PickerScreen from './index';
import { shallow } from 'enzyme';


describe('PickerScreen', () => {
  const mockColors = {
    color_1: '#000000',
    color_2: '#000000',
    color_3: '#000000',
    color_4: '#000000',
    color_5: '#000000',
  }
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(< PickerScreen />);
  })
  
  it('shoud match component PickerScreen snapshot', () => {
    wrapper.setState({ colors: mockColors })
    expect(wrapper).toMatchSnapshot();
  });
})