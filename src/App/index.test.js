import React from 'react';
import App from './index';
import { shallow } from 'enzyme';

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
    expect(wrapper.state()).toEqual({
      authorized: false,
      projectData: [],
      userData: [],
      loading: false,
      err: '',
      showAcctDialog: false
    })
  })

})