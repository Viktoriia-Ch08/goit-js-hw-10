import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_fBABi8NZPSNaKsJgueWiLxYRJX6BKk64YxEU3OdtkvSQ5lSQlVgF0HcxHejtzkug';

const BASE_URL = 'https://api.thecatapi.com/v1';

function fetchBreeds() {
  return axios.get(`${BASE_URL}/breeds`).then(response => response.data);
}

function fetchCatByBreed(breedId) {
  return axios
    .get(`${BASE_URL}/images/search?breed_ids=${breedId}`)
    .then(response => response.data);
}

export { fetchBreeds, fetchCatByBreed };
