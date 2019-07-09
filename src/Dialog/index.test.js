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
      type="newPalette"
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
      palette_name: '',
      project_name: '',
      project_id: '',
      username: '',
      password: '',
      email: ''
    })
  })

  it('should update the project_name state when handleChange is invoked and the new project input has a value', () => {
    const mockEvent = { target: { name: 'project_name', value: 'test' } }
    expect(wrapper.state('project_name')).toEqual('');

    instance.handleChange(mockEvent);

    expect(wrapper.state('project_name')).toEqual('test');
  });

  it('should update the palette_name state when handleChange is invoked and the palette name input has a value', () => {
    const mockEvent = { target: { name: 'palette_name', value: 'test' } }

    expect(wrapper.state('palette_name')).toEqual('');

    instance.handleChange(mockEvent);

    expect(wrapper.state('palette_name')).toEqual('test');
  });

  it('should update the project_id state when handleChange is invoked when the project dropdown changes', () => {
    const mockEvent = { target: { name: 'project_id', value: 3 } }

    expect(wrapper.state('project_id')).toEqual('');

    instance.handleChange(mockEvent);

    expect(wrapper.state('project_id')).toEqual(3);
  });

  it('should call handleChange method when the new item name input field\'s value changes', () => {
    jest.spyOn(instance, 'handleChange');
    const mockEvent = { target: { name: 'palette_name', value: 'called' } }

    expect(wrapper.state('palette_name')).toEqual('');

    wrapper.find('.name-input').simulate('change', mockEvent);

    expect(wrapper.state('palette_name')).toEqual('called');
  })

  it('should call handleChange method when the select field for project changes', () => {
    const mockEvent = { target: { name: 'project_id', value: 5 } }
    jest.spyOn(instance, 'handleChange');

    expect(wrapper.state('project_id')).toEqual('');

    wrapper.find('.existing-project').simulate('change', mockEvent);

    expect(wrapper.state('project_id')).toEqual(5);
  })

  it('should call handleChange method when the input for a new project name changes', () => {
    const mockEvent = { target: { name: 'project_name', value: 'howdy' } }
    jest.spyOn(instance, 'handleChange');

    expect(wrapper.state('project_name')).toEqual('');

    wrapper.find('.new-project-name').simulate('change', mockEvent);

    expect(wrapper.state('project_name')).toEqual('howdy');
  })

  it('should call the closeDialog method when the cancel button is clicked', () => {
    wrapper.find('.cancel-btn').simulate('click');

    expect(mockCloseDialog).toHaveBeenCalled();
  })

  it('should call the closeDialog method when the close button is clicked', () => {
    wrapper.find('.fa-times').simulate('click');

    expect(mockCloseDialog).toHaveBeenCalled();
  })

  it('should reset the default state when handleClick is called', async () => {
    const mockEvent = { target: { name: 'project_name', value: 'howdy' } }
    jest.spyOn(instance, 'handleClick');
    jest.spyOn(instance, 'handleChange');

    expect(wrapper.state('project_name')).toEqual('');

    wrapper.find('.new-project-name').simulate('change', mockEvent);
    expect(wrapper.state('project_name')).toEqual('howdy');

    await wrapper.find('.save-btn').simulate('click');

    await expect(wrapper.state('project_name')).toEqual('');
  })

  it('should call handleClick method when the user hits the save button', () => {
    jest.spyOn(instance, 'handleClick');
    jest.spyOn(instance, 'handleChange');

    expect(wrapper.state('project_name')).toEqual('');

    wrapper.find('.save-btn').simulate('click');

    expect(wrapper.state('project_name')).toEqual('');
  })

  it('should call the primaryAction method when handleClick is invoked', () => {
    jest.spyOn(instance, 'handleClick');

    instance.handleClick();

    expect(mockPrimaryAction).toHaveBeenCalled();
  })

  it('should call the updateProjectData method when handleClick is invoked if the dialog is for saving a new palette and there is a value in state for project_name', async () => {
    const mockEvent = { target: { name: 'project_name', value: 'howdy' } }
    jest.spyOn(instance, 'handleClick');
    jest.spyOn(instance, 'handleChange');

    wrapper.find('.new-project-name').simulate('change', mockEvent);

    expect(wrapper.state('project_name')).toEqual('howdy');

    await wrapper.find('.save-btn').simulate('click');

    await expect(mockUpdateProjectData).toHaveBeenCalled();
  })

})