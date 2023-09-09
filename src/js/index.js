import Notiflix from 'notiflix';
import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { createMarkUp, elms } from './api';

let lightbox = new SimpleLightbox('.gallery a', {});

elms.form.addEventListener('submit', handlerSubmit);

async function handlerSubmit(evt) {
  evt.preventDefault();
  const params = new URLSearchParams({
    key: elms.APIKEY,
    q: elms.input.value,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 39,
    page: 1,
  });
  try {
    const responce = await axios.get(`${elms.BASIC_URL}?${params}`);
    console.log(responce);
    createMarkUp(responce.data.hits);
    lightbox.refresh();
    if (responce.data.hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    if (responce.data.hits.length !== 0) {
      console.log('hello');
      elms.loadMoreBtn.classList.replace('load-more-hiden', 'load-more');
    }
  } catch (error) {
    console.error(error);
  }
}
