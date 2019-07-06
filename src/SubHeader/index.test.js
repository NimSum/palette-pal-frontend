import React from 'react';
import SubHeader from './index';
import { shallow } from 'enzyme';
import mockData from '../utils/mockData';

describe('SubHeader', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(< SubHeader data={[ mockData.mockCleanedProject ]}/>);
  })
  
  it('shoud match component SubHeader snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
})