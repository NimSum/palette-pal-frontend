const mockData = {
  mockDetailedProjects: [
    {
      "project_name": "Project ONE",
      "project_id": 1,
      "palette_name": "Palette ONE",
      "palette_id": 1,
      "color_1": "#000000",
      "color_2": "#000000",
      "color_3": "#319547",
      "color_4": "#000000",
      "color_5": "#834267"
    },
    {
      "project_name": "Project TWO",
      "project_id": 2,
      "palette_name": "Palette TWO",
      "palette_id": 2,
      "color_1": "#010101",
      "color_2": "#925578",
      "color_3": "#319547",
      "color_4": "#796876",
      "color_5": "#834267"
    },
    {
      "project_name": "Project ONE",
      "project_id": 2,
      "palette_name": "Palette THREE",
      "palette_id": 3,
      "color_1": "#123456",
      "color_2": "#654321",
      "color_3": "#245216",
      "color_4": "#784895",
      "color_5": "#235686"
    }
  ],
  mockProjects: [
    {
      "id": 1,
      "project_name": "Project ONE",
      "created_at": "2019-07-05T21:39:51.436Z",
      "updated_at": "2019-07-05T21:39:51.436Z"
    },
    {
      "id": 2,
      "project_name": "Project TWO",
      "created_at": "2019-07-05T21:40:51.436Z",
      "updated_at": "2019-07-05T21:40:51.436Z"
    }
  ],
  mockPalettes: [
    {
      "id": 1,
      "palette_name": "Test ONE",
      "project_id": 1,
      "color_1": "#010101",
      "color_2": "#925578",
      "color_3": "#319547",
      "color_4": "#796876",
      "color_5": "#834267",
      "created_at": "2019-07-05T21:39:57.227Z",
      "updated_at": "2019-07-05T21:39:57.227Z"
    },
    {
        "id": 2,
        "palette_name": "Test TWO",
        "project_id": 2,
        "color_1": "#000000",
        "color_2": "#000000",
        "color_3": "#319547",
        "color_4": "#000000",
        "color_5": "#834267",
        "created_at": "2019-07-06T01:24:45.881Z",
        "updated_at": "2019-07-06T01:24:45.881Z"
    }
  ],
  mockCleanedProject: {
    id: 2,
    name: "project0",
    palettes: [
      {
        color_1: "#433047",
        color_2: "#967578",
        color_3: "#333547",
        color_4: "#798776",
        color_5: "#839967",
        id: 2,
        name: "palette0"
      },
      {
        color_1: "#488047",
        color_2: "#925578",
        color_3: "#319547",
        color_4: "#796876",
        color_5: "#834267",
        id: 1,
        name: "palette0"
      }
    ]
  }
}

export default mockData;