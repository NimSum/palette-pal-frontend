import React from 'react';
import Dialog from './index';
import { shallow } from 'enzyme';

describe('Dialog', () => {
  let wrapper;
  let instance;
  const mockCloseDialog = jest.fn();
  const mockRefreshUnheldColors = jest.fn();
  const mockUpdateProjectData = jest.fn();
  const mockPrimaryAction = jest.fn();
  const mockColors = [
    '#ffffff',
    '#000000',
    '#232323',
    '#454545',
    '#765456'
  ]
  const mockData = [{
    id: 1,
    name: "Uncategorized",
    palettes: [
      {
        name: 'Bob',
        id: 3,
        colors: {
          color_1: '#ffffff',
          color_2: '#000000',
          color_3: '#232323',
          color_4: '#454545',
          color_5: '#765456'
        }
      }
    ]
  }]

  beforeEach(() => {
    wrapper = shallow(<Dialog
      title="Save New Palette"
      closeDialog={mockCloseDialog}
      refreshUnheldColors={mockRefreshUnheldColors}
      updateProjectData={mockUpdateProjectData}
      primaryAction={mockPrimaryAction}
      colors={mockColors}
      data={mockData}
    />, { disableLifecycleMethods: true });

    instance = wrapper.instance();

    jest.spyOn(instance, 'getPaletteFields');
    jest.spyOn(instance, 'handleChange');
    jest.spyOn(instance, 'handleClick');
  })

  it('should match component Dialog snapshot when the dialog is for saving a new palette', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should match component Dialog snapshot when the dialog is for saving a new project', () => {
    wrapper = shallow(<Dialog
      title="Create New Project"
      closeDialog={mockCloseDialog}
      primaryAction={mockPrimaryAction}
    />, { disableLifecycleMethods: true });

    expect(wrapper).toMatchSnapshot();
  });

  it('should have the expected default state', () => {
    expect(wrapper.state()).toEqual({
      paletteName: '',
      projectName: '',
      projectID: 1,
      newProject: ''
    })
  })

  it('should update the newProject state when handleChange is invoked and the new project input has a value', () => {
    const mockEvent = { target: { name: 'newProject', value: 'test' } }
    expect(wrapper.state('newProject')).toEqual('');

    instance.handleChange(mockEvent);

    expect(wrapper.state('newProject')).toEqual('test');
  });

  it('should update the paletteName state when handleChange is invoked and the palette name input has a value', () => {
    const mockEvent = { target: { name: 'paletteName', value: 'test' } }

    expect(wrapper.state('paletteName')).toEqual('');

    instance.handleChange(mockEvent);

    expect(wrapper.state('paletteName')).toEqual('test');
  });

  it('should update the projectID state when handleChange is invoked when the project dropdown changes', () => {
    const mockEvent = { target: { name: 'projectID', value: 3 } }

    expect(wrapper.state('projectID')).toEqual(1);

    instance.handleChange(mockEvent);

    expect(wrapper.state('projectID')).toEqual(3);
  });

  it('should call handleChange method when the new item name input field\'s value changes', () => {
    jest.spyOn(instance, 'handleChange');
    const mockEvent = { target: { name: 'paletteName', value: 'called' } }

    expect(wrapper.state('paletteName')).toEqual('');

    wrapper.find('.name-input').simulate('change', mockEvent);

    expect(wrapper.state('paletteName')).toEqual('called');
  })

  it('should call handleChange method when the select field for project changes', () => {
    const mockEvent = { target: { name: 'projectID', value: 5 } }
    jest.spyOn(instance, 'handleChange');

    expect(wrapper.state('projectID')).toEqual(1);

    wrapper.find('.existing-project').simulate('change', mockEvent);

    expect(wrapper.state('projectID')).toEqual(5);
  })

  it('should call handleChange method when the input for a new project name changes', () => {
    const mockEvent = { target: { name: 'newProject', value: 'howdy' } }
    jest.spyOn(instance, 'handleChange');

    expect(wrapper.state('newProject')).toEqual('');

    wrapper.find('.new-project-name').simulate('change', mockEvent);

    expect(wrapper.state('newProject')).toEqual('howdy');
  })

  it('should reset the default state when handleClick is called', async () => {
    const mockEvent = { target: { name: 'newProject', value: 'howdy' } }
    jest.spyOn(instance, 'handleClick');
    jest.spyOn(instance, 'handleChange');

    expect(wrapper.state('newProject')).toEqual('');

    wrapper.find('.new-project-name').simulate('change', mockEvent);
    expect(wrapper.state('newProject')).toEqual('howdy');
    await wrapper.find('.save-btn').simulate('click');

    await expect(wrapper.state('newProject')).toEqual('');
  })

  it('should call handleClick method when the user hits the save button', () => {
    jest.spyOn(instance, 'handleClick');
    jest.spyOn(instance, 'handleChange');

    expect(wrapper.state('newProject')).toEqual('');

    wrapper.find('.save-btn').simulate('click');

    expect(wrapper.state('newProject')).toEqual('');
  })

  it('should call the primaryAction method when handleClick is invoked', () => {
    jest.spyOn(instance, 'handleClick');

    expect(instance.primaryAction).toHaveBeenCalled();
  })

  it('should call the updateProjectData method when handleClick is invoked if the dialog is for saving a new palette and there is a value in state for newProject', () => {
    const mockEvent = { target: { name: 'newProject', value: 'howdy' } }
    jest.spyOn(instance, 'handleClick');
    jest.spyOn(instance, 'handleChange');

    wrapper.find('.new-project-name').simulate('change', mockEvent);

    expect(wrapper.state('newProject')).toEqual('howdy');

    wrapper.find('.save-btn').simulate('click');

    expect(instance.updateProjectData).toHaveBeenCalled();
  })

})