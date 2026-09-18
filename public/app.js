// AG Project & Idea Matrix Frontend Application
// Extreme Efficiency & 4-Column High-Density Logic

let state = {
  projects: [],
  categories: [],
  filterCategory: 'ALL',
  filterStage: 'ALL',
  filterIdeaStatus: 'ALL',
  searchQuery: ''
};

// 4 Idea States in cycling order
const IDEA_STATES = [
  'Chưa triển khai',
  'Đang triển khai',
  'Đã xong',
  'Loại bỏ'
];

// 5 Project Stages
const STAGES = [
  'Idea / Conceptual',
  'Just Started / Inception',
  'In Progress - Expanding',
  'Near Complete - Polishing',
  'Ready for Promotion / Launch'
];

// Helper to get category class
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

// Toast helper
function showToast(msg, isError = false) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.style.borderLeftColor = isError ? '#ef4444' : '#06b6d4';
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2200);
}

// Fetch Initial Data
function persistLocal() {
  try {
    localStorage.setItem('ag_projects_matrix', JSON.stringify({
      projects: state.projects,
      categories: state.categories
    }));
  } catch (e) {}
}

async function loadData() {
  // 1. Try local Node server API
  try {
    const res = await fetch('/api/data');
    if (res.ok) {
      const data = await res.json();
      state.projects = data.projects || [];
      state.categories = data.categories || [];
      persistLocal();
      updateCategoryDropdowns();
      renderStats();
      renderTable();
      return;
    }
  } catch (e) {
    console.log('API not reachable, using Cloudflare Pages / localStorage mode');
  }

  // 2. Fallback to localStorage
  const saved = localStorage.getItem('ag_projects_matrix');
  if (saved) {
    try {
      const data = JSON.parse(saved);
      state.projects = data.projects || [];
      state.categories = data.categories || [];
      updateCategoryDropdowns();
      renderStats();
      renderTable();
      return;
    } catch (e) {}
  }

  // 3. Fallback to bundled projects_data.json
  try {
    const res2 = await fetch('./projects_data.json');
    if (res2.ok) {
      const data2 = await res2.json();
      state.projects = data2.projects || [];
      state.categories = data2.categories || [];
      persistLocal();
      updateCategoryDropdowns();
      renderStats();
      renderTable();
      return;
    }
  } catch (e) {
    showToast('Lỗi khi tải dữ liệu: ' + e.message, true);
  }
}

// Update Category Filter and New Project Category Dropdowns
function updateCategoryDropdowns() {
  const catFilter = document.getElementById('categoryFilter');
  const newProjCat = document.getElementById('newProjCategory');

  // Collect distinct categories from both state.categories and existing projects
  const set = new Set([...state.categories, ...state.projects.map(p => p.category).filter(Boolean)]);
  const allCats = Array.from(set).sort();

  // Populate Filter
  const curFilterVal = catFilter.value;
  catFilter.innerHTML = '<option value="ALL">Tất cả danh mục (All)</option>';
  allCats.forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat;
    opt.textContent = cat;
    catFilter.appendChild(opt);
  });
  if (allCats.includes(curFilterVal)) catFilter.value = curFilterVal;

  // Populate Add Project Modal
  newProjCat.innerHTML = '';
  allCats.forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat;
    opt.textContent = cat;
    newProjCat.appendChild(opt);
  });
}

// Render Header Stats Pills
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
      🔵 Just Started: <strong>${counts['Just Started / Inception']}</strong>
    </div>
    <div class="stat-chip stat-in-progress ${state.filterStage === 'In Progress - Expanding' ? 'active' : ''}" data-filter="In Progress - Expanding">
      🟠 In Progress: <strong>${counts['In Progress - Expanding']}</strong>
    </div>
    <div class="stat-chip stat-polishing ${state.filterStage === 'Near Complete - Polishing' ? 'active' : ''}" data-filter="Near Complete - Polishing">
      🟡 Polishing: <strong>${counts['Near Complete - Polishing']}</strong>
    </div>
    <div class="stat-chip stat-launch ${state.filterStage === 'Ready for Promotion / Launch' ? 'active' : ''}" data-filter="Ready for Promotion / Launch">
      🟢 Promotion Ready: <strong>${counts['Ready for Promotion / Launch']}</strong>
    </div>
  `;

  // Attach click listener to each chip for instant filter
  statsBar.querySelectorAll('.stat-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      state.filterStage = chip.dataset.filter;
      document.getElementById('stageFilter').value = state.filterStage;
      renderStats();
      renderTable();
    });
  });
}

// Render Master 4-Column Table
function renderTable() {
  const tbody = document.getElementById('matrixBody');
  const emptyState = document.getElementById('emptyState');
  const q = state.searchQuery.toLowerCase().trim();

  // Filter projects
  const filtered = state.projects.filter(p => {
    // Stage Filter
    if (state.filterStage !== 'ALL' && p.stage !== state.filterStage) return false;
    
    // Category Filter
    if (state.filterCategory !== 'ALL' && p.category !== state.filterCategory) return false;

    // Idea Status Filter
    if (state.filterIdeaStatus !== 'ALL') {
      const hasStatus = (p.ideas || []).some(i => i.status === state.filterIdeaStatus);
      if (!hasStatus) return false;
    }

    // Search Query (matches project name, category, tags, or any idea text)
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
    tbody.innerHTML = '';
    emptyState.classList.remove('hidden');
    return;
  }

  emptyState.classList.add('hidden');
  tbody.innerHTML = '';

  const allDistinctCats = Array.from(new Set([...state.categories, ...state.projects.map(p => p.category).filter(Boolean)])).sort();

  filtered.forEach(proj => {
    const tr = document.createElement('tr');
    tr.dataset.id = proj.id;

    // ==========================================
    // CỘT 1: CATEGORY
    // ==========================================
    const tdCat = document.createElement('td');
    const catClass = getCatClass(proj.category);
    tdCat.innerHTML = `
      <div class="cat-badge ${catClass}">
        <select class="cat-select-inline" title="Đổi danh mục">
          ${allDistinctCats.map(c => `<option value="${c}" ${c === proj.category ? 'selected' : ''}>${c}</option>`).join('')}
        </select>
      </div>
    `;

    tdCat.querySelector('.cat-select-inline').addEventListener('change', async (e) => {
      const newCat = e.target.value;
      await updateProjectField(proj.id, { category: newCat }); persistLocal();
      proj.category = newCat;
      renderStats();
      renderTable();
    });

    // ==========================================
    // CỘT 2: TÊN DỰ ÁN & TRẠNG THÁI GIAI ĐOẠN
    // ==========================================
    const tdProj = document.createElement('td');
    tdProj.innerHTML = `
      <div class="proj-cell">
        <div class="proj-header">
          <span class="proj-title" title="${proj.name}">📁 ${proj.name}</span>
          <button class="btn-icon btn-del-proj" title="Xóa dự án">🗑️</button>
        </div>
        <div class="proj-folder" title="${proj.folderName || proj.name}">
          d:\__G AG Projects\${proj.folderName || proj.name}
        </div>
        <select class="stage-select" data-stage="${proj.stage}" title="Chọn giai đoạn dự án">
          <option value="Idea / Conceptual" ${proj.stage === 'Idea / Conceptual' ? 'selected' : ''}>🟣 Idea / Conceptual</option>
          <option value="Just Started / Inception" ${proj.stage === 'Just Started / Inception' ? 'selected' : ''}>🔵 Just Started / Inception</option>
          <option value="In Progress - Expanding" ${proj.stage === 'In Progress - Expanding' ? 'selected' : ''}>🟠 In Progress - Expanding</option>
          <option value="Near Complete - Polishing" ${proj.stage === 'Near Complete - Polishing' ? 'selected' : ''}>🟡 Near Complete - Polishing</option>
          <option value="Ready for Promotion / Launch" ${proj.stage === 'Ready for Promotion / Launch' ? 'selected' : ''}>🟢 Ready for Promotion / Launch</option>
        </select>
      </div>
    `;

    const stageSelect = tdProj.querySelector('.stage-select');
    stageSelect.addEventListener('change', async (e) => {
      const newStage = e.target.value;
      stageSelect.dataset.stage = newStage;
      await updateProjectField(proj.id, { stage: newStage }); persistLocal();
      proj.stage = newStage;
      renderStats();
      showToast(`Đã chuyển '${proj.name}' sang: ${newStage}`);
    });

    tdProj.querySelector('.btn-del-proj').addEventListener('click', async () => {
      if (confirm(`Sếp có chắc chắn muốn xóa dự án '${proj.name}' khỏi bảng theo dõi?`)) {
        await deleteProject(proj.id);
      }
    });

    // ==========================================
    // CỘT 3: TAGS PHÂN LOẠI
    // ==========================================
    const tdTags = document.createElement('td');
    const tagsWrapper = document.createElement('div');
    tagsWrapper.className = 'tags-wrapper';

    (proj.tags || []).forEach((tag, idx) => {
      const tagChip = document.createElement('span');
      tagChip.className = 'tag-chip';
      tagChip.innerHTML = `${tag} <span class="tag-delete" title="Xóa tag">&times;</span>`;
      tagChip.querySelector('.tag-delete').addEventListener('click', async () => {
        proj.tags.splice(idx, 1);
        await updateProjectField(proj.id, { tags: proj.tags }); persistLocal();
        renderTable();
      });
      tagsWrapper.appendChild(tagChip);
    });

    // Add Tag Button / Inline Input
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
            await updateProjectField(proj.id, { tags: proj.tags }); persistLocal();
          }
        }
        renderTable();
      };

      tagInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') commitTag();
        if (e.key === 'Escape') renderTable();
      });
      tagInput.addEventListener('blur', commitTag);
    });

    tagsWrapper.appendChild(addTagBtn);
    tdTags.appendChild(tagsWrapper);

    // ==========================================
    // CỘT 4: CÁC Ý TƯỞNG & TRẠNG THÁI
    // ==========================================
    const tdIdeas = document.createElement('td');
    const ideasWrapper = document.createElement('div');
    ideasWrapper.className = 'ideas-wrapper';

    // Filter ideas if ideaStatusFilter is active
    const ideasToShow = (proj.ideas || []).filter(i => {
      if (state.filterIdeaStatus !== 'ALL' && i.status !== state.filterIdeaStatus) return false;
      return true;
    });

    ideasToShow.forEach(idea => {
      const ideaRow = document.createElement('div');
      ideaRow.className = 'idea-row';

      // Status chip button
      const statusBtn = document.createElement('button');
      const sClass = idea.status === 'Đã xong' ? 'status-xong' :
                     idea.status === 'Đang triển khai' ? 'status-dang' :
                     idea.status === 'Loại bỏ' ? 'status-loai' : 'status-chua';
      
      const sLabel = idea.status === 'Đã xong' ? '🟢 Đã xong' :
                     idea.status === 'Đang triển khai' ? '🟡 Đang làm' :
                     idea.status === 'Loại bỏ' ? '🔴 Loại bỏ' : '⚪ Chưa làm';

      statusBtn.className = `idea-status-btn ${sClass}`;
      statusBtn.textContent = sLabel;
      statusBtn.title = `Click để đổi trạng thái: Chưa làm ➔ Đang làm ➔ Đã xong ➔ Loại bỏ`;

      // Single click cycles status
      statusBtn.addEventListener('click', async () => {
        const curIdx = IDEA_STATES.indexOf(idea.status);
        const nextIdx = (curIdx + 1) % IDEA_STATES.length;
        const nextStatus = IDEA_STATES[nextIdx];
        idea.status = nextStatus;
        await updateIdea(proj.id, idea.id, { status: nextStatus }); persistLocal();
        renderTable();
      });

      // Text element
      const textSpan = document.createElement('span');
      textSpan.className = 'idea-text' + 
        (idea.status === 'Đã xong' ? ' done' : '') +
        (idea.status === 'Loại bỏ' ? ' discarded' : '');
      textSpan.textContent = idea.text;
      textSpan.title = 'Bấm đúp để sửa nhanh nội dung';

      // Double click to edit inline
      textSpan.addEventListener('dblclick', () => {
        const editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.value = idea.text;
        editInput.className = 'idea-input-edit';
        editInput.style.cssText = 'flex:1; background:#0f172a; border:1px solid #06b6d4; color:#fff; padding:2px 4px; border-radius:3px; font-size:12px; outline:none;';
        
        const commitEdit = async () => {
          const newVal = editInput.value.trim();
          if (newVal && newVal !== idea.text) {
            idea.text = newVal;
            await updateIdea(proj.id, idea.id, { text: newVal }); persistLocal();
          }
          renderTable();
        };

        editInput.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') commitEdit();
          if (e.key === 'Escape') renderTable();
        });
        editInput.addEventListener('blur', commitEdit);

        ideaRow.replaceChild(editInput, textSpan);
        editInput.focus();
      });

      // Delete idea button
      const delBtn = document.createElement('button');
      delBtn.className = 'idea-delete-btn';
      delBtn.innerHTML = '&times;';
      delBtn.title = 'Xóa ý tưởng này';
      delBtn.addEventListener('click', async () => {
        await deleteIdea(proj.id, idea.id);
        proj.ideas = proj.ideas.filter(i => i.id !== idea.id); persistLocal();
        renderTable();
      });

      ideaRow.appendChild(statusBtn);
      ideaRow.appendChild(textSpan);
      ideaRow.appendChild(delBtn);
      ideasWrapper.appendChild(ideaRow);
    });

    // Inline Add Idea input at the bottom of Column 4
    const addIdeaBar = document.createElement('div');
    addIdeaBar.className = 'idea-add-inline';
    addIdeaBar.innerHTML = `
      <input type="text" placeholder="+ Thêm ý tưởng / việc cần làm (Enter)..." autocomplete="off">
      <button type="button">+ Thêm</button>
    `;

    const ideaInput = addIdeaBar.querySelector('input');
    const ideaSubmitBtn = addIdeaBar.querySelector('button');

    const handleAddIdea = async () => {
      const text = ideaInput.value.trim();
      if (!text) return;
      try {
        const res = await fetch(`/api/projects/${proj.id}/ideas`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text, status: 'Chưa triển khai' })
        });
        if (!res.ok) throw new Error('Failed to add idea');
        const newIdea = await res.json();
        if (!proj.ideas) proj.ideas = [];
        proj.ideas.push(newIdea);
        ideaInput.value = '';
        renderTable();
        showToast(`Đã thêm ý tưởng vào ${proj.name}`);
      } catch (e) {
        showToast('Lỗi: ' + e.message, true);
      }
    };

    ideaInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleAddIdea();
      }
    });
    ideaSubmitBtn.addEventListener('click', handleAddIdea);

    ideasWrapper.appendChild(addIdeaBar);
    tdIdeas.appendChild(ideasWrapper);

    // Assemble row
    tr.appendChild(tdCat);
    tr.appendChild(tdProj);
    tr.appendChild(tdTags);
    tr.appendChild(tdIdeas);
    tbody.appendChild(tr);
  });
}

// API Mutations
async function updateProjectField(id, fields) {
  try {
    const res = await fetch(`/api/projects/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fields)
    });
    if (!res.ok) throw new Error('Update failed');
  } catch (e) {
    showToast('Lỗi cập nhật dự án: ' + e.message, true);
  }
}

async function deleteProject(id) {
  try {
    const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Delete failed');
    state.projects = state.projects.filter(p => p.id !== id);
    renderStats();
    renderTable();
    showToast('Đã xóa dự án thành công');
  } catch (e) {
    showToast('Lỗi xóa dự án: ' + e.message, true);
  }
}

async function updateIdea(projId, ideaId, fields) {
  try {
    const res = await fetch(`/api/projects/${projId}/ideas/${ideaId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fields)
    });
    if (!res.ok) throw new Error('Idea update failed');
  } catch (e) {
    showToast('Lỗi cập nhật ý tưởng: ' + e.message, true);
  }
}

async function deleteIdea(projId, ideaId) {
  try {
    const res = await fetch(`/api/projects/${projId}/ideas/${ideaId}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Delete failed');
    showToast('Đã xóa ý tưởng');
  } catch (e) {
    showToast('Lỗi xóa ý tưởng: ' + e.message, true);
  }
}

// Event Listeners Setup
function setupEventListeners() {
  // Search
  const searchInput = document.getElementById('searchInput');
  const btnClearSearch = document.getElementById('btnClearSearch');
  
  searchInput.addEventListener('input', (e) => {
    state.searchQuery = e.target.value;
    btnClearSearch.classList.toggle('hidden', !state.searchQuery);
    renderTable();
  });

  btnClearSearch.addEventListener('click', () => {
    searchInput.value = '';
    state.searchQuery = '';
    btnClearSearch.classList.add('hidden');
    renderTable();
    searchInput.focus();
  });

  // Filters
  document.getElementById('categoryFilter').addEventListener('change', (e) => {
    state.filterCategory = e.target.value;
    renderTable();
  });

  document.getElementById('stageFilter').addEventListener('change', (e) => {
    state.filterStage = e.target.value;
    renderStats();
    renderTable();
  });

  document.getElementById('ideaStatusFilter').addEventListener('change', (e) => {
    state.filterIdeaStatus = e.target.value;
    renderTable();
  });

  // Toggle Quick Add Section
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

  // Add Project Form Submit
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

    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, category, stage, tags, initialIdea })
      });
      if (!res.ok) throw new Error('Cannot create project');
      const newProj = await res.json();
      state.projects.unshift(newProj); persistLocal();
      
      // Reset & hide
      document.getElementById('addProjectForm').reset();
      quickAddSection.classList.add('hidden');
      renderStats();
      renderTable();
      showToast(`Đã thêm dự án: ${newProj.name}`);
    } catch (err) {
      showToast('Lỗi: ' + err.message, true);
    }
  });

  // Add Custom Category Button
  document.getElementById('btnAddNewCat').addEventListener('click', async () => {
    const newCat = prompt('Nhập tên danh mục mới (Category):');
    if (newCat && newCat.trim()) {
      try {
        const res = await fetch('/api/categories', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ category: newCat.trim() })
        });
        const data = await res.json();
        state.categories = data.categories;
        updateCategoryDropdowns();
        document.getElementById('newProjCategory').value = newCat.trim();
        showToast(`Đã thêm danh mục: ${newCat.trim()}`);
      } catch (err) {
        showToast('Lỗi thêm category', true);
      }
    }
  });

  // Rescan Button
  document.getElementById('btnRescan').addEventListener('click', async () => {
    const btn = document.getElementById('btnRescan');
    btn.disabled = true;
    btn.textContent = '⏳ Đang quét...';
    try {
      const res = await fetch('/api/rescan', { method: 'POST' });
      const data = await res.json();
      await loadData();
      showToast(`Quét xong! Đã thêm ${data.addedCount} thư mục mới (Tổng: ${data.total})`);
    } catch (err) {
      showToast('Lỗi quét thư mục: ' + err.message, true);
    } finally {
      btn.disabled = false;
      btn.textContent = '🔄 Quét Dự Án AG';
    }
  });
}

// Initial Boot
document.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
  loadData();
});
