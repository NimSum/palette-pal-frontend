import requests from './index'; 
import { checkStatus, urls, fetchAnything, deleteAnything, sendAnything } from './index';
import mockData from '../../utils/mockData';

var localStorageMock = (function() {
  return {
    getItem: function(key) {
      return JSON.stringify(mockData.nimsumsToken);
    }
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('Requests', () => {
  const response = { 
    message: 'Success!'
  };
  const jsonHeader = {
    "headers": {"Content-Type": "application/json"}
  };
  const tokenHeader = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${mockData.nimsumsToken}`
    }
  }
  window.fetch = jest.fn().mockImplementation(() => {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve(response),
      status: 202
    })
  })

  describe('fetchAnything', () => {

    it("should respond with with json'd response", async () => {
      const result = await fetchAnything(urls.palettes);
      expect(result).toEqual(response);
    })
  
    it('should fetch anything with using correct params and header', () => {
      fetchAnything(urls.palettes);
      expect(window.fetch).toHaveBeenCalledWith(urls.palettes, jsonHeader);
    })
  
    it('should fetch anything with correct params if token is required', () => {
      fetchAnything(urls.palettes, true);
      expect(window.fetch).toHaveBeenCalledWith(urls.palettes, tokenHeader);
    })
  })

  describe('deleteAnything', () => {
    const deleteHeader = {...jsonHeader, method: "DELETE" }

    it('should delete using correct params', () => {
      const deleteUrl = `${urls.palettes}/1`;
      deleteAnything(deleteUrl);
      expect(window.fetch).toHaveBeenCalledWith(deleteUrl, deleteHeader)
    })
    
    it("should delete with token if token is required", async () => {
      const deleteUrl = `${urls.palettes}/1`;
      const withToken = {...tokenHeader, method: "DELETE"}
      deleteAnything(deleteUrl, true);
      expect(window.fetch).toHaveBeenCalledWith(deleteUrl, withToken)
    })

    it("should respond with success status object on valid request", async () => {
      const deleteUrl = `${urls.palettes}/1`;
      const result = await deleteAnything(deleteUrl);
      expect(result).toEqual(202);
    })

    
  })
  
})