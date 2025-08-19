async function loadGamesNews() {
    const apiKey = "pub_fb0352c908664cf5af5b2165315cfe94"; // Replace with your real key if needed
    const url = `https://newsdata.io/api/1/news?apikey=${apiKey}&q=gaming&language=en&category=technology`;

    const container = document.getElementById('gamingContainer');
    container.innerHTML = "<div class='loading'>Loading news...</div>";

    try {
    const response = await fetch(url);
    const result = await response.json();
    container.innerHTML = "";

    if (!result.results || result.results.length === 0) {
        container.innerHTML = "<div>No Gaming News Available.</div>";
        return;
    }

    result.results.forEach(article => {
        const articleEl = document.createElement('div');
        articleEl.className = 'news-article';
        articleEl.innerHTML = `
        <h2>${article.title}</h2>
        <p><strong>Source:</strong> ${article.source_id || "Unknown"}</p>
        ${article.image_url ? `<img src="${article.image_url}" alt="news image">` : ''}
        <p><a href="${article.link}" target="_blank" style="color: white;">Read more</a></p>
        `;
        container.appendChild(articleEl);
    });
    } catch (error) {
    console.error('Error fetching gaming news:', error);
    container.innerHTML = "<div class='loading'>Error fetching news. Try again later.</div>";
    }
}

window.onload = () => {
    loadGamesNews();
    setInterval(loadGamesNews, 60000); // Auto-refresh every 60s
};