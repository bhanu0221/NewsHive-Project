async function fetchCrimeNews() {
    const apiKey = "pub_fb0352c908664cf5af5b2165315cfe94"; // Replace this with your API key
    const url = `https://newsdata.io/api/1/news?apikey=${apiKey}&q=crime&country=in&language=en`;

    try {
    const res = await fetch(url);
    const data = await res.json();
    const container = document.getElementById("news");

    if (!data.results || data.results.length === 0) {
        container.innerHTML = "<p>No crime news found.</p>";
        return;
    }

    data.results.forEach(news => {
        const newsItem = document.createElement('div');
        newsItem.className = 'news-item';

        const image = news.image_url ? news.image_url : 'https://via.placeholder.com/200x120?text=No+Image';

        newsItem.innerHTML = `
        <img src="${image}" alt="News Image" />
        <div>
            <h3>${news.title}</h3>
            <p>${news.description || 'No description available.'}</p>
            <a href="${news.link}" target="_blank">Read more</a>
        </div>
        `;

        container.appendChild(newsItem);
    });
    } catch (err) {
    console.error("Error loading crime news:", err);
    document.getElementById("news").innerHTML = "<p>Error fetching crime news. Try again later.</p>";
    }
}

window.onload = fetchCrimeNews;