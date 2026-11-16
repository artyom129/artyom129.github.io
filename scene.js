// The city where the backend is the only thing awake.
// One generator draws it twice: at night behind the hero and at sunrise behind the contact block.
// Everything sits on a coarse pixel grid and is scaled up with crisp pixels.
(() => {
  "use strict";

  const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
  const rgb = h => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const smooth = (a, b, x) => { const t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
  const rng = seed => { let s = seed; return () => (s = (s * 16807) % 2147483647) / 2147483647; };
  const sheet = (w, h) => { const c = document.createElement("canvas"); c.width = w; c.height = h; return c; };

  const NIGHT = {
    sky: [[0, "#05060f"], [0.2, "#080b1d"], [0.4, "#0d1433"], [0.58, "#15224f"], [0.74, "#1f356d"], [0.88, "#305089"], [1, "#5674ab"]],
    star: "#dfe6ff",
    cloud: "#1d2d60",
    moon: true,
    layers: [
      { body: "#1a2752", rim: "#3655a2", shade: "#141e42", off: "#1a2752", lit: 0.05 },
      { body: "#0f1736", rim: "#25386e", shade: "#0b1129", off: "#141f47", lit: 0.11 },
      { body: "#080a14", rim: "#1b2749", shade: "#06070f", off: "#0f1428", lit: 0.15 }
    ],
    lights: ["#ffbe3d", "#ffbe3d", "#ffbe3d", "#ffbe3d", "#ffd98a", "#ffe9c2", "#6fd8e6", "#ff7aa0"],
    beacon: ["#ff4d5a", "#4a1622"]
  };

  const DAWN = {
    sky: [[0, "#080a14"], [0.24, "#0f1533"], [0.44, "#27295e"], [0.6, "#573a78"], [0.74, "#a25578"], [0.85, "#e2855f"], [0.94, "#f9b367"], [1, "#ffd58a"]],
    star: "#aab4dd",
    cloud: "#b5627a",
    sun: true,
    layers: [
      { body: "#4a3566", rim: "#96698f", shade: "#3d2b56", off: "#4a3566", lit: 0.012 },
      { body: "#261d42", rim: "#5d4470", shade: "#1d1634", off: "#2c2249", lit: 0.03 },
      { body: "#0a0b17", rim: "#2f2848", shade: "#07080f", off: "#12122a", lit: 0.045 }
    ],
    lights: ["#ffd98a", "#ffbe3d", "#ffe9c2"],
    beacon: ["#ff4d5a", "#4a1622"]
  };

  function paintSky(W, H, A, stops, ground) {
    const c = sheet(W, H);
    const g = c.getContext("2d");
    const img = g.createImageData(W, H);
    const cols = stops.map(s => rgb(s[1]));
    const floor = rgb(ground);
    for (let y = 0; y < H; y++) {
      const t = A > 1 ? y / (A - 1) : 1;
      let i = 0;
      while (i < stops.length - 2 && t >= stops[i + 1][0]) i++;
      const k = clamp((t - stops[i][0]) / (stops[i + 1][0] - stops[i][0]), 0, 1);
      for (let x = 0; x < W; x++) {
        const th = (BAYER[(y & 3) * 4 + (x & 3)] + 0.5) / 16;
        const col = y >= A ? floor : k > th ? cols[i + 1] : cols[i];
        const p = (y * W + x) * 4;
        img.data[p] = col[0]; img.data[p + 1] = col[1]; img.data[p + 2] = col[2]; img.data[p + 3] = 255;
      }
    }
    g.putImageData(img, 0, 0);
    return c;
  }

  function drawMoon(g, cx, cy, R) {
    const craters = [[-0.32, -0.18, 0.2], [0.24, 0.3, 0.17], [0.36, -0.38, 0.12], [-0.12, 0.48, 0.1], [-0.5, 0.25, 0.08]];
    for (let dy = -R - 10; dy <= R + 10; dy++) {
      for (let dx = -R - 10; dx <= R + 10; dx++) {
        const d = Math.sqrt(dx * dx + dy * dy);
        const x = cx + dx, y = cy + dy;
        if (d <= R + 0.3) {
          let c = "#f4e9c7";
          if ((dx - R * 0.3) ** 2 + (dy + R * 0.3) ** 2 > (R * 0.98) ** 2) c = "#dccfa6";
          for (const [ox, oy, r] of craters) if ((dx - ox * R) ** 2 + (dy - oy * R) ** 2 <= (r * R) ** 2) c = "#cfc199";
          g.fillStyle = c;
          g.fillRect(x, y, 1, 1);
        } else if (d <= R + 9) {
          const k = (1 - (d - R) / 9) * 0.6;
          if (k > (BAYER[(y & 3) * 4 + (x & 3)] + 0.5) / 16) { g.fillStyle = "#1c2f66"; g.fillRect(x, y, 1, 1); }
        }
      }
    }
  }

  function drawSun(g, cx, cy, R) {
    for (let dy = -R - 14; dy <= R + 14; dy++) {
      for (let dx = -R - 14; dx <= R + 14; dx++) {
        const d = Math.sqrt(dx * dx + dy * dy);
        const x = cx + dx, y = cy + dy;
        if (d <= R + 0.3) { g.fillStyle = "#fff1c9"; g.fillRect(x, y, 1, 1); }
        else if (d <= R + 13) {
          const k = (1 - (d - R) / 13) * 0.75;
          if (k > (BAYER[(y & 3) * 4 + (x & 3)] + 0.5) / 16) { g.fillStyle = "#ffe0a0"; g.fillRect(x, y, 1, 1); }
        }
      }
    }
  }

  // One row of buildings standing on the line y = A.
  function buildLayer(W, H, A, o, rand) {
    const canvas = sheet(W, H);
    const g = canvas.getContext("2d");
    const windows = [], beacons = [], signs = [];
    const R = (a, b) => a + Math.floor(rand() * (Math.max(a, b) - a + 1));
    const paintWindow = w => { g.fillStyle = w.on ? w.color : o.off; g.fillRect(w.x, w.y, w.w, w.h); };

    function block(bx, by, bw, bottom) {
      g.fillStyle = o.body; g.fillRect(bx, by, bw, bottom - by);
      g.fillStyle = o.shade; g.fillRect(bx, by, 1, bottom - by);
      g.fillStyle = o.rim; g.fillRect(bx, by, bw, 1); g.fillRect(bx + bw - 1, by, 1, bottom - by);
      const [ww, wh, px, py] = o.styles[Math.floor(rand() * o.styles.length)];
      const cols = Math.floor((bw - 4 + (px - ww)) / px);
      if (cols < 1) return;
      const x0 = bx + Math.floor((bw - (cols * px - (px - ww))) / 2);
      const mood = o.lit * (0.35 + rand() * 1.5);
      for (let y = by + 3; y + wh <= bottom - 2; y += py) {
        for (let i = 0; i < cols; i++) {
          const w = { x: x0 + i * px, y, w: ww, h: wh, on: rand() < mood, color: o.lights[Math.floor(rand() * o.lights.length)] };
          windows.push(w);
          paintWindow(w);
        }
      }
    }

    let x = -R(0, 5);
    while (x < W) {
      const bw = R(o.w[0], o.w[1]);
      const f = o.profile(clamp((x + bw / 2) / W, 0, 1));
      const bh = Math.max(4, Math.round((o.h[0] + rand() * (o.h[1] - o.h[0])) * A * f));
      let top = A - bh;
      block(x, top, bw, A);
      let rx = x, rw = bw;
      if (bw >= o.setback && bh > 16 && rand() < 0.4) {
        const inset = R(2, Math.floor(bw / 4));
        const th = R(4, Math.max(5, Math.round(A * 0.06)));
        block(x + inset, top - th, bw - inset * 2, top + 1);
        rx = x + inset; rw = bw - inset * 2; top -= th;
      }
      if (o.tanks && rw >= 12 && rand() < 0.35) {
        const tx = rx + R(1, rw - 7);
        g.fillStyle = o.body; g.fillRect(tx, top - 5, 5, 4); g.fillRect(tx, top - 1, 1, 1); g.fillRect(tx + 4, top - 1, 1, 1);
        g.fillStyle = o.rim; g.fillRect(tx, top - 5, 5, 1); g.fillRect(tx + 4, top - 5, 1, 4);
      }
      if (rw >= 5 && rand() < o.antenna) {
        const ax = rx + R(1, rw - 2), ah = R(4, 11);
        g.fillStyle = o.rim; g.fillRect(ax, top - ah, 1, ah);
        beacons.push({ x: ax, y: top - ah - 1, p: rand() * 6.28 });
      }
      if (o.signs && bw >= 12 && bh > 26 && rand() < o.signs) {
        signs.push({ x: x + 2, y: A - bh + 5, w: 2, h: R(8, 13), color: rand() < 0.5 ? "#ff5c8a" : "#46d9e6", p: rand() * 6.28 });
      }
      x += bw + (rand() < o.gap ? R(1, 5) : 0);
    }
    if (o.ground) { g.fillStyle = o.body; g.fillRect(0, A, W, H - A); }
    return { canvas, g, windows, beacons, signs, par: o.par, lit: o.lit, paintWindow };
  }

  function createScene(canvas, theme, opts) {
    const host = canvas.parentElement;
    const g = canvas.getContext("2d");
    const tags = opts.tags || [];
    const active = [];
    let S = 4, W = 0, H = 0, A = 0, sky, layers = [], stars = [], clouds = [], moon = null, anchors = [];
    let visible = false, looping = false, lastTick = 0, lastScroll = -1, lastFlip = 0, shoot = null, nextShoot = 5, step = 0, timer = 0;

    function build() {
      const cssW = host.clientWidth, cssH = host.clientHeight;
      if (!cssW || !cssH) return;
      const mobile = cssW < 760;
      S = cssW >= 1900 ? 5 : cssW >= 1100 ? 4 : 3;
      W = Math.ceil(cssW / S);
      H = Math.ceil(cssH / S);
      canvas.width = W;
      canvas.height = H;
      A = H - Math.ceil((opts.ground ? opts.ground() : 0) / S) - 2;
      const rand = rng(opts.seed);
      const ground = theme.layers[2].body;
      sky = paintSky(W, H, A, theme.sky, ground);
      const sg = sky.getContext("2d");

      moon = null;
      if (theme.moon) {
        const R = Math.round(clamp(Math.min(W, A) * 0.085, 9, 22));
        moon = { x: Math.round(W * (mobile ? 0.84 : 0.8)), y: Math.round(mobile ? 96 / S + R + 2 : A * 0.24), r: R };
        drawMoon(sg, moon.x, moon.y, R);
      }
      if (theme.sun) {
        const R = Math.round(clamp(Math.min(W, A) * 0.09, 10, 24));
        drawSun(sg, Math.round(W * 0.68), A - Math.round(R * 1.5), R);
      }

      stars = [];
      const count = Math.round(W * A / (theme.moon ? 520 : 1500));
      for (let i = 0; i < count; i++) {
        const x = Math.floor(rand() * W), y = Math.floor(rand() * A * (theme.moon ? 0.62 : 0.36));
        if (moon && (x - moon.x) ** 2 + (y - moon.y) ** 2 < (moon.r + 11) ** 2) continue;
        stars.push({ x, y, p: rand() * 6.28, s: 0.6 + rand() * 1.8, big: rand() < 0.06 });
      }

      clouds = [];
      for (let i = 0; i < (mobile ? 2 : 4); i++) {
        clouds.push({ x: rand() * W, y: Math.round(A * (theme.moon ? 0.1 + rand() * 0.3 : 0.5 + rand() * 0.22)), w: 26 + Math.floor(rand() * 34), v: 0.5 + rand() * 0.9 });
      }

      const flat = mobile || opts.flat;
      const profile = flat ? () => 1 : xn => 0.4 + 0.6 * smooth(0.3, 0.78, xn);
      const frac = flat ? (opts.flatHeights || [[0.1, 0.3], [0.07, 0.21], [0.03, 0.11]]) : [[0.2, 0.58], [0.13, 0.4], [0.05, 0.2]];
      const specs = [
        { w: [9, 20], gap: 0.05, styles: [[1, 1, 3, 3], [1, 2, 3, 4]], antenna: 0.25, setback: 12, par: 0.1 },
        { w: [11, 24], gap: 0.1, styles: [[1, 2, 3, 4], [2, 2, 4, 4], [2, 1, 4, 3]], antenna: 0.3, setback: 12, par: 0.05, signs: theme.moon ? 0.14 : 0 },
        { w: [12, 28], gap: 0.12, styles: [[2, 2, 4, 4], [2, 3, 4, 5], [3, 2, 5, 4]], antenna: 0.3, setback: 14, par: 0, tanks: true, signs: theme.moon ? 0.16 : 0, ground: true }
      ];
      layers = specs.map((sp, i) => buildLayer(W, H, A, Object.assign({}, sp, theme.layers[i], { h: frac[i], profile, lights: theme.lights }), rand));

      pickAnchors(rand);
      frame(performance.now());
    }

    // Find lit windows on the right side whose notes fit without touching the headline, the moon or each other.
    function pickAnchors(rand) {
      anchors = [];
      active.length = 0;
      step = 0;
      tags.forEach(t => t.classList.remove("on"));
      if (!tags.length || host.clientWidth < 760) return;
      const near = layers[2].g.getImageData(0, 0, W, H).data;
      const mid = layers[1].g.getImageData(0, 0, W, H).data;
      const tagW = Math.ceil(330 / S), tagH = Math.ceil(32 / S);
      const cands = [];
      [0, 1, 2].forEach(li => layers[li].windows.forEach(w => {
        if (w.x < W * 0.5 || w.x > W * 0.95 || w.y < A * 0.3 || w.y > A - 12) return;
        const p = (w.y * W + w.x) * 4 + 3;
        if ((li < 2 && near[p] !== 0) || (li < 1 && mid[p] !== 0)) return;   // hidden behind a nearer roof
        cands.push({ win: w, li });
      }));
      for (let i = cands.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [cands[i], cands[j]] = [cands[j], cands[i]]; }
      const boxes = [];
      for (const c of cands) {
        const w = c.win;
        const up = 8 + (anchors.length % 2) * 8;
        const cx = w.x + (w.w >> 1), top = w.y - up;
        const flip = cx + 8 + tagW > W - 4;
        const box = { x: flip ? cx - 8 - tagW : cx + 6, y: top - (tagH >> 1) - 2, w: tagW + 2, h: tagH + 4 };
        if (box.x < W * 0.46 || box.y < 76 / S) continue;
        if (anchors.some(a => Math.abs(a.cx - cx) < 12)) continue;
        if (moon && box.x < moon.x + moon.r + 6 && box.x + box.w > moon.x - moon.r - 6 && box.y < moon.y + moon.r + 6 && box.y + box.h > moon.y - moon.r - 6) continue;
        if (boxes.some(b => box.x < b.x + b.w + 4 && box.x + box.w + 4 > b.x && box.y < b.y + b.h + 4 && box.y + box.h + 4 > b.y)) continue;
        boxes.push(box);
        w.on = true; w.pin = true; w.color = "#ffbe3d";
        layers[c.li].paintWindow(w);
        anchors.push({ win: w, par: layers[c.li].par, cx, top, flip });
        if (anchors.length === 4) break;
      }
      anchors.sort((a, b) => a.cx - b.cx);
    }

    function place(tag, a, off) {
      const x = a.flip ? (a.cx - 5) * S - 6 - tag.offsetWidth : (a.cx + 6) * S + 6;
      const y = (a.top + off) * S + S / 2 - tag.offsetHeight / 2;
      tag.style.setProperty("--x", Math.round(x) + "px");
      tag.style.setProperty("--y", Math.round(y) + "px");
    }

    function showNext() {
      if (anchors.length < 2) return;
      const tag = tags[step % tags.length];
      const anchor = anchors[step % anchors.length];
      if (active.length >= 2) active.shift().tag.classList.remove("on");
      place(tag, anchor, 0);
      tag.classList.add("on");
      active.push(Object.assign({ tag, since: performance.now() / 1000 }, anchor));
      step++;
    }

    function update(now) {
      if (now - lastFlip < (theme.sun ? 1400 : 260)) return;
      lastFlip = now;
      const L = layers[Math.floor(Math.random() * layers.length)];
      for (let k = 0; k < 16; k++) {
        const w = L.windows[Math.floor(Math.random() * L.windows.length)];
        if (!w || w.pin) continue;
        if (theme.sun) {
          if (!w.on) continue;   // at sunrise the lights only go out
          w.on = false;
        } else {
          w.on = Math.random() < L.lit;
        }
        L.paintWindow(w);
        break;
      }
    }

    function frame(now) {
      if (!W) return;
      const t = now / 1000;
      const scroll = opts.parallax ? clamp(-host.getBoundingClientRect().top, 0, host.clientHeight) / S : 0;
      const skyOff = Math.round(scroll * 0.2);
      g.fillStyle = theme.sky[0][1];
      g.fillRect(0, 0, W, H);
      g.drawImage(sky, 0, skyOff);

      g.fillStyle = theme.star;
      for (const s of stars) {
        const a = still ? 0.8 : 0.45 + 0.55 * Math.sin(t * s.s + s.p);
        if (a < 0.06) continue;
        g.globalAlpha = a;
        g.fillRect(s.x, s.y + skyOff, 1, 1);
        if (s.big) { g.globalAlpha = a * 0.45; g.fillRect(s.x - 1, s.y + skyOff, 3, 1); g.fillRect(s.x, s.y - 1 + skyOff, 1, 3); }
      }

      if (theme.moon && !still) {
        if (!shoot && t > nextShoot) shoot = { x: W * (0.12 + Math.random() * 0.5), y: A * (0.05 + Math.random() * 0.2), t0: t };
        if (shoot) {
          const p = (t - shoot.t0) / 0.7;
          if (p > 1) { shoot = null; nextShoot = t + 7 + Math.random() * 9; }
          else for (let i = 0; i < 9; i++) {
            g.globalAlpha = (1 - i / 9) * (1 - p * 0.6);
            g.fillRect(Math.round(shoot.x + p * 46 - i * 1.6), Math.round(shoot.y + p * 18 - i * 0.6) + skyOff, 1, 1);
          }
        }
      }

      g.globalAlpha = 0.62;
      g.fillStyle = theme.cloud;
      for (const c of clouds) {
        const x = Math.round(((c.x + (still ? 0 : t * c.v)) % (W + c.w * 2)) - c.w);
        const y = c.y + skyOff;
        g.fillRect(x + Math.round(c.w * 0.3), y, Math.round(c.w * 0.38), 2);
        g.fillRect(x + Math.round(c.w * 0.12), y + 2, Math.round(c.w * 0.7), 2);
        g.fillRect(x, y + 4, c.w, 2);
        g.fillRect(x + Math.round(c.w * 0.2), y + 6, Math.round(c.w * 0.56), 1);
      }
      g.globalAlpha = 1;

      for (const L of layers) {
        const off = Math.round(scroll * L.par);
        g.drawImage(L.canvas, 0, off);
        for (const b of L.beacons) {
          g.fillStyle = theme.beacon[still || Math.sin(t * 2.2 + b.p) > 0.2 ? 0 : 1];
          g.fillRect(b.x, b.y + off, 1, 1);
        }
        for (const s of L.signs) {
          g.globalAlpha = !still && Math.sin(t * 9 + s.p) > 0.985 ? 0.3 : 1;
          g.fillStyle = s.color;
          g.fillRect(s.x, s.y + off, s.w, s.h);
        }
        g.globalAlpha = 1;
      }

      for (const a of active) {
        const off = Math.round(scroll * a.par);
        const w = a.win, age = t - a.since;
        g.fillStyle = "#fff6d6";
        g.fillRect(w.x, w.y + off, w.w, w.h);
        g.fillStyle = "#ffbe3d";
        if (still || age > 1.2 || Math.floor(age * 6) % 2 === 0) {
          g.fillRect(w.x - 1, w.y - 1 + off, w.w + 2, 1); g.fillRect(w.x - 1, w.y + w.h + off, w.w + 2, 1);
          g.fillRect(w.x - 1, w.y + off, 1, w.h); g.fillRect(w.x + w.w, w.y + off, 1, w.h);
        }
        g.fillRect(a.cx, a.top + off, 1, w.y - 1 - a.top);
        g.fillRect(a.flip ? a.cx - 5 : a.cx, a.top + off, 6, 1);
        place(a.tag, a, off);
      }
    }

    function loop(now) {
      if (!visible) { looping = false; return; }
      requestAnimationFrame(loop);
      const sc = window.scrollY;
      if (now - lastTick < 66 && sc === lastScroll) return;
      lastTick = now;
      lastScroll = sc;
      update(now);
      frame(now);
    }

    function startTags() {
      clearInterval(timer);
      if (!tags.length) return;
      showNext();
      showNext();
      if (!still) timer = setInterval(() => { if (visible && !document.hidden) showNext(); }, 3400);
    }

    let resizeTimer = 0, builtW = 0, builtH = 0;
    new ResizeObserver(() => {
      if (host.clientWidth === builtW && host.clientHeight === builtH) return;
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => { builtW = host.clientWidth; builtH = host.clientHeight; build(); startTags(); frame(performance.now()); }, builtW ? 160 : 0);
    }).observe(host);

    new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !still && !looping) { looping = true; requestAnimationFrame(loop); }
    }).observe(host);
  }

  const city = document.getElementById("city");
  if (city) {
    const facts = document.getElementById("facts");
    createScene(city, NIGHT, {
      seed: 20261,
      parallax: true,
      ground: () => (facts ? facts.offsetHeight : 0),
      tags: [...document.querySelectorAll(".sky .tag")]
    });
  }

  const dawn = document.getElementById("dawn");
  if (dawn) {
    createScene(dawn, DAWN, { seed: 977, flat: true, flatHeights: [[0.1, 0.34], [0.07, 0.24], [0.03, 0.12]] });
  }
})();
