# NOVA-X AIR Website — Proje Anayasası

> **Proje:** fuse-void-nova-x-air (GitHub Pages)  
> **Kök:** `index.html`, `cylinder-scene.js`, `site.css`, `images/`

---

## 0. Misyon

NOVA-X AIR landing — 3D silindir sahne, scroll, GitHub Pages deploy.

---

## 1. Dosya sınırları

| Dosya | Rol |
|-------|-----|
| `cylinder-scene.js` | Three.js sahne, yıldızlar, kayalar, etkileşim |
| `site.css` | Layout, tipografi, scroll |
| `index.html` | Markup, script cache `?v=` |

**Yasak:** Gereksiz framework ekleme; silindir/drag davranışını kırma.

---

## 2. Intent + Verification (web)

NOVA-X AIR / Drum app ile **aynı protokol**; vault: `NOVA-X-Web-Vault/`.

| Görev | Intent | Verification |
|-------|--------|--------------|
| Typo, CSS tek satır | Opsiyonel | Opsiyonel |
| Sahne / scroll / JS logic | **Zorunlu** | **Zorunlu** |
| Yeni asset / çok dosya | **Zorunlu** | **Zorunlu** |

- Intent: `NOVA-X-Web-Vault/scratch/intent-<topic>.md`
- Verify: `NOVA-X-Web-Vault/scratch/verify-<topic>.md`
- Şablonlar: `NOVA-X-Web-Vault/Templates/`

Deploy sonrası hard refresh (`Cmd+Shift+R`); cache bump `index.html` `?v=`.
