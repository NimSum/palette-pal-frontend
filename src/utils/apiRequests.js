const urls = {
  projWithPaletes: 'https://palette-pal-be.herokuapp.com/api/v1/projects?palettes=included',
  projects: 'https://palette-pal-be.herokuapp.com/api/v1/projects',
  palettes: 'https://palette-pal-be.herokuapp.com/api/v1/palettes'
}

const requests = {
  getProjects: () => fetchAnything(urls.projects),
  getPalettes: () => fetchAnything(urls.palettes),
  getDetailedProjects: () => fetchAnything(urls.projWithPaletes)
}

export async function fetchAnything(url) {
  const response = await fetch(url);
  return response.json();
}


export default requests;