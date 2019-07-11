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
  
  describe('updateProjectData', () => {
    const mockProject = mockData.mockCleanedProject;

    requests.postProject.mockImplementation(() => Promise.resolve(1))
    requests.deleteProject.mockImplementation(() => Promise.resolve('UPDATED'))
    requests.putProject.mockImplementation(() => Promise.resolve('UPDATED'))

    it("should trigger post request for 'add' action", async () => {
      instance.updateProjectData(mockProject, 'add');
      expect(requests.postProject).toHaveBeenCalledWith(mockProject);
    })

    it("should trigger delete request for 'delete' action", async () => {
      instance.updateProjectData(mockProject, 'delete');
      expect(requests.deleteProject).toHaveBeenCalledWith(mockProject.id);
    })

    it("should trigger put request for 'update' action", async () => {
      instance.updateProjectData(mockProject, 'update');
      expect(requests.putProject).toHaveBeenCalledWith(mockProject);
    })

    it("should setState error for failed requests", async () => {
      await instance.updateProjectData(mockProject, 'add');
      expect(wrapper.state().err).toEqual("Failed to Update");
    })
    
  })
 
  describe('updatePaletteData', () => {
    const mockPalette = mockData.mockPalettes[1];
    requests.postPalette.mockImplementation(() => Promise.resolve(1));
    requests.deletePalette.mockImplementation(() => Promise.resolve("DONE"));
    
    beforeEach(() => {
      wrapper.setState({ userData: [mockData.mockProjects[1]] })
    })
    it("should trigger post request for 'add' action", async () => {
      await instance.updatePaletteData(mockPalette, 'add');
      expect(requests.postPalette).toHaveBeenCalledWith(mockPalette)
    })

    it("should trigger delete request for 'delete' action", async () => {
      await instance.updatePaletteData(mockPalette, 'delete');
      expect(requests.deletePalette).toHaveBeenCalledWith(mockPalette.id)
    })

    it("should trigger put request for 'update' action", async () => {
      await instance.updatePaletteData(mockPalette, 'update');
      expect(requests.putPalette).toHaveBeenCalledWith(mockPalette)
    })

    it("should setState error if any requests fail", async () => {
      await instance.updatePaletteData(mockPalette, 'update');
      expect(wrapper.state().err).toEqual('Failed to Update')
    })
  })
})