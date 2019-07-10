import React from 'react';
import Palette from './index';
import { shallow } from 'enzyme';
import mockData from '../../../utils/mockData';

describe('Palette', () => {
  let wrapper;
  let instance;
  let mockPalette = mockData.mockPalettes[0];
  const mockUpdatePaletteData = jest.fn();

  beforeEach(() => {
    wrapper = shallow(<Palette
      data={mockPalette}
      format={'hex'}
      projectID={12}
      updatePaletteData={mockUpdatePaletteData}
    />);
    instance = wrapper.instance();
  })
  
  it('should match component Palette snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call updatePaletteData when the delete icon is clicked', () => {
    wrapper.find('.fa-times-circle').simulate('click');
    
    expect(mockUpdatePaletteData).toHaveBeenCalled();
  })

  it('should call updatePaletteData when a content editable field focus is left', () => {
    const mockEvent = { target: { }, preventDefault: jest.fn(), keyCode: 13 }
    wrapper.find('.palette-title').simulate('blur', mockEvent);

    expect(mockUpdatePaletteData).toHaveBeenCalled();
  })

  it('should call updatePaletteData when a content editable field is in focus and the delete key is pressed', () => {
    const mockEvent = { target: { }, preventDefault: jest.fn(), keyCode: 13 }

    wrapper.find('.palette-title').simulate('keydown', mockEvent);

    expect(mockUpdatePaletteData).toHaveBeenCalled();
  })
})