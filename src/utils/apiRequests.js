const urls = {
  projWithPaletes: 'https://palette-pal-be.herokuapp.com/api/v1/projects?palettes=included',
  projects: 'https://palette-pal-be.herokuapp.com/api/v1/projects',
  palettes: 'https://palette-pal-be.herokuapp.com/api/v1/palettes'
}



export async function fetchAnything(url) {
  const response = await fetch(url);
  return response.json();
}

