
let baseUrl;
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  baseUrl = 'http://localhost:3005/';
} else {
  baseUrl = 'https://palette-pal-be.herokuapp.com/';
}

export const urls = {
  projWithPaletes: `${baseUrl}api/v1/projects?palettes=included`,
  projects: `${baseUrl}api/v1/projects`,
  palettes: `${baseUrl}api/v1/palettes`,
  signUp: `${baseUrl}auth/signup`,
  login: `${baseUrl}auth/login`
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
  console.log(baseUrl);
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