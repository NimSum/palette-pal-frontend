import cleanCombinedData from './index';
import mockData from '../mockData';

describe('cleanCombinedData', () => {
  it('should clean projects with palettes', () => {
    const output = cleanCombinedData(mockData.mockDetailedProjects);

    const expected = [{
        "id": 1,
        "name": "Project ONE",
        "palettes": [
          {
            "color_1": "#000000",
            "color_2": "#000000",
            "color_3": "#319547",
            "color_4": "#000000",
            "color_5": "#834267",
            "id": 1,
            "name": "Palette ONE"
          }
        ]
      },
      {
       "id": 2,
        "name": "Project TWO",
        "palettes": [
          {
            "color_1": "#010101",
          "color_2": "#925578",
          "color_3": "#319547",
          "color_4": "#796876",
          "color_5": "#834267",
          "id": 2,
          "name": "Palette TWO"
          },
          {
            "color_1": "#123456",
            "color_2": "#654321",
            "color_3": "#245216",
            "color_4": "#784895",
            "color_5": "#235686",
            "id": 3,
            "name": "Palette THREE"}
          ]
        }
      ]
    expect(output).toEqual(expected);
  })
})