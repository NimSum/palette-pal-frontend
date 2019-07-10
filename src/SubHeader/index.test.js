import React from 'react';
import SubHeader from './index';
import { shallow } from 'enzyme';
import mockData from '../utils/mockData';

describe('SubHeader', () => {
  let wrapper;
  let instance;
  const mockSetOption = jest.fn();
  const mockHandleClick = jest.fn();

  beforeEach(() => {
    wrapper = shallow(< SubHeader
      data={[mockData.mockCleanedProject]}
      setOption={mockSetOption}
      handleClick={mockHandleClick}
      title="Pick New Palette"
    />);

    instance = wrapper.instance();
    jest.spyOn(instance, 'handleChange');
  })
  
  it('should match component SubHeader snapshot when the title is Pick New Palette', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should match component SubHeader snapshot when the title is My Projects', () => {
    wrapper = shallow(< SubHeader
      data={[mockData.mockCleanedProject]}
      setOption={mockSetOption}
      title="My Projects"
    />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should have the expected default state', () => {
    expect(wrapper.state()).toEqual({
      format: 'hex',
      mode: 'random',
      project: ''
    })
  })

  it('should update state and call setOption when handleChange is called', () => {
    const mockEvent = { target: { name: 'mode', value: 'test value' } }

    expect(wrapper.state('mode')).toEqual('random');
    
    instance.handleChange(mockEvent);

    expect(wrapper.state('mode')).toEqual('test value');
    expect(mockSetOption).toHaveBeenCalledWith({ mode: 'test value'})
  })

  it('should invoke handleChange when the mode dropdown changes', () => {
    const mockEvent = { target: { name: 'mode', value: 'test value' } }

    expect(wrapper.state('mode')).toEqual('random');

    wrapper.find('.mode-dropdown').simulate('change', mockEvent)

    expect(wrapper.state('mode')).toEqual('test value');
  })

  it('should invoke handleChange when the project dropdown changes', () => {
    wrapper = shallow(< SubHeader
      data={[mockData.mockCleanedProject]}
      setOption={mockSetOption}
      title="My Projects"
    />);
    
    const mockEvent = { target: { name: 'project', value: 'test proj value' } }

    expect(wrapper.state('project')).toEqual('');

    wrapper.find('.project-dropdown').simulate('change', mockEvent)

    expect(wrapper.state('project')).toEqual('test proj value');
  })

  it('should invoke handleChange when the format dropdown changes', () => {
    const mockEvent = { target: { name: 'format', value: 'test format value' } }

    expect(wrapper.state('format')).toEqual('hex');

    wrapper.find('.format-dropdown').simulate('change', mockEvent)

    expect(wrapper.state('format')).toEqual('test format value');
  })

  it('should call handleClick from props when the subheader button is clicked', () => {
    wrapper.find('.subheader-btn').simulate('click');

    expect(mockHandleClick).toHaveBeenCalled();
  })
})