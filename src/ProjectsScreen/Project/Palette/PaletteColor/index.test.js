import React from 'react';
import PaletteColor from './index';
import { shallow } from 'enzyme';

describe('PaletteColor', () => {
  let wrapper;
  let instance;
  const mockUpdatePaletteData = jest.fn();

  beforeEach(() => {
    wrapper = shallow(< PaletteColor
      color={'#454545'}
      palette_id={3}
      palette_name={'test palette'}
      id={`color_1`}
      project_id={2}
      updatePaletteData={mockUpdatePaletteData}
      format={'hex'}
    />)

    instance = wrapper.instance();

  })
  
  it('shoud match component PaletteColor snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have the expected default state', () => {
    expect(wrapper.state()).toEqual({
      showPicker: false,
      update: ''
    })
  })

  it('should set the state property showPicker to true when the edit icon is clicked', () => {
    expect(wrapper.state('showPicker')).toEqual(false);

    wrapper.find('.fa-pencil-alt').simulate('click');

    expect(wrapper.state('showPicker')).toEqual(true);
  })

  it('should update the update property of state when handleChangeComplete is called', () => {
    expect(wrapper.state('update')).toEqual('');

    instance.handleChangeComplete({hex: '#343434'})

    expect(wrapper.state('update')).toEqual('#343434');
  })

  it('should call updatePaletteData and reset state to default when updateColor is called', () => {
    expect(wrapper.state('update')).toEqual('');
    instance.handleChangeComplete({ hex: '#343434' })
    expect(wrapper.state('update')).toEqual('#343434');

    instance.updateColor();

    expect(wrapper.state('update')).toEqual('');
    expect(mockUpdatePaletteData).toHaveBeenCalled();
  })
})