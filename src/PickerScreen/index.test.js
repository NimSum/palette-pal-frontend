import React from 'react';
import PickerScreen from './index';
import { shallow } from 'enzyme';
import mockData from '../utils/mockData';
jest.mock('../utils/colorFormatter');

describe('PickerScreen', () => {
  let wrapper;
  let instance;
  const mockUpdatePaletteData = jest.fn();
  const mockUpdateProjectData = jest.fn();
  const mockShowAcctDialog = jest.fn();
  window.addEventListener = jest.fn();
  window.removeEventListener = jest.fn();

  beforeEach(() => {
    wrapper = shallow(< PickerScreen
      data={[1, 2, 3]}
      updateProjectData={mockUpdateProjectData}
      updatePaletteData={mockUpdatePaletteData}
      showAcctDialog={mockShowAcctDialog}
      />,
      { disableLifecycleMethods: true });
    
    instance = wrapper.instance();

    jest.spyOn(instance, 'generateNewPalette');
    jest.spyOn(instance, 'toggleHold');
    jest.spyOn(instance, 'refreshUnheldColors');
    jest.spyOn(instance, 'closeDialog');
    jest.spyOn(instance, 'setPickerOption');
    jest.spyOn(instance, 'updateColor');
  })
  
  it('should match component PickerScreen snapshot', () => {
    wrapper.setState({ colors: mockData.justColors })
    expect(wrapper).toMatchSnapshot();
  });

  it('should have the expected default state', () => {
    expect(wrapper.state()).toEqual({
      colors: {
        color_1: '#fff',
        color_2: '#fff',
        color_3: '#fff',
        color_4: '#fff',
        color_5: '#fff'
      },
      held: [],
      showSaveDialog: false,
      format: 'hex',
      mode: 'random'
    })
  })

  it('should call generatePalette and add a window event listener on mount', () => {
    instance.componentDidMount();

    expect(instance.generateNewPalette).toHaveBeenCalled();

    expect(window.addEventListener).toHaveBeenCalled();
  })

  it('should call remove the window event listener when component unmounts', () => {
    instance.componentWillUnmount();

    expect(window.removeEventListener).toHaveBeenCalled();
  })

  it('should get a random hex code when getRandomColor is called', () => {
    const result = instance.getRandomColor();

    expect(typeof result).toEqual('string');
    expect(result.length).toEqual(7);
  })

  it('should update colors in state when getRandomPalette is called', () => {
    expect(wrapper.state('colors')).toEqual({
      color_1: '#fff',
      color_2: '#fff',
      color_3: '#fff',
      color_4: '#fff',
      color_5: '#fff'
    });

    instance.generateNewPalette();

    expect(wrapper.state('colors.color_1')).not.toBe('#fff');
  })

  it('should return an object with five new colors from state when getRandomPalette is called', () => {
    expect(wrapper.state('colors').color_1).toEqual('#fff');

    const result = instance.getRandomPalette();

    expect(result.color_1).not.toBe('#fff');
    expect(typeof result.color_1).toEqual('string');
    expect(result.color_1.length).toEqual(7);
  })

  it('should add or remove color to "held" in state when toggleHold is called based on whether it is already in there or not', () => {
    expect(wrapper.state('held')).toEqual([]);

    instance.toggleHold('#456542');

    expect(wrapper.state('held')).toEqual(['#456542']);

    instance.toggleHold('#778877');

    expect(wrapper.state('held')).toEqual(['#456542', '#778877']);

    instance.toggleHold('#456542');

    expect(wrapper.state('held')).toEqual(['#778877']);
  })

  it('should update colors not in "held" when refreshUnheldColors is called', () => {
    const mockEvent = { keyCode: 32 };
    instance.generateNewPalette();
    const color1 = wrapper.state('colors').color_1;
    const color2 = wrapper.state('colors').color_2;
    instance.toggleHold('color_1');

    expect(wrapper.state('held')).toEqual(['color_1']);

    instance.refreshUnheldColors(mockEvent);

    expect(wrapper.state('colors').color_1).toEqual(color1);
    expect(wrapper.state('colors').color_2).not.toBe(color2);
  })

  it('should update showSaveDialog in state to true when the save palette button is clicked and the user is logged in', () => {
    expect(wrapper.state('showSaveDialog')).toEqual(false);

    wrapper.find('.save-btn').simulate('click');

    expect(wrapper.state('showSaveDialog')).toEqual(true);
  })

  it('should update showSaveDialog in state to false when closeDialog is called', () => {
    wrapper.find('.save-btn').simulate('click');
    expect(wrapper.state('showSaveDialog')).toEqual(true);

    instance.closeDialog();

    expect(wrapper.state('showSaveDialog')).toEqual(false);
  })

  it('should update an option in state and call generateNewPalette if the option is mode when setPickerOption is called', () => {
    expect(wrapper.state('mode')).toEqual('random');
    instance.setPickerOption({ mode: 'test' });

    expect(wrapper.state('mode')).toEqual('test');
    expect(instance.generateNewPalette).toHaveBeenCalled();
  })

  it('should update a color in state when updateColor is called', () => {
    expect(wrapper.state('colors').color_1).toEqual('#fff');

    instance.updateColor('#000000', 'color_1');

    expect(wrapper.state('colors').color_1).toEqual('#000000');
  })
  
})