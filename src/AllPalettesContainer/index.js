import React, { useState ,useEffect } from 'react'
import requests from '../utils/apiRequests';
import PublicPalette from './PublicPalette/';

export default function AllPalettesContainer() {
  const [palettes, setPalettes] = useState([]);

  const fetchPalettes = async () => {
    const fetchedPaletttes = await requests.getPalettes();
    setPalettes(fetchedPaletttes);
  }

  const paletteElements = palettes.map(palette => 
    <PublicPalette
      data={palette}
      key={palette.id}
      // format={props.format}
      // projectID={props.data.id}
      // updatePaletteData={props.updatePaletteData}
    />);

  useEffect(() => {
    fetchPalettes();
  }, []);

  return (
    <div>
      HIII
      {paletteElements}
    </div>
  )
}
