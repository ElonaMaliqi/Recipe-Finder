const searchBar = document.querySelector('form');
const searchResult = document.querySelector('.search-result');
const container = document.querySelector('.header-container');
let searchQuery = '';
const APP_ID = 'a773bb8b'
const APP_key = 'f33f338b6704bfae81fc664982d0695a';


searchBar.addEventListener('submit', (e) => {
    e.preventDefault();
    searchQuery = e.target.querySelector('input').value;
    fetchAPI();
});

async function fetchAPI() {
    const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}&to=21`;
    const response = await fetch(baseURL);
    const data = await response.json();
    generateHTML(data.hits);
    console.log(data);
}

function generateHTML(results) {
    container.classList.remove('initial');
    let html = ''
    results.map(result => {
        html += 
        `
        <div class="grid-item">
        <div class="img-container">
            <img src="${result.recipe.image}" alt="">
            <div class="image-text">
                <p class="paragraph">YUMMY!</p>
                <button onclick="window.open('${result.recipe.url}', '_blank')" class="button" type="submit">View Recipe</button>
            </div>
        </div>
        <div class="recipe-title">
            <p class="meal-name">${result.recipe.label}</p>
        </div>
        
    </div>

        `
    })
    searchResult.innerHTML = html;
}