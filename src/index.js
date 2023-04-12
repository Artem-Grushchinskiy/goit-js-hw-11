let input;
let currentPage = 1;
let totalPages = 1;
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
  return fetch(`https://pixabay.com/api/?${urlParams}`).then(response => {
    return response.json();
  });
}
const btnLoadMore = document.querySelector(`.js-load-more`);
btnLoadMore.addEventListener(`click`, nextPage);
const sectionRender = document.querySelector(`.gallery`);
const formSearch = document.querySelector(`#search-form`);
formSearch.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  input = event.target[0].value;
  currentPage = 1;
  fetchImg(input, currentPage).then(response => {
    sectionRender.innerHTML = ``;
    renderImgs(response.hits);
    totalPages = Math.ceil(response.totalHits / 40);
    if (totalPages > 1) {
      btnLoadMore.classList.remove(`hide`);
    } else {
      btnLoadMore.classList.add(`hide`);
    }
  });
}
function renderImgs(cards) {
  const markUp = cards.map(elem => {
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
  });
  sectionRender.insertAdjacentHTML(`beforeend`, markUp);
}
function nextPage(event) {
  currentPage += 1;
  if (currentPage === totalPages) {
    btnLoadMore.classList.add(`hide`);
  }
  fetchImg(input, currentPage).then(response => {
    renderImgs(response.hits);
  });
}
