import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const starterThoughts = [
  'You are loved more than you realize. 💗', 'Aaj khud ke liye bhi smile karna, Princess.',
  'You deserve good things, too.', 'Never stop believing in the person you are becoming.',
  'Meri Princess, apne dreams kabhi mat chhodna. 👑', 'You do not have to be perfect to be wonderful.',
  'A brother will sometimes tease you instead of saying how much he cares. 😂',
  'Take life one day at a time. You are doing better than you think.',
  'Teri smile hamesha aise hi bani rahe.', 'No matter how old we get, we will always share our memories.',
  'You can rest without giving up.', 'Duniya kitni bhi badal jaaye, tu hamesha special rahegi.',
  'I hope life is gentle with your heart.', 'You have someone who will always wish the best for you.',
  'Keep growing, keep glowing, keep being you. ✨', 'Your happiness matters, always.',
  'Khud par bharosa rakhna. You are capable of more than you think.',
  'You make our family memories brighter just by being in them.',
  'Your dreams deserve a chance. Go after them.', 'Officially my sister, unofficially my full-time troublemaker. 😂'
];
const defaultPhotos = [
  'Our childhood, our little world.', 'The memories I wish I could relive.', 'My favourite partner in crime. 😂',
  'One picture, a thousand feelings.', 'The days when our biggest problem was the smallest thing.',
  'My Princess, then and always.', 'A moment I never want to forget.', 'The beginning of a thousand more memories.'
];
const defaultTimeline = [
  { title: 'When our story began', date: '', text: '' },
  { title: 'Our funniest childhood memory', date: '', text: '' },
  { title: 'A moment that made me proud of you', date: '', text: '' },
  { title: 'A memory that still makes me smile', date: '', text: '' },
  { title: 'A future memory we have yet to create', date: '', text: '' }
];
const defaultFunny = [
  { title: 'The most ridiculous reason we ever fought', text: '' },
  { title: 'That one time we could not stop laughing', text: '' },
  { title: 'Who annoys whom the most?', text: '' },
  { title: 'A childhood prank we will never forget', text: '' },
  { title: 'The funniest thing you ever said', text: '' },
  { title: 'From fighting to laughing again', text: '' }
];
const defaultFuture = [
  { title: 'One day, we will…', text: '' },
  { title: 'A place we will visit together', text: '' },
  { title: 'Something we still need to do together', text: '' }
];
const letterDefault = `Dear Princess,\n\nI may not say it every day, and I may not always express it perfectly, but you are one of the most precious people in my life.\n\nGrowing up with you has given me something no gift could replace — memories that will always belong to us. From the little fights and silly arguments to the moments when we laugh at absolutely nothing, every little thing has become a part of our story.\n\nKabhi-kabhi main shayad apni feelings express nahi kar pata, but that doesn't mean you matter any less to me. Tu hamesha meri life ka ek bahut special part rahegi.\n\nAur haan, chahe hum kitna bhi ladein, tu mujhe kitna bhi irritate kare, meri Princess toh hamesha meri Princess hi rahegi. 😂❤️\n\nI hope you follow your dreams, find happiness, and always feel proud of the person you are becoming. No matter where life takes us, I hope we never lose this beautiful bond.\n\nHappy Birthday, My Princess. You will always have a brother who wishes the best for you, even when he doesn't say it out loud.\n\nWith all my love,\nYour brother, always. ❤️`;
const birthdayDefault = `Happy Birthday, My Princess! ❤️\n\nI hope this year brings you beautiful opportunities, genuine happiness, peaceful days, and memories worth keeping forever.\n\nTu apne saare dreams achieve kare, life mein aage badhe, aur khud par hamesha proud feel kare. May you always be surrounded by people who value you, respect you, and love you for who you are.\n\nWhenever life feels difficult, remember that you have a brother who will always wish for your happiness.\n\nKeep smiling, keep dreaming, and keep being my wonderful Princess. Love you, always. 💗`;

function read(key, fallback) { try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; } }
function App() {
  const [settings, setSettings] = useState(() => read('mp-settings', { princess: '', brother: '', date: '' }));
  const [letter, setLetter] = useState(() => localStorage.getItem('mp-letter') || letterDefault);
  const [birthday, setBirthday] = useState(() => localStorage.getItem('mp-birthday') || birthdayDefault);
  const [photos, setPhotos] = useState(() => read('mp-photos', defaultPhotos.map((caption, i) => ({ id: `p${i}`, caption, date: '', image: '' }))));
  const [timeline, setTimeline] = useState(() => read('mp-timeline', defaultTimeline));
  const [funny, setFunny] = useState(() => read('mp-funny', defaultFunny));
  const [future, setFuture] = useState(() => read('mp-future', defaultFuture));
  const [thoughts, setThoughts] = useState(() => read('mp-thoughts', starterThoughts));
  const [picked, setPicked] = useState('Tap the jar to find a little reminder, Princess. 💌');
  const [used, setUsed] = useState([]);
  const [candleLit, setCandleLit] = useState(true);
  const [letterOpen, setLetterOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [activePhoto, setActivePhoto] = useState(null);
  const [showSetup, setShowSetup] = useState(false);
  const [toast, setToast] = useState('');

  useEffect(() => { localStorage.setItem('mp-settings', JSON.stringify(settings)); }, [settings]);
  useEffect(() => { localStorage.setItem('mp-letter', letter); }, [letter]);
  useEffect(() => { localStorage.setItem('mp-birthday', birthday); }, [birthday]);
  useEffect(() => { localStorage.setItem('mp-photos', JSON.stringify(photos)); }, [photos]);
  useEffect(() => { localStorage.setItem('mp-timeline', JSON.stringify(timeline)); }, [timeline]);
  useEffect(() => { localStorage.setItem('mp-funny', JSON.stringify(funny)); }, [funny]);
  useEffect(() => { localStorage.setItem('mp-future', JSON.stringify(future)); }, [future]);
  useEffect(() => { localStorage.setItem('mp-thoughts', JSON.stringify(thoughts)); }, [thoughts]);
  useEffect(() => { if (toast) { const t = setTimeout(() => setToast(''), 2600); return () => clearTimeout(t); } }, [toast]);

  const princess = settings.princess.trim() || 'My Princess';
  const brother = settings.brother.trim() || 'Your brother';
  const changeItem = (setter, index, key, value) => setter(old => old.map((item, i) => i === index ? { ...item, [key]: value } : item));
  const addItem = (setter, item) => setter(old => [...old, item]);
  const removeItem = (setter, index) => setter(old => old.filter((_, i) => i !== index));
  const updatePhoto = (index, patch) => setPhotos(old => old.map((p, i) => i === index ? { ...p, ...patch } : p));
  const uploadPhoto = (index, file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) { setToast('Please choose an image file.'); return; }
    if (file.size > 4 * 1024 * 1024) { setToast('Choose an image under 4 MB for this local demo.'); return; }
    const reader = new FileReader();
    reader.onload = () => updatePhoto(index, { image: reader.result });
    reader.readAsDataURL(file);
  };
  const chooseThought = () => {
    if (!thoughts.length) return;
    let available = thoughts.map((_, i) => i).filter(i => !used.includes(i));
    if (!available.length) { available = thoughts.map((_, i) => i); setUsed([]); }
    const i = available[Math.floor(Math.random() * available.length)];
    setPicked(thoughts[i]); setUsed(old => [...old, i]);
  };
  const exportData = () => {
    const data = { settings, letter, birthday, photos, timeline, funny, future, thoughts };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'my-princess-backup.json'; a.click(); URL.revokeObjectURL(url);
    setToast('Backup downloaded. Keep it somewhere private.');
  };
  const importData = (file) => {
    if (!file) return;
    if (!file.name.toLowerCase().endsWith('.json')) { setToast('Please choose your .json backup file.'); return; }
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(String(reader.result || ''));
        const required = ['settings', 'letter', 'birthday', 'photos', 'timeline', 'funny', 'future', 'thoughts'];
        if (!data || typeof data !== 'object' || !required.every(k => Object.prototype.hasOwnProperty.call(data, k))) {
          setToast('This file does not look like a My Princess backup.'); return;
        }
        if (!window.confirm('Restore this backup? It will replace the memories currently saved in this browser. Make sure your current data is backed up first.')) return;
        setSettings(data.settings);
        setLetter(data.letter);
        setBirthday(data.birthday);
        setPhotos(data.photos);
        setTimeline(data.timeline);
        setFunny(data.funny);
        setFuture(data.future);
        setThoughts(data.thoughts);
        setToast('Backup restored! Your memories are loaded in this browser.');
      } catch {
        setToast('Could not read this backup. Please choose the original downloaded JSON file.');
      }
    };
    reader.onerror = () => setToast('Could not read the file. Please try again.');
    reader.readAsText(file);
  };
  const resetData = () => {
    if (!window.confirm('Reset this website to its original demo content? This removes your locally saved edits and photos from this browser.')) return;
    ['mp-settings','mp-letter','mp-birthday','mp-photos','mp-timeline','mp-funny','mp-future','mp-thoughts'].forEach(k => localStorage.removeItem(k));
    window.location.reload();
  };
  const printLetter = () => window.print();

  return <div className="app-shell">
    <div className="ambient ambient-one"/><div className="ambient ambient-two"/>
    <header className="topbar"><a className="brand" href="#home"><span className="brand-mark">♡</span> my princess <span>✦</span></a><nav><a href="#letter">A letter</a><a href="#memories">Memories</a><a href="#little-things">Little thoughts</a></nav><button className="tiny-button" onClick={() => setEditMode(v => !v)}>{editMode ? 'Done editing ✓' : 'Personalize ✎'}</button></header>

    {editMode && <aside className="editor-panel" aria-label="Personalization panel"><div className="editor-heading"><div><span className="eyebrow">YOUR PRIVATE EDITING DESK</span><h2>Make it yours</h2></div><button className="icon-button" onClick={() => setEditMode(false)} aria-label="Close editor">×</button></div><p className="privacy-note"><strong>Local preview only:</strong> this starter saves content in this browser. It is not secure authentication and is not ready for public deployment with private photos.</p><div className="form-grid"><label>Her name (optional)<input value={settings.princess} placeholder="Her real name" onChange={e => setSettings(s => ({ ...s, princess: e.target.value }))}/></label><label>Your name<input value={settings.brother} placeholder="Your name" onChange={e => setSettings(s => ({ ...s, brother: e.target.value }))}/></label><label>Birthday date<input type="date" value={settings.date} onChange={e => setSettings(s => ({ ...s, date: e.target.value }))}/></label></div><label className="wide-label">Edit the letter<textarea rows="7" value={letter} onChange={e => setLetter(e.target.value)}/></label><label className="wide-label">Edit the birthday message<textarea rows="6" value={birthday} onChange={e => setBirthday(e.target.value)}/></label><div className="editor-actions"><button className="button button-soft" onClick={exportData}>Download backup</button><label className="button button-soft backup-import-label">Import backup<input type="file" accept=".json,application/json" onChange={e => { importData(e.target.files?.[0]); e.target.value = ''; }}/></label><button className="button button-danger" onClick={resetData}>Reset demo</button></div></aside>}

    <main>
      <section id="home" className="hero section-wrap"><div className="hero-spark spark-a">✧</div><div className="hero-spark spark-b">♡</div><div className="hero-spark spark-c">✦</div><div className="hero-content"><span className="eyebrow"><span className="eyebrow-line"/> A LITTLE WORLD, JUST FOR YOU <span className="eyebrow-line"/></span><div className="crown">♕</div><h1>Happy Birthday,<br/><em>{princess === 'My Princess' ? 'My Princess' : princess}!</em></h1><p className="hero-subtitle">A little world made just for you, filled with memories, love, and all the things I don't always know how to say.</p><p className="hinglish hero-hinglish">“Tu hamesha meri childhood ki sabse pyaari memories ka ek hissa rahegi.”</p><a className="button button-primary" href="#letter">Open your little surprise <span>♡</span></a><div className="hero-footnote">made with love, by your brother</div></div><div className="hero-bottom"><span>SCROLL TO EXPLORE</span><span className="scroll-line"/><span>01 — 08</span></div></section>

      <section id="letter" className="section-wrap letter-section"><div className="section-kicker">01 / FROM MY HEART</div><div className="section-heading"><span className="tiny-flower">✿</span><h2>Something I want<br/><em>my Princess</em> to know</h2><p>Some things are easier to write than say out loud.</p></div><div className={`letter-card ${letterOpen ? 'letter-open' : ''}`}><div className="letter-top"><span>For my favourite human</span><span>♡</span></div><div className="letter-body"><p className="letter-dear">Dear Princess,</p><p className="letter-preview">{letterOpen ? letter : letter.split('\n\n').slice(0, 2).join('\n\n') + '\n\n…'}</p><div className="letter-signature">With all my love,<br/><span>{brother}</span> <span className="signature-heart">♥</span></div></div><div className="letter-actions"><button className="text-button" onClick={() => setLetterOpen(v => !v)}>{letterOpen ? 'Fold the letter ↑' : 'Read the full letter ↓'}</button><button className="text-button" onClick={printLetter}>Print / save letter ↗</button></div><span className="letter-stamp">♡</span></div></section>

      <section id="memories" className="section-wrap memories-section"><div className="section-kicker">02 / OUR LITTLE TIME CAPSULE</div><div className="section-heading"><span className="tiny-flower">✿</span><h2>Our little world,<br/><em>forever memories</em></h2><p>Some pictures capture a moment. Some memories stay in your heart forever.</p></div><div className="gallery-grid">{photos.map((photo, i) => <article className={`photo-card photo-card-${i % 4}`} key={photo.id || i}><div className="photo-frame" onClick={() => photo.image && setActivePhoto(i)}>{photo.image ? <img src={photo.image} alt={photo.caption || 'Our memory'} /> : <div className="empty-photo"><span className="camera-icon">⌑</span><span>Add our photo</span><small>memory {String(i + 1).padStart(2, '0')}</small></div>}{photo.image && <span className="photo-zoom">↗</span>}</div><div className="photo-caption">{editMode ? <><input aria-label="Photo caption" value={photo.caption} onChange={e => updatePhoto(i, { caption: e.target.value })}/><input aria-label="Photo date" placeholder="Date (optional)" value={photo.date || ''} onChange={e => updatePhoto(i, { date: e.target.value })}/><div className="photo-edit-controls"><label className="upload-label">{photo.image ? 'Replace photo' : 'Upload photo'}<input type="file" accept="image/jpeg,image/png,image/webp" onChange={e => { uploadPhoto(i, e.target.files?.[0]); e.target.value = ''; }}/></label>{photo.image && <button className="mini-delete" onClick={() => updatePhoto(i, { image: '' })}>Remove</button>}</div></> : <><p>{photo.caption || 'A memory to add'}</p>{photo.date && <small>{photo.date}</small>}</>}</div></article>)}</div>{editMode && <button className="button button-soft add-button" onClick={() => addItem(setPhotos, { id: `p${Date.now()}`, caption: 'A memory worth keeping', date: '', image: '' })}>+ Add another photo frame</button>}<p className="gallery-footnote">♡ Real photos, real moments, a lifetime of stories.</p></section>

      <section id="funny" className="section-wrap funny-section"><div className="section-kicker">03 / OUR CHAOTIC LITTLE BOND</div><div className="section-heading"><span className="tiny-flower">✿</span><h2>Proof my Princess<br/>is a <em>little trouble</em> 😂</h2><p>Because love is also annoying each other for absolutely no reason.</p></div><div className="funny-grid">{funny.map((item, i) => <article className="funny-card" key={i}><span className="funny-number">0{i + 1}</span><span className="funny-emoji">{['😈','😂','🤭','🙈','💬','🫶'][i % 6]}</span>{editMode ? <><input value={item.title} onChange={e => changeItem(setFunny, i, 'title', e.target.value)}/><textarea rows="2" placeholder="Write what really happened…" value={item.text} onChange={e => changeItem(setFunny, i, 'text', e.target.value)}/><button className="mini-delete" onClick={() => removeItem(setFunny, i)}>Remove</button></> : <><h3>{item.title}</h3><p>{item.text || <span className="placeholder-copy">Add your real story here…</span>}</p></>}</article>)}</div>{editMode && <button className="button button-soft add-button" onClick={() => addItem(setFunny, { title: 'Our funny memory', text: '' })}>+ Add funny memory</button>}<div className="quote-strip"><span>“</span><p>Tu jitna mujhe irritate karti hai, utna shayad koi aur kar hi nahi sakta. But life would be boring without you.</p><small>— your forever-annoyed brother 😂</small></div></section>

      <section id="little-things" className="section-wrap little-section"><div className="section-kicker">04 / LITTLE REMINDERS</div><div className="section-heading"><span className="tiny-flower">✿</span><h2>Little things I love<br/><em>about you</em></h2><p>Small reminders for a heart that deserves so much goodness.</p></div><div className="thought-grid">{['You will always have a special place in my heart.','Tu khush hoti hai toh dil se achha lagta hai.','I may tease you endlessly, but I will always wish the best for you.','You do not need to be perfect to be loved.','Teri smile hamesha aise hi bani rahe.','Duniya kitni bhi badal jaaye, mere liye tu hamesha meri Princess rahegi.','I will always be proud of the person you are becoming.','A brother’s love sometimes lives in the smallest things.'].map((t, i) => <article className="thought-card" key={i}><span className="thought-symbol">{['♡','✿','✧','☾'][i % 4]}</span><p>{t}</p><span className="thought-index">A LITTLE REMINDER · 0{i + 1}</span></article>)}</div></section>

      <section className="section-wrap timeline-section"><div className="section-kicker">05 / PIECES OF OUR STORY</div><div className="section-heading"><span className="tiny-flower">✿</span><h2>Our story, one memory<br/><em>at a time</em></h2><p>Fill in the moments only we know.</p></div><div className="timeline">{timeline.map((item, i) => <article className="timeline-item" key={i}><div className="timeline-dot">♡</div><div className="timeline-card"><span className="timeline-number">MEMORY 0{i + 1}</span>{editMode ? <><input value={item.title} onChange={e => changeItem(setTimeline, i, 'title', e.target.value)}/><input value={item.date || ''} placeholder="Year or date (optional)" onChange={e => changeItem(setTimeline, i, 'date', e.target.value)}/><textarea rows="3" placeholder="Write your memory here…" value={item.text} onChange={e => changeItem(setTimeline, i, 'text', e.target.value)}/><button className="mini-delete" onClick={() => removeItem(setTimeline, i)}>Remove</button></> : <><h3>{item.title}</h3>{item.date && <small>{item.date}</small>}<p>{item.text || <span className="placeholder-copy">A little space for a memory we will never forget…</span>}</p></>}</div></article>)}</div>{editMode && <button className="button button-soft add-button" onClick={() => addItem(setTimeline, { title: 'A new memory', date: '', text: '' })}>+ Add timeline memory</button>}</section>

      <section className="section-wrap jar-section"><div className="section-kicker">06 / A TINY NOTE FOR YOU</div><div className="jar-layout"><div className="jar-art" aria-hidden="true"><div className="jar-lid"/><div className="jar-glass"><span>♡</span><span>✦</span><span>✿</span><span>♡</span><span>✧</span><span>♥</span><span>✿</span></div><div className="jar-label">for my<br/>Princess</div></div><div className="jar-copy"><h2>A jar full of<br/><em>little thoughts</em></h2><p>For a random moment, an ordinary day, or whenever you need a tiny reminder that you're loved.</p><div className="revealed-note" key={picked}>{picked}</div><button className="button button-primary" onClick={chooseThought}>Pick a little thought <span>♡</span></button>{editMode && <div className="thought-editor"><label>Add your own note<textarea rows="2" id="new-thought" placeholder="Write a sweet thought…"/></label><button className="button button-soft" onClick={() => { const el = document.getElementById('new-thought'); if (el.value.trim()) { setThoughts(old => [...old, el.value.trim()]); el.value = ''; setToast('Your thought was added.'); } }}>Add note to jar</button><p className="editor-hint">{thoughts.length} notes in your jar · notes save in this browser</p></div>}</div></div></section>

      <section className="section-wrap wish-section"><div className="section-kicker">07 / YOUR LITTLE WISH</div><div className="wish-card"><div className="wish-stars">✦　✧　⋆　♡　✦</div><span className="cake">🎂</span><h2>Make a wish,<br/><em>Princess</em></h2><p>Close your eyes, make a little wish, and tap the candles.</p><div className={`cake-candles ${candleLit ? '' : 'blown'}`}><span>🕯️</span><span>🕯️</span><span>🕯️</span></div><button className="button button-primary" onClick={() => { setCandleLit(v => !v); if (candleLit) setToast('✨ Make a wish, Princess! ✨'); }}>{candleLit ? 'Blow out the candles ✨' : 'Make another wish ♡'}</button>{!candleLit && <div className="birthday-reveal"><p>{birthday}</p><span>✦ ♡ ✦</span></div>}</div></section>

      <section className="section-wrap future-section"><div className="section-kicker">08 / TO BE CONTINUED…</div><div className="section-heading"><span className="tiny-flower">✿</span><h2>The story isn't<br/><em>over yet</em></h2><p>Abhi toh bahut saari memories banana baaki hai.</p></div><div className="future-grid">{future.map((item, i) => <article className="future-card" key={i}><span>{['✈','☼','♡'][i % 3]}</span>{editMode ? <><input value={item.title} onChange={e => changeItem(setFuture, i, 'title', e.target.value)}/><textarea rows="3" value={item.text} placeholder="Add a plan for us…" onChange={e => changeItem(setFuture, i, 'text', e.target.value)}/><button className="mini-delete" onClick={() => removeItem(setFuture, i)}>Remove</button></> : <><h3>{item.title}</h3><p>{item.text || <span className="placeholder-copy">Something beautiful we will do together…</span>}</p></>}</article>)}</div>{editMode && <button className="button button-soft add-button" onClick={() => addItem(setFuture, { title: 'A future plan', text: '' })}>+ Add a future plan</button>}</section>

      <section className="final-section"><div className="final-spark">✧　♡　✦</div><div className="final-inner"><span className="eyebrow">ALWAYS AND FOREVER</span><h2>One last thing,<br/><em>my Princess…</em></h2><p>Chahe hum kitna bhi ladein, kitna bhi ek doosre ko irritate karein, you will always be someone I care about deeply.</p><p>I hope this little corner of the internet reminds you of the beautiful bond we share. Life may change, we may grow older, but our memories will always be a part of our story.</p><p className="final-blessing">Happy Birthday, My Princess. Stay happy. Keep dreaming. And never forget how special you are. ❤️</p><div className="final-signature">Love, {brother || 'your brother'} <span>♥</span></div><a className="button button-light" href="#home">Relive our memories ↑</a></div><div className="final-footer">MADE WITH LOVE · JUST FOR YOU <span>♡</span></div></section>
    </main>
    <footer className="site-footer"><span>My Princess ♡</span><span>A little world made with love.</span><button onClick={() => setShowSetup(v => !v)} className="footer-link">Privacy & setup</button></footer>
    {showSetup && <div className="setup-popover"><button className="icon-button" onClick={() => setShowSetup(false)}>×</button><h3>Before you share this</h3><p>This is a local-first design preview. It saves edits and photos in this browser only. It has no login or secure cloud storage.</p><p><strong>Do not deploy this version publicly with private memories.</strong> Add real authentication and private image storage first, then test direct URLs and logged-out access.</p></div>}
    {activePhoto !== null && photos[activePhoto]?.image && <div className="lightbox" role="dialog" aria-modal="true" onClick={() => setActivePhoto(null)}><button className="lightbox-close" onClick={() => setActivePhoto(null)} aria-label="Close photo">×</button><button className="lightbox-nav lightbox-prev" onClick={e => { e.stopPropagation(); setActivePhoto((activePhoto - 1 + photos.length) % photos.length); }} aria-label="Previous photo">‹</button><img src={photos[activePhoto].image} alt={photos[activePhoto].caption} onClick={e => e.stopPropagation()}/><button className="lightbox-nav lightbox-next" onClick={e => { e.stopPropagation(); setActivePhoto((activePhoto + 1) % photos.length); }} aria-label="Next photo">›</button><p>{photos[activePhoto].caption}</p></div>}
    {toast && <div className="toast" role="status">{toast}</div>}
  </div>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
