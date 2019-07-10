// import * as requests from './index'; 
import requests from './index';
import { checkStatus, isTokenRequired, urls, fetchAnything, deleteAnything, sendAnything } from './index';
import mockData from '../../utils/mockData';
import * as all from './index';

var localStorageMock = (function() {
  return {
    getItem: function(key) {
      return JSON.stringify(mockData.nimsumsToken);
    }
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('Requests', () => {
  let mockStatus = 202;
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
      status: mockStatus
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
    
    it("should delete with token if token is required", () => {
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

  describe('sendAnything', () => {

    const projectsUrl = urls.projects;
    const mockPayload = {
      project_name: "NIM'S NEW PROJECT"
    };
    const method = "POST";

    it('should send request using correct params', () => {
      sendAnything(projectsUrl, mockPayload, method);
      const expected = {
        method,
        headers: jsonHeader.headers,
        body: JSON.stringify(mockPayload)
      };
      expect(window.fetch).toHaveBeenCalledWith(projectsUrl, expected)
    })
    
    it("should post with token in headers if token is required", () => {
      sendAnything(projectsUrl, mockPayload, method, true);
      const expected = {
        method,
        headers: tokenHeader.headers,
        body: JSON.stringify(mockPayload)
      };
      expect(window.fetch).toHaveBeenCalledWith(projectsUrl, expected)
    })

    it("should respond with success status if response status is 202", async () => {
      const result = await sendAnything(projectsUrl, mockPayload, method, true);
      expect(result).toEqual(202);
    })

    it("should respond with success status object on valid request", async () => {
      mockStatus = 200;
      const result = await sendAnything(projectsUrl, mockPayload, method, true);
      
      expect(result).toEqual(response);
      mockStatus = 202;
    })
  })
  
  describe('isTokenRequired', () => {
    it('should only return content type header if param false', () => {
      const result = isTokenRequired(false);
      expect(result).toEqual(jsonHeader.headers);
    })

    it('should return content type and auth token if param true', () => {
      const result = isTokenRequired(true);
      expect(result).toEqual(tokenHeader.headers);
    })
  })

  describe('checkStatus', () => {
    it('should respond with an error if response is not okay', async () => {
      const mockResponse = {
        ok: false
      }
      expect(() => checkStatus(mockResponse)).toThrow(Error('Request failed'));
    })
  })

  describe('Request Methods', () => {
    // jest.spyOn(all, 'fetchAnything');

    it('getDetailedProjects: should call fetchAnything with the correct params', async () => {
      const expected = await requests.getDetailedProjects();
      expect(expected).toEqual(response);
    })

    it('getProjects: should call fetchAnything with the correct params', async () => {
      const expected = await requests.getProjects();
      expect(expected).toEqual(response);
    })

    it('getSingleProject: should call fetchAnything with the correct params', async () => {
      const expected = await requests.getProjects(1);
      expect(expected).toEqual(response);
    })

    it('getPalettes: should call fetchAnything with the correct params', async () => {
      const expected = await requests.getPalettes();
      expect(expected).toEqual(response);
    })

    it('getSinglePalettes: should call fetchAnything with the correct params', async () => {
      const expected = await requests.getPalettes(1);
      expect(expected).toEqual(response);
    })

    
    // deleteAnything.mockImplementation(() => {});
    // sendAnything.mockImplementation(() => {});
    
  })
  
})