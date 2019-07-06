import React from 'react';
import Dialog from './index';
import { shallow } from 'enzyme';

describe('Dialog', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(< Dialog />);
  })
  it('shoud match component Dialog snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
})