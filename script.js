// Fetch and render data for cricket and football series
Promise.all([
    fetch('cricket.json'),
    fetch('football.json'),
    fetch('jaytrophy.json')
])
    .then(responses => Promise.all(responses.map(response => response.json())))
    .then(([cricketData, footballData]) => {
        renderSeries(cricketData, 'kasintv-cricket');
        renderSeries(footballData, 'kasintv-football');
        renderSeries(footballData, 'kasintv-jaytrophy');
    })
    .catch(error => console.error('Error loading series data:', error));

// Render series and matches
function renderSeries(data, containerId) {
    const container = document.getElementById(containerId);

    data.series.forEach(series => {
        // Create a section for each series
        const seriesContainer = document.createElement('div');
        seriesContainer.classList.add('series-container');
        
        // Add series title
        const seriesTitle = document.createElement('h3');
        seriesTitle.classList.add('series-title');
        seriesTitle.textContent = series.title;
        seriesContainer.appendChild(seriesTitle);
        
        // Loop through matches and create buttons
        series.matches.forEach(match => {
            const matchButton = document.createElement('button');
            matchButton.classList.add('kasintv-button');
            matchButton.innerHTML = `<a href="${match.link}" target="_blank">${match.name}</a>`;
            seriesContainer.appendChild(matchButton);
        });
        
        // Append the series section to the appropriate container (cricket or football)
        container.appendChild(seriesContainer);
    });
}
