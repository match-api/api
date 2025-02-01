// List of JSON files to fetch (You can add other JSON files similarly)
const seriesData = [
    { id: 'cricket', file: 'cricket.json' },
    { id: 'football', file: 'football.json'},
    { id: 'ligue1', file: 'ligue1.json' },
    { id: 'bundesliga', file: 'bundesliga.json'},
    { id: 'seriea', file: 'seriea.json' },
    { id: 'laliga', file: 'laliga.json'},
    // Add other series data files if needed
];

// Fetch and render data for each series
seriesData.forEach(series => {
    fetch(series.file)
        .then(response => response.json())
        .then(data => {
            renderSeries(data, series.id, series.title);
        })
        .catch(error => console.error(`Error loading ${series.title}:`, error));
});

// Render series with matches
function renderSeries(data, containerId, seriesTitle) {
    const container = document.getElementById(containerId);

    // Loop through series and render matches
    data.series.forEach(series => {
        const seriesContainer = document.createElement('div');
        seriesContainer.classList.add('series-container');

        // Add series name/title
        const seriesName = document.createElement('h3');
        seriesName.classList.add('series-name');
        seriesName.textContent = series.title;
        seriesContainer.appendChild(seriesName);

        // Loop through matches and create buttons/links
        series.matches.forEach(match => {
            const matchButton = document.createElement('button');
            matchButton.classList.add('kasintv-button');
            matchButton.innerHTML = `<a href="${match.link}" target="_blank">${match.name}</a>`;
            seriesContainer.appendChild(matchButton);
        });

        // Append the series section to the container
        container.appendChild(seriesContainer);
    });
}
