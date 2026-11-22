/**
 * NOVA ATER - Core Portal JavaScript
 * Handles configuration binding, server address verification gate,
 * clipboard copy, toast notifications, and dynamic mod filtering.
 */

// Toast notification helper
function showToast(message, icon = '✓') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span style="color: var(--accent-cyan); font-weight: 800;">${icon}</span> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('fade-out');
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// Copy Server Address to clipboard
function copyServerAddress() {
  const addr = CONFIG.serverAddress;
  navigator.clipboard.writeText(addr).then(() => {
    showToast(`Adresse ${addr} copiée !`, '📋');
  }).catch(() => {
    // Fallback
    const input = document.createElement('input');
    input.value = addr;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    showToast(`Adresse ${addr} copiée !`, '📋');
  });
}

// Initialize Address Verification Gate
function initAddressGate() {
  const gate = document.getElementById('address-gate');
  const input = document.getElementById('gate-address-input');
  const btn = document.getElementById('gate-submit-btn');
  const feedback = document.getElementById('gate-feedback');
  const hintBtn = document.getElementById('gate-hint-btn');

  if (!gate) return;

  const isVerified = sessionStorage.getItem('nova_ater_verified') === 'true';
  if (isVerified) {
    gate.classList.add('hidden');
    return;
  }

  // Pre-fill or give hint helper
  if (hintBtn) {
    hintBtn.addEventListener('click', () => {
      if (input) {
        input.value = CONFIG.serverAddress;
        input.focus();
      }
    });
  }

  function verifyAddress() {
    if (!input || !feedback) return;
    const entered = input.value.trim().toLowerCase();
    const target = CONFIG.serverAddress.trim().toLowerCase();

    if (entered === target) {
      feedback.className = 'gate-feedback success';
      feedback.innerHTML = '<span>✓</span> Adresse validée ! Bienvenue sur NOVA ATER.';
      btn.disabled = true;
      btn.textContent = 'Accès autorisé...';
      
      sessionStorage.setItem('nova_ater_verified', 'true');

      setTimeout(() => {
        gate.classList.add('hidden');
        showToast('Bienvenue sur le portail NOVA ATER !', '🚀');
      }, 700);
    } else {
      feedback.className = 'gate-feedback error';
      feedback.innerHTML = '<span>✕</span> Adresse incorrecte. Indice : ' + CONFIG.serverAddress;
      input.classList.add('input-error');
      setTimeout(() => input.classList.remove('input-error'), 400);
    }
  }

  if (btn) btn.addEventListener('click', verifyAddress);
  if (input) {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        verifyAddress();
      }
    });
  }
}

// Bind Global Configuration to DOM
function applyConfig() {
  if (typeof CONFIG === 'undefined') return;

  // Text contents
  document.querySelectorAll('[data-config="serverName"]').forEach(el => el.textContent = CONFIG.serverName);
  document.querySelectorAll('[data-config="serverAddress"]').forEach(el => el.textContent = CONFIG.serverAddress);
  document.querySelectorAll('[data-config="minecraftVersion"]').forEach(el => el.textContent = CONFIG.minecraftVersion);
  document.querySelectorAll('[data-config="loader"]').forEach(el => el.textContent = CONFIG.loader);
  document.querySelectorAll('[data-config="tagline"]').forEach(el => {
    if (CONFIG.tagline) el.textContent = CONFIG.tagline;
  });

  // Links
  document.querySelectorAll('[data-config-href="discordUrl"]').forEach(el => {
    el.href = CONFIG.discordUrl;
    el.target = "_blank";
    el.rel = "noopener noreferrer";
  });
  document.querySelectorAll('[data-config-href="curseforgeClientUrl"]').forEach(el => {
    el.href = CONFIG.curseforgeClientUrl;
    el.target = "_blank";
    el.rel = "noopener noreferrer";
  });
  document.querySelectorAll('[data-config-href="curseforgeServerUrl"]').forEach(el => {
    el.href = CONFIG.curseforgeServerUrl;
    el.target = "_blank";
    el.rel = "noopener noreferrer";
  });
  document.querySelectorAll('[data-config-href="medalBoostUrl"]').forEach(el => {
    el.href = CONFIG.medalBoostUrl;
    el.target = "_blank";
    el.rel = "noopener noreferrer";
  });

  // Direct download links (téléchargement direct intégré depuis GitHub)
  document.querySelectorAll('[data-config-href="clientDownloadUrl"]').forEach(el => {
    if (CONFIG.clientDownloadUrl && CONFIG.clientDownloadUrl !== 'À AJOUTER') {
      el.href = CONFIG.clientDownloadUrl;
      el.setAttribute('download', 'nova-ater-client.zip');
      el.style.display = 'inline-flex';
    } else {
      el.href = CONFIG.curseforgeClientUrl;
      el.title = "Téléchargement direct bientôt disponible (lien CurseForge actif)";
    }
  });

  document.querySelectorAll('[data-config-href="serverDownloadUrl"]').forEach(el => {
    if (CONFIG.serverDownloadUrl && CONFIG.serverDownloadUrl !== 'À AJOUTER') {
      el.href = CONFIG.serverDownloadUrl;
      el.setAttribute('download', 'nova-ater-serveur.zip');
      el.style.display = 'inline-flex';
    } else {
      el.href = CONFIG.curseforgeServerUrl;
      el.title = "Téléchargement direct bientôt disponible (lien CurseForge actif)";
    }
  });
}

// Mobile navigation toggle
function initMobileNav() {
  const toggle = document.querySelector('.mobile-toggle');
  const menu = document.querySelector('.nav-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    menu.classList.toggle('open');
    toggle.classList.toggle('active');
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!toggle.contains(e.target) && !menu.contains(e.target) && menu.classList.contains('open')) {
      menu.classList.remove('open');
      toggle.classList.remove('active');
    }
  });
}

// Category Icon Helper
function getCategoryIcon(cat) {
  const norm = (cat || '').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const map = {
    'gameplay': 'images/icons/gameplay.svg',
    'aventure': 'images/icons/aventure.svg',
    'exploration': 'images/icons/exploration.svg',
    'decoration': 'images/icons/decoration.svg',
    'technologie': 'images/icons/technologie.svg',
    'combat': 'images/icons/combat.svg',
    'graphismes': 'images/icons/graphismes.svg',
    'optimisation': 'images/icons/optimisation.svg',
    'utilitaire': 'images/icons/utilitaire.svg',
    'atmosphere': 'images/icons/atmosphere.svg',
    'dimension': 'images/icons/dimension.svg'
  };
  return map[norm] || 'images/icons/autre.svg';
}

// Load mods data with resilient fallback (fetch data/mods.json -> fallback to window.DEFAULT_MODS)
async function fetchModsData() {
  try {
    const resp = await fetch('data/mods.json');
    if (resp.ok) {
      const data = await resp.json();
      if (Array.isArray(data) && data.length > 0) return data;
    }
  } catch (err) {
    // Expected on local file:/// protocol or offline
  }

  if (typeof DEFAULT_MODS !== 'undefined' && Array.isArray(DEFAULT_MODS) && DEFAULT_MODS.length > 0) {
    return DEFAULT_MODS;
  }

  throw new Error("Impossible de charger les données des mods.");
}

// Mod Explorer System (for mods.html and homepage preview)
class ModExplorer {
  constructor(options = {}) {
    this.container = document.getElementById(options.gridId || 'mods-grid');
    this.counterEl = document.getElementById(options.counterId || 'mods-count');
    this.totalEl = document.getElementById(options.totalId || 'mods-total');
    this.searchInput = document.getElementById(options.searchId || 'mod-search');
    this.searchClear = document.getElementById(options.clearId || 'mod-search-clear');
    this.itemTypeFilterWrap = document.getElementById(options.itemTypeFilterId || 'item-type-filters');
    this.typeFilterWrap = document.getElementById(options.typeFilterId || 'type-filters');
    this.categoryFilterWrap = document.getElementById(options.categoryFilterId || 'category-filters');
    this.limit = options.limit || null;

    this.mods = [];
    this.activeItemType = 'Tous';
    this.activeType = 'Tous';
    this.activeCategory = 'Tous';
    this.searchQuery = '';

    if (this.container) {
      this.init();
    }
  }

  async init() {
    try {
      this.mods = await fetchModsData();
      
      if (this.totalEl) this.totalEl.textContent = this.mods.length;

      this.setupEventListeners();
      this.render();
    } catch (err) {
      console.error(err);
      if (this.container) {
        this.container.innerHTML = `<div class="mods-empty"><p>Erreur lors du chargement des mods (${err.message}).</p></div>`;
      }
    }
  }

  setupEventListeners() {
    // Search input
    if (this.searchInput) {
      this.searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.trim().toLowerCase();
        if (this.searchClear) {
          this.searchClear.style.display = this.searchQuery ? 'block' : 'none';
        }
        this.render();
      });
    }

    // Search clear
    if (this.searchClear) {
      this.searchClear.addEventListener('click', () => {
        if (this.searchInput) {
          this.searchInput.value = '';
          this.searchQuery = '';
          this.searchClear.style.display = 'none';
          this.searchInput.focus();
          this.render();
        }
      });
    }

    // Item Type pills (Mods vs Resource Packs vs Shaders)
    if (this.itemTypeFilterWrap) {
      this.itemTypeFilterWrap.addEventListener('click', (e) => {
        const btn = e.target.closest('.filter-pill');
        if (!btn) return;
        this.itemTypeFilterWrap.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        this.activeItemType = btn.getAttribute('data-itemtype') || 'Tous';
        this.render();
      });
    }

    // Type pills (Client, Serveur, Client + Serveur)
    if (this.typeFilterWrap) {
      this.typeFilterWrap.addEventListener('click', (e) => {
        const btn = e.target.closest('.filter-pill');
        if (!btn) return;
        this.typeFilterWrap.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        this.activeType = btn.getAttribute('data-type') || 'Tous';
        this.render();
      });
    }

    // Category pills
    if (this.categoryFilterWrap) {
      this.categoryFilterWrap.addEventListener('click', (e) => {
        const btn = e.target.closest('.filter-pill');
        if (!btn) return;
        this.categoryFilterWrap.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        this.activeCategory = btn.getAttribute('data-cat') || 'Tous';
        this.render();
      });
    }
  }

  filterMods() {
    return this.mods.filter(mod => {
      // Item Type matching (Mod vs Pack de Ressources vs Shader)
      if (this.activeItemType !== 'Tous') {
        if (mod.itemType !== this.activeItemType) return false;
      }

      // Type matching (Client, Serveur, Client + Serveur)
      if (this.activeType !== 'Tous') {
        if (this.activeType === 'Client' && mod.type !== 'Client') return false;
        if (this.activeType === 'Serveur' && mod.type !== 'Serveur') return false;
        if (this.activeType === 'Client + Serveur' && mod.type !== 'Client + Serveur') return false;
      }

      // Category matching
      if (this.activeCategory !== 'Tous') {
        const normActive = this.activeCategory.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const normMod = (mod.category || '').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        if (normActive !== normMod) return false;
      }

      // Search query matching
      if (this.searchQuery) {
        const hay = (mod.name + ' ' + (mod.description || '') + ' ' + (mod.category || '')).toLowerCase();
        if (!hay.includes(this.searchQuery)) return false;
      }

      return true;
    });
  }

  render() {
    if (!this.container) return;

    let filtered = this.filterMods();
    if (this.counterEl) this.counterEl.textContent = filtered.length;

    if (this.limit && typeof this.limit === 'number') {
      filtered = filtered.slice(0, this.limit);
    }

    if (filtered.length === 0) {
      this.container.innerHTML = `
        <div class="mods-empty">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <p style="font-size: 1.1rem; font-weight: 700; margin-bottom: 0.5rem; color: #fff;">Aucun mod correspondant</p>
          <p>Essayez de modifier votre recherche ou vos filtres.</p>
        </div>
      `;
      return;
    }

    const html = filtered.map(mod => {
      // Determine badge class for type
      let typeBadgeClass = 'badge-type-cs';
      if (mod.type === 'Client') typeBadgeClass = 'badge-type-c';
      else if (mod.type === 'Serveur') typeBadgeClass = 'badge-type-s';

      // Item type badge
      let itemTypeBadge = '<span class="mod-badge" style="background: rgba(139, 92, 246, 0.15); color: #c084fc; border: 1px solid rgba(139, 92, 246, 0.3);">📦 Mod</span>';
      if (mod.itemType === 'Pack de Ressources') {
        itemTypeBadge = '<span class="mod-badge" style="background: rgba(236, 72, 153, 0.15); color: #f472b6; border: 1px solid rgba(236, 72, 153, 0.3);">🎨 Pack de Ressources</span>';
      } else if (mod.itemType === 'Shader') {
        itemTypeBadge = '<span class="mod-badge" style="background: rgba(245, 158, 11, 0.15); color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.3);">☀️ Shader</span>';
      }

      const catIcon = getCategoryIcon(mod.category);
      const curseUrl = mod.curseforgeUrl && mod.curseforgeUrl !== 'À AJOUTER' ? mod.curseforgeUrl : null;
      const initialImg = mod.image || 'images/mods/placeholder.svg';

      return `
        <article class="mod-card">
          <div class="mod-header">
            <div class="mod-icon-wrap">
              <img src="${initialImg}" alt="${mod.name}" loading="lazy" onerror="this.onerror=null; this.src='${catIcon}';">
            </div>
            <div class="mod-info">
              <h3 class="mod-title" title="${mod.name}">${mod.name}</h3>
              <span class="mod-version-tag">Fabric ${mod.version || '1.21.1'}</span>
            </div>
          </div>

          <div class="mod-badges-row">
            ${itemTypeBadge}
            <span class="mod-badge ${typeBadgeClass}">${mod.type}</span>
            <span class="mod-badge badge-cat">${mod.category || 'Autre'}</span>
          </div>

          <p class="mod-desc">${mod.description || 'Mod pour Minecraft 1.21.1 Fabric.'}</p>

          <div class="mod-footer">
            ${curseUrl ? `
              <a href="${curseUrl}" target="_blank" rel="noopener noreferrer" class="btn-mod-curseforge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.89 10.63a7.35 7.35 0 0 0-2.43-3.69c-2.48-1.92-5.91-1.63-8.08.68a6.83 6.83 0 0 0-1.66 4.93c.12 2.37 1.48 4.38 3.52 5.25.96.4 2 .57 3.03.5 1.54-.1 2.97-.73 4.07-1.78l-1.42-1.35a5.1 5.1 0 0 1-5.75.86c-1.4-.73-2.3-2.07-2.38-3.66a5.17 5.17 0 0 1 1.26-3.72c1.64-1.75 4.25-1.97 6.13-.52a5.55 5.55 0 0 1 1.83 2.78h-4.3v1.94h7.13c.01-.4.02-.8.02-1.22z"/></svg>
                CurseForge
              </a>
            ` : `
              <span style="font-size: 0.75rem; color: var(--text-muted);">CurseForge À AJOUTER</span>
            `}
          </div>
        </article>
      `;
    }).join('');

    this.container.innerHTML = html;
  }
}

// Auto-run when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  applyConfig();
  initAddressGate();
  initMobileNav();

  // Attach copy IP triggers
  document.querySelectorAll('.btn-copy-ip, .copy-ip-trigger').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      copyServerAddress();
    });
  });
});
