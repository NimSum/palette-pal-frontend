import React from 'react';
import Header from './index';
import { shallow } from 'enzyme';

describe('Header', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(< Header />);
  })
  it('shoud match component Header snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
})