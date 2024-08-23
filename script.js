const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreButton = document.getElementById("show-more-btn");
const accessKey = 'TP0N_Rk0v428xiibsVQZHlwC_HuoB_vWCZhv9bLMrMk';

let keyword = "";
let page = 1;

async function searchImages() {
  keyword = searchBox.value.trim();
  if (!keyword) return; // exit if search query is empty

  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=6`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    const results = data.results;

    // clear previous 
    if
    (page==1) {
        searchResult.innerHTML = "";
        };

    results.forEach((result) => {
      const image = document.createElement("img");
      image.src = result.urls.small;
      const imageLink = document.createElement("a");
      imageLink.href = result.links.html;
      imageLink.target = "_blank";
      imageLink.appendChild(image);
      searchResult.appendChild(imageLink);
    });
    showMoreButton.style.display="block";
  } catch (error) {
    console.error(error);
  }
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  searchImages();
});

// add event listener to show more button
showMoreButton.addEventListener("click", () => {
  page++;
  searchImages();
});