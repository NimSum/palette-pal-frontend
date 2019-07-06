import React from 'react';
import SubHeader from './index';
import { shallow } from 'enzyme';

describe('SubHeader', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(< SubHeader />);
  })
  
  it('shoud match component SubHeader snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
})