// const urls = {
//   projWithPaletes: 'https://palette-pal-be.herokuapp.com/api/v1/projects?palettes=included',
//   projects: 'https://palette-pal-be.herokuapp.com/api/v1/projects',
//   palettes: 'https://palette-pal-be.herokuapp.com/api/v1/palettes'
// }


export const urls = {
  projWithPaletes: 'http://localhost:3005/api/v1/projects?palettes=included',
  projects: 'http://localhost:3005/api/v1/projects',
  palettes: 'http://localhost:3005/api/v1/palettes',
  signUp: 'http://localhost:3005/auth/signup',
  login: 'http://localhost:3005/auth/login'
}

const requests = {
  postNewUser: (user) => sendAnything(urls.signUp, user, 'POST'),
  loginUser: (user) => sendAnything(urls.login, user, 'POST'),
  getDetailedProjects: () => fetchAnything(urls.projWithPaletes, true),
  getProjects: () => fetchAnything(urls.projects, true),
  getSingleProject: (id) => fetchAnything(urls.projects + `/${id}`, true),
  getPalettes: () => fetchAnything(urls.palettes),
  getSinglePalette: (id) => fetchAnything(urls.palettes + `/${id}`),
  postProject: (project) => sendAnything(urls.projects, project, 'POST', true),
  postPalette: (palette) => sendAnything(urls.palettes, palette, 'POST', true),
  putProject: (project) => sendAnything(urls.projects + `/${project.id}`, project, 'PUT', true),
  putPalette: (palette) => sendAnything(urls.palettes + `/${palette.id}`, palette, 'PUT', true),
  deleteProject: (id) => deleteAnything(urls.projects + `/${id}`, true),
  deletePalette: (id) => deleteAnything(urls.palettes + `/${id}`, true),
}

export function checkStatus(res) {
  if (!res.ok) {
    throw Error('Request failed')
  }
}

export async function fetchAnything(url, tokenRequired = false) {
  const headers = isTokenRequired(tokenRequired);

  const response = await fetch(url, { headers });
  checkStatus(response);
  return await response.json();
}

export async function deleteAnything(url, tokenRequired = false) {
  const headers = isTokenRequired(tokenRequired)
  const response = await fetch(url, {
    method: 'DELETE',
    headers
  });
  checkStatus(response);
  return await response.status;
}

export async function sendAnything(url, payload, method, tokenRequired = false) {
  const headers = isTokenRequired(tokenRequired);
  const response = await fetch(url, {
    method,
    body: JSON.stringify(payload),
    headers
  })
  checkStatus(response);
  return await response.status === 202
    ? response.status
    : response.json();
}

export function isTokenRequired(isRequired) {
  const userToken = JSON.parse(localStorage.getItem('user_token'));
  return isRequired
    ? {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${userToken}`
    }
    : {
      "Content-Type": "application/json"
    }
}
export default requests;