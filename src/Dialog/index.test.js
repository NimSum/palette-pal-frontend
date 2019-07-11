import React from 'react';
import Dialog from './index';
import { shallow } from 'enzyme';

describe('Dialog', () => {
  let wrapper;
  let instance;
  window.addEventListener = jest.fn();
  window.removeEventListener = jest.fn();
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

    jest.spyOn(instance, 'sendFormData');
    jest.spyOn(instance, 'getPaletteFields');
    jest.spyOn(instance, 'handleChange');
    jest.spyOn(instance, 'handleClick');
    jest.spyOn(instance, 'conveyResult');
    jest.spyOn(instance, 'setDefaultProjectOption');
  })

  it('should match component Dialog snapshot when the dialog is for saving a new palette', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should match component Dialog snapshot when the dialog is for saving a new project', () => {
    wrapper = shallow(<Dialog
      title="Create New Project"
      type="newProject"
      closeDialog={mockCloseDialog}
      primaryAction={mockPrimaryAction}
    />, { disableLifecycleMethods: true });

    expect(wrapper).toMatchSnapshot();
  });

  it('should match component Dialog snapshot when the dialog is for logging a user in', () => {
    wrapper = shallow(<Dialog
      title="Login"
      type="login"
      closeDialog={mockCloseDialog}
      primaryAction={mockPrimaryAction}
    />, { disableLifecycleMethods: true });

    expect(wrapper).toMatchSnapshot();
  });

  it('should match component Dialog snapshot when the dialog is for signing a user in', () => {
    wrapper = shallow(<Dialog
      title="Sign In"
      type="signin"
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
      user_name: '',
      password: '',
      email: '',
      showConf: false,
      error: ''
    })
  })

  it('should remove a window event listnener and call setDefaultProjectOption on mount', () => {
    instance.componentDidMount();

    expect(instance.setDefaultProjectOption).toHaveBeenCalled();

    expect(window.removeEventListener).toHaveBeenCalled();
  })

  it('should set a window event listnener when it unmounts', () => {
    instance.componentWillUnmount();

    expect(window.addEventListener).toHaveBeenCalled();
  })

  it('should update project_id in state when setDefaultProjectOoption is called', () => {
    expect(wrapper.state('project_id')).toEqual('');

    wrapper.data = [{id: 1}]

    instance.setDefaultProjectOption();

    expect(wrapper.state('project_id')).toEqual(1);
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

    setTimeout(() => expect(wrapper.state('project_name')).toEqual(''), 1000);
  })

  it('should call handleClick method when the user hits the save button', () => {
    jest.spyOn(instance, 'handleClick');
    jest.spyOn(instance, 'handleChange');

    expect(wrapper.state('error')).toEqual('');

    wrapper.find('.save-btn').simulate('click');

    expect(wrapper.state('error')).not.toBe('');
  })

  it('should call the primaryAction method when sendFormData is invoked', () => {
    instance.sendFormData();

    expect(mockPrimaryAction).toHaveBeenCalled();
  })

  it('should call the sendFormData method when handleClick is invoked and all required fields are filled', async () => {
    const mockEvent1 = { target: { name: 'palette_name', value: 'test pal' } }
    const mockEvent2 = { target: { name: 'project_name', value: 'test proj' } }

    wrapper.find('.name-input').simulate('change', mockEvent1);
    wrapper.find('.new-project-name').simulate('change', mockEvent2);

    expect(wrapper.state('palette_name')).toEqual('test pal');
    expect(wrapper.state('project_name')).toEqual('test proj');

    await wrapper.find('.save-btn').simulate('click');

    await expect(instance.sendFormData).toHaveBeenCalled();
  })

})