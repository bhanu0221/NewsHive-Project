const API_URL = "https://newsdata.io/api/1/latest?apikey=pub_15ee6d959bf14df3bf0da025b862a070&q=football%20news&language=en";

async function loadFootballNews() {
    try {
    const response = await fetch(API_URL);
    const data = await response.json();

    const container = document.getElementById("news-container");
    container.innerHTML = "";

    if (!data.results || data.results.length === 0) {
        container.innerHTML = "<p>No football news found.</p>";
        return;
    }

    data.results.forEach(article => {
        const card = document.createElement("div");

        card.innerHTML = `
        <img src="${article.image_url || 'https://via.placeholder.com/600x300'}" width="100%" alt="News Image" />
        <h2>${article.title}</h2>
        <p>${article.description || 'No description available.'}</p>
        <a href="${article.link}" target="_blank">Read more</a>
        <hr />
        `;

        container.appendChild(card);
    });
    } catch (error) {
    console.error("Failed to fetch football news:", error);
    document.getElementById("news-container").innerHTML = "<p style='color:red;'>Error loading news. Try again later.</p>";
    }
}

loadFootballNews();
setInterval(loadFootballNews, 5 * 60 * 1000); // Refresh every 5 min 
