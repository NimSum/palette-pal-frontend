import React, { useState ,useEffect } from 'react'
import requests from '../utils/apiRequests';
import PublicPalette from './PublicPalette/';

export default function AllPalettesContainer() {
  const [palettes, setPalettes] = useState([]);
  const [hasErrored, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const fetchPalettes = async () => {
    setLoading(true);
    try {
      const fetchedPaletttes = await requests.getPalettes();
      setPalettes(fetchedPaletttes);
      setError(false);
      setLoading(false);
    } catch(error) {
      setError(true)
    }
  }

  const paletteElements = palettes.reverse().map(palette => 
    <PublicPalette
      data={palette}
      key={palette.id}
      // format={props.format}
      // updatePaletteData={props.updatePaletteData}
    />);

  useEffect(() => {
    fetchPalettes();
  }, []);

  return (
    <section className="AllPalettesContainer">
      {paletteElements}
      {hasErrored && <h2>Something went wrong :(</h2>}
      {isLoading && <h3>Loading palettes...</h3>}
    </section>
  )
}
