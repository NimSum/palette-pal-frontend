import React from 'react';
import Header from './index';
import { shallow } from 'enzyme';

describe('Header', () => {
  let wrapper;
  let instance;
  const mockLogUserOut = jest.fn();
  const mockLogUserIn = jest.fn();
  const mockSignUserUp = jest.fn();

  let localStorageMock = { getItem: () => false };
  Object.defineProperty(window, 'localStorage', { value: localStorageMock });
  

  beforeEach(() => {
    wrapper = shallow(< Header
      logUserOut={mockLogUserOut}
      logUserIn={mockLogUserIn}
      signUserUp={mockSignUserUp}
    />);
    instance = wrapper.instance();
  })
  
  it('should match component Header snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have the expected default state', () => {
    expect(wrapper.state()).toEqual({
      showLogin: false,
      showSignup: false
    })
  })

  it('should call logUserOut when the logout link is clicked', () => {
    localStorageMock = {
      getItem: () => JSON.stringify({ user_token: "hi there" })
    }

    Object.defineProperty(window, 'localStorage', { value: localStorageMock });
    
    wrapper = shallow(< Header
      logUserOut={mockLogUserOut}
      logUserIn={mockLogUserIn}
      signUserUp={mockSignUserUp}
    />);

    wrapper.find('.logout-link').simulate('click');

    expect(mockLogUserOut).toHaveBeenCalled();
  })

  it('should update state when the login link is clicked', () => {
    wrapper.find('.login-link').simulate('click');

    expect(wrapper.state()).toEqual({
      showLogin: true,
      showSignup: false
    })
  })

  it('should update state when the sign up link is clicked', () => {
    wrapper.find('.signup-link').simulate('click');

    expect(wrapper.state()).toEqual({
      showLogin: false,
      showSignup: true
    })
  })
})