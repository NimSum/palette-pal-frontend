import React from 'react';
import ProjectScreen from './index';
import { shallow } from 'enzyme';
import mockData from '../utils/mockData';

const mockUpdatePaletteData = jest.fn();
const mockUpdateProjectData = jest.fn();

describe('ProjectScreen', () => {
  let wrapper;
  let instance;

  beforeEach(() => {
    wrapper = shallow(< ProjectScreen
      data={[mockData.mockCleanedProject]}
      updateProjectData={mockUpdateProjectData}
      updatePaletteData={mockUpdatePaletteData}
    />);

    instance = wrapper.instance();

    jest.spyOn(instance, 'closeDialog');
    jest.spyOn(instance, 'showDialog');
    jest.spyOn(instance, 'setProjectOption');
  })
  
  it('should match component ProjectScreen snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have the expected default state', () => {
    expect(wrapper.state()).toEqual({
      showDialog: false,
      filter: '',
      format: 'hex',
      project: ''
    })
  })

  it('should set the showDialog property in state to true when showDialog is called', () => {
    expect(wrapper.state('showDialog')).toEqual(false);

    instance.showDialog();

    expect(wrapper.state('showDialog')).toEqual(true);
  })

  it('should set the showDialog property in state to false when closeDialog is called', () => {
    instance.showDialog();
    expect(wrapper.state('showDialog')).toEqual(true);

    instance.closeDialog();

    expect(wrapper.state('showDialog')).toEqual(false);
  })

  it('should set the project property in state to false when setProjectOption is called', () => {
    expect(wrapper.state('project')).toEqual('');

    instance.setProjectOption('test project');

    expect(wrapper.state('project')).toEqual('test project');
  })
})