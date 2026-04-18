let games = [];
const gameGrid = document.getElementById('gameGrid');
const searchInput = document.getElementById('searchInput');
const viewer = document.getElementById('gameViewer');
const iframe = document.getElementById('gameIframe');
const viewerTitle = document.getElementById('viewerTitle');
const backBtn = document.getElementById('backBtn');

async function init() {
  try {
    const response = await fetch('./games.json');
    games = await response.json();
    renderGames(games);
  } catch (err) {
    console.error('Failed to load games:', err);
  }
}

function renderGames(gamesList) {
  gameGrid.innerHTML = '';
  
  if (gamesList.length === 0) {
    gameGrid.innerHTML = `<div class="empty-state">No games found matches your search...</div>`;
    return;
  }

  gamesList.forEach(game => {
    const card = document.createElement('div');
    card.className = 'game-card';
    card.innerHTML = `
      <div class="thumbnail-wrapper">
        <img src="${game.thumbnail}" alt="${game.title}" referrerpolicy="no-referrer">
        <div class="play-overlay">
          <div class="play-button-icon">
            <svg viewBox="0 0 24 24" width="28" height="28" stroke="black" stroke-width="2" fill="black" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
          </div>
        </div>
      </div>
      <div class="game-info">
        <h3 class="font-display">${game.title}</h3>
        <p>${game.description}</p>
        <div class="card-footer">
          <span class="tag">Free Play</span>
          <span class="tag" style="color: var(--accent); opacity: 1;">Play Now</span>
        </div>
      </div>
    `;
    card.addEventListener('click', () => openGame(game));
    gameGrid.appendChild(card);
  });
}

function openGame(game) {
  viewerTitle.textContent = game.title;
  iframe.src = game.url;
  viewer.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeGame() {
  viewer.classList.remove('active');
  iframe.src = '';
  document.body.style.overflow = '';
}

searchInput.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase();
  const filtered = games.filter(g => 
    g.title.toLowerCase().includes(query) || 
    g.description.toLowerCase().includes(query)
  );
  renderGames(filtered);
});

backBtn.addEventListener('click', closeGame);

init();
