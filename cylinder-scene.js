import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js';

function showBootError(err) {
    console.error(err);
    const box = document.getElementById('boot-error');
    if (!box) return;
    box.hidden = false;
    box.textContent = `Scene failed to load: ${err?.message || err}`;
}

try {

const RINGS = [
    {
        accent: '#c8ff4a',
        ringColor: '#121508',
        speed: 0.0018,
        items: [
            {
                tag: '// NOVA-X AIR',
                title: 'NOVA-X AIR',
                stat: '8×8',
                statLabel: 'Launchpad Pro MK3 grid on iPad',
                body: 'Professional MIDI control surface built for Ableton Live session workflow. Touch-first. Zero menu diving.',
                tags: ['Session', 'Sequencer', 'Note & Chord', 'Custom'],
            },
            {
                tag: '// FUSE VOID',
                title: 'REAL-TIME',
                stat: '0ms',
                statLabel: 'CoreMIDI on-device latency',
                body: 'Designed for live performance. Clip launch, pattern edit, and transport without leaving the grid.',
                tags: ['iPad Landscape', 'RGB Pads', 'Transport Rail'],
            },
            {
                tag: '// HARDWARE',
                title: 'LAUNCHPAD MK3',
                stat: '128',
                statLabel: 'Velocity-sensitive RGB pads',
                body: 'Maps 1:1 to Ableton Remote scripts. Works with physical Launchpad or virtual IAC MIDI ports.',
                tags: ['Ableton Live 11/12', 'CoreMIDI', 'Offline'],
            },
            {
                tag: '// WORKFLOW',
                title: 'PERFORM',
                stat: '5',
                statLabel: 'Performance modes on one surface',
                body: 'Session, Note, Chord, Custom, and Sequencer — switch instantly from the mode strip.',
                tags: ['Clip Grid', 'Scale Lock', 'Mixer Pages'],
            },
        ],
    },
    {
        accent: '#ffffff',
        ringColor: '#111111',
        speed: -0.0014,
        items: [
            {
                tag: '// SESSION',
                title: 'CLIP GRID',
                stat: '64',
                statLabel: 'Session slots — 8 rows × 8 columns',
                body: 'One tap to launch, queue, or record clips. Full Ableton session view mirrored on the pad matrix.',
                tags: ['MIDI Ch1', 'Clip Launch', 'Queue', 'Record'],
            },
            {
                tag: '// ABLETON',
                title: 'REMOTE',
                stat: '1:1',
                statLabel: 'Launchpad Pro MK3 mapping',
                body: 'Session clips fire on Channel 1. SysEx feedback returns clip name and color to the grid.',
                tags: ['SysEx Feedback', 'Clip Metadata', 'Color Sync'],
            },
            {
                tag: '// MAPPING',
                title: 'CLIP EDITOR',
                stat: '∞',
                statLabel: 'Per-pad note & channel assign',
                body: 'Remap any pad to a different clip slot, note, or MIDI channel from the mapping editor.',
                tags: ['Note Assign', 'Channel Route', 'Slot Map'],
            },
            {
                tag: '// LIVE SET',
                title: 'SESSION',
                stat: 'A–H',
                statLabel: 'Scene & clip row control',
                body: 'Stop all clips, select scenes, and navigate rows — built for stage and studio sessions.',
                tags: ['Scene Launch', 'Row Select', 'Stop All'],
            },
        ],
    },
    {
        accent: '#ffb08a',
        ringColor: '#161008',
        speed: 0.0016,
        items: [
            {
                tag: '// NOTE',
                title: 'SCALE LOCK',
                stat: '5',
                statLabel: 'Scales — Major, Minor, Dorian & more',
                body: 'Lock pads to a musical scale. Set root note and compact or expanded grid layout for performance.',
                tags: ['Chromatic', 'Pentatonic', 'Root Note', 'Compact View'],
            },
            {
                tag: '// CHORD',
                title: 'CHORD MODE',
                stat: '4',
                statLabel: 'Chord memory recall slots',
                body: 'Play full chords from a single pad. Maj, Min, Min7, Sus4 — save custom intervals to memory.',
                tags: ['Maj / Min', 'Min7', 'Sus4', 'Custom Intervals'],
            },
            {
                tag: '// MELODY',
                title: 'NOTE MODE',
                stat: 'Ch2',
                statLabel: 'Default instrument MIDI channel',
                body: 'Melodic performance with scale-aware pad layout. Every pad sends the right note in key.',
                tags: ['Instrument', 'Velocity', 'Octave Span'],
            },
            {
                tag: '// DRUMS',
                title: 'DRUM RACK',
                stat: '4×4',
                statLabel: 'Classic drum machine layout',
                body: 'Kick, snare, hats, toms mapped in 4×4 grid inside Custom mode — finger drumming ready.',
                tags: ['Kick', 'Snare', 'Hi-Hat', 'Toms'],
            },
        ],
    },
    {
        accent: '#9bb8e1',
        ringColor: '#0a1018',
        speed: -0.0012,
        items: [
            {
                tag: '// SEQUENCER',
                title: 'STEP ENGINE',
                stat: '32',
                statLabel: 'Steps per pattern — 4 tracks',
                body: 'Precision 16th-note sequencer with live record, quantization, and per-track MIDI output.',
                tags: ['4 Tracks', 'Live Record', 'Quantize', 'Ch9–12'],
            },
            {
                tag: '// GROOVE',
                title: 'SWING',
                stat: '±',
                statLabel: 'Per-step micro timing offset',
                body: 'Swing amount and micro offset per step for human feel. Tighten or loosen the entire pattern.',
                tags: ['Micro Timing', 'Swing Control', 'Accent'],
            },
            {
                tag: '// GENERATIVE',
                title: 'PROBABILITY',
                stat: '%',
                statLabel: 'Step probability & velocity',
                body: 'Set hit probability per step. CC automation values with configurable controller per track.',
                tags: ['Velocity', 'CC Automate', 'Random Hits'],
            },
            {
                tag: '// TRANSPORT',
                title: 'CLOCK',
                stat: '40–240',
                statLabel: 'BPM range — internal or external',
                body: 'Sync to Ableton via MIDI clock. Play, stop, continue — metronome with visual playhead.',
                tags: ['External Sync', 'Metronome', 'Playhead'],
            },
        ],
    },
    {
        accent: '#e8943a',
        ringColor: '#141008',
        speed: 0.0015,
        items: [
            {
                tag: '// CUSTOM',
                title: 'MIXER',
                stat: '11',
                statLabel: 'Channels — volume, pan, mute, solo',
                body: 'Full mixer pages inside Custom mode. Mute, solo, arm tracks — pan and volume per channel.',
                tags: ['Volume', 'Pan', 'Mute', 'Solo / Arm'],
            },
            {
                tag: '// MIDI BUS',
                title: 'NOVAX HUB',
                stat: 'Ch1–12',
                statLabel: 'Routed MIDI output channels',
                body: 'NovaxMIDIHub — single authority for all MIDI I/O. Session, instrument, and sequencer routing.',
                tags: ['CoreMIDI', 'IAC Virtual', 'Export'],
            },
            {
                tag: '// DEVICE',
                title: '8 PAGES',
                stat: 'Custom',
                statLabel: 'User-assignable device layouts',
                body: 'Eight custom mode pages for mixer, device control, drum rack, and melodic layouts.',
                tags: ['Device Ctrl', 'Drum Layout', 'User Maps'],
            },
            {
                tag: '// PRIVACY',
                title: 'OFFLINE',
                stat: '0',
                statLabel: 'Data collected — none',
                body: 'MIDI stays on device via CoreMIDI. No cloud sync. No tracking. Your set is yours alone.',
                tags: ['No Cloud', 'No Cookies', 'On-Device'],
            },
        ],
    },
    {
        accent: '#f2f2f2',
        ringColor: '#0c0c0c',
        speed: -0.0011,
        items: [
            {
                tag: '// PROJECTS',
                title: '126 SLOTS',
                stat: '126',
                statLabel: 'Full project save & load',
                body: 'Save complete snapshots — clips, mixer, sequencer, scale, chord memory, and mode state.',
                tags: ['Save / Load', 'Snapshots', 'Slot Stepper'],
            },
            {
                tag: '// UNDO',
                title: 'HISTORY',
                stat: '∞',
                statLabel: 'Undo stack — step back safely',
                body: 'Non-destructive undo during live editing. Recover from mistakes without stopping playback.',
                tags: ['Undo Stack', 'Snapshots', 'Safe Edit'],
            },
            {
                tag: '// DESIGN',
                title: 'SWISS UI',
                stat: '8pt',
                statLabel: 'Grid system — color means mode',
                body: 'Swiss Futurism aesthetic. Dark canvas, high contrast, Blade Runner boot sequence atmosphere.',
                tags: ['Cyber Grid', 'Mode Colors', 'Boot Screen'],
            },
            {
                tag: '// COMING',
                title: 'APP STORE',
                stat: '2026',
                statLabel: 'Fuse Void Music Engine',
                body: 'NOVA-X AIR — Launchpad & Ableton MIDI for iPad. Built for speed. Built for you.',
                tags: ['iOS iPad', 'Silicon Native', 'Fuse Void'],
            },
        ],
    },
];

const RING_RADIUS = 4.55;
const RING_HEIGHT = 1.28;
const RING_GAP = 3.35;
const PANEL_W = 2.15;
const PANEL_H = 0.68;

const canvas = document.getElementById('scene-canvas');
const scrollSpacer = document.getElementById('scroll-spacer');
const scrollBar = document.getElementById('scroll-bar');
const focusLayer = document.getElementById('focus-layer');
const focusClose = document.getElementById('focus-close');
const focusCard = document.getElementById('focus-card');
const focusEls = {
    tag: document.getElementById('focus-tag'),
    title: document.getElementById('focus-title'),
    stat: document.getElementById('focus-stat'),
    statLabel: document.getElementById('focus-stat-label'),
    body: document.getElementById('focus-body'),
    tags: document.getElementById('focus-tags'),
};

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0x050505, 1);

const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x050505, 16, 48);

const camera = new THREE.PerspectiveCamera(42, innerWidth / innerHeight, 0.1, 100);
camera.position.set(0, 2.5, 11.5);
camera.lookAt(0, 0, 0);

scene.add(new THREE.AmbientLight(0xffffff, 0.78));
const key = new THREE.DirectionalLight(0xffffff, 1.15);
key.position.set(4, 8, 10);
scene.add(key);
const rim = new THREE.DirectionalLight(0x88aaff, 0.4);
rim.position.set(-6, -2, -4);
scene.add(rim);

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const clickable = [];
const ringBodies = [];
const ringGroups = [];

let scrollTarget = 0;
let scrollCurrent = 0;
let activePanel = null;
let pausedRing = null;
let isDragging = false;
let dragLastX = 0;
let dragOriginX = 0;
let dragRing = null;

function wrapTextLines(ctx, text, maxWidth) {
    const words = text.split(' ');
    const lines = [];
    let line = '';
    for (const word of words) {
        const test = line ? `${line} ${word}` : word;
        if (ctx.measureText(test).width > maxWidth && line) {
            lines.push(line);
            line = word;
        } else {
            line = test;
        }
    }
    if (line) lines.push(line);
    return lines;
}

function drawLines(ctx, lines, x, y, lineHeight) {
    lines.forEach((ln) => {
        ctx.fillText(ln, x, y);
        y += lineHeight;
    });
    return y;
}

function truncateLine(ctx, text, maxWidth) {
    if (ctx.measureText(text).width <= maxWidth) return text;
    let t = text;
    while (t.length > 1 && ctx.measureText(`${t}…`).width > maxWidth) t = t.slice(0, -1);
    return `${t}…`;
}

function makeCompactPanelTexture(item, accent) {
    const c = document.createElement('canvas');
    c.width = 420;
    c.height = 128;
    const ctx = c.getContext('2d');
    const pad = 14;
    const w = c.width - pad * 2;

    ctx.clearRect(0, 0, c.width, c.height);
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';

    let y = 10;
    if (item.tag) {
        ctx.fillStyle = accent;
        ctx.globalAlpha = 0.88;
        ctx.font = '600 11px "JetBrains Mono", ui-monospace, monospace';
        ctx.fillText(truncateLine(ctx, item.tag.toUpperCase(), w), pad, y);
        y += 16;
    }

    ctx.globalAlpha = 1;
    ctx.fillStyle = accent;
    ctx.font = '800 22px Inter, system-ui, sans-serif';
    const titleLines = wrapTextLines(ctx, item.title, w).slice(0, 2);
    y = drawLines(ctx, titleLines, pad, y, 24) + 2;

    if (item.stat) {
        ctx.font = '700 18px Inter, system-ui, sans-serif';
        ctx.fillText(truncateLine(ctx, item.stat, w), pad, y);
        y += 22;
        if (item.statLabel) {
            ctx.fillStyle = 'rgba(255,255,255,0.5)';
            ctx.font = '400 10px Inter, system-ui, sans-serif';
            ctx.fillText(truncateLine(ctx, item.statLabel, w), pad, y);
        }
    }

    const tex = new THREE.CanvasTexture(c);
    tex.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy());
    return tex;
}

function createRing(config, y, index) {
    const group = new THREE.Group();
    group.position.y = y;
    group.userData.speed = config.speed;
    group.userData.rotationY = index * 0.35;
    group.userData.paused = false;
    group.userData.dragVelocity = 0;

    const tagRingPart = (mesh) => {
        mesh.userData.ringRoot = group;
        ringBodies.push(mesh);
    };

    const ringGeo = new THREE.CylinderGeometry(RING_RADIUS, RING_RADIUS, RING_HEIGHT, 80, 1, true);
    const ringMat = new THREE.MeshStandardMaterial({
        color: config.ringColor,
        emissive: config.accent,
        emissiveIntensity: 0.06,
        metalness: 0.25,
        roughness: 0.65,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.48,
        depthWrite: false,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.y = Math.PI * 0.5;
    tagRingPart(ringMesh);
    group.add(ringMesh);

    const edgeGeo = new THREE.TorusGeometry(RING_RADIUS, 0.032, 10, 100);
    const edgeMat = new THREE.MeshBasicMaterial({ color: config.accent, transparent: true, opacity: 0.88 });
    const topEdge = new THREE.Mesh(edgeGeo, edgeMat);
    topEdge.rotation.x = Math.PI / 2;
    topEdge.position.y = RING_HEIGHT * 0.48;
    tagRingPart(topEdge);
    group.add(topEdge);
    const botEdge = new THREE.Mesh(edgeGeo, edgeMat);
    botEdge.rotation.x = Math.PI / 2;
    botEdge.position.y = -RING_HEIGHT * 0.48;
    tagRingPart(botEdge);
    group.add(botEdge);

    config.items.forEach((item, i) => {
        const angle = (i / config.items.length) * Math.PI * 2 + 0.2;
        const tex = makeCompactPanelTexture(item, config.accent);
        const mat = new THREE.MeshBasicMaterial({
            map: tex,
            transparent: true,
            depthWrite: false,
            side: THREE.DoubleSide,
            opacity: 0.9,
        });
        const panel = new THREE.Mesh(new THREE.PlaneGeometry(PANEL_W, PANEL_H), mat);
        const px = Math.cos(angle) * (RING_RADIUS + 0.06);
        const pz = Math.sin(angle) * (RING_RADIUS + 0.06);
        panel.position.set(px, 0, pz);
        panel.lookAt(px * 2.5, 0, pz * 2.5);

        panel.userData = {
            ring: group,
            ringRoot: group,
            home: panel.position.clone(),
            accent: config.accent,
            item,
            title: item.title,
            focused: false,
            pop: 0,
        };
        group.add(panel);
        clickable.push(panel);
    });

    scene.add(group);
    ringGroups.push(group);
    return group;
}

const totalHeight = (RINGS.length - 1) * RING_GAP;
RINGS.forEach((cfg, i) => createRing(cfg, -i * RING_GAP, i));

scrollSpacer.style.height = `${(RINGS.length + 1) * 100}vh`;

function resumeRing(group) {
    if (group) group.userData.paused = false;
}

function pauseRing(group) {
    if (group) group.userData.paused = true;
}

function resetPanel(panel) {
    panel.userData.focused = false;
    panel.userData.pop = 0;
}

function hideFocusCard() {
    focusLayer.classList.remove('is-open');
    focusLayer.hidden = true;
    focusLayer.setAttribute('aria-hidden', 'true');
}

function showFocusCard(item, accent) {
    const color = accent || '#c8ff4a';
    focusCard.style.borderColor = `${color}44`;
    focusCard.style.boxShadow = `0 24px 80px rgba(0,0,0,0.45), 0 0 0 1px ${color}22 inset`;
    focusEls.tag.textContent = item.tag || '';
    focusEls.tag.style.color = color;
    focusEls.title.textContent = item.title;
    focusEls.title.style.color = color;
    focusEls.stat.textContent = item.stat || '';
    focusEls.stat.style.color = color;
    focusEls.stat.hidden = !item.stat;
    focusEls.statLabel.textContent = item.statLabel || '';
    focusEls.statLabel.hidden = !item.statLabel;
    focusEls.body.textContent = item.body || '';
    focusEls.tags.innerHTML = '';
    (item.tags || []).forEach((tag) => {
        const li = document.createElement('li');
        li.textContent = tag;
        focusEls.tags.appendChild(li);
    });
    focusLayer.hidden = false;
    focusLayer.setAttribute('aria-hidden', 'false');
    requestAnimationFrame(() => focusLayer.classList.add('is-open'));
}

function clearFocus() {
    if (activePanel) resetPanel(activePanel);
    if (pausedRing) resumeRing(pausedRing);
    activePanel = null;
    pausedRing = null;
    hideFocusCard();
}

function focusPanel(panel) {
    if (activePanel === panel) {
        clearFocus();
        return;
    }
    if (activePanel) resetPanel(activePanel);
    if (pausedRing && pausedRing !== panel.userData.ring) resumeRing(pausedRing);
    activePanel = panel;
    pausedRing = panel.userData.ring;
    panel.userData.focused = true;
    pauseRing(pausedRing);
    showFocusCard(panel.userData.item, panel.userData.accent);
}

function setPointerFromEvent(clientX, clientY) {
    const rect = canvas.getBoundingClientRect();
    pointer.x = ((clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((clientY - rect.top) / rect.height) * 2 + 1;
}

function pickRingAt(clientX, clientY) {
    setPointerFromEvent(clientX, clientY);
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects([...clickable, ...ringBodies], false);
    if (!hits.length) return null;
    return hits[0].object.userData.ringRoot || hits[0].object.userData.ring || null;
}

function applyRingDrag(group, dx) {
    if (!group || !dx) return;
    group.userData.rotationY += dx * 0.009;
    group.userData.dragVelocity += dx * 0.018;
}

function onPointerDown(e) {
    isDragging = true;
    dragOriginX = e.clientX;
    dragLastX = e.clientX;
    dragRing = pickRingAt(e.clientX, e.clientY);
    document.body.classList.add('is-dragging');
}

function onPointerUp(e) {
    if (!isDragging) return;
    const moved = Math.abs(e.clientX - dragOriginX);
    isDragging = false;
    dragRing = null;
    document.body.classList.remove('is-dragging');
    if (moved > 6) return;

    setPointerFromEvent(e.clientX, e.clientY);
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(clickable, false);
    if (hits.length) focusPanel(hits[0].object);
    else clearFocus();
}

function onPointerMove(e) {
    if (!isDragging) return;
    const dx = e.clientX - dragLastX;
    if (dragRing) applyRingDrag(dragRing, dx);
    dragLastX = e.clientX;
}

canvas.addEventListener('pointerdown', onPointerDown);
window.addEventListener('pointerup', onPointerUp);
window.addEventListener('pointermove', onPointerMove);
focusClose.addEventListener('click', clearFocus);
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && activePanel) clearFocus();
});

window.addEventListener('wheel', (e) => {
    scrollTarget = THREE.MathUtils.clamp(scrollTarget + e.deltaY * 0.004, 0, 1);
}, { passive: true });

window.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) dragLastX = e.touches[0].clientX;
}, { passive: true });

window.addEventListener('touchmove', (e) => {
    if (e.touches.length === 1) {
        scrollTarget = THREE.MathUtils.clamp(
            scrollTarget + (dragLastX - e.touches[0].clientX) * 0.003, 0, 1
        );
        dragLastX = e.touches[0].clientX;
    }
}, { passive: true });

function resize() {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
}
window.addEventListener('resize', resize);
resize();

const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    const t = clock.getElapsedTime();

    scrollCurrent += (scrollTarget - scrollCurrent) * 0.07;
    scrollBar.style.width = `${scrollCurrent * 100}%`;

    const camY = 2.5 - scrollCurrent * totalHeight;
    camera.position.y += (camY - camera.position.y) * 0.08;
    camera.position.x = Math.sin(t * 0.12) * 0.35;
    camera.lookAt(0, camY - 1.2, 0);

    ringGroups.forEach((group) => {
        if (!group.userData.paused) {
            group.userData.rotationY += group.userData.speed * 60 * delta;
        }
        if (group.userData.dragVelocity) {
            group.userData.rotationY += group.userData.dragVelocity * delta * 60;
            group.userData.dragVelocity *= 0.93;
            if (Math.abs(group.userData.dragVelocity) < 0.0002) group.userData.dragVelocity = 0;
        }
        group.rotation.y = group.userData.rotationY;
    });

    clickable.forEach((panel) => {
        const targetPop = panel.userData.focused ? 1 : 0;
        panel.userData.pop += (targetPop - panel.userData.pop) * 0.09;

        const home = panel.userData.home;
        const outward = home.clone().normalize();
        const popDist = 0.35 * panel.userData.pop;
        panel.position.set(
            home.x + outward.x * popDist,
            home.y,
            home.z + outward.z * popDist
        );

        const scale = 1 + panel.userData.pop * 0.12;
        panel.scale.set(scale, scale, scale);

        const baseOp = panel.userData.focused ? 0.35 : 0.88;
        if (panel.material.map) panel.material.opacity = baseOp;
    });

    renderer.render(scene, camera);
}

animate();

} catch (err) {
    showBootError(err);
}
