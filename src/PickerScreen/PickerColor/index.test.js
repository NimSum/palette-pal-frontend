import React from 'react';
import PickerColor from './index';
import { shallow } from 'enzyme';
import colorContraster from '../../utils/colorContraster';
jest.mock('../../utils/colorContraster')

describe('PickerColor', () => {
  let wrapper;
  let instance;
  const mockUpdateColor = jest.fn();
  const mockToggleHold = jest.fn();

  beforeEach(() => {
    wrapper = shallow(< PickerColor
      id={55}
      updateColor={mockUpdateColor}
      toggleHold={mockToggleHold}
      held={false}
      color={'#564789'}
      format='hex'
    />);
    instance = wrapper.instance();
  })
  
  it('should match component PickerColor snapshot when the color is not held', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should match component PickerColor snapshot when the color is  held', () => {
    wrapper = shallow(< PickerColor
      id={55}
      updateColor={mockUpdateColor}
      toggleHold={mockToggleHold}
      held={true}
      color={'#564789'}
      format='hex'
    />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should have the expected default state', () => {
    expect(wrapper.state()).toEqual({
      showPicker: false,
      update: ''
    })
  })

  it('should update the update property in state when handleChangeComplete is called', () => {
    expect(wrapper.state('update')).toEqual('');

    instance.handleChangeComplete({hex: '#456456'});

    expect(wrapper.state('update')).toEqual('#456456');
  })

  it('should call updateColor and update state when updatePickerColor is called', () => {
    expect(wrapper.state()).toEqual({
      showPicker: false,
      update: ''
    })

    instance.updatePickerColor('#444444', 'color_1');

    expect(mockUpdateColor).toHaveBeenCalled();
    expect(wrapper.state()).toEqual({
      showPicker: false,
      update: ''
    })
  })

  it('should toggle the showPicker state property when the edit icon is clicked', () => {
    expect(wrapper.state('showPicker')).toEqual(false);

    wrapper.find('.fa-pencil-alt').simulate('click');

    expect(wrapper.state('showPicker')).toEqual(true);

    wrapper.find('.fa-pencil-alt').simulate('click');

    expect(wrapper.state('showPicker')).toEqual(false);
  })

  it('should call toggleHold when the hold icon is clicked', () => {
    wrapper.find('.picker-hold').simulate('click');

    expect(mockToggleHold).toHaveBeenCalled();
  })
})