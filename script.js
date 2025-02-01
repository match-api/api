// List of leagues and their corresponding JSON files
const leagues = [
    { id: 'kasintv-cricket', file: 'cricket.json', title: 'Cricket' },
    { id: 'yosintv-cleague', file: 'cleague.json', title: 'Leagues' },
    { id: 'yosintv-npl', file: 'npl.json', title: 'NPL T20' },
    { id: 'yosintv-ucl', file: 'ucl.json', title: 'Champions League' },
    { id: 'kasintv-football', file: 'football.json', title: 'Football' },
    { id: 'yosintv-epl', file: 'epl.json', title: 'EPL' },
    { id: 'yosintv-laliga', file: 'laliga.json', title: 'La Liga' },
    { id: 'yosintv-seriea', file: 'seriea.json', title: 'Serie A' },
    { id: 'yosintv-ligue1', file: 'ligue1.json', title: 'Ligue 1' },
    { id: 'yosintv-bundesliga', file: 'bundesliga.json', title: 'Bundesliga' }
];

// Fetch and render data for each league
leagues.forEach(league => {
    fetch(league.file)
        .then(response => response.json())
        .then(data => {
            renderSeries(data, league.id, league.title);
        })
        .catch(error => console.error(`Error loading ${league.title} series:`, error));
});

// Render a league's series
function renderSeries(data, containerId, leagueTitle) {
    const container = document.getElementById(containerId);

    // Add league title
    const titleElement = document.createElement('div');
    titleElement.classList.add('league-title');
    titleElement.textContent = `${leagueTitle} Series`;
    container.appendChild(titleElement);

    // Check if series are available
    if (!data.series || data.series.length === 0) {
        const noSeriesMessage = document.createElement('p');
        noSeriesMessage.textContent = `No ${leagueTitle} Series Today`;
        container.appendChild(noSeriesMessage);
        return;
    }

    // Loop through series and render them
    data.series.forEach(serie => {
        renderSingleSeries(serie, container);
    });
}

// Render individual series
function renderSingleSeries(serie, container) {
    const seriesElement = document.createElement('div');
    seriesElement.classList.add('series');
    seriesElement.setAttribute('data-link', serie.link);

    const seriesName = document.createElement('div');
    seriesName.classList.add('series-name');
    seriesName.textContent = serie.name;

    seriesElement.appendChild(seriesName);
    container.appendChild(seriesElement);

    // Add onclick to open the series link
    seriesElement.onclick = function () {
        window.location.href = serie.link;
    };
}
