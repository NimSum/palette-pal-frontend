import React from 'react';
import PickerColor from './index';
import { shallow } from 'enzyme';

describe('PickerColor', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(< PickerColor />);
  })
  
  it('should match component PickerColor snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
})