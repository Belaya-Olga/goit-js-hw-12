import axios from "axios";

const instance = axios.create({
  baseURL: 'https://pixabay.com/api/',
});

export async function getImagesByQuery(query, page) {
  const responce = await instance.get('', {
    params: {
      key: '50364096-1c7ce5aa76102baff0b747707',
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 15,
      page: page
    }
  });
  return responce.data;
}

