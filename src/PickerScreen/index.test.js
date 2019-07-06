import React from 'react';
import PickerScreen from './index';
import { shallow } from 'enzyme';
import mockData from '../utils/mockData';

describe('PickerScreen', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(< PickerScreen />);
  })
  
  it('shoud match component PickerScreen snapshot', () => {
    wrapper.setState({ colors: mockData.justColors })
    expect(wrapper).toMatchSnapshot();
  });
})