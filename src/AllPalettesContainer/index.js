import React, { useState ,useEffect } from 'react'
import requests from '../utils/apiRequests';
import PublicPalette from './PublicPalette/';

export default function AllPalettesContainer() {
  const [palettes, setPalettes] = useState([]);

  const fetchPalettes = async () => {
    const fetchedPaletttes = await requests.getPalettes();
    setPalettes(fetchedPaletttes);
  }

  useEffect(() => {
    fetchPalettes();
  }, []);

  return (
    <div>
      HIII
    </div>
  )
}
