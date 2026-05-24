import * as THREE from 'three';

const RINGS = [
    {
        accent: '#c8ff4a',
        ringColor: '#1a1f0a',
        speed: 0.0018,
        items: [
            { title: 'NOVA-X AIR', body: 'Launchpad MK3 control surface for iOS.' },
            { title: '8×8 PAD GRID', body: 'RGB velocity pads with instant clip launch.' },
            { title: 'REAL-TIME', body: 'Zero menu diving. Touch-first workflow.' },
        ],
    },
    {
        accent: '#ffffff',
        ringColor: '#141414',
        speed: -0.0014,
        items: [
            { title: 'SEQUENCER', body: '16-step precision engine with micro timing.' },
            { title: '126 SLOTS', body: 'Pattern save, chain A–H, bar-aligned switch.' },
            { title: 'CLIP MATRIX', body: 'Multi-track editor with per-step assignment.' },
        ],
    },
    {
        accent: '#ffb08a',
        ringColor: '#1a100c',
        speed: 0.0016,
        items: [
            { title: 'MIDI BUS', body: 'NovaxMIDIHub — live routing and export.' },
            { title: 'ABLETON', body: 'Session clip grid mapped to Launchpad Pro.' },
            { title: 'OFFLINE', body: 'Your patterns stay on device. No tracking.' },
        ],
    },
    {
        accent: '#9bb8e1',
        ringColor: '#0a1018',
        speed: -0.0012,
        items: [
            { title: 'SWISS FUTURISM', body: 'Blade Runner boot. Cyber grid UI language.' },
            { title: 'SILICON', body: 'Native M1–M5 performance on iPad.' },
            { title: 'COMING SOON', body: 'App Store launch — Fuse Void Music Engine.' },
        ],
    },
    {
        accent: '#e8943a',
        ringColor: '#141008',
        speed: 0.0015,
        items: [
            { title: 'CHAOS FX', body: 'XY Kaos pad with reset behavior.' },
            { title: '11 CHANNELS', body: 'Per-channel mute and dynamics control.' },
            { title: 'ACCENT', body: 'Swing system with groove offset per step.' },
        ],
    },
];

const RING_RADIUS = 4.2;
const RING_HEIGHT = 1.35;
const RING_GAP = 3.1;
const PANEL_W = 2.8;
const PANEL_H = 1.05;

const canvas = document.getElementById('scene-canvas');
const scrollSpacer = document.getElementById('scroll-spacer');
const scrollBar = document.getElementById('scroll-bar');

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0x050505, 1);

const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x050505, 14, 42);

const camera = new THREE.PerspectiveCamera(42, innerWidth / innerHeight, 0.1, 100);
camera.position.set(0, 2.5, 11.5);
camera.lookAt(0, 0, 0);

scene.add(new THREE.AmbientLight(0xffffff, 0.55));
const key = new THREE.DirectionalLight(0xffffff, 1.1);
key.position.set(4, 8, 10);
scene.add(key);
const rim = new THREE.DirectionalLight(0x88aaff, 0.35);
rim.position.set(-6, -2, -4);
scene.add(rim);

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const clickable = [];
const ringGroups = [];

let scrollTarget = 0;
let scrollCurrent = 0;
let activePanel = null;
let pausedRing = null;
let isDragging = false;
let dragLastX = 0;
let manualSpin = 0;

function makePanelTexture(title, body, accent) {
    const c = document.createElement('canvas');
    c.width = 640;
    c.height = 240;
    const ctx = c.getContext('2d');
    ctx.clearRect(0, 0, c.width, c.height);

    ctx.fillStyle = accent;
    ctx.font = '700 52px Inter, system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText(title, c.width / 2, 36);

    ctx.fillStyle = 'rgba(255,255,255,0.72)';
    ctx.font = '400 26px Inter, system-ui, sans-serif';
    wrapText(ctx, body, c.width / 2, 108, 560, 32);

    const tex = new THREE.CanvasTexture(c);
    tex.anisotropy = 4;
    return tex;
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    const words = text.split(' ');
    let line = '';
    let yy = y;
    for (let i = 0; i < words.length; i++) {
        const test = line + words[i] + ' ';
        if (ctx.measureText(test).width > maxWidth && i > 0) {
            ctx.fillText(line.trim(), x, yy);
            line = words[i] + ' ';
            yy += lineHeight;
        } else {
            line = test;
        }
    }
    ctx.fillText(line.trim(), x, yy);
}

function createRing(config, y, index) {
    const group = new THREE.Group();
    group.position.y = y;
    group.userData.speed = config.speed;
    group.userData.rotationY = index * 0.4;
    group.userData.paused = false;

    const ringGeo = new THREE.CylinderGeometry(RING_RADIUS, RING_RADIUS, RING_HEIGHT, 72, 1, true);
    const ringMat = new THREE.MeshStandardMaterial({
        color: config.ringColor,
        metalness: 0.35,
        roughness: 0.55,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.92,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.y = Math.PI * 0.5;
    group.add(ringMesh);

    const edgeGeo = new THREE.TorusGeometry(RING_RADIUS, 0.028, 8, 96);
    const edgeMat = new THREE.MeshBasicMaterial({ color: config.accent, transparent: true, opacity: 0.55 });
    const topEdge = new THREE.Mesh(edgeGeo, edgeMat);
    topEdge.rotation.x = Math.PI / 2;
    topEdge.position.y = RING_HEIGHT * 0.48;
    group.add(topEdge);
    const botEdge = topEdge.clone();
    botEdge.position.y = -RING_HEIGHT * 0.48;
    group.add(botEdge);

    config.items.forEach((item, i) => {
        const angle = (i / config.items.length) * Math.PI * 2 + 0.35;
        const tex = makePanelTexture(item.title, item.body, config.accent);
        const mat = new THREE.MeshBasicMaterial({
            map: tex,
            transparent: true,
            depthWrite: false,
            side: THREE.DoubleSide,
        });
        const panel = new THREE.Mesh(new THREE.PlaneGeometry(PANEL_W, PANEL_H), mat);
        const px = Math.cos(angle) * (RING_RADIUS + 0.08);
        const pz = Math.sin(angle) * (RING_RADIUS + 0.08);
        panel.position.set(px, 0, pz);
        panel.lookAt(px * 2, 0, pz * 2);

        panel.userData = {
            ring: group,
            home: panel.position.clone(),
            homeScale: 1,
            accent: config.accent,
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

function clearFocus() {
    if (activePanel) resetPanel(activePanel);
    if (pausedRing) resumeRing(pausedRing);
    activePanel = null;
    pausedRing = null;
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
}

function onPointerDown(e) {
    isDragging = true;
    dragLastX = e.clientX;
    document.body.classList.add('is-dragging');
}

function onPointerUp(e) {
    if (!isDragging) return;
    const moved = Math.abs(e.clientX - dragLastX);
    isDragging = false;
    document.body.classList.remove('is-dragging');
    if (moved > 6) return;

    const rect = canvas.getBoundingClientRect();
    pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(clickable, false);
    if (hits.length) {
        focusPanel(hits[0].object);
    } else {
        clearFocus();
    }
}

function onPointerMove(e) {
    if (!isDragging) return;
    if (!pausedRing) manualSpin += (e.clientX - dragLastX) * 0.004;
    dragLastX = e.clientX;
}

canvas.addEventListener('pointerdown', onPointerDown);
window.addEventListener('pointerup', onPointerUp);
window.addEventListener('pointermove', onPointerMove);

window.addEventListener('wheel', (e) => {
    scrollTarget = THREE.MathUtils.clamp(
        scrollTarget + e.deltaY * 0.004,
        0,
        1
    );
}, { passive: true });

window.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) dragLastX = e.touches[0].clientX;
}, { passive: true });

window.addEventListener('touchmove', (e) => {
    if (e.touches.length === 1) {
        scrollTarget = THREE.MathUtils.clamp(
            scrollTarget + (dragLastX - e.touches[0].clientX) * 0.003,
            0,
            1
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
        group.rotation.y = group.userData.rotationY + (group.userData.paused ? 0 : manualSpin);
    });

    clickable.forEach((panel) => {
        const targetPop = panel.userData.focused ? 1 : 0;
        panel.userData.pop += (targetPop - panel.userData.pop) * 0.09;

        const home = panel.userData.home;
        const outward = home.clone().normalize();
        const popDist = 1.15 * panel.userData.pop;
        panel.position.set(
            home.x + outward.x * popDist,
            home.y + Math.sin(t * 2 + panel.id) * 0.02 * panel.userData.pop,
            home.z + outward.z * popDist
        );

        const scale = 1 + panel.userData.pop * 0.45;
        panel.scale.set(scale, scale, scale);

        if (panel.material.map) {
            panel.material.opacity = 0.78 + panel.userData.pop * 0.22;
        }
    });

    manualSpin *= 0.96;
    renderer.render(scene, camera);
}

animate();
