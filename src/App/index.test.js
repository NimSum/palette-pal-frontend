import React from 'react';
import App from './index';
import { shallow } from 'enzyme';
import requests from '../utils/apiRequests';
import mockData from '../utils/mockData';
import cleanCombinedData from '../utils/cleaners';

jest.mock('../utils/apiRequests');
jest.mock('../utils/cleaners');

requests.getDetailedProjects.mockImplementation((() => 
  Promise.resolve(mockData.mockDetailedProjects)
  ));
cleanCombinedData.mockImplementation(() => mockData.mockCleanedProject);

describe('App', () => {
  let wrapper;
  let instance;
  
  let localStorageMock = { 
    getItem: () => JSON.stringify('true')
  };
  Object.defineProperty(window, 'localStorage', { value: localStorageMock });

  beforeEach(() => {
    wrapper = shallow(<App />);
    instance = wrapper.instance();

    jest.spyOn(instance, 'checkForLogin');
  })

  it('should match component App snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call checkForLogin method when it mounts', () => {
    instance.componentDidMount();

    expect(instance.checkForLogin).toHaveBeenCalled()
  })

  it.skip('should have the expected default state', () => {
    expect(wrapper.state()).toEqual({
      authorized: false,
      projectData: [],
      userData: [],
      loading: false,
      err: '',
      showAcctDialog: false
    })
  })

  it('should checkForLogin', async () => {
    await instance.checkForLogin();
    expect(instance.state.userData).toEqual(mockData.mockCleanedProject)
  })

 

})