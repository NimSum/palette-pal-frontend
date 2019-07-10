import React from 'react';
import App from './index';
import { shallow, mount } from 'enzyme';
import requests from '../utils/apiRequests';
import mockData from '../utils/mockData';
import cleanCombinedData from '../utils/cleaners';

jest.mock('../utils/apiRequests');
jest.mock('../utils/cleaners');

requests.postNewUser.mockImplementation(() => 
  Promise.resolve(1));
requests.getDetailedProjects.mockImplementation(() => 
  Promise.resolve(mockData.mockDetailedProjects));
requests.loginUser.mockImplementation(() => 
  Promise.resolve({ token: 'VALID TOKEN', projects: mockData.mockDetailedProjects }))
cleanCombinedData.mockImplementation(() => mockData.mockCleanedProject);

describe('App', () => {
  let wrapper;
  let instance;

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

  it('should have the expected default state', () => {
    const defaultUserData = [];
    wrapper.setState({ userData: defaultUserData });
    expect(wrapper.state()).toEqual({
      authorized: false,
      projectData: [],
      userData: [],
      loading: false,
      err: '',
      showAcctDialog: false
    })
  })

  describe('User Validation', () => {
    let localStorageMock = { 
      getItem: () => JSON.stringify('true'),
      setItem: jest.fn()
    };
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });
    
    it('should checkForLogin', async () => {
      await instance.checkForLogin();
      expect(instance.state.userData).toEqual(mockData.mockCleanedProject)
    })
  
    it('should logUserIn', async () => {
      const mockUser = {
        "email": "nimsum@nim.com",
        "password": "nimsum"
      };
      const expectedKey = 'user_token';
      const expectedToken = { token: "VALID TOKEN" };

      const result = await instance.logUserIn(mockUser);
      expect(result.token).toEqual(expectedToken.token);
      expect(localStorageMock.setItem).toHaveBeenCalledWith(expectedKey, JSON.stringify("VALID TOKEN"));
    })

    it('should signUserUp', async () => {
      const mockNewUser = {
        "email": "nimsum@nim.com",
        "password": "nimsum",
        "user_name": "nim"
      };

      await instance.signUserUp(mockNewUser);
      expect(requests.postNewUser).toHaveBeenCalledWith(mockNewUser);
    })

    it('should logUserOut', async () => {
      await instance.logUserOut();
      expect(localStorageMock.setItem).toHaveBeenCalledWith('user_token', "\"\"")
      expect(wrapper.state().userData).toEqual([]);
    })
  })
  
  describe.skip('updateProjectData', () => {
    const mockProject = mockData.mockProjects[1];

    it("should trigger post request for 'add' action", async () => {

    })

    it("should trigger delete request for 'delete' action", async () => {

    })

    it("should trigger put request for 'update' action", async () => {

    })

    it("should setState new userData after after api requests completion", async () => {

    })
    
  })
 
  describe.skip('updatePaletteData', () => {
    const mockPalette = mockData.mockPalettes[1];

    it("should trigger post request for 'add' action", async () => {

    })

    it("should trigger delete request for 'delete' action", async () => {

    })

    it("should trigger put request for 'update' action", async () => {

    })

    it("should setState new userData after after api requests completion", async () => {

    })
  })
})