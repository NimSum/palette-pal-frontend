import React from 'react';
import ErrorScreen from './index';
import { shallow } from 'enzyme';

describe('ErrorScreen', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(< ErrorScreen />);
  })
  
  it('shoud match component ErrorScreen snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
})