const rows = [
  { title: 'Films', sub: 'FEATURED TONIGHT', id: 'films', items: [
    ["The dark echo’s of 1939",'noc-dark-echoes',1939,98,'15',null,true,null,true,'https://www.brooksbychurch.co.uk/wp-content/uploads/2014/08/church-tour-293x238.jpg'], ['The Final Lesson AP 1','noc-final-lesson-ap1',2026,96,'15',null,true,'https://clip-kingdom-play.lovable.app/embed/878b4496-ab7a-47fe-8e0f-0b489311241c',true,'https://upload.wikimedia.org/wikipedia/commons/3/30/Brooksby_Hall_-_geograph.org.uk_-_584614.jpg'], ['Hollow Coast','noc-hollowcoast',2026,97,'18'], ['Paper Moths','noc-papermoths',2024,94,'12'], ['Glass Orchard','noc-glassorchard',2023,92,'PG'], ['Salt & Bone','noc-saltbone',2024,97,'15'], ['The Last Broadcast','noc-last-broadcast',2025,95,'15',null,false,null,false], ['Rooms Without Doors','noc-rooms-doors',2024,91,'12',null,false,null,false], ['Ashes at Dawn','noc-ashes-dawn',2026,94,'18',null,false,null,false], ['The Blue Hour','noc-blue-hour',2025,89,'15',null,false,null,false]
  ]},
  { title: 'Trending Now', sub: 'TOP 10 THIS WEEK', id: 'series', items: [
    ['Hollow Coast','noc-hollowcoast',2026,97,'18'], ['Nightjar','noc-nightjar',2025,90,'15'], ['Paper Moths','noc-papermoths',2024,94,'12'], ['The Understudy','noc-understudy',2026,89,'15'], ['Glass Orchard','noc-glassorchard',2023,92,'PG'], ["The Cartographer's Daughter",'noc-cartographer',2025,87,'12'], ['Ember & Rust','noc-emberrust',2024,95,'18']
  ]},
  { title: 'Dark & Atmospheric', sub: 'MOODY · SLOW-BURN · GOTHIC', items: [
    ['Wraithlight','noc-wraithlight',2025,93,'15'], ["The Widow's Clock",'noc-widowsclock',2022,90,'18'], ['Blackthorn House','noc-blackthorn',2026,96,'15'], ['Crow Season','noc-crowseason',2024,88,'12'], ['Velvet Ruin','noc-velvetruin',2025,91,'18'], ['The Taxidermist','noc-taxidermist',2023,94,'15']
  ]},
  { title: 'Award-Worthy Dramas', sub: 'CRITICALLY ACCLAIMED', items: [
    ['Salt & Bone','noc-saltbone',2024,97,'15'], ['The Long Recess','noc-longrecess',2025,92,'PG'], ['Orchard Street','noc-orchardstreet',2023,89,'12'], ['Grey Harbour','noc-greyharbour',2026,95,'15'], ['The Understudy Pt. II','noc-understudy2',2026,90,'18']
  ]},
  { title: 'New Releases', sub: 'JUST ADDED', id: 'new-releases', items: [
    ['Static Bloom','noc-staticbloom2',2026,91,'12'], ['Faultlines','noc-faultlines',2026,86,'15'], ['The Quiet Room','noc-quietroom',2026,93,'18'], ['Hollow Coast: Aftermath','noc-hollowcoast2',2026,97,'18'], ['Nightjar: Season Two','noc-nightjar2',2026,90,'15']
  ]}
];

const content = document.querySelector('#rows');
const toast = document.querySelector('.toast');
const player = document.querySelector('#player');
const videoFrame = document.querySelector('#video-frame');
const videoUrl = 'https://clip-kingdom-play.lovable.app/embed/21230af6-5a84-4072-befc-276e5f349145';
const heroImage = document.querySelector('.hero-image');
const heroTitle = document.querySelector('#hero-title');
const heroMatch = document.querySelector('#hero-match');
const heroYear = document.querySelector('#hero-year');
const heroRating = document.querySelector('#hero-rating');
const heroFormat = document.querySelector('#hero-format');
const heroDescription = document.querySelector('#hero-description');
const installModal = document.querySelector('#install-modal');
const installStatus = document.querySelector('#install-status');
const detailsModal = document.querySelector('#details-modal');
const detailsArt = document.querySelector('#details-art');
const featuredListButton = document.querySelector('#featured-list');
const detailsListButton = document.querySelector('#details-list');
let toastTimer;
let installPrompt;
let currentFeatured;
let detailsFeature;

const routeLinksForLocalPreview = () => {
  if (window.location.protocol !== 'file:') return;
  document.querySelectorAll('a[href]').forEach((link) => {
    const href = link.getAttribute('href');
    if (href === '/') link.href = 'index.html';
    if (href === '/applications/') link.href = 'applications/index.html';
  });
};

routeLinksForLocalPreview();

const featuredTitles = [
  {
    title: 'The dark echo’s of 1939',
    match: '98% match',
    year: '1939',
    rating: '15',
    format: 'Feature film',
    description: 'A buried broadcast, a vanished town, and one voice still echoing through the static. Uncover the story that history tried to erase.',
    image: 'https://www.brooksbychurch.co.uk/wp-content/uploads/2014/08/church-tour-293x238.jpg',
    videoUrl
  },
  {
    title: 'The Final Lesson AP 1',
    match: '96% match',
    year: '2026',
    rating: '15',
    format: 'Feature film',
    description: 'One last class reveals a lesson no one was meant to learn. The Final Lesson AP 1 is available to watch now.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/30/Brooksby_Hall_-_geograph.org.uk_-_584614.jpg',
    videoUrl: 'https://clip-kingdom-play.lovable.app/embed/878b4496-ab7a-47fe-8e0f-0b489311241c'
  }
];

let savedTitles = new Set();
try {
  savedTitles = new Set(JSON.parse(localStorage.getItem('netvistastudio-my-list') || '[]'));
} catch (error) {
  savedTitles = new Set();
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2400);
}

function setFeaturedTitle(feature, immediate = false) {
  const applyFeature = () => {
    heroImage.style.backgroundImage = `url('${feature.image}')`;
    heroTitle.textContent = feature.title;
    heroMatch.textContent = feature.match;
    heroYear.textContent = feature.year;
    heroRating.textContent = feature.rating;
    heroFormat.textContent = feature.format;
    heroDescription.textContent = feature.description;
    currentFeatured = feature;
    updateListButtons();
    heroImage.classList.remove('is-switching');
  };

  if (immediate) return applyFeature();
  heroImage.classList.add('is-switching');
  window.setTimeout(applyFeature, 550);
}

function rotateFeaturedTitle() {
  const choices = featuredTitles.filter((feature) => feature !== currentFeatured);
  setFeaturedTitle(choices[Math.floor(Math.random() * choices.length)]);
}

setFeaturedTitle(featuredTitles[0], true);
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  window.setInterval(rotateFeaturedTitle, 18000);
}

function makeCard(item) {
  const [title, seed, year, match, rating, progress, isVideo, itemVideoUrl, released = Boolean(isVideo), itemImage] = item;
  const card = document.createElement('button');
  card.type = 'button';
  card.className = `card${released ? '' : ' is-unreleased'}`;
  card.setAttribute('aria-label', `Open ${title}`);
  const image = document.createElement('img');
  image.src = itemImage || `https://picsum.photos/seed/${seed}/620/350`;
  image.alt = '';
  image.loading = 'lazy';
  const info = document.createElement('span');
  info.className = 'card-info';
  info.innerHTML = `<span class="original-badge">ORIGINAL</span><span class="card-title"></span><span class="card-meta"><span class="match">${match}% match</span><span>${year}</span><span class="rating">${rating}</span></span>`;
  info.querySelector('.card-title').textContent = title;
  card.append(image, info);
  if (!released) {
    const state = document.createElement('span');
    state.className = 'card-state';
    state.textContent = 'Coming soon';
    card.appendChild(state);
  }
  if (progress) { card.insertAdjacentHTML('beforeend', `<span class="progress" aria-label="${progress}% watched"><span style="width:${progress}%"></span></span>`); }
  card.addEventListener('click', () => {
    if (!released) return showToast('This video is not out yet.');
    if (isVideo) return openPlayer(itemVideoUrl || videoUrl, title);
    showToast(`${title} added to your list.`);
  });
  return card;
}

rows.forEach((row) => {
  const section = document.createElement('section');
  section.className = 'row';
  if (row.id) section.id = row.id;
  section.innerHTML = `<div class="row-heading"><h2>${row.title}</h2><p>${row.sub}</p></div><div class="row-wrap"><div class="row-track" tabindex="0" aria-label="${row.title}"></div><button class="row-arrow left" type="button" aria-label="Scroll left"><span aria-hidden="true">‹</span></button><button class="row-arrow right" type="button" aria-label="Scroll right"><span aria-hidden="true">›</span></button></div>`;
  const track = section.querySelector('.row-track');
  row.items.forEach((item, index) => {
    const card = makeCard(item);
    if (row.title === 'Trending Now') {
      const rank = document.createElement('span');
      rank.className = 'card-rank';
      rank.textContent = `#${index + 1}`;
      card.appendChild(rank);
    }
    track.appendChild(card);
  });
  const left = section.querySelector('.left');
  const right = section.querySelector('.right');
  const updateArrows = () => { const max = track.scrollWidth - track.clientWidth; left.classList.toggle('is-visible', track.scrollLeft > 12); right.classList.toggle('is-visible', track.scrollLeft < max - 12); };
  left.addEventListener('click', () => track.scrollBy({ left: -track.clientWidth * .75, behavior: 'smooth' }));
  right.addEventListener('click', () => track.scrollBy({ left: track.clientWidth * .75, behavior: 'smooth' }));
  track.addEventListener('scroll', updateArrows, { passive: true });
  window.addEventListener('resize', updateArrows, { passive: true });
  content.appendChild(section);
  requestAnimationFrame(updateArrows);
});

const myListSection = document.createElement('section');
myListSection.className = 'row';
myListSection.id = 'my-list';
myListSection.innerHTML = '<div class="row-heading"><h2>My List</h2><p>SAVED FOR LATER</p></div><div class="my-list-content"></div>';
content.children[0]?.after(myListSection);

function featureToCard(feature) {
  return [
    feature.title,
    `saved-${feature.title}`,
    Number(feature.year),
    Number.parseInt(feature.match, 10),
    feature.rating,
    null,
    true,
    feature.videoUrl,
    true,
    feature.image
  ];
}

function renderMyList() {
  const listContent = myListSection.querySelector('.my-list-content');
  listContent.replaceChildren();
  const savedFeatures = featuredTitles.filter((feature) => savedTitles.has(feature.title));

  if (!savedFeatures.length) {
    const empty = document.createElement('div');
    empty.className = 'my-list-empty';
    empty.innerHTML = '<p><strong>Your list is waiting.</strong><span>Use “My List” on a featured title to save it here.</span></p>';
    listContent.appendChild(empty);
    return;
  }

  const wrap = document.createElement('div');
  wrap.className = 'row-wrap';
  const track = document.createElement('div');
  track.className = 'row-track';
  savedFeatures.forEach((feature) => track.appendChild(makeCard(featureToCard(feature))));
  wrap.appendChild(track);
  listContent.appendChild(wrap);
}

function updateListButtons() {
  const updateButton = (button, feature) => {
    if (!button || !feature) return;
    const saved = savedTitles.has(feature.title);
    button.innerHTML = `<span aria-hidden="true">${saved ? '✓' : '＋'}</span> ${saved ? 'In My List' : 'My List'}`;
    button.setAttribute('aria-pressed', String(saved));
  };
  updateButton(featuredListButton, currentFeatured);
  updateButton(detailsListButton, detailsFeature);
}

function toggleSavedTitle(feature) {
  if (!feature) return;
  if (savedTitles.has(feature.title)) {
    savedTitles.delete(feature.title);
    showToast(`${feature.title} removed from My List.`);
  } else {
    savedTitles.add(feature.title);
    showToast(`${feature.title} added to My List.`);
  }
  localStorage.setItem('netvistastudio-my-list', JSON.stringify([...savedTitles]));
  renderMyList();
  updateListButtons();
}

renderMyList();

window.addEventListener('scroll', () => document.querySelector('#site-header').classList.toggle('is-scrolled', window.scrollY > 32), { passive: true });
document.querySelectorAll('[data-message]').forEach((button) => button.addEventListener('click', () => showToast(button.dataset.message)));

document.querySelectorAll('.primary-nav a').forEach((link) => {
  link.addEventListener('click', (event) => {
    const href = link.getAttribute('href');
    if (!href.startsWith('#')) return;
    const target = document.querySelector(href);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    document.querySelectorAll('.primary-nav a').forEach((item) => item.classList.remove('is-active'));
    link.classList.add('is-active');
    document.querySelector('#site-header').classList.remove('nav-open');
    document.querySelector('#nav-toggle').setAttribute('aria-expanded', 'false');
  });
});

const navToggle = document.querySelector('#nav-toggle');
navToggle.addEventListener('click', () => {
  const header = document.querySelector('#site-header');
  const open = header.classList.toggle('nav-open');
  navToggle.setAttribute('aria-expanded', String(open));
});
document.addEventListener('click', (event) => {
  const header = document.querySelector('#site-header');
  if (!header.contains(event.target)) {
    header.classList.remove('nav-open');
    navToggle.setAttribute('aria-expanded', 'false');
  }
});

const searchPanel = document.querySelector('#search-panel');
const searchInput = document.querySelector('#search-input');
const searchStatus = document.querySelector('#search-status');
const setSearchVisible = (visible) => {
  searchPanel.hidden = !visible;
  if (visible) searchInput.focus();
  if (!visible) { searchInput.value = ''; filterCards(''); }
};
const filterCards = (query) => {
  const normalized = query.trim().toLowerCase();
  let matches = 0;
  document.querySelectorAll('.card').forEach((card) => {
    const match = !normalized || card.querySelector('.card-title').textContent.toLowerCase().includes(normalized);
    card.hidden = !match;
    if (match) matches += 1;
  });
  searchStatus.textContent = normalized ? `${matches} title${matches === 1 ? '' : 's'} found.` : 'Type to search the catalogue.';
};
document.querySelector('#search-toggle').addEventListener('click', () => setSearchVisible(searchPanel.hidden));
document.querySelector('#search-close').addEventListener('click', () => setSearchVisible(false));
searchInput.addEventListener('input', () => filterCards(searchInput.value));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && !searchPanel.hidden) setSearchVisible(false); });

function openPlayer(url = videoUrl, title = 'The dark echo’s of 1939') {
  videoFrame.src = url;
  videoFrame.title = title;
  document.querySelector('#player-title').textContent = title;
  player.hidden = false;
  document.body.classList.add('player-open');
  player.querySelector('.player-close').focus();
}

function closePlayer() {
  player.hidden = true;
  videoFrame.src = '';
  document.body.classList.remove('player-open');
}

document.querySelector('#play-featured').addEventListener('click', () => openPlayer(currentFeatured.videoUrl, currentFeatured.title));
featuredListButton.addEventListener('click', () => toggleSavedTitle(currentFeatured));
document.querySelectorAll('[data-close-player]').forEach((element) => element.addEventListener('click', closePlayer));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && !player.hidden) closePlayer(); });

function openDetails(feature) {
  detailsFeature = feature;
  detailsArt.style.backgroundImage = `url('${feature.image}')`;
  document.querySelector('#details-title').textContent = feature.title;
  document.querySelector('#details-match').textContent = feature.match;
  document.querySelector('#details-year').textContent = feature.year;
  document.querySelector('#details-rating').textContent = feature.rating;
  document.querySelector('#details-format').textContent = feature.format;
  document.querySelector('#details-description').textContent = feature.description;
  updateListButtons();
  detailsModal.hidden = false;
  document.body.classList.add('player-open');
  detailsModal.querySelector('.details-close').focus();
}

function closeDetails() {
  detailsModal.hidden = true;
  document.body.classList.remove('player-open');
}

document.querySelector('#featured-info').addEventListener('click', () => openDetails(currentFeatured));
detailsListButton.addEventListener('click', () => toggleSavedTitle(detailsFeature));
document.querySelector('#details-play').addEventListener('click', () => {
  const feature = detailsFeature;
  closeDetails();
  openPlayer(feature.videoUrl, feature.title);
});
document.querySelectorAll('[data-close-details]').forEach((element) => element.addEventListener('click', closeDetails));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && !detailsModal.hidden) closeDetails(); });

function openInstallModal() {
  installModal.hidden = false;
  document.body.classList.add('player-open');
  installModal.querySelector('.install-close').focus();
}

function closeInstallModal() {
  installModal.hidden = true;
  document.body.classList.remove('player-open');
}

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  installPrompt = event;
});

window.addEventListener('appinstalled', () => {
  installPrompt = null;
  installStatus.textContent = 'netvistastudio is installed on your computer.';
});

async function requestInstall(platform) {
  if (!installPrompt) {
    if (!platform) return openInstallModal();
    installStatus.textContent = `${platform}: open this site in Chrome${platform === 'Windows' ? ' or Edge' : ''}, then choose Install from the address bar.`;
    return;
  }

  await installPrompt.prompt();
  const choice = await installPrompt.userChoice;
  const message = choice.outcome === 'accepted' ? 'Installing netvistastudio now.' : 'Installation was cancelled.';
  if (installModal.hidden) showToast(message);
  else installStatus.textContent = message;
  installPrompt = null;
}

document.querySelector('#open-install').addEventListener('click', () => requestInstall());
document.querySelectorAll('[data-close-install]').forEach((element) => element.addEventListener('click', closeInstallModal));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && !installModal.hidden) closeInstallModal(); });
document.querySelectorAll('[data-install-platform]').forEach((button) => {
  button.addEventListener('click', () => requestInstall(button.dataset.installPlatform));
});

if ('serviceWorker' in navigator && window.location.protocol.startsWith('http')) {
  window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js'));
}
