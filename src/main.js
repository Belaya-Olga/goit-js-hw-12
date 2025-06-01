// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

import { getImagesByQuery } from './js/pixabay-api.js';
import { clearGallery } from './js/render-functions.js';
import { showLoader } from './js/render-functions.js';
import { hideLoader } from './js/render-functions.js';
import { createGallery } from './js/render-functions.js';
import { showLoadMoreButton } from './js/render-functions.js';
import { hideLoadMoreButton } from './js/render-functions.js';



const form = document.querySelector('.form');
const formInput = document.querySelector('[name="search-text"]')
const formBtn = document.querySelector("button");
const loadBtn = document.querySelector(".load-more-btn");


let query = ''
let page = 1
const perPage = 15
let totalHits = 0


form.addEventListener('submit', clickStart);
loadBtn.addEventListener('click', loadMoreImages);


async function clickStart(event) {
    event.preventDefault()
    query = formInput.value.trim();
    if (query === '') {
        iziToast.error({
            title: 'Error',
            message: 'Please enter valid values',
        });
        return;
    }

    clearGallery();
  showLoader();
  hideLoadMoreButton();

  page = 1;
  try {
    const response= await getImagesByQuery(query)
      const data = response.data;
      if (data.hits.length === 0) {
        iziToast.error({
          title: 'Error',
          message: 'Sorry, there are no images matching your search query. Please try again!'
        });
        return;
      }
    createGallery(data.hits);
    if (data.totalHits > perPage) {
      showLoadMoreButton();
    }
    
  } catch (error) {
  iziToast.error({
        title: 'Error',
        message: 'Something went wrong. Try again!'
      });
  } finally {
    hideLoader();
  }

};


async function loadMoreImages() {
  page += 1;
  showLoader();

  
  try {
    const response = await getImagesByQuery(query, page);
    const data = response.data;
    createGallery(data.hits);

    if ((page * perPage) >= data.totalHits) {
      hideLoadMoreButton();
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results."
      });
    }

    const { height } = document.querySelector('.gallery').firstElementChild.getBoundingClientRect();
    window.scrollBy({
      top: height * 2,
      behavior: 'smooth',
    });

  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to load more images.'
    });
  } finally {
    hideLoader();
  }
}

