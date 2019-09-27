import React, { useState ,useEffect } from 'react'
import requests from '../utils/apiRequests';
import PublicPalette from './PublicPalette/';
import SubHeader from '../SubHeader';
import Dialog from '../Dialog';
import { Redirect } from 'react-router-dom';

export default function AllPalettesContainer() {
  const [palettes, setPalettes] = useState([]);
  const [isRedirect, setRedirect] = useState(false);
  const [hasErrored, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isDialogVisible, showDialog] = useState(false);

  const toggleDialog = (onOff) => {
    showDialog(onOff);
  };

  const newPaletteRedirect = () => {
    setRedirect(true);
  }

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
      {isRedirect && <Redirect to="/" />}
      <SubHeader 
        title="Pick New Palette"
        btnTitle="Generate New Palette"
        handleClick={newPaletteRedirect}
        data={palettes}
      />
      <div className="palette-container-styling">
        {paletteElements}
        {hasErrored && <h2>Something went wrong :(</h2>}
        {isLoading && <h3>Loading palettes...</h3>}
      </div>
    </section>
  )
}
