const urls = {
  projWithPaletes: 'https://palette-pal-be.herokuapp.com/api/v1/projects?palettes=included',
  projects: 'https://palette-pal-be.herokuapp.com/api/v1/projects',
  palettes: 'https://palette-pal-be.herokuapp.com/api/v1/palettes'
}

const requests = {
  getDetailedProjects: () => fetchAnything(urls.projWithPaletes),
  getProjects: () => fetchAnything(urls.projects),
  getPalettes: () => fetchAnything(urls.palettes),
  getSingleProject: (id) => fetchAnything(urls.projects + `/${id}`),
  getSinglePalette: (id) => fetchAnything(urls.palettes + `/${id}`),
  postProject: (project) => sendAnything(urls.projects, project, 'POST'),
  postPalette: (palette) => sendAnything(urls.palettes, palette, 'POST'),
  putProject: (project) => sendAnything(urls.projects + `/${project.id}`, project, 'PUT'),
  putPalette: (palette) => sendAnything(urls.palettes + `/${palette.id}`, palette, 'PUT'),
  deleteProject: (id) => deleteAnything(urls.projects + `/${id}`),
  deletePalette: (id) => deleteAnything(urls.palettes + `/${id}`),
}

export function checkStatus(res) {
  if (!res.ok) {
    throw Error('Request failed')
  }
}

export async function fetchAnything(url) {
  const response = await fetch(url);
  checkStatus(response);
  return await response.json();
}

export async function deleteAnything(url) {
  const response = await fetch(url, {
    method: 'DELETE'
  });
  checkStatus(response);
  return await response.json();
}

export async function sendAnything(url, payload, method) {
  const response = await fetch(url, {
    method,
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json"
    }
  })
  checkStatus(response);
  return await response.json();
}

export default requests;