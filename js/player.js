/*
  Свой плеер поверх YouTube IFrame API: ролик YouTube играет внутри,
  а весь интерфейс (кнопки, шкала, части, полноэкранный режим) — наш.
*/

let ytApiPromise;
function loadYouTubeApi() {
  if (window.YT && window.YT.Player) return Promise.resolve(window.YT);
  if (!ytApiPromise) {
    ytApiPromise = new Promise((resolve) => {
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        prev && prev();
        resolve(window.YT);
      };
      const s = document.createElement('script');
      s.src = 'https://www.youtube.com/iframe_api';
      document.head.appendChild(s);
    });
  }
  return ytApiPromise;
}

function fmtTime(sec) {
  sec = Math.max(0, Math.floor(sec || 0));
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = String(sec % 60).padStart(2, '0');
  return h ? `${h}:${String(m).padStart(2, '0')}:${s}` : `${m}:${s}`;
}

const ICONS = {
  play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4.5v15l12.5-7.5z" fill="currentColor"/></svg>',
  pause: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 4.5h4v15h-4zM13.5 4.5h4v15h-4z" fill="currentColor"/></svg>',
  vol: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" fill="currentColor"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',
  mute: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" fill="currentColor"/><path d="M15.5 9.5l5 5M20.5 9.5l-5 5" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',
  fs: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',
  fsExit: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 4v5H4M20 9h-5V4M15 20v-5h5M4 15h5v5" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',
};

function createPlayer(root, { videos, poster, title }) {
  let part = 0;
  let yt = null;
  let ready = false;
  let playing = false;
  let duration = 0;
  let timer = null;
  let idleTimer = null;
  let scrubbing = false;

  const t = UI[LANG].player;
  const multi = videos.length > 1;
  root.classList.add('player');
  root.tabIndex = 0;
  root.setAttribute('aria-label', `${t.aria}: ${title}`);
  root.innerHTML = `
    <div class="pl-stage">
      <div class="pl-frame"><div></div></div>
      ${poster ? `<img class="pl-poster" src="${poster}" alt="">` : '<div class="pl-poster"></div>'}
      <div class="pl-hit"></div>
      <button class="pl-start" type="button">
        <span class="pl-start-icon">${ICONS.play}</span>
        <span class="pl-start-label">${t.watch}</span>
      </button>
      <div class="pl-msg" hidden></div>
      <div class="pl-bar">
        <button class="pl-btn pl-play" type="button" aria-label="${t.play}">${ICONS.play}</button>
        <div class="pl-progress" role="slider" aria-label="${t.seek}" tabindex="-1">
          <div class="pl-track"><div class="pl-buf"></div><div class="pl-fill"></div></div>
          <div class="pl-tip">0:00</div>
        </div>
        <span class="pl-time">0:00 / 0:00</span>
        <div class="pl-vol">
          <button class="pl-btn pl-mute" type="button" aria-label="${t.sound}">${ICONS.vol}</button>
          <input class="pl-volume" type="range" min="0" max="100" value="100" aria-label="${t.volume}">
        </div>
        <button class="pl-btn pl-fs" type="button" aria-label="${t.fullscreen}">${ICONS.fs}</button>
      </div>
    </div>
    <div class="pl-meta">
      <div class="pl-parts">${
        multi
          ? videos.map((v, i) => `<button type="button" data-part="${i}">${tr(v.label) || `${t.part} ${i + 1}`}</button>`).join('')
          : ''
      }</div>
      <a class="pl-yt" target="_blank" rel="noopener">${t.onYoutube}</a>
    </div>`;

  const $ = (s) => root.querySelector(s);
  const stage = $('.pl-stage');
  const mount = $('.pl-frame > div');
  const btnPlay = $('.pl-play');
  const btnStart = $('.pl-start');
  const progress = $('.pl-progress');
  const fill = $('.pl-fill');
  const buf = $('.pl-buf');
  const tip = $('.pl-tip');
  const time = $('.pl-time');
  const btnMute = $('.pl-mute');
  const vol = $('.pl-volume');
  const btnFs = $('.pl-fs');
  const msg = $('.pl-msg');
  const ytLink = $('.pl-yt');

  function setPartUi() {
    root.querySelectorAll('.pl-parts button').forEach((b, i) => b.classList.toggle('is-active', i === part));
    ytLink.href = `https://www.youtube.com/watch?v=${videos[part].id}`;
  }
  setPartUi();

  function render() {
    if (!ready) return;
    const cur = scrubbing ? scrubbing.t : yt.getCurrentTime();
    duration = yt.getDuration() || duration;
    const pct = duration ? (cur / duration) * 100 : 0;
    fill.style.width = `${pct}%`;
    buf.style.width = `${(yt.getVideoLoadedFraction() || 0) * 100}%`;
    time.textContent = `${fmtTime(cur)} / ${fmtTime(duration)}`;
    progress.setAttribute('aria-valuenow', Math.round(pct));
  }

  function setPlaying(p) {
    playing = p;
    root.classList.toggle('is-playing', p);
    btnPlay.innerHTML = p ? ICONS.pause : ICONS.play;
    btnPlay.setAttribute('aria-label', p ? t.pause : t.play);
    clearInterval(timer);
    if (p) timer = setInterval(render, 250);
    render();
    poke();
  }

  function showError() {
    msg.hidden = false;
    msg.innerHTML = `${t.error}<br><a href="${ytLink.href}" target="_blank" rel="noopener">${t.onYoutube}</a>`;
    root.classList.remove('is-loading');
  }

  function start() {
    if (yt) return toggle();
    root.classList.add('is-started', 'is-loading');
    loadYouTubeApi().then((YT) => {
      yt = new YT.Player(mount, {
        host: 'https://www.youtube-nocookie.com',
        videoId: videos[part].id,
        playerVars: {
          autoplay: 1, controls: 0, disablekb: 1, fs: 0, rel: 0,
          modestbranding: 1, playsinline: 1, iv_load_policy: 3,
          origin: location.origin,
        },
        events: {
          onReady: () => {
            ready = true;
            yt.setVolume(Number(vol.value));
            yt.playVideo();
            render();
          },
          onStateChange: (e) => {
            const S = YT.PlayerState;
            if (e.data === S.PLAYING) {
              root.classList.remove('is-loading');
              setPlaying(true);
            } else if (e.data === S.PAUSED) {
              setPlaying(false);
            } else if (e.data === S.ENDED) {
              setPlaying(false);
              if (part < videos.length - 1) selectPart(part + 1);
            } else if (e.data === S.BUFFERING) {
              root.classList.add('is-loading');
            }
          },
          onError: showError,
        },
      });
    });
  }

  function toggle() {
    if (!ready) return;
    playing ? yt.pauseVideo() : yt.playVideo();
  }

  function seekBy(d) {
    if (!ready) return;
    yt.seekTo(Math.min(Math.max(0, yt.getCurrentTime() + d), duration), true);
    render();
  }

  function selectPart(i) {
    if (i === part && yt) return;
    part = i;
    setPartUi();
    msg.hidden = true;
    duration = 0;
    if (!yt) return start();
    root.classList.add('is-loading');
    yt.loadVideoById(videos[part].id);
  }

  // Прячем интерфейс, когда мышь не двигается во время воспроизведения
  function poke() {
    root.classList.remove('is-idle');
    clearTimeout(idleTimer);
    if (playing) idleTimer = setTimeout(() => root.classList.add('is-idle'), 2600);
  }

  // Перемотка: перетаскивание по шкале
  function posToTime(clientX) {
    const r = progress.getBoundingClientRect();
    const x = Math.min(Math.max(0, clientX - r.left), r.width);
    return { t: (x / r.width) * duration, x };
  }
  progress.addEventListener('pointermove', (e) => {
    if (!duration) return;
    const { t, x } = posToTime(e.clientX);
    tip.textContent = fmtTime(t);
    tip.style.left = `${x}px`;
    if (scrubbing) {
      scrubbing = { t };
      render();
    }
  });
  progress.addEventListener('pointerdown', (e) => {
    if (!ready || !duration) return;
    progress.setPointerCapture(e.pointerId);
    scrubbing = posToTime(e.clientX);
    root.classList.add('is-scrubbing');
    render();
  });
  const endScrub = () => {
    if (!scrubbing) return;
    yt.seekTo(scrubbing.t, true);
    scrubbing = false;
    root.classList.remove('is-scrubbing');
    render();
  };
  progress.addEventListener('pointerup', endScrub);
  progress.addEventListener('pointercancel', endScrub);

  // Звук
  function syncMute() {
    const muted = !ready || yt.isMuted() || Number(vol.value) === 0;
    btnMute.innerHTML = muted && ready ? ICONS.mute : ICONS.vol;
  }
  btnMute.addEventListener('click', () => {
    if (!ready) return;
    yt.isMuted() ? yt.unMute() : yt.mute();
    setTimeout(syncMute, 50);
  });
  vol.addEventListener('input', () => {
    if (!ready) return;
    yt.setVolume(Number(vol.value));
    if (Number(vol.value) > 0 && yt.isMuted()) yt.unMute();
    vol.style.setProperty('--v', `${vol.value}%`);
    setTimeout(syncMute, 50);
  });

  // Полный экран (на iOS — растягиваем блок на всё окно)
  const nativeFs = !!(root.requestFullscreen || root.webkitRequestFullscreen);
  function isFs() {
    return document.fullscreenElement === root || document.webkitFullscreenElement === root || root.classList.contains('is-pseudo-fs');
  }
  function toggleFs() {
    if (isFs()) {
      if (root.classList.contains('is-pseudo-fs')) root.classList.remove('is-pseudo-fs');
      else (document.exitFullscreen || document.webkitExitFullscreen).call(document);
    } else if (nativeFs) {
      (root.requestFullscreen || root.webkitRequestFullscreen).call(root);
    } else {
      root.classList.add('is-pseudo-fs');
    }
    setTimeout(syncFs, 100);
  }
  function syncFs() {
    btnFs.innerHTML = isFs() ? ICONS.fsExit : ICONS.fs;
  }
  document.addEventListener('fullscreenchange', syncFs);
  document.addEventListener('webkitfullscreenchange', syncFs);

  btnStart.addEventListener('click', start);
  btnPlay.addEventListener('click', () => (yt ? toggle() : start()));
  $('.pl-hit').addEventListener('click', toggle);
  $('.pl-hit').addEventListener('dblclick', toggleFs);
  btnFs.addEventListener('click', toggleFs);
  root.querySelectorAll('.pl-parts button').forEach((b) =>
    b.addEventListener('click', () => selectPart(Number(b.dataset.part)))
  );
  stage.addEventListener('pointermove', poke);
  stage.addEventListener('pointerdown', poke);

  root.addEventListener('keydown', (e) => {
    if (e.target === vol) return;
    const k = e.key.toLowerCase();
    if (k === ' ' || k === 'k' || k === 'л') { e.preventDefault(); yt ? toggle() : start(); }
    else if (k === 'arrowright') { e.preventDefault(); seekBy(10); }
    else if (k === 'arrowleft') { e.preventDefault(); seekBy(-10); }
    else if (k === 'f' || k === 'а') toggleFs();
    else if (k === 'm' || k === 'ь') btnMute.click();
    else if (k === 'escape' && root.classList.contains('is-pseudo-fs')) toggleFs();
    poke();
  });

  return {
    start,
    pause() {
      if (ready && playing) yt.pauseVideo();
    },
    destroy() {
      clearInterval(timer);
      clearTimeout(idleTimer);
      document.removeEventListener('fullscreenchange', syncFs);
      document.removeEventListener('webkitfullscreenchange', syncFs);
      if (yt && yt.destroy) yt.destroy();
    },
  };
}
