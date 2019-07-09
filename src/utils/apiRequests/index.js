// const urls = {
//   projWithPaletes: 'https://palette-pal-be.herokuapp.com/api/v1/projects?palettes=included',
//   projects: 'https://palette-pal-be.herokuapp.com/api/v1/projects',
//   palettes: 'https://palette-pal-be.herokuapp.com/api/v1/palettes'
// }

const urls = {
  projWithPaletes: 'http://localhost:3005/api/v1/projects?palettes=included',
  projects: 'http://localhost:3005/api/v1/projects',
  palettes: 'http://localhost:3005/api/v1/palettes',
  signUp: 'http://localhost:3005/auth/signup',
  login: 'http://localhost:3005/auth/login'
}

const requests = {
  postNewUser: (user) => sendAnything(urls.signUp, user, 'POST'),
  loginUser: (user) => sendAnything(urls.login, user, 'POST'),
  getDetailedProjects: () => fetchAnything(urls.projWithPaletes),
  getProjects: () => fetchAnything(urls.projects),
  getSingleProject: (id) => fetchAnything(urls.projects + `/${id}`),
  getPalettes: () => fetchAnything(urls.palettes),
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

export async function fetchAnything(url, token) {
  const options = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  };

  const response = token ? await fetch(url, options) : await fetch(url);
  checkStatus(response);
  return await response.json();
}

export async function deleteAnything(url, tokenRequired) {
  const userToken = localStorage.getItem('user_token');
  const headers = tokenRequired 
  ? {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${userToken}`
    }
  : {
      "Content-Type": "application/json"
    }
  const response = await fetch(url, {
    method: 'DELETE',
    headers
  });
  checkStatus(response);
  return await response.status;
}

export async function sendAnything(url, payload, method, tokenRequired) {
  const userToken = localStorage.getItem('user_token');
  const headers = tokenRequired 
  ? {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${userToken}`
    }
  : {
      "Content-Type": "application/json"
    }
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

export default requests;
