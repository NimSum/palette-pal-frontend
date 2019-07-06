import React, { Component } from 'react'
import requests from './utils/apiRequests';

export class TestFetch extends Component {
  state = {
    all: [],
    projects: [],
    palettes: [],
    response: ''
  }
  async componentDidMount() {
    this.setState({ 
      all: await requests.getDetailedProjects(),
      projects: await requests.getProjects(),
      palettes: await requests.getPalettes()
    })
  }

  postPalette = async () => {
    const testPalette = {
      "palette_name": "Test TWO",
      "project_id": 1,
      "color_1": "#000000",
      "color_2": "#000000",
      "color_3": "#319547",
      "color_4": "#000000",
      "color_5": "#834267"
   }
    this.setState({ response: await requests.postPalette(testPalette) })
  }

  postProject = async () => {
    const testProject = {
      "project_name": "Test TWO",
   }
    this.setState({ response: await requests.postPalette(testProject) })
  }

  render() {
    return (
      <div>
        <button onClick={this.postPalette}>
          PALETTE
        </button>
      </div>
    )
  }
}

export default TestFetch
