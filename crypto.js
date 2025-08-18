// Show crypto prices from CoinGecko
async function loadCryptoPrices() {
    const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,dogecoin";
    const tbody = document.querySelector("#crypto-table tbody");
    try {
    const res = await fetch(url);
    const data = await res.json();
    tbody.innerHTML = "";

    data.forEach(coin => {
        const row = `
        <tr>
            <td><img src="${coin.image}" alt="${coin.name}" width="20"/> ${coin.name}</td>
            <td>$${coin.current_price.toLocaleString()}</td>
            <td style="color:${coin.price_change_percentage_24h >= 0 ? 'green' : 'red'}">
            ${coin.price_change_percentage_24h.toFixed(2)}%
            </td>
        </tr>`;
        tbody.innerHTML += row;
    });
    } catch (err) {
    tbody.innerHTML = "<tr><td colspan='3'>Error loading crypto prices.</td></tr>";
    }
}

// Show crypto news using GNews
async function loadCryptoNews() {
    const apiKey = '51e34c79acc5a165c87d3f94cd0f319c'; // Replace this with your GNews API key
    const apiUrl = `https://gnews.io/api/v4/search?q=crypto&lang=en&token=${apiKey}`;
    const container = document.getElementById('newsContainer');

    try {
    const res = await fetch(apiUrl);
    const data = await res.json();
    container.innerHTML = "";

    if (!data.articles || data.articles.length === 0) {
        container.innerHTML = "<div>No news available.</div>";
        return;
    }

    data.articles.forEach(article => {
        const articleEl = document.createElement('div');
        articleEl.className = 'news-article';
        articleEl.innerHTML = `
        <h2>${article.title}</h2>
        <p><strong>Source:</strong> ${article.source.name}</p>
        ${article.image ? `<img src="${article.image}" alt="news image">` : ''}
        <p>${article.description || ''}</p>
        <a href="${article.url}" target="_blank">Read more</a>
        `;
        container.appendChild(articleEl);
    });
    } catch (error) {
    container.innerHTML = "<div class='loading'>Error fetching news.</div>";
    console.error('News Fetch Error:', error);
    }
}

// Load everything on page load
window.onload = () => {
    loadCryptoPrices();
    loadCryptoNews();
    setInterval(loadCryptoNews, 60000); // Refresh news every minute
};