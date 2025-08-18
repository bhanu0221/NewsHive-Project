async function loadSocialMediaNews() {
const API_KEY = "51e34c79acc5a165c87d3f94cd0f319c";
const url = `https://gnews.io/api/v4/search?q=social media&lang=en&max=10&apikey=${API_KEY}&_=${new Date().getTime()}`;

console.log("Refreshing news at:", new Date().toLocaleTimeString());

try {
    const response = await fetch(url);
    const data = await response.json();

    const container = document.getElementById("news-container");
    container.innerHTML = "";

    data.articles.forEach(article => {
    const card = document.createElement("div");
    card.className = "news-card";

    card.innerHTML = `
        <img src="${article.image || 'https://placehold.co/700x300'}" class="news-image" alt="News Image">
        <h2 class="news-title">${article.title}</h2>
        <p class="news-description">${article.description || 'No description available.'}</p>
        <a href="${article.url}" target="_blank">Read more</a>
    `;

    container.appendChild(card);
    });
} catch (error) {
    console.error("Error fetching news:", error);
}
}

// Load once immediately
loadSocialMediaNews();

// Refresh every 30 seconds
setInterval(loadSocialMediaNews, 60000);