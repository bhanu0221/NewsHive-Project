 const API_KEY = 'pub_15ee6d959bf14df3bf0da025b862a070'; // Replace with your actual API key
const url = `https://newsdata.io/api/1/news?apikey=${API_KEY}&category=technology&language=en`;

async function loadTechNews() {
    try {
    const res = await fetch(url);
    const data = await res.json();
    const newsContainer = document.getElementById('tech-news');

    // Clear old news before appending new
    newsContainer.innerHTML = '<h2>Latest Tech News</h2>';

    data.results.slice(0, 6).forEach((item) => {
        const newsCard = document.createElement('div');
        newsCard.className = 'news-card';

        // Reliable fallback image if no image_url
        const image = item.image_url || 'https://dummyimage.com/600x300/cccccc/000000&text=No+Image';

        newsCard.innerHTML = `
        <img src="${image}" alt="news image">
        <h3><a href="${item.link}" target="_blank">${item.title}</a></h3>
        <p style="font-size: 0.9em; color: #666;">
            ${item.pubDate ? new Date(item.pubDate).toLocaleString() : ''}
        </p>
        <p>${item.description ? item.description.slice(0, 150) + '...' : ''}</p>
        `;

        newsContainer.appendChild(newsCard);
    });
    } catch (error) {
    console.error("Failed to fetch tech news:", error);
    }
}

// Load initially
loadTechNews();

// Auto refresh every 60 seconds
setInterval(loadTechNews, 60000);