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
        screen: { src: 'images/nova-1-session.png', title: 'Session', caption: '8×8 clip grid · scene launch · transport' },
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
        screen: { src: 'images/nova-1-session.png', title: 'Clip Grid', caption: 'Session view · Ableton Remote · SysEx feedback' },
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
        screen: { src: 'images/nova-2-note.png', title: 'Note', caption: 'Scale lock · root note · CH 2 instrument' },
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
        screen: { src: 'images/nova-5-sequencer.png', title: 'Sequencer', caption: '4 tracks · 32 steps · swing · probability' },
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
        screen: { src: 'images/nova-4-custom.png', title: 'Custom', caption: 'Mixer pages · volume · pan · mute · solo' },
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
        screen: { src: 'images/nova-3-chord.png', title: 'Chord', caption: 'Chord memory · Min7 · save & recall slots' },
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
const RING_HEIGHT = 1.38;
const RING_GAP = 3.35;
const PANEL_W = 2.75;
const PANEL_H = 0.72;
const PANEL_ARC = 2.05;
const SCREEN_ARC = 1.15;
const SCREEN_H = 0.86;
const PANEL_RADIUS = RING_RADIUS + 0.058;
const RING_SLOTS = 10;
const SCREEN_SLOT = 4;

const canvas = document.getElementById('scene-canvas');
const scrollSpacer = document.getElementById('scroll-spacer');
const cylinderGap = document.getElementById('cylinder-gap');
const scrollBar = document.getElementById('scroll-bar');
const focusLayer = document.getElementById('focus-layer');
const focusClose = document.getElementById('focus-close');
const focusCard = document.getElementById('focus-card');
const focusText = document.getElementById('focus-text');
const focusFigure = document.getElementById('focus-figure');
const focusImage = document.getElementById('focus-image');
const focusScreenCaption = document.getElementById('focus-screen-caption');
const focusScreenTag = document.getElementById('focus-screen-tag');
const focusEls = {
    tag: document.getElementById('focus-tag'),
    title: document.getElementById('focus-title'),
    stat: document.getElementById('focus-stat'),
    statLabel: document.getElementById('focus-stat-label'),
    body: document.getElementById('focus-body'),
    tags: document.getElementById('focus-tags'),
    rule: document.getElementById('focus-rule'),
};

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0x020408, 1);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x010208);
scene.fog = new THREE.FogExp2(0x02040a, 0.018);

const camera = new THREE.PerspectiveCamera(42, innerWidth / innerHeight, 0.1, 120);
camera.position.set(0, 2.5, 11.5);
camera.lookAt(0, 0, 0);

scene.add(new THREE.HemisphereLight(0x1a2844, 0x050508, 0.35));
scene.add(new THREE.AmbientLight(0x0c1424, 0.22));
const sunLight = new THREE.DirectionalLight(0xffc890, 1.55);
sunLight.position.set(12, 4, 8);
scene.add(sunLight);
const coldLight = new THREE.DirectionalLight(0x3d5f8a, 0.32);
coldLight.position.set(-7, -1, -5);
scene.add(coldLight);

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
let dragLastY = 0;
let dragOriginX = 0;
let dragOriginY = 0;
let dragRing = null;
let sceneFade = 1;

function makeStarSpriteTexture() {
    const size = 64;
    const c = document.createElement('canvas');
    c.width = size;
    c.height = size;
    const ctx = c.getContext('2d');
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(0.035, 'rgba(255,252,248,0.82)');
    g.addColorStop(0.1, 'rgba(220,230,255,0.22)');
    g.addColorStop(0.28, 'rgba(180,200,255,0.05)');
    g.addColorStop(1, 'rgba(120,160,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    const tex = new THREE.CanvasTexture(c);
    tex.needsUpdate = true;
    return tex;
}

const starSpriteTex = makeStarSpriteTexture();
const starParticles = [];
let starMouseX = innerWidth * 0.5;
let starMouseY = innerHeight * 0.5;
const _starProj = new THREE.Vector3();
const _bhLocal = new THREE.Vector3(0, 26, -8);
const _bhWorld = new THREE.Vector3();

const BLACK_HOLE = {
    radius: 2.4,
    swallowRadius: 3.1,
    pullStrength: 10,
};

function starColor(spectral, brightness) {
    const b = brightness;
    switch (spectral) {
    case 'nova_cyan':
        return new THREE.Color().setHSL(0.52, 0.72, 0.48 + b * 0.38);
    case 'supernova':
        return new THREE.Color().setHSL(0.03, 0.82, 0.42 + b * 0.42);
    case 'nebula':
        return new THREE.Color().setHSL(0.86, 0.58, 0.46 + b * 0.36);
    case 'blue':
        return new THREE.Color().setHSL(0.58, 0.48, 0.62 + b * 0.32);
    case 'gold':
        return new THREE.Color().setHSL(0.13, 0.32, 0.68 + b * 0.28);
    case 'warm':
        return new THREE.Color().setHSL(0.07, 0.52, 0.55 + b * 0.3);
    case 'ember':
        return new THREE.Color().setHSL(0.02, 0.45, 0.38 + b * 0.28);
    case 'dim':
        return new THREE.Color().setHSL(0.62, 0.06, 0.28 + b * 0.22);
    default:
        return new THREE.Color().setHSL(0.62, 0.05, 0.62 + b * 0.28);
    }
}

function pickSpectral(roll) {
    if (roll < 0.035) return 'nova_cyan';
    if (roll < 0.065) return 'supernova';
    if (roll < 0.09) return 'nebula';
    if (roll < 0.17) return 'blue';
    if (roll < 0.32) return 'white';
    if (roll < 0.48) return 'gold';
    if (roll < 0.62) return 'warm';
    if (roll < 0.78) return 'ember';
    return 'dim';
}

function addStarSample(x, y, z, brightness, spectral, positions, colors, idx) {
    starParticles.push({
        bx: x, by: y, bz: z,
        ox: 0, oy: 0, oz: 0,
        brightness,
        layer: 'field',
    });
    const col = starColor(spectral, brightness);
    positions[idx * 3] = x;
    positions[idx * 3 + 1] = y;
    positions[idx * 3 + 2] = z;
    colors[idx * 3] = col.r;
    colors[idx * 3 + 1] = col.g;
    colors[idx * 3 + 2] = col.b;
}

function respawnStarParticle(p) {
    p.ox = 0;
    p.oy = 0;
    p.oz = 0;
    const r = 20 + Math.random() * 46;
    const theta = Math.random() * Math.PI * 2;
    p.bx = r * Math.cos(theta) * (0.65 + Math.random() * 0.7);
    p.by = -14 - Math.random() * 32;
    p.bz = -(20 + Math.random() * 44);
}

function buildStarfield() {
    const count = innerWidth < 768 ? 520 : 920;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    starParticles.length = 0;
    const placed = [];
    const minSep = innerWidth < 768 ? 4.2 : 3.6;

    const canPlace = (x, y, z) => {
        for (let i = 0; i < placed.length; i += 1) {
            const p = placed[i];
            const dx = x - p.x;
            const dy = y - p.y;
            const dz = z - p.z;
            if (dx * dx + dy * dy + dz * dz < minSep * minSep) return false;
        }
        placed.push({ x, y, z });
        return true;
    };

    const tryAddStar = (x, y, z, brightness, spectral, idxRef) => {
        if (!canPlace(x, y, z)) return idxRef;
        addStarSample(x, y, z, brightness, spectral, positions, colors, idxRef);
        return idxRef + 1;
    };

    let idx = 0;
    const openClusters = [
        { x: -28, y: -8, z: -62, spread: 22, stars: 7 },
        { x: 32, y: -16, z: -68, spread: 20, stars: 6 },
    ];
    openClusters.forEach((cl) => {
        for (let n = 0; n < cl.stars && idx < count; n += 1) {
            let attempts = 0;
            while (attempts < 12 && idx < count) {
                attempts += 1;
                const brightness = 0.35 + Math.pow(Math.random(), 2.2) * 0.55;
                const spectral = pickSpectral(Math.random());
                const x = cl.x + (Math.random() - 0.5) * cl.spread;
                const y = cl.y + (Math.random() - 0.5) * cl.spread;
                const z = cl.z + (Math.random() - 0.5) * cl.spread * 0.55;
                idx = tryAddStar(x, y, z, brightness, spectral, idx);
                if (attempts > 4) break;
            }
        }
    });

    let attempts = 0;
    while (idx < count && attempts < count * 14) {
        attempts += 1;
        const r = 18 + Math.random() * 62;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = r * Math.sin(phi) * Math.sin(theta) * 0.55;
        const z = -(28 + Math.random() * 52);
        const brightness = Math.pow(Math.random(), 3.4);
        const spectral = pickSpectral(Math.random());
        idx = tryAddStar(x, y, z, brightness, spectral, idx);
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions.slice(0, idx * 3), 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors.slice(0, idx * 3), 3));
    starParticles.length = idx;

    const mat = new THREE.PointsMaterial({
        map: starSpriteTex,
        size: innerWidth < 768 ? 1.15 : 1.45,
        sizeAttenuation: true,
        vertexColors: true,
        transparent: true,
        opacity: 0.78,
        depthWrite: false,
        depthTest: true,
        fog: false,
        toneMapped: false,
        blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geo, mat);
    points.renderOrder = 0;
    points.frustumCulled = false;

    const fieldCount = idx;
    const brightCount = innerWidth < 768 ? 18 : 34;
    const bPos = new Float32Array(brightCount * 3);
    const bCol = new Float32Array(brightCount * 3);
    const brightPlaced = [];
    let bIdx = 0;
    let bAttempts = 0;
    while (bIdx < brightCount && bAttempts < brightCount * 30) {
        bAttempts += 1;
        const r = 16 + Math.random() * 58;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = r * Math.sin(phi) * Math.sin(theta) * 0.5;
        const z = -(30 + Math.random() * 48);
        let ok = true;
        for (let j = 0; j < brightPlaced.length; j += 1) {
            const p = brightPlaced[j];
            const dx = x - p.x;
            const dy = y - p.y;
            const dz = z - p.z;
            if (dx * dx + dy * dy + dz * dz < 8 * 8) ok = false;
        }
        if (!ok) continue;
        brightPlaced.push({ x, y, z });
        const brightness = 0.78 + Math.random() * 0.22;
        const roll = Math.random();
        const spectral = roll < 0.12 ? 'nova_cyan' : roll < 0.22 ? 'supernova' : roll < 0.32 ? 'nebula' : roll < 0.5 ? 'blue' : 'gold';
        addStarSample(x, y, z, brightness, spectral, bPos, bCol, bIdx);
        starParticles[fieldCount + bIdx].layer = 'bright';
        bIdx += 1;
    }

    const bGeo = new THREE.BufferGeometry();
    bGeo.setAttribute('position', new THREE.BufferAttribute(bPos.slice(0, bIdx * 3), 3));
    bGeo.setAttribute('color', new THREE.BufferAttribute(bCol.slice(0, bIdx * 3), 3));
    const bMat = new THREE.PointsMaterial({
        map: starSpriteTex,
        size: innerWidth < 768 ? 2.8 : 3.6,
        sizeAttenuation: true,
        vertexColors: true,
        transparent: true,
        opacity: 0.92,
        depthWrite: false,
        depthTest: true,
        fog: false,
        toneMapped: false,
        blending: THREE.AdditiveBlending,
    });
    const brightPoints = new THREE.Points(bGeo, bMat);
    brightPoints.renderOrder = 0;
    brightPoints.frustumCulled = false;

    return {
        points,
        brightPoints,
        geo,
        bGeo,
        mat,
        bMat,
        fieldCount,
        brightCount: bIdx,
    };
}

const starfieldData = buildStarfield();
const starfield = new THREE.Group();
starfield.add(starfieldData.points);
starfield.add(starfieldData.brightPoints);
scene.add(starfield);

function createBlackHole() {
    const group = new THREE.Group();
    const disc = new THREE.Mesh(
        new THREE.CircleGeometry(BLACK_HOLE.radius, 72),
        new THREE.MeshBasicMaterial({
            color: 0x000000,
            depthWrite: true,
            side: THREE.DoubleSide,
        }),
    );
    disc.renderOrder = 12;
    group.add(disc);

    const rim = new THREE.Mesh(
        new THREE.RingGeometry(BLACK_HOLE.radius * 0.92, BLACK_HOLE.radius * 1.12, 72),
        new THREE.MeshBasicMaterial({
            color: 0x2a1408,
            transparent: true,
            opacity: 0.55,
            side: THREE.DoubleSide,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
        }),
    );
    rim.renderOrder = 13;
    group.add(rim);

    const glow = new THREE.Mesh(
        new THREE.RingGeometry(BLACK_HOLE.radius * 1.08, BLACK_HOLE.radius * 1.55, 72),
        new THREE.MeshBasicMaterial({
            color: 0xff5522,
            transparent: true,
            opacity: 0.07,
            side: THREE.DoubleSide,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
        }),
    );
    glow.renderOrder = 11;
    group.add(glow);

    return group;
}

const blackHole = createBlackHole();
scene.add(blackHole);

function getBlackHoleWorldPosition(out) {
    out.copy(_bhLocal);
    out.applyQuaternion(camera.quaternion);
    out.add(camera.position);
    return out;
}

function updateStarPositions(geo, startIdx, count, delta) {
    const starPos = geo.attributes.position;
    const bhX = _bhLocal.x;
    const bhY = _bhLocal.y;
    const bhZ = _bhLocal.z;

    for (let i = 0; i < count; i += 1) {
        const p = starParticles[startIdx + i];

        const sdx = bhX - p.bx;
        const sdy = bhY - p.by;
        const sdz = bhZ - p.bz;
        const sDist = Math.hypot(sdx, sdy, sdz);
        if (sDist < BLACK_HOLE.swallowRadius) {
            respawnStarParticle(p);
        } else {
            const pull = (BLACK_HOLE.pullStrength / (sDist * sDist + 18)) * delta * 42;
            p.bx += (sdx / sDist) * pull;
            p.by += (sdy / sDist) * pull;
            p.bz += (sdz / sDist) * pull;
        }

        const lx = p.bx + p.ox;
        const ly = p.by + p.oy;
        const lz = p.bz + p.oz;

        _starProj.set(lx, ly, lz);
        _starProj.applyMatrix4(starfield.matrixWorld);
        _starProj.project(camera);
        const sx = (_starProj.x * 0.5 + 0.5) * innerWidth;
        const sy = (-_starProj.y * 0.5 + 0.5) * innerHeight;
        const mdx = sx - starMouseX;
        const mdy = sy - starMouseY;
        const dist = Math.hypot(mdx, mdy);

        let targetOx = 0;
        let targetOy = 0;
        let targetOz = 0;
        if (dist < 160 && dist > 0 && sceneFade > 0.08) {
            const force = (1 - dist / 160) * 0.92;
            const push = force * (0.35 + p.brightness * 0.55);
            targetOx = (mdx / dist) * push;
            targetOy = (-mdy / dist) * push;
            targetOz = force * 0.06;
        }

        p.ox += (targetOx - p.ox) * 0.13;
        p.oy += (targetOy - p.oy) * 0.13;
        p.oz += (targetOz - p.oz) * 0.13;

        starPos.array[i * 3] = p.bx + p.ox;
        starPos.array[i * 3 + 1] = p.by + p.oy;
        starPos.array[i * 3 + 2] = p.bz + p.oz;
    }
    starPos.needsUpdate = true;
}

function createAsteroidGeometry(radius, seed) {
    const detail = radius > 0.28 ? 2 : 1;
    const geo = new THREE.IcosahedronGeometry(radius, detail);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i += 1) {
        const x = pos.getX(i);
        const y = pos.getY(i);
        const z = pos.getZ(i);
        const len = Math.hypot(x, y, z) || 1;
        const nx = x / len;
        const ny = y / len;
        const nz = z / len;
        const n1 = Math.sin(nx * 6.1 + seed) * Math.cos(ny * 5.3 + seed * 1.7);
        const n2 = Math.sin(ny * 7.9 + nz * 4.2 + seed * 2.1);
        const n3 = Math.cos(nz * 5.5 + nx * 8.3 + seed * 0.6);
        const bump = 0.68 + (n1 * 0.22 + n2 * 0.14 + n3 * 0.12);
        const crater = Math.max(0, Math.sin(nx * 14 + nz * 11 + seed)) * 0.07;
        const r = radius * Math.max(0.45, bump - crater);
        pos.setXYZ(i, nx * r, ny * r, nz * r);
    }
    geo.computeVertexNormals();
    return geo;
}

function createAsteroidMaterial(seed) {
    const tone = 0.035 + (seed % 1) * 0.07;
    const warm = seed > 0.55;
    return new THREE.MeshStandardMaterial({
        color: new THREE.Color().setRGB(
            tone * (warm ? 1.08 : 0.92),
            tone * (warm ? 0.95 : 0.98),
            tone * (warm ? 0.82 : 1.05),
        ),
        roughness: 0.86 + (seed % 0.12),
        metalness: 0.03 + (seed % 0.05),
        flatShading: false,
    });
}

function pickRockSize() {
    const roll = Math.random();
    if (roll < 0.68) return 0.09 + Math.random() * 0.2;
    if (roll < 0.88) return 0.32 + Math.random() * 0.24;
    return 0.58 + Math.random() * 0.42;
}

function respawnRock(rock) {
    const stackTop = RING_HEIGHT * 0.55 + 1.2;
    const stackBottom = -(RINGS.length - 1) * RING_GAP - 1.1;
    const angle = Math.random() * Math.PI * 2;
    const radius = 3.2 + Math.random() * 7.5;
    rock.position.set(
        Math.cos(angle) * radius,
        stackBottom + Math.random() * (stackTop - stackBottom) * 0.42,
        Math.sin(angle) * radius + (Math.random() - 0.5) * 3.5,
    );
    rock.userData.orbitA = angle;
    rock.userData.orbitR = radius;
    rock.userData.swayPh = Math.random() * Math.PI * 2;
    rock.scale.setScalar(1);
    rock.visible = true;
}

function createFloatingRock(forceLarge = false) {
    const seed = Math.random();
    let size = pickRockSize();
    if (forceLarge) size = 0.62 + Math.random() * 0.38;
    const mesh = new THREE.Mesh(createAsteroidGeometry(size, seed * 40), createAsteroidMaterial(seed));
    const stackTop = RING_HEIGHT * 0.55 + 1.2;
    const stackBottom = -(RINGS.length - 1) * RING_GAP - 1.1;
    const angle = Math.random() * Math.PI * 2;
    const radius = 2.4 + Math.random() * 6.2;
    mesh.position.set(
        Math.cos(angle) * radius,
        stackBottom + Math.random() * (stackTop - stackBottom) * 0.42,
        Math.sin(angle) * radius,
    );
    mesh.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
    );
    mesh.userData = {
        swayAmp: 0.018 + Math.random() * 0.045,
        swayPh: Math.random() * Math.PI * 2,
        rotVX: (Math.random() - 0.5) * 0.16,
        rotVY: (Math.random() - 0.5) * 0.2,
        rotVZ: (Math.random() - 0.5) * 0.14,
        baseY: mesh.position.y,
        orbitR: radius,
        orbitA: angle,
        orbitSpeed: (Math.random() - 0.5) * 0.022,
        geomSize: size,
    };
    return mesh;
}

const floatingRocks = new THREE.Group();
const rockCount = innerWidth < 768 ? 16 : 24;
for (let i = 0; i < rockCount; i += 1) {
    floatingRocks.add(createFloatingRock(i % 5 === 0 || i % 7 === 0));
}
scene.add(floatingRocks);

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

function loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`Failed to load ${src}`));
        img.src = src;
    });
}

function makeScreenTexture(img) {
    const c = document.createElement('canvas');
    c.width = 480;
    c.height = 340;
    const ctx = c.getContext('2d');
    const pad = 14;
    const innerW = c.width - pad * 2;
    const innerH = c.height - pad * 2;

    ctx.clearRect(0, 0, c.width, c.height);
    ctx.fillStyle = 'rgba(255,255,255,0.04)';
    ctx.fillRect(4, 4, c.width - 8, c.height - 8);

    const aspect = img.width / img.height;
    let drawW = innerW;
    let drawH = drawW / aspect;
    if (drawH > innerH) {
        drawH = innerH;
        drawW = drawH * aspect;
    }
    const drawX = (c.width - drawW) * 0.5;
    const drawY = (c.height - drawH) * 0.5;
    ctx.drawImage(img, drawX, drawY, drawW, drawH);
    ctx.strokeStyle = 'rgba(255,255,255,0.1)';
    ctx.lineWidth = 1;
    ctx.strokeRect(drawX - 1, drawY - 1, drawW + 2, drawH + 2);

    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy());
    return tex;
}

function makeCompactPanelTexture(item, accent) {
    const c = document.createElement('canvas');
    c.width = 500;
    c.height = 168;
    const ctx = c.getContext('2d');
    const pad = 16;
    const w = c.width - pad * 2;

    ctx.clearRect(0, 0, c.width, c.height);
    ctx.fillStyle = 'rgba(255,255,255,0.04)';
    ctx.fillRect(4, 4, c.width - 8, c.height - 8);
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';

    let y = 12;
    if (item.tag) {
        ctx.fillStyle = accent;
        ctx.globalAlpha = 0.9;
        ctx.font = '600 13px "JetBrains Mono", ui-monospace, monospace';
        ctx.fillText(truncateLine(ctx, item.tag.toUpperCase(), w), pad, y);
        y += 18;
    }

    ctx.globalAlpha = 1;
    ctx.fillStyle = accent;
    ctx.font = '800 28px Inter, system-ui, sans-serif';
    const titleLines = wrapTextLines(ctx, item.title, w).slice(0, 2);
    y = drawLines(ctx, titleLines, pad, y, 30) + 4;

    if (item.stat) {
        ctx.font = '700 22px Inter, system-ui, sans-serif';
        ctx.fillText(truncateLine(ctx, item.stat, w), pad, y);
        y += 26;
        if (item.statLabel) {
            ctx.fillStyle = 'rgba(255,255,255,0.55)';
            ctx.font = '400 12px Inter, system-ui, sans-serif';
            ctx.fillText(truncateLine(ctx, item.statLabel, w), pad, y);
        }
    }

    const tex = new THREE.CanvasTexture(c);
    tex.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy());
    return tex;
}

function createCurvedPanelGeometry(arcWidth, height, radius, segments = 18) {
    const thetaLength = arcWidth / radius;
    return new THREE.CylinderGeometry(
        radius,
        radius,
        height,
        segments,
        1,
        true,
        -thetaLength / 2,
        thetaLength
    );
}

function createFlatPanelGeometry(width, height) {
    return new THREE.PlaneGeometry(width, height);
}

function slotAngle(slot) {
    return (slot / RING_SLOTS) * Math.PI * 2 + 0.15;
}

function addCurvedPanel(group, config, item, angle, options = {}) {
    const isScreen = options.isScreen === true;
    const tex = options.texture;
    const arcW = isScreen ? SCREEN_ARC : PANEL_ARC;
    const h = isScreen ? SCREEN_H : PANEL_H;
    const flatW = isScreen ? 2.15 : 2.35;
    const geo = createCurvedPanelGeometry(arcW, h, PANEL_RADIUS, isScreen ? 16 : 20);
    const flatGeo = isScreen
        ? createFlatPanelGeometry(flatW, flatW)
        : createFlatPanelGeometry(flatW, h);
    const mat = new THREE.MeshBasicMaterial({
        map: tex,
        transparent: true,
        depthWrite: false,
        depthTest: true,
        side: THREE.DoubleSide,
        opacity: isScreen ? 0.9 : 0.92,
        polygonOffset: true,
        polygonOffsetFactor: 1,
        polygonOffsetUnits: 1,
    });

    const holder = new THREE.Object3D();
    holder.rotation.y = angle;

    const panel = new THREE.Mesh(geo, mat);
    panel.renderOrder = 2;
    holder.add(panel);
    group.add(holder);

    panel.userData = {
        ring: group,
        ringRoot: group,
        holder,
        accent: config.accent,
        item,
        title: item.title,
        focused: false,
        pop: 0,
        isScreen,
        curvedGeo: geo,
        flatGeo,
        flatW,
        height: h,
    };
    clickable.push(panel);
    return panel;
}

function textItemIndexForSlot(slot, itemCount) {
    if (slot < SCREEN_SLOT) return slot;
    return (slot - SCREEN_SLOT - 1) % itemCount;
}

function createRing(config, y, index, screenImg) {
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
        opacity: 0.34,
        depthWrite: false,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.y = Math.PI * 0.5;
    ringMesh.renderOrder = 0;
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

    const screenItem = config.screen ? {
        isScreen: true,
        image: config.screen.src,
        title: config.screen.title,
        caption: config.screen.caption,
        tag: '// SCREEN',
        body: config.screen.caption,
    } : null;
    const screenTex = screenImg ? makeScreenTexture(screenImg) : null;

    for (let slot = 0; slot < RING_SLOTS; slot += 1) {
        const angle = slotAngle(slot);
        if (slot === SCREEN_SLOT && screenItem && screenTex) {
            addCurvedPanel(group, config, screenItem, angle, {
                isScreen: true,
                texture: screenTex,
            });
            continue;
        }

        const item = config.items[textItemIndexForSlot(slot, config.items.length)];
        const tex = makeCompactPanelTexture(item, config.accent);
        addCurvedPanel(group, config, item, angle, { texture: tex });
    }

    scene.add(group);
    ringGroups.push(group);
    return group;
}

async function buildRings() {
    const screens = await Promise.all(RINGS.map((ring) => loadImage(ring.screen.src)));
    RINGS.forEach((cfg, i) => createRing(cfg, -i * RING_GAP, i, screens[i]));
}

const totalHeight = (RINGS.length - 1) * RING_GAP;

scrollSpacer.style.height = `${(RINGS.length + 1) * 100}vh`;

function cylinderScrollMax() {
    return Math.max(1, scrollSpacer.offsetHeight);
}

function syncScrollFromPage() {
    const max = cylinderScrollMax();
    const y = window.scrollY;
    scrollTarget = THREE.MathUtils.clamp(y / max, 0, 1);

    const gapTop = scrollSpacer.offsetHeight;
    const gapHeight = Math.max(1, cylinderGap?.offsetHeight ?? innerHeight * 0.5);

    // Keep every ring fully visible; fade only inside the gap buffer after the spacer.
    let fade = 1;
    if (y >= gapTop + gapHeight) {
        fade = 0;
    } else if (y > gapTop) {
        fade = Math.max(0, 1 - (y - gapTop) / gapHeight);
    }

    canvas.style.opacity = String(fade);
    canvas.style.pointerEvents = fade > 0.12 ? 'auto' : 'none';
    sceneFade = fade;

    document.body.classList.toggle('past-cylinder', y >= gapTop + gapHeight);

    const atEnd = y >= (document.getElementById('site-end')?.offsetTop ?? gapTop) - innerHeight * 0.5;
    document.body.classList.toggle('at-site-end', atEnd);
}

window.addEventListener('scroll', syncScrollFromPage, { passive: true });

if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

window.addEventListener('load', () => {
    window.scrollTo(0, 0);
    syncScrollFromPage();
});

syncScrollFromPage();

function resumeRing(group) {
    if (group) group.userData.paused = false;
}

function pauseRing(group) {
    if (group) group.userData.paused = true;
}

function updatePanelShape(panel, pop) {
    const { curvedGeo, flatGeo, isScreen } = panel.userData;
    if (!curvedGeo) return;

    if (panel.geometry !== curvedGeo) {
        panel.geometry = curvedGeo;
    }

    if (isScreen && flatGeo && pop > 0.72) {
        if (panel.geometry !== flatGeo) {
            panel.geometry = flatGeo;
        }
        panel.position.z = 0.42;
        const s = 1 + (pop - 0.72) * 0.18;
        panel.scale.set(s, s, s);
        return;
    }

    const lift = isScreen ? 0.05 * pop : 0.03 * pop;
    panel.position.z = lift;
    const scale = 1 + pop * (isScreen ? 0.08 : 0.05);
    panel.scale.set(scale, scale, scale);
}

function resetPanel(panel) {
    panel.userData.focused = false;
    panel.userData.pop = 0;
    updatePanelShape(panel, 0);
}

function showFocusCard(item, accent) {
    const color = accent || '#c8ff4a';
    const isScreen = item.isScreen && item.image;
    focusCard.classList.toggle('focus-card--screen', isScreen);
    focusCard.style.setProperty('--focus-accent', color);
    focusCard.style.borderColor = `${color}44`;
    focusCard.style.background = `color-mix(in srgb, ${color} 6%, rgba(255,255,255,0.04))`;

    if (isScreen) {
        focusText.hidden = true;
        focusFigure.hidden = false;
        focusScreenTag.hidden = true;
        focusScreenCaption.hidden = true;
        focusImage.src = item.image;
        focusImage.alt = item.title || 'NOVA-X AIR screenshot';
    } else {
        focusText.hidden = false;
        focusFigure.hidden = true;
        focusEls.tag.textContent = item.tag || '';
        focusEls.tag.style.color = color;
        focusEls.title.textContent = item.title;
        focusEls.title.style.color = color;
        focusEls.stat.textContent = item.stat || '';
        focusEls.stat.style.color = color;
        focusEls.stat.hidden = !item.stat;
        focusEls.statLabel.textContent = item.statLabel || '';
        focusEls.statLabel.hidden = !item.statLabel;
        focusEls.rule.hidden = !item.stat && !item.statLabel;
        focusEls.body.textContent = item.body || '';
        focusEls.tags.innerHTML = '';
        (item.tags || []).forEach((tag) => {
            const li = document.createElement('li');
            li.textContent = tag;
            focusEls.tags.appendChild(li);
        });
    }

    document.body.classList.add('has-focus');
    focusLayer.hidden = false;
    focusLayer.setAttribute('aria-hidden', 'false');
    requestAnimationFrame(() => focusLayer.classList.add('is-open'));
}

function hideFocusCard() {
    focusLayer.classList.remove('is-open');
    document.body.classList.remove('has-focus');
    focusLayer.hidden = true;
    focusLayer.setAttribute('aria-hidden', 'true');
    focusCard.style.removeProperty('background');
    focusCard.classList.remove('focus-card--screen');
    focusText.hidden = false;
    focusFigure.hidden = true;
    if (focusEls.rule) focusEls.rule.hidden = false;
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
    group.userData.rotationY += dx * 0.01;
}

function onPointerDown(e) {
    isDragging = true;
    dragOriginX = e.clientX;
    dragOriginY = e.clientY;
    dragLastX = e.clientX;
    dragLastY = e.clientY;
    dragRing = pickRingAt(e.clientX, e.clientY);
    if (dragRing) {
        dragRing.userData.pausedForDrag = !dragRing.userData.paused;
        if (!dragRing.userData.paused) pauseRing(dragRing);
        dragRing.userData.dragVelocity = 0;
    }
    document.body.classList.add('is-dragging');
    try { canvas.setPointerCapture(e.pointerId); } catch (_) { /* noop */ }
}

function onPointerUp(e) {
    if (!isDragging) return;
    const movedX = Math.abs(e.clientX - dragOriginX);
    const movedY = Math.abs(e.clientY - dragOriginY);
    const ring = dragRing;

    if (ring?.userData.pausedForDrag) {
        resumeRing(ring);
        ring.userData.pausedForDrag = false;
    }
    if (ring) ring.userData.dragVelocity = 0;

    isDragging = false;
    dragRing = null;
    document.body.classList.remove('is-dragging');
    try { canvas.releasePointerCapture(e.pointerId); } catch (_) { /* noop */ }

    if (movedX > 6 || movedY > 6) return;

    setPointerFromEvent(e.clientX, e.clientY);
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(clickable, false);
    if (hits.length) focusPanel(hits[0].object);
    else clearFocus();
}

function onPointerMove(e) {
    starMouseX = e.clientX;
    starMouseY = e.clientY;
    if (!isDragging || !dragRing) return;
    const dx = e.clientX - dragLastX;
    const dy = e.clientY - dragLastY;
    dragLastX = e.clientX;
    dragLastY = e.clientY;
    if (Math.abs(dx) < 0.01) return;
    if (Math.abs(dx) < Math.abs(dy) * 0.35 && Math.abs(e.clientX - dragOriginX) < 10) return;
    applyRingDrag(dragRing, dx);
}

canvas.addEventListener('pointerdown', onPointerDown);
window.addEventListener('pointerup', onPointerUp);
window.addEventListener('pointermove', onPointerMove);
focusClose.addEventListener('click', clearFocus);
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && activePanel) clearFocus();
});

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
        group.rotation.y = group.userData.rotationY;
    });

    clickable.forEach((panel) => {
        const isActive = panel === activePanel;
        const targetPop = isActive ? (panel.userData.isScreen ? 1 : 0.28) : 0;
        panel.userData.pop += (targetPop - panel.userData.pop) * 0.09;
        updatePanelShape(panel, panel.userData.pop);

        if (panel.material.map) {
            if (isActive) panel.material.opacity = panel.userData.isScreen ? 0.96 : 1;
            else if (activePanel) panel.material.opacity = panel.userData.isScreen ? 0.48 : 0.58;
            else panel.material.opacity = panel.userData.isScreen ? 0.9 : 0.92;
        }
    });

    const bhPos = getBlackHoleWorldPosition(_bhWorld);
    blackHole.position.copy(bhPos);
    blackHole.quaternion.copy(camera.quaternion);
    blackHole.visible = sceneFade > 0.03;

    floatingRocks.children.forEach((rock) => {
        const d = rock.userData;
        d.orbitA += d.orbitSpeed * delta;
        rock.position.x += Math.cos(d.orbitA) * d.swayAmp * delta * 0.14;
        rock.position.z += Math.sin(d.orbitA) * d.swayAmp * delta * 0.12;
        rock.position.y += Math.sin(t * 0.13 + d.swayPh) * d.swayAmp * delta * 0.1;

        const dx = bhPos.x - rock.position.x;
        const dy = bhPos.y - rock.position.y;
        const dz = bhPos.z - rock.position.z;
        const dist = Math.hypot(dx, dy, dz);
        if (dist < BLACK_HOLE.swallowRadius) {
            respawnRock(rock);
            return;
        }
        const pull = (BLACK_HOLE.pullStrength * 0.38 / (dist * dist + 20)) * delta * 42;
        rock.position.x += (dx / dist) * pull;
        rock.position.y += (dy / dist) * pull;
        rock.position.z += (dz / dist) * pull;

        const approach = THREE.MathUtils.clamp((dist - BLACK_HOLE.swallowRadius) / 12, 0, 1);
        rock.scale.setScalar(0.9 + approach * 0.1);
        rock.rotation.x += d.rotVX * delta;
        rock.rotation.y += d.rotVY * delta;
        rock.rotation.z += d.rotVZ * delta;
    });
    floatingRocks.visible = sceneFade > 0.03;
    starfield.visible = sceneFade > 0.03;
    starfieldData.mat.opacity = sceneFade;
    starfieldData.bMat.opacity = sceneFade;
    starfield.position.copy(camera.position);
    starfield.quaternion.copy(camera.quaternion);
    starfield.updateMatrixWorld(true);

    updateStarPositions(starfieldData.geo, 0, starfieldData.fieldCount, delta);
    updateStarPositions(starfieldData.bGeo, starfieldData.fieldCount, starfieldData.brightCount, delta);

    renderer.render(scene, camera);
}

buildRings().then(() => {
    animate();
}).catch((err) => {
    showBootError(err);
});

} catch (err) {
    showBootError(err);
}
