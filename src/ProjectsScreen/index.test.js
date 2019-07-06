import React from 'react';
import ProjectScreen from './index';
import { shallow } from 'enzyme';
import mockData from '../utils/mockData';

describe('ProjectScreen', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(< ProjectScreen data={[ mockData.mockCleanedProject ]}/>);
  })
  
  it('shoud match component ProjectScreen snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
})