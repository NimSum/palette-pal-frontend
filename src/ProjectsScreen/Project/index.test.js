import React from 'react';
import Project from './index';
import { shallow } from 'enzyme';
import mockData from '../utils/mockData';

describe('Project', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(< Project data={ mockData.mockCleanedProject }/>);
  })
  
  it('shoud match component Project snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
})