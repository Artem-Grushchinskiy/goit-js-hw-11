let n,e=1,t=1;function s(n,e){const t=new URLSearchParams({key:"35306825-77139744492b195714f08c4a6",q:n,image_type:"photo",orientation:"horizontal",safesearch:"true",page:e,per_page:40});return fetch(`https://pixabay.com/api/?${t}`).then((n=>n.json()))}const a=document.querySelector(".js-load-more");a.addEventListener("click",(function(i){e+=1,e===t&&a.classList.add("hide");s(n,e).then((n=>{o(n.hits)}))}));const i=document.querySelector(".gallery");function o(n){const e=n.map((n=>`<div class="photo-card">\n        <img src="${n.webformatURL}" alt="${n.tags}" loading="lazy" />\n        <div class="info">\n          <p class="info-item">\n            <b>Likes</b>\n            <span>${n.likes}</span>\n          </p>\n          <p class="info-item">\n            <b>Views</b>\n            <span>${n.views}</span>\n          </p>\n          <p class="info-item">\n            <b>Comments</b>\n            <span>${n.comments}</span>\n          </p>\n          <p class="info-item">\n            <b>Downloads</b>\n            <span>${n.downloads}</span>\n          </p>\n        </div>\n      </div>`));i.insertAdjacentHTML("beforeend",e)}document.querySelector("#search-form").addEventListener("submit",(function(c){c.preventDefault(),n=c.target[0].value,e=1,s(n,e).then((n=>{i.innerHTML="",o(n.hits),t=Math.ceil(n.totalHits/40),t>1?a.classList.remove("hide"):a.classList.add("hide")}))}));
//# sourceMappingURL=index.9a97eeec.js.map
