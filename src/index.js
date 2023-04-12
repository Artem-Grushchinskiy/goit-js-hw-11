// импорты ============
import axios from 'axios';
import Notiflix from 'notiflix';
// переменные =========
let input;
let currentPage = 1;
let totalPages = 1;

// поиски и связки ===============
const btnLoadMore = document.querySelector(`.js-load-more`);
const sectionRender = document.querySelector(`.gallery`);
const formSearch = document.querySelector(`#search-form`);
btnLoadMore.addEventListener(`click`, nextPage);
formSearch.addEventListener('submit', onFormSubmit);

// запрос ====================
function fetchImg(input, currentPage) {
  const params = {
    key: '35306825-77139744492b195714f08c4a6',
    q: input,
    image_type: `photo`,
    orientation: `horizontal`,
    safesearch: `true`,
    page: currentPage,
    per_page: 40,
  };
  const urlParams = new URLSearchParams(params);
  return axios.get(`https://pixabay.com/api/?${urlParams}`);
}

// форма страница карточка ==============
async function onFormSubmit(event) {
  event.preventDefault();
  input = event.target[0].value;
  currentPage = 1;
  try {
    const response = await fetchImg(input, currentPage);
    sectionRender.innerHTML = ``;
    btnLoadMore.classList.add(`hide`);
    totalPages = Math.ceil(response.data.totalHits / 40);
    if (response.data.totalHits === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      btnLoadMore.classList.add(`hide`);
      return;
    }
    if (totalPages > 1) {
      btnLoadMore.classList.remove(`hide`);
    } else {
      btnLoadMore.classList.add(`hide`);
    }
    renderImgs(response.data.hits);
  } catch (error) {
    console.log(error);
  }
}
function renderImgs(cards) {
  const markUp = cards
    .map(elem => {
      return `<div class="photo-card">
        <img src="${elem.webformatURL}" alt="${elem.tags}" loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>Likes</b>
            <span>${elem.likes}</span>
          </p>
          <p class="info-item">
            <b>Views</b>
            <span>${elem.views}</span>
          </p>
          <p class="info-item">
            <b>Comments</b>
            <span>${elem.comments}</span>
          </p>
          <p class="info-item">
            <b>Downloads</b>
            <span>${elem.downloads}</span>
          </p>
        </div>
      </div>`;
    })
    .join(``);
  sectionRender.insertAdjacentHTML(`beforeend`, markUp);
}

// пагинация ======================
async function nextPage(event) {
  currentPage += 1;
  try {
    if (currentPage === totalPages) {
      btnLoadMore.classList.add(`hide`);
    }
    const response = await fetchImg(input, currentPage);
    renderImgs(response.data.hits);
  } catch (error) {
    console.log(error);
  }
}
