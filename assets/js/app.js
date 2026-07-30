const rows = [
  { title: 'Films', sub: 'FEATURED TONIGHT', id: 'films', wide: true, items: [
    ["The dark echo’s of 1939",'noc-dark-echoes',1939,98,'15',null,true], ['The Final Lesson AP 1','noc-final-lesson-ap1',2026,96,'15',null,true,'https://clip-kingdom-play.lovable.app/embed/878b4496-ab7a-47fe-8e0f-0b489311241c'], ['Hollow Coast','noc-hollowcoast',2026,97,'18'], ['Paper Moths','noc-papermoths',2024,94,'12'], ['Glass Orchard','noc-glassorchard',2023,92,'PG'], ['Salt & Bone','noc-saltbone',2024,97,'15'], ['The Last Broadcast','noc-last-broadcast',2025,95,'15',null,false,null,false], ['Rooms Without Doors','noc-rooms-doors',2024,91,'12',null,false,null,false], ['Ashes at Dawn','noc-ashes-dawn',2026,94,'18',null,false,null,false], ['The Blue Hour','noc-blue-hour',2025,89,'15',null,false,null,false]
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
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2400);
}

function makeCard(item, wide) {
  const [title, seed, year, match, rating, progress, isVideo, itemVideoUrl, released = Boolean(isVideo)] = item;
  const card = document.createElement('button');
  card.type = 'button';
  card.className = `card${wide ? ' wide' : ''}${released ? '' : ' is-unreleased'}`;
  card.setAttribute('aria-label', `Open ${title}`);
  const image = document.createElement('img');
  image.src = `https://picsum.photos/seed/${seed}/${wide ? '620/350' : '440/660'}`;
  image.alt = '';
  image.loading = 'lazy';
  const info = document.createElement('span');
  info.className = 'card-info';
  info.innerHTML = `<span class="card-title"></span><span class="card-meta"><span class="match">${match}% match</span><span>${year}</span><span class="rating">${rating}</span></span>`;
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
  row.items.forEach((item) => track.appendChild(makeCard(item, row.wide)));
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
  });
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

document.querySelector('#play-featured').addEventListener('click', openPlayer);
document.querySelectorAll('[data-close-player]').forEach((element) => element.addEventListener('click', closePlayer));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && !player.hidden) closePlayer(); });
