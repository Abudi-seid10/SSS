const works = [
  { title: 'Wede Mado', am: 'ወደ ማዶ', kind: 'Comedy theater', role: 'Producer & director', cat: 'Theater', img: '9145f9fbffb7caa05d01b0b0924c8619', alt: 'Wede Mado comedy theater poster' },
  { title: 'Multi', am: '', kind: 'Comedy theater · Adot Cinema', role: 'Script writer & director', cat: 'Theater', img: 'da087a4e20bd91a4f6fbaf5938232cda', alt: 'Multi comedy theater poster' },
  { title: 'Commitew', am: 'ኮሚቴው', kind: 'One-man theater', role: 'Producer & director', cat: 'Theater', img: '79c246dd16fde9ce20e443c925904be1', alt: 'Commitew one-man theater poster', status: 'Now showing' },
  { title: 'Tayitu', am: 'ጣይቱ', kind: 'Historical theater', role: 'Script writer & director', cat: 'Theater', img: '69e499e039f83e24f1b03ceec05ecad2', alt: 'Tayitu theater poster', status: 'Coming soon' },
  { title: 'Fermata · Eminet · Yigbagn', am: '', kind: 'Feature films', role: 'Production manager', cat: 'Film', img: 'd28d2983f3d98890f1ed64f6cd2847a3', alt: 'Feature film poster' },
  { title: 'Habesha Beer', am: '', kind: 'TV commercials · 4+ spots', role: 'In-house production', cat: 'Commercial', img: '5742661b15ec60e9f9f667c2c5debd63', alt: 'Habesha Cold Gold beer commercial still', wide: true },
];
const needs = ['Commercial / ad', 'Documentary', 'Film or theater', 'Event or launch', 'Campaign & PR', 'Branding & print', 'Digital, SMS & email'];
const categories = ['All', 'Theater', 'Film', 'Commercial'];

const el = (tag, props = {}, ...children) => {
  const node = Object.assign(document.createElement(tag), props);
  node.append(...children);
  return node;
};

// Work filter
let filter = 'All';
const filtersEl = document.getElementById('filters');
const gridEl = document.getElementById('work-grid');

function renderWork() {
  filtersEl.replaceChildren(...categories.map((label) => {
    const b = el('button', { type: 'button', className: 'pill', textContent: label });
    b.setAttribute('role', 'tab');
    b.setAttribute('aria-selected', String(label === filter));
    b.addEventListener('click', () => { filter = label; renderWork(); });
    return b;
  }));
  gridEl.replaceChildren(...works
    .filter((w) => filter === 'All' || w.cat === filter)
    .map((w) => {
      const img = el('img', { src: `images/${w.img}.jpg`, alt: w.alt, className: w.wide ? 'wide' : '' });
      const media = el('div', { className: 'w-media' }, img);
      if (w.status) media.append(el('span', { className: 'status', textContent: w.status }));
      return el('article', { className: 'w-card' },
        media,
        el('div', { className: 'w-info' },
          el('div', { className: 'w-title' }, el('h3', { textContent: w.title }), el('span', { textContent: w.am })),
          el('div', { className: 'w-kind', textContent: w.kind }),
          el('div', { className: 'w-role', textContent: w.role })));
    }));
}
renderWork();

// Contact form
const selected = new Set(['Commercial / ad']);
const needsEl = document.getElementById('needs');
function renderNeeds() {
  needsEl.replaceChildren(...needs.map((label) => {
    const b = el('button', { type: 'button', className: 'pill', textContent: label });
    b.setAttribute('aria-pressed', String(selected.has(label)));
    b.addEventListener('click', () => {
      selected.has(label) ? selected.delete(label) : selected.add(label);
      renderNeeds();
    });
    return b;
  }));
}
renderNeeds();

const form = document.getElementById('brief');
const sent = document.getElementById('sent');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  form.hidden = true;
  sent.hidden = false;
});
document.getElementById('reset').addEventListener('click', () => {
  form.reset();
  form.hidden = false;
  sent.hidden = true;
});
