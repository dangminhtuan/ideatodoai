// AG Project & Idea Matrix - Dual Engine (Localhost Sync + Cloudflare Pages Local-First Isolation)
let state = {
  projects: [],
  categories: [],
  filterCategory: 'ALL',
  filterStage: 'ALL',
  filterIdeaStatus: 'ALL',
  searchQuery: '',
  isLocalServer: false
};

const IDEA_STATES = ['Chưa triển khai', 'Đang triển khai', 'Đã xong', 'Loại bỏ'];
const STAGES = [
  'Idea / Conceptual',
  'Just Started / Inception',
  'In Progress - Expanding',
  'Near Complete - Polishing',
  'Ready for Promotion / Launch'
];

function getCatClass(cat) {
  if (!cat) return 'cat-util';
  const c = cat.toLowerCase();
  if (c.includes('ai') || c.includes('automation')) return 'cat-ai';
  if (c.includes('desktop') || c.includes('hardware')) return 'cat-desktop';
  if (c.includes('web') || c.includes('saas')) return 'cat-web';
  if (c.includes('game')) return 'cat-game';
  if (c.includes('edu') || c.includes('training') || c.includes('learn')) return 'cat-edu';
  if (c.includes('market') || c.includes('social')) return 'cat-marketing';
  return 'cat-util';
}

function showToast(msg, isError = false) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.style.borderLeftColor = isError ? '#ef4444' : '#06b6d4';
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2200);
}

// Persist to browser's own localStorage (Zero privacy leakage to other users)
function persistLocal() {
  try {
    localStorage.setItem('ag_projects_matrix', JSON.stringify({
      projects: state.projects,
      categories: state.categories
    }));
  } catch (e) {
    console.error('Failed to save to localStorage:', e);
  }
}

// Load Data Strategy
async function loadData() {
  const syncLabel = document.getElementById('syncLabel');
  const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

  // 1. If on Localhost, always sync with Second Brain Node.js API
  if (isLocal) {
    try {
      const res = await fetch('/api/data');
      if (res.ok) {
        const data = await res.json();
        state.projects = data.projects || [];
        state.categories = data.categories || [];
        state.isLocalServer = true;
        persistLocal();
        syncLabel.textContent = 'Second Brain Sync';
        updateCategoryDropdowns();
        renderStats();
        renderRows();
        return;
      }
    } catch (e) {
      console.warn('Local API error, using localStorage');
    }
  }

  // 2. On Cloudflare Pages: Check user's own localStorage first (their private data)
  syncLabel.textContent = 'Browser Local Storage';
  const saved = localStorage.getItem('ag_projects_matrix');
  if (saved) {
    try {
      const data = JSON.parse(saved);
      state.projects = data.projects || [];
      state.categories = data.categories || [];
      updateCategoryDropdowns();
      renderStats();
      renderRows();
      return;
    } catch (e) {}
  }

  // 3. If brand new visitor on Cloudflare Pages, load clean generic template
  try {
    const res2 = await fetch('./projects_data.json');
    if (res2.ok) {
      const data2 = await res2.json();
      state.projects = data2.projects || [];
      state.categories = data2.categories || [];
      persistLocal();
      updateCategoryDropdowns();
      renderStats();
      renderRows();
    }
  } catch (err) {
    showToast('Không thể tải dữ liệu khởi tạo', true);
  }
}

function updateCategoryDropdowns() {
  const catFilter = document.getElementById('categoryFilter');
  const newProjCat = document.getElementById('newProjCategory');

  const set = new Set([...state.categories, ...state.projects.map(p => p.category).filter(Boolean)]);
  const allCats = Array.from(set).sort();

  const curFilterVal = catFilter.value;
  catFilter.innerHTML = '<option value="ALL">Tất cả (All)</option>';
  allCats.forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat;
    opt.textContent = cat;
    catFilter.appendChild(opt);
  });
  if (allCats.includes(curFilterVal)) catFilter.value = curFilterVal;

  newProjCat.innerHTML = '';
  allCats.forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat;
    opt.textContent = cat;
    newProjCat.appendChild(opt);
  });
}

function renderStats() {
  const statsBar = document.getElementById('statsBar');
  const total = state.projects.length;
  
  const counts = {
    'Idea / Conceptual': 0,
    'Just Started / Inception': 0,
    'In Progress - Expanding': 0,
    'Near Complete - Polishing': 0,
    'Ready for Promotion / Launch': 0
  };

  state.projects.forEach(p => {
    if (counts[p.stage] !== undefined) counts[p.stage]++;
  });

  statsBar.innerHTML = `
    <div class="stat-chip stat-all ${state.filterStage === 'ALL' ? 'active' : ''}" data-filter="ALL">
      Tất cả: <strong>${total}</strong>
    </div>
    <div class="stat-chip stat-idea ${state.filterStage === 'Idea / Conceptual' ? 'active' : ''}" data-filter="Idea / Conceptual">
      🟣 Idea: <strong>${counts['Idea / Conceptual']}</strong>
    </div>
    <div class="stat-chip stat-just-started ${state.filterStage === 'Just Started / Inception' ? 'active' : ''}" data-filter="Just Started / Inception">
      🔵 Started: <strong>${counts['Just Started / Inception']}</strong>
    </div>
    <div class="stat-chip stat-in-progress ${state.filterStage === 'In Progress - Expanding' ? 'active' : ''}" data-filter="In Progress - Expanding">
      🟠 Progress: <strong>${counts['In Progress - Expanding']}</strong>
    </div>
    <div class="stat-chip stat-polishing ${state.filterStage === 'Near Complete - Polishing' ? 'active' : ''}" data-filter="Near Complete - Polishing">
      🟡 Polishing: <strong>${counts['Near Complete - Polishing']}</strong>
    </div>
    <div class="stat-chip stat-launch ${state.filterStage === 'Ready for Promotion / Launch' ? 'active' : ''}" data-filter="Ready for Promotion / Launch">
      🟢 Launch: <strong>${counts['Ready for Promotion / Launch']}</strong>
    </div>
  `;

  statsBar.querySelectorAll('.stat-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      state.filterStage = chip.dataset.filter;
      document.getElementById('stageFilter').value = state.filterStage;
      renderStats();
      renderRows();
    });
  });
}

// Render Master Rows (Dual View: 4-Col Desktop, 2-Col Mobile)
function renderRows() {
  const container = document.getElementById('matrixRowsContainer');
  const emptyState = document.getElementById('emptyState');
  const q = state.searchQuery.toLowerCase().trim();

  const filtered = state.projects.filter(p => {
    if (state.filterStage !== 'ALL' && p.stage !== state.filterStage) return false;
    if (state.filterCategory !== 'ALL' && p.category !== state.filterCategory) return false;
    if (state.filterIdeaStatus !== 'ALL') {
      const hasStatus = (p.ideas || []).some(i => i.status === state.filterIdeaStatus);
      if (!hasStatus) return false;
    }
    if (q) {
      const matchName = (p.name || '').toLowerCase().includes(q);
      const matchCat = (p.category || '').toLowerCase().includes(q);
      const matchTags = (p.tags || []).some(t => t.toLowerCase().includes(q));
      const matchIdeas = (p.ideas || []).some(i => i.text.toLowerCase().includes(q));
      if (!matchName && !matchCat && !matchTags && !matchIdeas) return false;
    }
    return true;
  });

  if (filtered.length === 0) {
    container.innerHTML = '';
    emptyState.classList.remove('hidden');
    return;
  }

  emptyState.classList.add('hidden');
  container.innerHTML = '';

  const allDistinctCats = Array.from(new Set([...state.categories, ...state.projects.map(p => p.category).filter(Boolean)])).sort();

  filtered.forEach(proj => {
    const row = document.createElement('div');
    row.className = 'matrix-row';
    row.dataset.id = proj.id;

    // LEFT META WRAPPER: Contains Col 1, Col 2, Col 3
    // On Desktop: display: contents (unwraps into 3 columns!)
    // On Mobile: flex column (merges into 1 column!)
    const metaWrapper = document.createElement('div');
    metaWrapper.className = 'col-meta-wrapper';

    // 1. CATEGORY
    const cellCat = document.createElement('div');
    cellCat.className = 'cell-category';
    const catClass = getCatClass(proj.category);
    cellCat.innerHTML = `
      <div class="cat-badge ${catClass}">
        <select class="cat-select-inline" title="Đổi danh mục">
          ${allDistinctCats.map(c => `<option value="${c}" ${c === proj.category ? 'selected' : ''}>${c}</option>`).join('')}
        </select>
      </div>
    `;
    cellCat.querySelector('.cat-select-inline').addEventListener('change', async (e) => {
      const newCat = e.target.value;
      proj.category = newCat;
      persistLocal();
      if (state.isLocalServer) await updateProjectField(proj.id, { category: newCat });
      renderStats();
      renderRows();
    });

    // 2. PROJECT & STAGE
    const cellProj = document.createElement('div');
    cellProj.className = 'cell-project';
    cellProj.innerHTML = `
      <div class="proj-header">
        <span class="proj-title" title="${proj.name}">📁 ${proj.name}</span>
        <button class="btn-icon btn-del-proj" title="Xóa dự án">🗑️</button>
      </div>
      <div class="proj-folder" title="${proj.folderName || proj.name}">
        d:\__G AG Projects\${proj.folderName || proj.name}
      </div>
      <select class="stage-select" data-stage="${proj.stage}" title="Chọn giai đoạn dự án">
        <option value="Idea / Conceptual" ${proj.stage === 'Idea / Conceptual' ? 'selected' : ''}>🟣 Idea</option>
        <option value="Just Started / Inception" ${proj.stage === 'Just Started / Inception' ? 'selected' : ''}>🔵 Just Started</option>
        <option value="In Progress - Expanding" ${proj.stage === 'In Progress - Expanding' ? 'selected' : ''}>🟠 In Progress</option>
        <option value="Near Complete - Polishing" ${proj.stage === 'Near Complete - Polishing' ? 'selected' : ''}>🟡 Polishing</option>
        <option value="Ready for Promotion / Launch" ${proj.stage === 'Ready for Promotion / Launch' ? 'selected' : ''}>🟢 Launch Ready</option>
      </select>
    `;

    const stageSelect = cellProj.querySelector('.stage-select');
    stageSelect.addEventListener('change', async (e) => {
      const newStage = e.target.value;
      stageSelect.dataset.stage = newStage;
      proj.stage = newStage;
      persistLocal();
      if (state.isLocalServer) await updateProjectField(proj.id, { stage: newStage });
      renderStats();
      showToast(`Đã đổi sang: ${newStage}`);
    });

    cellProj.querySelector('.btn-del-proj').addEventListener('click', async () => {
      if (confirm(`Xóa dự án '${proj.name}'?`)) {
        state.projects = state.projects.filter(p => p.id !== proj.id);
        persistLocal();
        if (state.isLocalServer) await deleteProject(proj.id);
        renderStats();
        renderRows();
        showToast('Đã xóa dự án');
      }
    });

    // 3. TAGS
    const cellTags = document.createElement('div');
    cellTags.className = 'cell-tags';
    const tagsWrapper = document.createElement('div');
    tagsWrapper.className = 'tags-wrapper';

    (proj.tags || []).forEach((tag, idx) => {
      const tagChip = document.createElement('span');
      tagChip.className = 'tag-chip';
      tagChip.innerHTML = `${tag} <span class="tag-delete" title="Xóa tag">&times;</span>`;
      tagChip.querySelector('.tag-delete').addEventListener('click', async () => {
        proj.tags.splice(idx, 1);
        persistLocal();
        if (state.isLocalServer) await updateProjectField(proj.id, { tags: proj.tags });
        renderRows();
      });
      tagsWrapper.appendChild(tagChip);
    });

    const addTagBtn = document.createElement('button');
    addTagBtn.className = 'tag-add-btn';
    addTagBtn.textContent = '+ tag';
    addTagBtn.title = 'Thêm tag mới';
    
    addTagBtn.addEventListener('click', () => {
      addTagBtn.classList.add('hidden');
      const tagInput = document.createElement('input');
      tagInput.className = 'tag-input-inline';
      tagInput.placeholder = '#tag';
      tagsWrapper.appendChild(tagInput);
      tagInput.focus();

      const commitTag = async () => {
        let val = tagInput.value.trim();
        if (val) {
          if (!val.startsWith('#')) val = '#' + val;
          if (!proj.tags) proj.tags = [];
          if (!proj.tags.includes(val)) {
            proj.tags.push(val);
            persistLocal();
            if (state.isLocalServer) await updateProjectField(proj.id, { tags: proj.tags });
          }
        }
        renderRows();
      };

      tagInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') commitTag();
        if (e.key === 'Escape') renderRows();
      });
      tagInput.addEventListener('blur', commitTag);
    });

    tagsWrapper.appendChild(addTagBtn);
    cellTags.appendChild(tagsWrapper);

    metaWrapper.appendChild(cellCat);
    metaWrapper.appendChild(cellProj);
    metaWrapper.appendChild(cellTags);

    // 4. IDEAS & STATUS
    const cellIdeas = document.createElement('div');
    cellIdeas.className = 'cell-ideas';
    const ideasWrapper = document.createElement('div');
    ideasWrapper.className = 'ideas-wrapper';

    const ideasToShow = (proj.ideas || []).filter(i => {
      if (state.filterIdeaStatus !== 'ALL' && i.status !== state.filterIdeaStatus) return false;
      return true;
    });

    ideasToShow.forEach(idea => {
      const ideaRow = document.createElement('div');
      ideaRow.className = 'idea-row';

      const statusBtn = document.createElement('button');
      const sClass = idea.status === 'Đã xong' ? 'status-xong' :
                     idea.status === 'Đang triển khai' ? 'status-dang' :
                     idea.status === 'Loại bỏ' ? 'status-loai' : 'status-chua';
      
      const sLabel = idea.status === 'Đã xong' ? '🟢 Xong' :
                     idea.status === 'Đang triển khai' ? '🟡 Đang làm' :
                     idea.status === 'Loại bỏ' ? '🔴 Bỏ' : '⚪ Chưa làm';

      statusBtn.className = `idea-status-btn ${sClass}`;
      statusBtn.textContent = sLabel;
      statusBtn.title = 'Click để đổi trạng thái';

      statusBtn.addEventListener('click', async () => {
        const curIdx = IDEA_STATES.indexOf(idea.status);
        const nextIdx = (curIdx + 1) % IDEA_STATES.length;
        idea.status = IDEA_STATES[nextIdx];
        persistLocal();
        if (state.isLocalServer) await updateIdea(proj.id, idea.id, { status: idea.status });
        renderRows();
      });

      const textSpan = document.createElement('span');
      textSpan.className = 'idea-text' + 
        (idea.status === 'Đã xong' ? ' done' : '') +
        (idea.status === 'Loại bỏ' ? ' discarded' : '');
      textSpan.textContent = idea.text;
      textSpan.title = 'Bấm đúp để sửa';

      textSpan.addEventListener('dblclick', () => {
        const editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.value = idea.text;
        editInput.style.cssText = 'flex:1; background:#0f172a; border:1px solid #06b6d4; color:#fff; padding:2px 4px; border-radius:3px; font-size:11px; outline:none;';
        
        const commitEdit = async () => {
          const newVal = editInput.value.trim();
          if (newVal && newVal !== idea.text) {
            idea.text = newVal;
            persistLocal();
            if (state.isLocalServer) await updateIdea(proj.id, idea.id, { text: newVal });
          }
          renderRows();
        };

        editInput.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') commitEdit();
          if (e.key === 'Escape') renderRows();
        });
        editInput.addEventListener('blur', commitEdit);

        ideaRow.replaceChild(editInput, textSpan);
        editInput.focus();
      });

      const delBtn = document.createElement('button');
      delBtn.className = 'idea-delete-btn';
      delBtn.innerHTML = '&times;';
      delBtn.title = 'Xóa ý tưởng';
      delBtn.addEventListener('click', async () => {
        proj.ideas = proj.ideas.filter(i => i.id !== idea.id);
        persistLocal();
        if (state.isLocalServer) await deleteIdea(proj.id, idea.id);
        renderRows();
      });

      ideaRow.appendChild(statusBtn);
      ideaRow.appendChild(textSpan);
      ideaRow.appendChild(delBtn);
      ideasWrapper.appendChild(ideaRow);
    });

    const addIdeaBar = document.createElement('div');
    addIdeaBar.className = 'idea-add-inline';
    addIdeaBar.innerHTML = `
      <input type="text" placeholder="+ Thêm ý tưởng (Enter)..." autocomplete="off">
      <button type="button">+</button>
    `;

    const ideaInput = addIdeaBar.querySelector('input');
    const ideaSubmitBtn = addIdeaBar.querySelector('button');

    const handleAddIdea = async () => {
      const text = ideaInput.value.trim();
      if (!text) return;
      const newIdea = {
        id: Math.random().toString(36).substr(2, 8),
        text,
        status: 'Chưa triển khai',
        createdAt: new Date().toISOString()
      };
      if (!proj.ideas) proj.ideas = [];
      proj.ideas.push(newIdea);
      ideaInput.value = '';
      persistLocal();
      if (state.isLocalServer) {
        try {
          await fetch(`/api/projects/${proj.id}/ideas`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text, status: 'Chưa triển khai' })
          });
        } catch(e) {}
      }
      renderRows();
      showToast('Đã thêm ý tưởng');
    };

    ideaInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleAddIdea();
      }
    });
    ideaSubmitBtn.addEventListener('click', handleAddIdea);

    ideasWrapper.appendChild(addIdeaBar);
    cellIdeas.appendChild(ideasWrapper);

    row.appendChild(metaWrapper);
    row.appendChild(cellIdeas);
    container.appendChild(row);
  });
}

// API Mutations (Active when running local server)
async function updateProjectField(id, fields) {
  try {
    await fetch(`/api/projects/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fields)
    });
  } catch(e) {}
}

async function deleteProject(id) {
  try {
    await fetch(`/api/projects/${id}`, { method: 'DELETE' });
  } catch(e) {}
}

async function updateIdea(projId, ideaId, fields) {
  try {
    await fetch(`/api/projects/${projId}/ideas/${ideaId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fields)
    });
  } catch(e) {}
}

async function deleteIdea(projId, ideaId) {
  try {
    await fetch(`/api/projects/${projId}/ideas/${ideaId}`, { method: 'DELETE' });
  } catch(e) {}
}

// Setup Event Listeners
function setupEventListeners() {
  const searchInput = document.getElementById('searchInput');
  const btnClearSearch = document.getElementById('btnClearSearch');
  
  searchInput.addEventListener('input', (e) => {
    state.searchQuery = e.target.value;
    btnClearSearch.classList.toggle('hidden', !state.searchQuery);
    renderRows();
  });

  btnClearSearch.addEventListener('click', () => {
    searchInput.value = '';
    state.searchQuery = '';
    btnClearSearch.classList.add('hidden');
    renderRows();
    searchInput.focus();
  });

  document.getElementById('categoryFilter').addEventListener('change', (e) => {
    state.filterCategory = e.target.value;
    renderRows();
  });

  document.getElementById('stageFilter').addEventListener('change', (e) => {
    state.filterStage = e.target.value;
    renderStats();
    renderRows();
  });

  document.getElementById('ideaStatusFilter').addEventListener('change', (e) => {
    state.filterIdeaStatus = e.target.value;
    renderRows();
  });

  const quickAddSection = document.getElementById('quickAddSection');
  const btnToggleAdd = document.getElementById('btnToggleAddProject');
  const btnCancelAdd = document.getElementById('btnCancelAddProj');

  btnToggleAdd.addEventListener('click', () => {
    quickAddSection.classList.toggle('hidden');
    if (!quickAddSection.classList.contains('hidden')) {
      document.getElementById('newProjName').focus();
    }
  });

  btnCancelAdd.addEventListener('click', () => {
    quickAddSection.classList.add('hidden');
  });

  document.getElementById('addProjectForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('newProjName').value.trim();
    if (!name) return;

    const category = document.getElementById('newProjCategory').value;
    const stage = document.getElementById('newProjStage').value;
    const rawTags = document.getElementById('newProjTags').value;
    const initialIdea = document.getElementById('newProjInitialIdea').value.trim();

    const tags = rawTags.split(/[,\s]+/)
      .map(t => t.trim())
      .filter(Boolean)
      .map(t => t.startsWith('#') ? t : '#' + t);

    const nowStr = new Date().toISOString();
    const newProj = {
      id: 'proj_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 4),
      name,
      folderName: name,
      category,
      stage,
      tags,
      ideas: initialIdea ? [{
        id: Math.random().toString(36).substr(2, 8),
        text: initialIdea,
        status: 'Chưa triển khai',
        createdAt: nowStr
      }] : [],
      createdAt: nowStr,
      updatedAt: nowStr
    };

    state.projects.unshift(newProj);
    persistLocal();

    if (state.isLocalServer) {
      try {
        await fetch('/api/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, category, stage, tags, initialIdea })
        });
      } catch (err) {}
    }

    document.getElementById('addProjectForm').reset();
    quickAddSection.classList.add('hidden');
    renderStats();
    renderRows();
    showToast(`Đã thêm dự án: ${name}`);
  });

  // Export JSON (Backup / Download)
  document.getElementById('btnExportJson').addEventListener('click', () => {
    const dataStr = JSON.stringify({
      projects: state.projects,
      categories: state.categories
    }, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `projects_tracker_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Đã xuất file JSON thành công!');
  });

  // Import JSON (Restore into local browser)
  const importInput = document.getElementById('importFileInput');
  importInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target.result);
        if (Array.isArray(imported.projects)) {
          state.projects = imported.projects;
          if (Array.isArray(imported.categories)) state.categories = imported.categories;
          persistLocal();
          updateCategoryDropdowns();
          renderStats();
          renderRows();
          showToast(`Đã nhập thành công ${state.projects.length} dự án!`);
        } else {
          showToast('File JSON không đúng cấu trúc', true);
        }
      } catch (err) {
        showToast('Lỗi đọc file JSON: ' + err.message, true);
      }
    };
    reader.readAsText(file);
    importInput.value = '';
  });

  // Add Category Button
  document.getElementById('btnAddNewCat').addEventListener('click', () => {
    const newCat = prompt('Nhập tên danh mục mới (Category):');
    if (newCat && newCat.trim()) {
      const c = newCat.trim();
      if (!state.categories.includes(c)) {
        state.categories.push(c);
        persistLocal();
        updateCategoryDropdowns();
        document.getElementById('newProjCategory').value = c;
        showToast(`Đã thêm danh mục: ${c}`);
      }
    }
  });

  // Rescan Button
  document.getElementById('btnRescan').addEventListener('click', async () => {
    const btn = document.getElementById('btnRescan');
    if (!state.isLocalServer) {
      alert('Tính năng quét thư mục tự động yêu cầu chạy máy chủ cục bộ (http://localhost:5199). Trên Cloudflare Pages, Sếp hãy dùng nút Nhập JSON để tải dữ liệu lên nhé!');
      return;
    }
    btn.disabled = true;
    btn.textContent = '⏳ Quét...';
    try {
      const res = await fetch('/api/rescan', { method: 'POST' });
      const data = await res.json();
      await loadData();
      showToast(`Quét xong! Thêm ${data.addedCount} thư mục mới (Tổng: ${data.total})`);
    } catch (err) {
      showToast('Lỗi quét: ' + err.message, true);
    } finally {
      btn.disabled = false;
      btn.textContent = '🔄 Quét AG';
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
  loadData();
});
