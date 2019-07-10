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
  },
  justColors: {
    color_1: '#000000',
    color_2: '#000000',
    color_3: '#000000',
    color_4: '#000000',
    color_5: '#000000',
  },
  "lynnardsToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJlbWFpbCI6Imx5bm5hcmRAbHlubmUuY29tIiwidXNlcl9uYW1lIjoibHlubmFyZCIsInBhc3N3b3JkIjoiJDJiJDEwJEhjejNiTHlDaDJkc2N4VVQ3VDlRaWVtSlZnUnZrbHZMRnNjZkVMb2xpSS5sM2pnYzEzeEtHIiwiY3JlYXRlZF9hdCI6IjIwMTktMDctMDdUMjM6MjI6MzAuMDE3WiIsInVwZGF0ZWRfYXQiOiIyMDE5LTA3LTA3VDIzOjIyOjMwLjAxN1oifSwiaWF0IjoxNTYyNTQ4OTEzfQ.T1cXhmZZg_oQOVknywt4cYomL0kjm4Vm9Vvx8T9Zz7U",
  "nimsumsToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6Im5pbXN1bUBuaW0uY29tIiwidXNlcl9uYW1lIjoibmltc3VtIiwicGFzc3dvcmQiOiIkMmIkMTAkY2tyOG1wano3MEozOUdUMktxNmpPLnhuY1NCcGouNWp5ZDdsclkvYjJjY0UuMjFYaFd5R1MiLCJjcmVhdGVkX2F0IjoiMjAxOS0wNy0wN1QyMzoyMjozMC4wMTdaIiwidXBkYXRlZF9hdCI6IjIwMTktMDctMDdUMjM6MjI6MzAuMDE3WiJ9LCJpYXQiOjE1NjI1NDg4NTd9.knRpgCNqH_9cV6UkMzMHMMZxA44-p4lRTlf3kMvFmFg"
}

export default mockData;