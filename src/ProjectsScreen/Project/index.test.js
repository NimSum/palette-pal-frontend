import React from 'react';
import Project from './index';
import { shallow } from 'enzyme';
import mockData from '../../utils/mockData';

describe('Project', () => {
  let wrapper;
  const mockUpdatePaletteData = jest.fn();
  const mockUpdateProjectData = jest.fn();

  beforeEach(() => {
    wrapper = shallow(<Project
      data={mockData.mockCleanedProject}
      updateProjectData={mockUpdateProjectData}
      updatePaletteData={mockUpdatePaletteData}
    />);
  })
  
  it('should match component Project snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call updateProjectData when focus is left on the title field', () => {
    const mockEvent = { target: { textContent: 'test text' } }
    
    wrapper.find('.project-title').simulate('blur', mockEvent);

    expect(mockUpdateProjectData).toHaveBeenCalledWith({project_name: 'test text', id: 2}, 'update');
  })

  it('should call updateProjectData when the enter key is pressed on the title field', () => {
    const mockEvent = { target: { textContent: 'test text' }, keyCode: 13, preventDefault: jest.fn() }

    wrapper.find('.project-title').simulate('blur', mockEvent);

    expect(mockUpdateProjectData).toHaveBeenCalledWith({ project_name: 'test text', id: 2 }, 'update');
  })

  it('should call updateProjectData when the trash icon is clicked', () => {
    wrapper.find('.fa-trash').simulate('click');

    expect(mockUpdateProjectData).toHaveBeenCalledWith(mockData.mockCleanedProject, 'delete');
  })
})