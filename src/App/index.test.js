import React from 'react';
import App from './index';
import { shallow } from 'enzyme';

describe('App', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(< App />);
  })
  it('shoud match component snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
})