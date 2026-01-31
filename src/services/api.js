const BASE_URL = 'https://zeldvorik.ru/apiv3/api.php';

const fetchFromApi = async (params) => {
  try {
    const url = new URL(BASE_URL);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

export const api = {
  getTrending: (page = 1) => fetchFromApi({ action: 'trending', page }),
  getIndonesianMovies: (page = 1) => fetchFromApi({ action: 'indonesian-movies', page }),
  getIndonesianDrama: (page = 1) => fetchFromApi({ action: 'indonesian-drama', page }),
  getKDrama: (page = 1) => fetchFromApi({ action: 'kdrama', page }),
  getShortTV: (page = 1) => fetchFromApi({ action: 'short-tv', page }),
  getAnime: (page = 1) => fetchFromApi({ action: 'anime', page }),
  getAdultComedy: (page = 1) => fetchFromApi({ action: 'adult-comedy', page }),
  getWesternTV: (page = 1) => fetchFromApi({ action: 'western-tv', page }),
  getIndoDub: (page = 1) => fetchFromApi({ action: 'indo-dub', page }),
  search: (keyword) => fetchFromApi({ action: 'search', q: keyword }),
  getDetail: (detailPath) => fetchFromApi({ action: 'detail', detailPath }),
};
