import { VIH_SETTINGS } from './settings.js';

// 1. Vite scanner automatisk alle .json filer i /prototypes mappen
const prototypeFiles = import.meta.glob('./prototypes/**/*.json', { eager: true });
const scannedPrototypes = Object.entries(prototypeFiles).map(([path, mod]) => {
    const data = mod.default || mod;
    // Hvis prototypen ikke selv har sat en gruppe, udledes den af mappenavnet
    if (!data.group) {
        if (path.includes('/1_idraet/')) data.group = 'Højskole & Idræt';
        else if (path.includes('/2_fordybelse/')) data.group = 'Højskole & Idræt & …';
        else if (path.includes('/3_eksisterende/')) data.group = 'Eksisterende spor';
        else if (path.includes('/4_elevtyper/')) data.group = 'Elevprofiler / Målgrupper';
        else data.group = 'Faste prototyper';
    }
    return data;
});

function startApp() {
    const SETTINGS = VIH_SETTINGS;

    // Flet scannede filer fra /prototypes sammen med eventuelle standarder
    const existingPrototypes = SETTINGS.prototypes || [];
    const allPrototypes = [...scannedPrototypes];

    existingPrototypes.forEach(p => {
        if (!allPrototypes.some(x => x.name === p.name || (x.id && x.id === p.id))) {
            allPrototypes.push(p);
        }
    });

    SETTINGS.prototypes = allPrototypes;
    
    // LocalStorage nøgler
    const STORAGE_KEY = 'vih_fagvalg_state';
    const CUSTOM_PACKS_KEY = 'vih_custom_packages';
    const MATRIX_SEASON_KEY = 'vih_matrix_season';
    const ROOMS_BLOCK_KEY = 'vih_rooms_block';
    const ACTIVE_TAB_KEY = 'vih_active_tab';
    
    // NYE NØGLER TIL FAGUDVIKLING
    const DELETED_SUBJECTS_KEY = 'vih_deleted_subjects';
    const CUSTOM_SUBJECTS_KEY = 'vih_custom_subjects';

    // State: Valgte fag i skemaet
    let selections = {};
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) selections = JSON.parse(stored);
    } catch (e) { console.warn(e); }

    let customPackages = [];
    try {
        const storedPacks = localStorage.getItem(CUSTOM_PACKS_KEY);
        if (storedPacks) customPackages = JSON.parse(storedPacks);
    } catch (e) { console.warn(e); }

    // Fagudvikling State
    let deletedSubjects = [];
    try {
        const storedDeleted = localStorage.getItem(DELETED_SUBJECTS_KEY);
        if (storedDeleted) deletedSubjects = JSON.parse(storedDeleted);
    } catch (e) { console.warn(e); }

    let customSubjects = {};
    try {
        const storedCustom = localStorage.getItem(CUSTOM_SUBJECTS_KEY);
        if (storedCustom) customSubjects = JSON.parse(storedCustom);
    } catch (e) { console.warn(e); }

    let currentProfile = null;
    let currentSlotContext = null;
    let currentCategoryFilter = 'ALLE';

    // DOM referencer
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    const matrixControls = document.getElementById('matrix-controls');
    const roomsControls = document.getElementById('rooms-controls');

    const gridEl = document.getElementById('schedule-grid');
    const matrixContent = document.getElementById('matrix-content');
    const matrixTitleAccent = document.getElementById('matrix-title-accent');
    const matrixSeasonSelect = document.getElementById('matrix-season-select');
    const roomsContent = document.getElementById('rooms-content');
    const roomsBlockSelect = document.getElementById('rooms-block-select');

    const modalEl = document.getElementById('subject-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalSubtitle = document.getElementById('modal-subtitle');
    const modalFilterBar = document.getElementById('modal-filter-bar');
    const modalSubjectList = document.getElementById('modal-subject-list');
    const btnCloseModal = document.getElementById('btn-close-modal');
    const btnCancelModal = document.getElementById('btn-cancel-modal');
    const btnRemoveSubject = document.getElementById('btn-remove-subject');

    const protoSelect = document.getElementById('prototype-select');
    const btnSavePack = document.getElementById('btn-save-pack');
    const btnDeletePack = document.getElementById('btn-delete-pack');
    const btnExportJson = document.getElementById('btn-export-json');
    const btnClear = document.getElementById('btn-clear');
    const btnShare = document.getElementById('btn-share');
    const profileIndicator = document.getElementById('profile-indicator');
    const profileIndicatorName = document.getElementById('profile-indicator-name');


    // --- FAGUDVIKLING HELPER FUNKTION ---
    function getEffectiveOfferings(slotKey) {
        const baseList = SETTINGS.offerings[slotKey] || [];
        const addedList = customSubjects[slotKey] || [];
        
        return {
            base: baseList,
            added: addedList,
            activeAll: [
                ...baseList.filter(s => !deletedSubjects.includes(s.id)),
                ...addedList
            ]
        };
    }

    // Hjælpefunktion: Slår kategori op via key
    function getCategory(catKey) {
        if (SETTINGS.categories && SETTINGS.categories[catKey]) {
            return SETTINGS.categories[catKey];
        }
        if (SETTINGS.categories) {
            for (const k in SETTINGS.categories) {
                if (SETTINGS.categories[k].name === catKey) return SETTINGS.categories[k];
            }
        }
        return { name: catKey || '', color: '#475569', textColor: '#ffffff' };
    }

    // Normaliserer valg til et array af IDs [id1, id2, ...]
    function getSelectedIds(slotId) {
        const val = selections[slotId];
        if (!val) return [];
        return Array.isArray(val) ? val : [val];
    }

    const savedMatrixSeason = localStorage.getItem(MATRIX_SEASON_KEY) || 'all';
    matrixSeasonSelect.value = savedMatrixSeason;

    const savedRoomsBlock = localStorage.getItem(ROOMS_BLOCK_KEY) || 'all';
    roomsBlockSelect.value = savedRoomsBlock;

    function findSubject(slotId, subjectId) {
        const activeList = getEffectiveOfferings(slotId).activeAll;
        const found = activeList.find(s => s.id === subjectId);
        if (found) return found;

        for (const key in SETTINGS.offerings) {
            const match = getEffectiveOfferings(key).activeAll.find(s => s.id === subjectId);
            if (match) return match;
        }
        return null;
    }

    // --- TAB SWITCHING ---
    let activeTab = localStorage.getItem(ACTIVE_TAB_KEY) || 'tab-picker';

    function switchTab(targetTab) {
        activeTab = targetTab;
        localStorage.setItem(ACTIVE_TAB_KEY, targetTab);

        tabBtns.forEach(b => b.classList.toggle('active', b.dataset.tab === targetTab));
        tabPanes.forEach(p => p.classList.toggle('active', p.id === targetTab));

        matrixControls.style.display = targetTab === 'tab-matrix' ? 'flex' : 'none';
        roomsControls.style.display = targetTab === 'tab-rooms' ? 'flex' : 'none';

        if (targetTab === 'tab-matrix') renderMatrixView();
        if (targetTab === 'tab-rooms') renderRoomsView();
        if (targetTab === 'tab-picker') renderPickerGrid();
    }

    tabBtns.forEach(btn => btn.addEventListener('click', () => switchTab(btn.dataset.tab)));

    // --- VISNING 1: MIT FAGVALG ---
    function setProfileState(profile, isModified = false) {
        currentProfile = profile;
        if (!profile) {
            profileIndicator.style.display = 'none';
            protoSelect.classList.remove('has-active-profile');
            protoSelect.value = '';
            btnDeletePack.style.display = 'none';
            return;
        }

        profileIndicator.style.display = 'inline-flex';
        if (isModified) {
            profileIndicator.className = 'profile-indicator is-modified';
            profileIndicator.querySelector('.indicator-icon').textContent = '✏️';
            profileIndicator.querySelector('.indicator-label').textContent = 'Tilpasset forløb:';
            profileIndicatorName.textContent = `${profile.name} (ændret)`;
            protoSelect.classList.remove('has-active-profile');
            protoSelect.value = '';
            btnDeletePack.style.display = 'none';
        } else {
            profileIndicator.className = 'profile-indicator';
            profileIndicator.querySelector('.indicator-icon').textContent = '★';
            profileIndicator.querySelector('.indicator-label').textContent = 'Aktiv profil:';
            profileIndicatorName.textContent = profile.name;
            protoSelect.classList.add('has-active-profile');
            protoSelect.value = profile.id;
            btnDeletePack.style.display = profile.id.startsWith('custom_') ? 'inline-block' : 'none';
        }
    }

    function renderPickerGrid() {
        gridEl.innerHTML = '';

        const cornerSeason = document.createElement('div');
        gridEl.appendChild(cornerSeason);

        const efteraarHeader = document.createElement('div');
        efteraarHeader.className = 'season-header season-efteraar';
        efteraarHeader.style.gridColumn = 'span 4';
        efteraarHeader.textContent = '🍂 Efterårssemester';
        gridEl.appendChild(efteraarHeader);

        const foraarHeader = document.createElement('div');
        foraarHeader.className = 'season-header season-foraar season-divider';
        foraarHeader.style.gridColumn = 'span 6';
        foraarHeader.textContent = '🌱 Forårssemester';
        gridEl.appendChild(foraarHeader);

        const cornerPeriod = document.createElement('div');
        gridEl.appendChild(cornerPeriod);

        const periods = [
            { name: 'Efterår 1 (Aug-Okt)', span: 2, isDivider: false },
            { name: 'Efterår 2 (Okt-Dec)', span: 2, isDivider: false },
            { name: 'Forår 1 (Jan-Feb)', span: 2, isDivider: true },
            { name: 'Forår 2 (Mar-Maj)', span: 2, isDivider: false },
            { name: 'Forår 3 (Maj-Jun)', span: 2, isDivider: false }
        ];

        periods.forEach(p => {
            const pEl = document.createElement('div');
            pEl.className = 'period-header' + (p.isDivider ? ' season-divider' : '');
            pEl.style.gridColumn = `span ${p.span}`;
            pEl.textContent = p.name;
            gridEl.appendChild(pEl);
        });

        SETTINGS.scheduleRows.forEach(row => {
            const rowHeader = document.createElement('div');
            rowHeader.className = 'row-header';
            rowHeader.innerHTML = `<div>${row.title}</div><div class="row-sub">${row.sub}</div>`;
            gridEl.appendChild(rowHeader);

            row.slots.forEach(slot => {
                const selectedIds = getSelectedIds(slot.id);
                const subjects = selectedIds.map(id => findSubject(slot.id, id)).filter(Boolean);

                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.style.gridColumn = `span ${slot.span}`;
                if (slot.isFirstSpring) cell.classList.add('season-divider');

                if (subjects.length === 0) {
                    cell.classList.add('cell-empty');
                    cell.innerHTML = `<div class="empty-plus">+</div><div class="empty-text">Vælg fag</div>`;
                } else if (subjects.length === 1) {
                    const s = subjects[0];
                    const cat = getCategory(s.category);
                    cell.classList.add('cell-filled', 'cell-single');
                    cell.style.backgroundColor = cat.color;
                    cell.style.color = cat.textColor;
                    cell.innerHTML = `<div class="cell-badge">${cat.name || s.category}</div><div class="cell-name">${s.name}</div>`;
                } else {
                    cell.classList.add('cell-multi');
                    cell.dataset.count = subjects.length;
                    subjects.forEach(s => {
                        const cat = getCategory(s.category);
                        const subItem = document.createElement('div');
                        subItem.className = 'cell-sub-item';
                        subItem.style.backgroundColor = cat.color;
                        subItem.style.color = cat.textColor;
                        subItem.innerHTML = `<div class="cell-badge">${cat.name || s.category}</div><div class="cell-name">${s.name}</div>`;
                        cell.appendChild(subItem);
                    });
                }

                cell.addEventListener('click', () => openSubjectModal(row, slot, selectedIds));
                gridEl.appendChild(cell);
            });
        });
    }

    // --- MODAL: FLERVALG ---
function openSubjectModal(row, slot, currentSelectedIds) {
    currentSlotContext = { row, slot, selectedIds: [...currentSelectedIds] };
    currentCategoryFilter = 'ALLE';

    modalTitle.textContent = `${row.title} · ${slot.title}`;
    // RETTET: 1-4 fag
    modalSubtitle.textContent = `Vælg 1-4 fag for at vise mulighederne på dette spor`;
    btnRemoveSubject.style.display = currentSelectedIds.length > 0 ? 'block' : 'none';

    renderFilterChips(slot.id);
    renderSubjectOptions(slot.id);
    modalEl.showModal();
}

    function renderFilterChips(slotId) {
        modalFilterBar.innerHTML = '';
        const activeList = getEffectiveOfferings(slotId).activeAll;
        const catKeys = ['ALLE', ...new Set(activeList.map(s => s.category))];

        catKeys.forEach(catKey => {
            const chip = document.createElement('button');
            chip.type = 'button';
            chip.className = 'filter-chip' + (currentCategoryFilter === catKey ? ' active' : '');
            chip.textContent = catKey === 'ALLE' ? 'ALLE' : getCategory(catKey).name;
            chip.addEventListener('click', () => {
                currentCategoryFilter = catKey;
                renderFilterChips(slotId);
                renderSubjectOptions(slotId);
            });
            modalFilterBar.appendChild(chip);
        });
    }

    function renderSubjectOptions(slotId) {
        modalSubjectList.innerHTML = '';
        let options = getEffectiveOfferings(slotId).activeAll;

        if (currentCategoryFilter !== 'ALLE') {
            options = options.filter(s => s.category === currentCategoryFilter);
        }

        if (options.length === 0) {
            modalSubjectList.innerHTML = '<p style="color:#64748b; font-size:0.9rem;">Ingen fag fundet i denne kategori.</p>';
            return;
        }

        const activeIds = currentSlotContext.selectedIds;

        options.forEach(sub => {
            const cat = getCategory(sub.category);
            const isSelected = activeIds.includes(sub.id);

            const card = document.createElement('div');
            card.className = 'subject-card';
            if (isSelected) card.classList.add('is-selected');

            card.style.backgroundColor = cat.color;
            card.style.color = cat.textColor;

            card.innerHTML = `
                <div class="cell-badge">${cat.name || sub.category}</div>
                <div class="cell-name">${sub.name}</div>
                <div class="cell-location">📍 ${sub.location}</div>
                ${isSelected ? '<span class="subject-card-check">✓</span>' : ''}
            `;

            card.addEventListener('click', () => {
                const idx = activeIds.indexOf(sub.id);
                if (idx !== -1) {
                    activeIds.splice(idx, 1);
                } else {
                    // RETTET: Spærre ved >= 4 i stedet for 3
                    if (activeIds.length >= 5) {
                        alert('Du kan højst vælge 5 fag i samme blok for at bevare et overskueligt skema.');
                        return;
                    }
                    activeIds.push(sub.id);
                }

                if (activeIds.length === 0) {
                    delete selections[currentSlotContext.slot.id];
                } else if (activeIds.length === 1) {
                    selections[currentSlotContext.slot.id] = activeIds[0];
                } else {
                    selections[currentSlotContext.slot.id] = [...activeIds];
                }

                if (currentProfile) setProfileState(currentProfile, true);
                localStorage.setItem(STORAGE_KEY, JSON.stringify(selections));
                
                btnRemoveSubject.style.display = activeIds.length > 0 ? 'block' : 'none';
                renderSubjectOptions(slotId);
                renderPickerGrid();
            });

            modalSubjectList.appendChild(card);
        });
    }

    btnCloseModal.addEventListener('click', () => modalEl.close());
    btnCancelModal.addEventListener('click', () => modalEl.close());
    modalEl.addEventListener('click', (e) => { if (e.target === modalEl) modalEl.close(); });

    btnRemoveSubject.addEventListener('click', () => {
        if (currentSlotContext) {
            delete selections[currentSlotContext.slot.id];
            currentSlotContext.selectedIds = [];
            if (currentProfile) setProfileState(currentProfile, true);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(selections));
            renderPickerGrid();
            modalEl.close();
        }
    });

    // --- PROTOTYPER & PAKKER ---
function updatePackageDropdown(selectedId = '') {
        protoSelect.innerHTML = '<option value="">-- Vælg foruddefineret pakke --</option>';

        if (SETTINGS.prototypes && SETTINGS.prototypes.length > 0) {
            // Gruppér prototyperne efter deres 'group'
            const groups = {};
            SETTINGS.prototypes.forEach((p, idx) => {
                const grp = p.group || 'Faste prototyper';
                if (!groups[grp]) groups[grp] = [];
                groups[grp].push({ value: `builtin_${idx}`, name: p.name });
            });

            // Opret en optgroup for hver kategori i den ønskede rækkefølge
            const desiredOrder = [
                'Højskole & Idræt',
                'Højskole & Idræt & …',
                'Elevprofiler / Målgrupper',
                'Faste prototyper'
            ];
            
            const sortedGroupKeys = Object.keys(groups).sort((a, b) => {
                const iA = desiredOrder.indexOf(a);
                const iB = desiredOrder.indexOf(b);
                return (iA === -1 ? 99 : iA) - (iB === -1 ? 99 : iB);
            });

            sortedGroupKeys.forEach(grpName => {
                const optgroup = document.createElement('optgroup');
                optgroup.label = `── ${grpName} ──`;
                groups[grpName].forEach(p => {
                    const opt = document.createElement('option');
                    opt.value = p.value;
                    opt.textContent = p.name;
                    optgroup.appendChild(opt);
                });
                protoSelect.appendChild(optgroup);
            });
        }

        if (customPackages.length > 0) {
            const customGroup = document.createElement('optgroup');
            customGroup.label = '── Mine egne gemte pakker ──';
            customPackages.forEach(p => {
                const opt = document.createElement('option');
                opt.value = `custom_${p.id}`;
                opt.textContent = p.name;
                customGroup.appendChild(opt);
            });
            protoSelect.appendChild(customGroup);
        }

        if (selectedId) protoSelect.value = selectedId;
        btnDeletePack.style.display = protoSelect.value.startsWith('custom_') ? 'inline-block' : 'none';
    }

    protoSelect.addEventListener('change', (e) => {
        const val = e.target.value;
        if (!val) { setProfileState(null); return; }

        if (val.startsWith('builtin_')) {
            const idx = parseInt(val.replace('builtin_', ''), 10);
            const proto = SETTINGS.prototypes[idx];
            if (proto) {
                selections = JSON.parse(JSON.stringify(proto.selections));
                setProfileState({ id: val, name: proto.name }, false);
                localStorage.setItem(STORAGE_KEY, JSON.stringify(selections));
                renderPickerGrid();
            }
        } else if (val.startsWith('custom_')) {
            const packId = val.replace('custom_', '');
            const pack = customPackages.find(p => p.id === packId);
            if (pack) {
                selections = JSON.parse(JSON.stringify(pack.selections));
                setProfileState({ id: val, name: pack.name }, false);
                localStorage.setItem(STORAGE_KEY, JSON.stringify(selections));
                renderPickerGrid();
            }
        }
    });

    btnSavePack.addEventListener('click', () => {
        if (Object.keys(selections).length === 0) {
            alert('Skemaet er tomt. Vælg nogle fag før du gemmer pakken.');
            return;
        }
        const packName = prompt('Hvad skal din fagpakke hedde?', 'Mit forslag');
        if (!packName || !packName.trim()) return;

        const newPack = { id: 'pack_' + Date.now(), name: packName.trim(), selections: JSON.parse(JSON.stringify(selections)) };
        customPackages.push(newPack);
        localStorage.setItem(CUSTOM_PACKS_KEY, JSON.stringify(customPackages));
        updatePackageDropdown(`custom_${newPack.id}`);
        setProfileState({ id: `custom_${newPack.id}`, name: newPack.name }, false);
    });

    if (btnExportJson) {
        btnExportJson.addEventListener('click', () => {
            if (Object.keys(selections).length === 0) {
                alert('Skemaet er tomt. Vælg nogle fag før du downloader en JSON-pakke.');
                return;
            }

            const defaultName = currentProfile ? currentProfile.name : 'Ny Fagpakke';
            const packName = prompt('Navn på fagpakken til JSON-filen:', defaultName);
            if (!packName || !packName.trim()) return;

            const trimmedName = packName.trim();
            const safeId = 'proto_' + trimmedName.toLowerCase().replace(/[^a-z0-9]/gi, '_');

            const exportObj = {
                id: safeId,
                name: trimmedName,
                selections: JSON.parse(JSON.stringify(selections))
            };

            const jsonStr = JSON.stringify(exportObj, null, 2);
            const blob = new Blob([jsonStr], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');

            const safeFileName = trimmedName.toLowerCase().replace(/[^a-z0-9æøå]/gi, '_') || 'fagpakke';
            a.href = url;
            a.download = `${safeFileName}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        });
    }

    btnDeletePack.addEventListener('click', () => {
        const val = protoSelect.value;
        if (!val.startsWith('custom_')) return;
        const packId = val.replace('custom_', '');
        const pack = customPackages.find(p => p.id === packId);
        if (!pack) return;

        if (confirm(`Vil du slette pakken "${pack.name}"?`)) {
            customPackages = customPackages.filter(p => p.id !== packId);
            localStorage.setItem(CUSTOM_PACKS_KEY, JSON.stringify(customPackages));
            updatePackageDropdown('');
            setProfileState(null);
        }
    });

    btnClear.addEventListener('click', () => {
        if (confirm('Vil du nulstille alle valgte fag i skemaet?')) {
            selections = {};
            setProfileState(null);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(selections));
            renderPickerGrid();
        }
    });

    // --- VISNING 2: FAGOVERSIGT (Matrix m. Slet/Tilføj funktionalitet) ---
    function renderMatrixView() {
        const seasonMode = matrixSeasonSelect.value;
        matrixContent.innerHTML = '';

        if (seasonMode === 'foraar') {
            matrixTitleAccent.textContent = 'FORÅRSHOLD';
        } else if (seasonMode === 'efteraar') {
            matrixTitleAccent.textContent = 'EFTERÅRSHOLD';
        } else {
            matrixTitleAccent.textContent = 'HELE SKOLEÅRET';
        }

        const matrixPeriods = [];
        if (seasonMode === 'efteraar' || seasonMode === 'all') {
            matrixPeriods.push({
                label: '1. Periode',
                sub: 'Aug - Okt',
                slots: { idraet1: 'idraet1_e1', idraet2: 'idraet2_e1', komp: 'kompetence_e1', insp: 'inspiration_e1' }
            });
            matrixPeriods.push({
                label: '2. Periode',
                sub: 'Okt - Dec',
                slots: { idraet1: 'idraet1_e2', idraet2: 'idraet2_e2', komp: 'kompetence_e2', insp: 'inspiration_e2' }
            });
        }
        if (seasonMode === 'foraar' || seasonMode === 'all') {
            matrixPeriods.push({
                label: (seasonMode === 'foraar' ? '1. Periode' : '3. Periode'),
                sub: 'Jan - Feb',
                slots: { idraet1: 'idraet1_f1', idraet2: 'idraet2_f1', komp: 'kompetence_f1', insp: 'inspiration_f1' },
                noteKomp: '(1. halvdel)'
            });
            matrixPeriods.push({
                label: (seasonMode === 'foraar' ? '2. Periode' : '4. Periode'),
                sub: 'Mar - Maj',
                slots: { idraet1: 'idraet1_f2', idraet2: 'idraet2_f2', komp: 'kompetence_f2', insp: 'inspiration_f2' },
                noteKomp: '(2. halvdel)'
            });
            matrixPeriods.push({
                label: (seasonMode === 'foraar' ? '3. Periode' : '5. Periode'),
                sub: 'Maj - Jun',
                slots: { idraet1: 'idraet1_f3', idraet2: 'idraet2_f3', komp: 'kompetence_f2', insp: 'inspiration_f2' },
                noteKomp: '(Fortsat)'
            });
        }

        matrixPeriods.forEach(p => {
            const rowEl = document.createElement('div');
            rowEl.className = 'matrix-row';

            const labelEl = document.createElement('div');
            labelEl.className = 'matrix-semester-label';
            labelEl.innerHTML = `<span>${p.label} <small style="font-size:0.75rem; opacity:0.85; font-weight:normal;">(${p.sub})</small></span>`;
            rowEl.appendChild(labelEl);

            const columns = [
                { title: 'IDRÆT 1', slotKey: p.slots.idraet1 },
                { title: 'IDRÆT 2', slotKey: p.slots.idraet2 },
                { title: 'KOMPETENCEFAG', slotKey: p.slots.komp, note: p.noteKomp },
                { title: 'INSPIRATIONSFAG', slotKey: p.slots.insp, note: p.noteKomp }
            ];

            columns.forEach(col => {
                const card = document.createElement('div');
                card.className = 'matrix-col-card';

                const header = document.createElement('div');
                header.className = 'matrix-col-header';
                header.innerHTML = `${col.title} ${col.note ? `<span style="font-size:0.75rem; text-transform:none; opacity:0.8;">${col.note}</span>` : ''}`;
                card.appendChild(header);

                const listEl = document.createElement('ul');
                listEl.className = 'matrix-subject-list';

                const offerings = getEffectiveOfferings(col.slotKey);

                // 1. Render hardkodede fag (inkl. slettede)
                offerings.base.forEach(s => {
                    const isDeleted = deletedSubjects.includes(s.id);
                    const li = document.createElement('li');
                    li.className = `matrix-subject-item ${isDeleted ? 'is-deleted' : ''}`;
                    li.innerHTML = `
                        ${s.name} <span class="item-loc">(${s.location})</span>
                        <button class="btn-toggle-subject" title="${isDeleted ? 'Genskab fag' : 'Fjern fag fra udbud'}">
                            ${isDeleted ? '↩️' : '❌'}
                        </button>
                    `;
                    
                    li.querySelector('.btn-toggle-subject').addEventListener('click', () => {
                        if (isDeleted) {
                            deletedSubjects = deletedSubjects.filter(id => id !== s.id);
                        } else {
                            deletedSubjects.push(s.id);
                        }
                        localStorage.setItem(DELETED_SUBJECTS_KEY, JSON.stringify(deletedSubjects));
                        
                        // Fjern også fra selections, hvis man lige har slettet et fag man havde valgt
                        if (!isDeleted) {
                            for (const key in selections) {
                                const val = selections[key];
                                if (Array.isArray(val)) {
                                    selections[key] = val.filter(x => x !== s.id);
                                } else if (val === s.id) {
                                    delete selections[key];
                                }
                            }
                            localStorage.setItem(STORAGE_KEY, JSON.stringify(selections));
                        }
                        
                        renderMatrixView();
                        if (activeTab === 'tab-picker') renderPickerGrid();
                    });
                    listEl.appendChild(li);
                });

                // 2. Render Egne tilføjede fag
                offerings.added.forEach(s => {
                    const li = document.createElement('li');
                    li.className = 'matrix-subject-item is-custom';
                    li.innerHTML = `
                        ${s.name} <span class="item-loc">(${s.location})</span>
                        <button class="btn-toggle-subject" title="Slet dette eget fag permanent">🗑️</button>
                    `;
                    
                    li.querySelector('.btn-toggle-subject').addEventListener('click', () => {
                        if(confirm(`Vil du slette det hjemmelavede fag "${s.name}" permanent?`)) {
                            customSubjects[col.slotKey] = customSubjects[col.slotKey].filter(x => x.id !== s.id);
                            localStorage.setItem(CUSTOM_SUBJECTS_KEY, JSON.stringify(customSubjects));
                            
                            // Fjern også fra selections
                            for (const key in selections) {
                                const val = selections[key];
                                if (Array.isArray(val)) {
                                    selections[key] = val.filter(x => x !== s.id);
                                } else if (val === s.id) {
                                    delete selections[key];
                                }
                            }
                            localStorage.setItem(STORAGE_KEY, JSON.stringify(selections));

                            renderMatrixView();
                            if (activeTab === 'tab-picker') renderPickerGrid();
                        }
                    });
                    listEl.appendChild(li);
                });

                // 3. Knap til at oprette nyt fag
                const btnAdd = document.createElement('button');
                btnAdd.className = 'btn-add-subject';
                btnAdd.textContent = '+';
                btnAdd.addEventListener('click', () => {
                    const fagNavn = prompt(`Opret nyt fag i ${col.title}:\nAngiv fagets navn:`);
                    if (!fagNavn || !fagNavn.trim()) return;
                    const lokale = prompt(`Angiv evt. lokale (kan efterlades tomt):`, "");
                    
                    if (!customSubjects[col.slotKey]) customSubjects[col.slotKey] = [];
                    
                    customSubjects[col.slotKey].push({
                        id: `custom_fag_${Date.now()}`,
                        name: fagNavn.trim(),
                        location: lokale || "",
                        category: "ALLE"
                    });
                    
                    localStorage.setItem(CUSTOM_SUBJECTS_KEY, JSON.stringify(customSubjects));
                    renderMatrixView();
                });

                card.appendChild(listEl);
                card.appendChild(btnAdd);
                rowEl.appendChild(card);
            });

            matrixContent.appendChild(rowEl);
        });
    }

    matrixSeasonSelect.addEventListener('change', () => {
        localStorage.setItem(MATRIX_SEASON_KEY, matrixSeasonSelect.value);
        renderMatrixView();
    });

    // --- VISNING 3: FORDELT PÅ LOKALER ---
    function renderRoomsView() {
        const blockFilter = roomsBlockSelect.value;
        roomsContent.innerHTML = '';

        const periods5 = [
            { key: 'e1', title: 'Aug - Okt' },
            { key: 'e2', title: 'Okt - Dec' },
            { key: 'f1', title: 'Jan - Feb' },
            { key: 'f2', title: 'Mar - Maj' },
            { key: 'f3', title: 'Maj - Juni' }
        ];

        const periods4 = [
            { key: 'e1', title: 'Aug - Okt (E1)' },
            { key: 'e2', title: 'Okt - Dec (E2)' },
            { key: 'f1', title: 'Jan - Mar (F1)' },
            { key: 'f2', title: 'Mar - Jun (F2)' }
        ];

        const allBlocks = [
            { blockId: 'idraet1', title: 'BLOK 1 (IDRÆT 1) - FORDELT PÅ LOKALER', periods: periods5 },
            { blockId: 'idraet2', title: 'BLOK 2 (IDRÆT 2) - FORDELT PÅ LOKALER', periods: periods5 },
            { blockId: 'kompetence', title: 'KOMPETENCEFAG - FORDELT PÅ LOKALER', periods: periods4 },
            { blockId: 'inspiration', title: 'INSPIRATIONSFAG - FORDELT PÅ LOKALER', periods: periods4 }
        ];

        const blocksToRender = blockFilter === 'all' 
            ? allBlocks 
            : allBlocks.filter(b => b.blockId === blockFilter);

        blocksToRender.forEach(block => {
            const usedLocations = new Set();
            block.periods.forEach(p => {
                const slotKey = `${block.blockId}_${p.key}`;
                const offerings = getEffectiveOfferings(slotKey).activeAll; // Kigger kun på aktive/tilføjede fag
                offerings.forEach(s => {
                    if (s.location) usedLocations.add(s.location.trim());
                });
            });

            const titleEl = document.createElement('div');
            titleEl.className = 'rooms-section-title';
            titleEl.textContent = block.title;
            roomsContent.appendChild(titleEl);

            const table = document.createElement('table');
            table.className = 'rooms-table';

            table.innerHTML = `
                <thead>
                    <tr>
                        <th class="th-room">Lokale / Facilitet</th>
                        ${block.periods.map(p => `<th>${p.title}</th>`).join('')}
                    </tr>
                </thead>
            `;

            const tbody = document.createElement('tbody');
            const handledRooms = new Set();

            SETTINGS.roomGroups.forEach(group => {
                const matchingRooms = group.rooms.filter(r => usedLocations.has(r));
                const roomsToShow = (block.blockId.startsWith('idraet') && group.borderColor !== '#0284c7' && group.borderColor !== '#d97706')
                    ? group.rooms 
                    : matchingRooms;

                roomsToShow.forEach(roomName => {
                    handledRooms.add(roomName.toLowerCase());
                    appendRoomRow(tbody, block, roomName, group.borderColor);
                });
            });

            usedLocations.forEach(loc => {
                if (!handledRooms.has(loc.toLowerCase())) {
                    appendRoomRow(tbody, block, loc, '#64748b');
                }
            });

            table.appendChild(tbody);
            roomsContent.appendChild(table);
        });
    }

    function appendRoomRow(tbody, block, roomName, borderColor) {
        const tr = document.createElement('tr');

        const roomTd = document.createElement('td');
        roomTd.className = 'room-name-cell';
        roomTd.style.borderLeftColor = borderColor;
        roomTd.textContent = roomName;
        tr.appendChild(roomTd);

        block.periods.forEach(p => {
            const slotKey = `${block.blockId}_${p.key}`;
            const slotOfferings = getEffectiveOfferings(slotKey).activeAll;
            
            // RETTET: Brug filter i stedet for find, og trim for eventuelle mellemrum
            const matchingSubjects = slotOfferings.filter(s => 
                s.location && s.location.trim().toLowerCase() === roomName.trim().toLowerCase()
            );

            const td = document.createElement('td');
            if (matchingSubjects.length > 0) {
                // Udskriver alle fag i lokalet pænt under hinanden
                td.innerHTML = matchingSubjects.map(subj => {
                    const cat = getCategory(subj.category);
                    return `
                        <div class="room-subj-pill" style="background-color: ${cat.color}; color: ${cat.textColor};">
                            ${subj.name}
                        </div>
                    `;
                }).join('');
            } else {
                td.className = 'room-empty-cell';
                td.textContent = '—';
            }
            tr.appendChild(td);
        });

        tbody.appendChild(tr);
    }

    roomsBlockSelect.addEventListener('change', () => {
        localStorage.setItem(ROOMS_BLOCK_KEY, roomsBlockSelect.value);
        renderRoomsView();
    });

    // --- BILLEDEKSPORT ---
    btnShare.addEventListener('click', () => {
        let targetEl = null;
        let filename = 'VIH-Eksport.png';
        const toolbar = document.querySelector('.schedule-toolbar');

        if (activeTab === 'tab-picker') {
            targetEl = document.getElementById('schedule-wrapper');
            filename = 'Mit-VIH-Skema.png';
        } else if (activeTab === 'tab-matrix') {
            targetEl = document.getElementById('matrix-wrapper');
            filename = 'VIH-Fagoversigt-Plakat.png';
        } else if (activeTab === 'tab-rooms') {
            targetEl = document.getElementById('rooms-wrapper');
            filename = 'VIH-Lokaleoversigt.png';
        }

        if (!targetEl || typeof window.html2canvas !== 'function') {
            alert('Kunne ikke tage billede.');
            return;
        }

        if (toolbar && activeTab === 'tab-picker') toolbar.style.display = 'none';

        window.html2canvas(targetEl, {
            scale: 2,
            backgroundColor: '#ffffff'
        }).then(canvas => {
            if (toolbar && activeTab === 'tab-picker') toolbar.style.display = 'flex';
            const link = document.createElement('a');
            link.download = filename;
            link.href = canvas.toDataURL('image/png');
            link.click();
        }).catch(err => {
            if (toolbar && activeTab === 'tab-picker') toolbar.style.display = 'flex';
            console.error('Fejl ved billeddannelse:', err);
            alert('Der opstod en fejl under eksporten.');
        });
    });

    updatePackageDropdown();
    switchTab(activeTab);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startApp);
} else {
    startApp();
}