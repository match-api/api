Promise.all([
    fetch('cricket.json'),
    fetch('football.json'),
    fetch('jaytrophy.json') // Fetching Jay Trophy series
])
    .then(responses => {
        // Check if any of the responses failed
        if (!responses.every(response => response.ok)) {
            throw new Error('One or more resources failed to load.');
        }
        return Promise.all(responses.map(response => response.json()));
    })
    .then(([cricketData, footballData, jaytrophyData]) => { 
        renderSeries(cricketData, 'kasintv-cricket');
        renderSeries(footballData, 'kasintv-football');
        renderSeries(jaytrophyData, 'kasintv-jaytrophy'); // Rendering Jay Trophy series
    })
    .catch(error => console.error('Error loading series data:', error));

// Remove duplicates based on the link property
function removeDuplicateMatches(matches) {
    const uniqueLinks = new Set();
    return matches.filter(match => {
        if (uniqueLinks.has(match.link)) {
            return false; // Skip the match if the link is a duplicate
        }
        uniqueLinks.add(match.link); // Add the link to the set to track it
        return true;
    });
}

// Render series and matches
function renderSeries(data, containerId) {
    const container = document.getElementById(containerId);
    
    if (!container) {
        console.error(`Container with ID ${containerId} not found.`);
        return;
    }

    data.series.forEach(series => {
        // Create a section for each series
        const seriesContainer = document.createElement('div');
        seriesContainer.classList.add('series-container');
        
        // Add series title
        const seriesTitle = document.createElement('h3');
        seriesTitle.classList.add('series-title');
        seriesTitle.textContent = series.title;
        seriesContainer.appendChild(seriesTitle);
        
        // Remove duplicate matches based on the link
        const uniqueMatches = removeDuplicateMatches(series.matches);

        // Loop through unique matches and create buttons or links
        uniqueMatches.forEach(match => {
            const matchLink = document.createElement('a');
            matchLink.href = match.link;
            matchLink.target = '_blank';
            matchLink.classList.add('kasintv-link');  // Add a class for styling
            matchLink.textContent = match.name;      // Display match name
            
            // Create a button or just append the link directly
            const matchButton = document.createElement('button');
            matchButton.classList.add('kasintv-button');
            matchButton.appendChild(matchLink); // Append the link inside the button
            seriesContainer.appendChild(matchButton);
        });
        
        // Append the series section to the appropriate container
        container.appendChild(seriesContainer);
    });
}
