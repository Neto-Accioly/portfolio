// Estado em memória
const state = {
    tasks: [], // {id, title, description, priority, status, comments: [{text, files: [name]}]}
    requirements: [], // {id, title, description, testCases: [{id, title, steps, executed:boolean}]}
    bugs: [], // {id, title, description, priority, status}
    sprintEnd: null,
    seq: 1,
};

// Utilitários
const byId = (id) => document.getElementById(id);
const fmtPct = (n) => `${Math.round(n)}%`;
const nextId = () => state.seq++;

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    bindTabs();
    bindSprintControls();
    bindNewTaskForm();
    bindKanbanDropzones();
    bindRequirementForms();
    bindBugForm();
    bindModal();
    renderAll();
});

function renderAll() {
    renderKanban();
    renderRequirementsList();
    renderBugsList();
    updateMetrics();
}

// Tabs painel lateral
function bindTabs() {
    const buttons = document.querySelectorAll('.tab-button');
    buttons.forEach((btn) => {
        btn.addEventListener('click', () => {
            buttons.forEach((b) => b.classList.remove('active'));
            document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
            btn.classList.add('active');
            const tab = byId(btn.dataset.tab);
            if (tab) tab.classList.add('active');
        });
    });
}

// Sprint
function bindSprintControls() {
    const setBtn = byId('setSprint');
    const dateInput = byId('sprintEndDate');
    const countdown = byId('sprintCountdown');
    setBtn.addEventListener('click', () => {
        if (!dateInput.value) return;
        const d = new Date(dateInput.value);
        if (Number.isNaN(d.getTime())) return;
        state.sprintEnd = d;
        updateCountdown(countdown);
    });
    setInterval(() => updateCountdown(countdown), 60 * 1000);
    updateCountdown(countdown);
}

function updateCountdown(node) {
    if (!state.sprintEnd) { node.textContent = '-- dias restantes'; return; }
    const now = new Date();
    const ms = state.sprintEnd - now;
    const days = Math.max(0, Math.ceil(ms / (24 * 60 * 60 * 1000)));
    node.textContent = `${days} dia${days === 1 ? '' : 's'} restantes`;
}

// Tarefas
function bindNewTaskForm() {
    const form = byId('newTaskForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = byId('taskTitle').value.trim();
        const description = byId('taskDescription').value.trim();
        const priority = byId('taskPriority').value;
        if (!title) return;
        state.tasks.push({ id: nextId(), title, description, priority, status: 'Backlog', comments: [] });
        form.reset();
        renderKanban();
        updateMetrics();
    });
}

function renderKanban() {
    const statuses = ['Backlog', 'Pendente Para Dev', 'Em Desenvolvimento', 'Code Review', 'Pendente para QA', 'Em Testes', 'Pendente de Aprovação', 'Pronto'];
    statuses.forEach((st) => {
        const zone = document.querySelector(`.kanban-dropzone[data-status="${st}"]`);
        if (!zone) return;
        zone.innerHTML = '';
        state.tasks.filter(t => t.status === st).forEach(task => {
            const card = buildCard(task);
            zone.appendChild(card);
        });
    });
}

function buildCard(task) {
    const tmpl = byId('cardTemplate');
    const node = tmpl.content.firstElementChild.cloneNode(true);
    node.dataset.id = task.id;
    node.querySelector('.card-title').textContent = task.title;
    const pr = node.querySelector('.priority');
    pr.textContent = task.priority;
    pr.classList.add(task.priority);
    node.addEventListener('dragstart', onDragStartCard);
    node.addEventListener('dblclick', () => openCardModal(task.id));
    return node;
}

function bindKanbanDropzones() {
    const zones = document.querySelectorAll('.kanban-dropzone');
    zones.forEach(z => {
        z.addEventListener('dragover', (e) => {
            e.preventDefault();
            z.classList.add('dragover');
        });
        z.addEventListener('dragleave', () => z.classList.remove('dragover'));
        z.addEventListener('drop', (e) => {
            e.preventDefault();
            z.classList.remove('dragover');
            const id = Number(e.dataTransfer.getData('text/plain'));
            const task = state.tasks.find(t => t.id === id);
            if (!task) return;
            const targetStatus = z.dataset.status;
            if (targetStatus === 'Em Desenvolvimento') {
                const wip = state.tasks.filter(t => t.status === 'Em Desenvolvimento').length;
                if (task.status !== 'Em Desenvolvimento' && wip >= 3) {
                    alert('Limite de WIP atingido (3). Mova algo para Code Review antes.');
                    return;
                }
            }
            task.status = targetStatus;
            renderKanban();
            updateMetrics();
        });
    });
}

function onDragStartCard(e) {
    const id = e.currentTarget.dataset.id;
    e.dataTransfer.setData('text/plain', id);
}

// Modal de edição de card + comentários
function bindModal() {
    byId('closeCardModal').addEventListener('click', closeCardModal);
    byId('closeDashboardModal').addEventListener('click', closeDashboardModal);
    byId('dashboardBtn').addEventListener('click', openDashboardModal);
    
    // Bind das abas do modal
    bindModalTabs();
    
    // Bind dos formulários de documentação e bugs
    bindRequirementForms();
    bindBugForm();
    byId('deleteCard').addEventListener('click', () => {
        const id = Number(byId('editCardId').value);
        const idx = state.tasks.findIndex(t => t.id === id);
        if (idx >= 0) state.tasks.splice(idx, 1);
        closeCardModal();
        renderKanban();
        updateMetrics();
    });
    byId('editCardForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const id = Number(byId('editCardId').value);
        const t = state.tasks.find(x => x.id === id);
        if (!t) return;
        const targetStatus = byId('editCardStatus').value;
        if (targetStatus === 'Em Desenvolvimento') {
            const wip = state.tasks.filter(x => x.status === 'Em Desenvolvimento').length;
            if (t.status !== 'Em Desenvolvimento' && wip >= 3) {
                alert('Limite de WIP atingido (3).');
                return;
            }
        }
        t.title = byId('editCardTitle').value.trim();
        t.description = byId('editCardDescription').value.trim();
        t.priority = byId('editCardPriority').value;
        t.status = targetStatus;
        renderKanban();
        updateMetrics();
        closeCardModal();
    });
    byId('newCommentForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const id = Number(byId('editCardId').value);
        const t = state.tasks.find(x => x.id === id);
        if (!t) return;
        const text = byId('commentText').value.trim();
        const filesInput = byId('commentFiles');
        if (!text && filesInput.files.length === 0) return;
        const files = Array.from(filesInput.files).map(f => f.name);
        t.comments.push({ text, files });
        byId('commentText').value = '';
        filesInput.value = '';
        renderComments(t);
    });
}

function openCardModal(id) {
    const t = state.tasks.find(x => x.id === id);
    if (!t) return;
    byId('editCardId').value = t.id;
    byId('editCardTitle').value = t.title;
    byId('editCardDescription').value = t.description || '';
    byId('editCardPriority').value = t.priority;
    byId('editCardStatus').value = t.status;
    renderComments(t);
    
    // Renderizar documentação e bugs da tarefa
    renderRequirementsList();
    renderBugsList();
    
    byId('cardModal').classList.add('show');
    byId('cardModal').setAttribute('aria-hidden', 'false');
}

function closeCardModal() {
    byId('cardModal').classList.remove('show');
    byId('cardModal').setAttribute('aria-hidden', 'true');
}



function bindModalTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.dataset.tab;
            
            // Remover classe active de todos os botões e conteúdos
            tabButtons.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Adicionar classe active ao botão clicado
            btn.classList.add('active');
            
            // Mostrar conteúdo da aba correspondente
            if (targetTab === 'documentation') {
                byId('documentationTab').classList.add('active');
            } else if (targetTab === 'bugs') {
                byId('bugsTab').classList.add('active');
            }
        });
    });
}

function openDashboardModal() {
    updateDashboardMetrics();
    drawDashboardBurndown();
    byId('dashboardModal').classList.add('show');
    byId('dashboardModal').setAttribute('aria-hidden', 'false');
}

function closeDashboardModal() {
    byId('dashboardModal').classList.remove('show');
    byId('dashboardModal').setAttribute('aria-hidden', 'true');
}

function renderComments(task) {
    const ul = byId('commentsList');
    ul.innerHTML = '';
    task.comments.forEach((c, idx) => {
        const li = document.createElement('li');
        li.className = 'comment-item';
        const text = document.createElement('div');
        text.textContent = c.text || '(sem texto)';
        li.appendChild(text);
        if (c.files && c.files.length) {
            const files = document.createElement('div');
            files.className = 'small';
            files.textContent = `Anexos: ${c.files.join(', ')}`;
            li.appendChild(files);
        }
        const actions = document.createElement('div');
        actions.className = 'row-actions';
        const del = document.createElement('button');
        del.className = 'icon-btn danger';
        del.textContent = 'Excluir';
        del.addEventListener('click', () => {
            const i = task.comments.indexOf(c);
            if (i >= 0) { task.comments.splice(i, 1); renderComments(task); }
        });
        actions.appendChild(del);
        li.appendChild(actions);
        ul.appendChild(li);
    });
}

// Requisitos e Casos de Teste
let selectedRequirementId = null;

function bindRequirementForms() {
    const form = byId('newRequirementForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = byId('reqTitle').value.trim();
        const description = byId('reqDescription').value.trim();
        if (!title) return;
        
        const currentTaskId = Number(byId('editCardId').value);
        const req = { id: nextId(), title, description, testCases: [], taskId: currentTaskId };
        state.requirements.push(req);
        form.reset();
        renderRequirementsList();
        updateMetrics();
    });
    
    const tcForm = byId('newTestCaseForm');
    tcForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = byId('tcTitle').value.trim();
        const steps = byId('tcSteps').value.trim();
        if (!title) return;
        
        // Adicionar caso de teste ao primeiro requisito da tarefa atual
        const currentTaskId = Number(byId('editCardId').value);
        const req = state.requirements.find(r => r.taskId === currentTaskId);
        if (!req) {
            alert('Adicione um requisito primeiro!');
            return;
        }
        
        req.testCases.push({ id: nextId(), title, steps, executed: false });
        tcForm.reset();
        renderRequirementsList();
        updateMetrics();
    });
}

function renderRequirementsList() {
    const ul = byId('requirementsList');
    ul.innerHTML = '';
    
    // Filtrar requisitos da tarefa atual
    const currentTaskId = Number(byId('editCardId').value);
    const taskRequirements = state.requirements.filter(r => r.taskId === currentTaskId);
    
    taskRequirements.forEach((r) => {
        const li = document.createElement('li');
        const row = document.createElement('div');
        row.className = 'row';
        const title = document.createElement('div');
        title.textContent = r.title;
        const actions = document.createElement('div');
        actions.className = 'row-actions';
        const edit = document.createElement('button'); edit.className = 'icon-btn'; edit.textContent = 'Editar';
        edit.addEventListener('click', () => editRequirement(r));
        const del = document.createElement('button'); del.className = 'icon-btn danger'; del.textContent = 'Excluir';
        del.addEventListener('click', () => { deleteRequirement(r.id); });
        actions.appendChild(edit); actions.appendChild(del);
        row.appendChild(title); row.appendChild(actions);
        const desc = document.createElement('div'); desc.className = 'small'; desc.textContent = r.description || '(sem descrição)';
        li.appendChild(row); li.appendChild(desc);
        
        // Mostrar casos de teste se existirem
        if (r.testCases && r.testCases.length > 0) {
            const testCasesDiv = document.createElement('div');
            testCasesDiv.className = 'small';
            testCasesDiv.style.marginTop = '8px';
            testCasesDiv.style.paddingTop = '8px';
            testCasesDiv.style.borderTop = '1px solid var(--border)';
            testCasesDiv.innerHTML = `<strong>Casos de Teste:</strong> ${r.testCases.length} (${r.testCases.filter(tc => tc.executed).length} executados)`;
            li.appendChild(testCasesDiv);
        }
        
        ul.appendChild(li);
    });
}

function editRequirement(req) {
    const title = prompt('Editar título do requisito', req.title);
    if (title === null) return;
    const description = prompt('Editar descrição', req.description || '');
    if (description === null) return;
    req.title = title.trim() || req.title;
    req.description = description.trim();
    renderRequirementsList();
}

function deleteRequirement(id) {
    const idx = state.requirements.findIndex(r => r.id === id);
    if (idx >= 0) state.requirements.splice(idx, 1);
    if (selectedRequirementId === id) selectedRequirementId = null;
    renderRequirementsList();
    updateMetrics();
}

function renderRequirementDetail(req) {
    const host = byId('requirementDetail');
    host.innerHTML = '';
    const title = document.createElement('h4'); title.textContent = req.title;
    const desc = document.createElement('p'); desc.textContent = req.description || '(sem descrição)';
    host.appendChild(title); host.appendChild(desc);
    renderTestCases(req);
}

function renderTestCases(req) {
    const ul = byId('testCasesList');
    ul.innerHTML = '';
    req.testCases.forEach(tc => {
        const li = document.createElement('li'); li.className = 'testcase';
        const row = document.createElement('div'); row.className = 'row';
        const title = document.createElement('div');
        title.textContent = `${tc.title} ${tc.executed ? '(executado)' : ''}`;
        const actions = document.createElement('div'); actions.className = 'row-actions';
        const toggle = document.createElement('button'); toggle.className = 'icon-btn'; toggle.textContent = tc.executed ? 'Desmarcar' : 'Executado';
        toggle.addEventListener('click', () => { tc.executed = !tc.executed; renderTestCases(req); updateMetrics(); });
        const edit = document.createElement('button'); edit.className = 'icon-btn'; edit.textContent = 'Editar';
        edit.addEventListener('click', () => {
            const t = prompt('Editar título do caso', tc.title);
            if (t === null) return;
            const s = prompt('Editar passos', tc.steps || '');
            if (s === null) return;
            tc.title = t.trim() || tc.title; tc.steps = s.trim(); renderTestCases(req);
        });
        const del = document.createElement('button'); del.className = 'icon-btn danger'; del.textContent = 'Excluir';
        del.addEventListener('click', () => { const i = req.testCases.findIndex(x => x.id === tc.id); if (i>=0) req.testCases.splice(i,1); renderTestCases(req); updateMetrics(); });
        actions.appendChild(toggle); actions.appendChild(edit); actions.appendChild(del);
        row.appendChild(title); row.appendChild(actions);
        const steps = document.createElement('div'); steps.className = 'small'; steps.textContent = tc.steps || '(sem passos)';
        li.appendChild(row); li.appendChild(steps);
        ul.appendChild(li);
    });
}

// Bugs
function bindBugForm() {
    const form = byId('newBugForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = byId('bugTitle').value.trim();
        const description = byId('bugDescription').value.trim();
        const priority = byId('bugPriority').value;
        const status = byId('bugStatus').value;
        if (!title) return;
        
        const currentTaskId = Number(byId('editCardId').value);
        state.bugs.push({ id: nextId(), title, description, priority, status, taskId: currentTaskId });
        form.reset();
        renderBugsList();
        updateMetrics();
    });
}

function renderBugsList() {
    const ul = byId('bugsList');
    ul.innerHTML = '';
    
    // Filtrar bugs da tarefa atual
    const currentTaskId = Number(byId('editCardId').value);
    const taskBugs = state.bugs.filter(b => b.taskId === currentTaskId);
    
    taskBugs.forEach(b => {
        const li = document.createElement('li'); li.className = 'bug-item';
        const row = document.createElement('div'); row.className = 'row';
        const title = document.createElement('div'); title.textContent = `${b.title} [${b.priority}]`;
        const actions = document.createElement('div'); actions.className = 'row-actions';
        const edit = document.createElement('button'); edit.className = 'icon-btn'; edit.textContent = 'Editar';
        edit.addEventListener('click', () => editBug(b));
        const del = document.createElement('button'); del.className = 'icon-btn danger'; del.textContent = 'Excluir';
        del.addEventListener('click', () => { const i = state.bugs.findIndex(x => x.id === b.id); if (i>=0) state.bugs.splice(i,1); renderBugsList(); updateMetrics(); });
        actions.appendChild(edit); actions.appendChild(del);
        row.appendChild(title); row.appendChild(actions);
        const meta = document.createElement('div'); meta.className = 'small'; meta.textContent = `${b.description || '(sem descrição)'} | Status: ${b.status}`;
        li.appendChild(row); li.appendChild(meta);
        ul.appendChild(li);
    });
}

function editBug(b) {
    const title = prompt('Editar título do bug', b.title);
    if (title === null) return;
    const description = prompt('Editar descrição', b.description || '');
    if (description === null) return;
    const priority = prompt('Editar prioridade (Alta/Média/Baixa)', b.priority);
    if (priority === null) return;
    const status = prompt('Editar status (Open/In Progress/Closed)', b.status);
    if (status === null) return;
    b.title = title.trim() || b.title;
    b.description = description.trim();
    b.priority = priority.trim() || b.priority;
    b.status = status.trim() || b.status;
    renderBugsList();
    updateMetrics();
}

// Métricas e Burndown
function updateMetrics() {
    const testsTotal = state.requirements.reduce((acc, r) => acc + r.testCases.length, 0);
    const testsExecuted = state.requirements.reduce((acc, r) => acc + r.testCases.filter(tc => tc.executed).length, 0);
    const pct = testsTotal ? (testsExecuted / testsTotal) * 100 : 0;
    byId('metricTests').textContent = fmtPct(pct);

    const bugsOpen = state.bugs.filter(b => b.status !== 'Closed').length;
    const bugsClosed = state.bugs.filter(b => b.status === 'Closed').length;
    byId('metricBugs').textContent = `${bugsOpen} / ${bugsClosed}`;

    const tasksDone = state.tasks.filter(t => t.status === 'Pronto').length;
    const tasksTotal = state.tasks.length;
    byId('metricTasks').textContent = `${tasksDone} / ${tasksTotal}`;
}

function updateDashboardMetrics() {
    const testsTotal = state.requirements.reduce((acc, r) => acc + r.testCases.length, 0);
    const testsExecuted = state.requirements.reduce((acc, r) => acc + r.testCases.filter(tc => tc.executed).length, 0);
    const pct = testsTotal ? (testsExecuted / testsTotal) * 100 : 0;
    byId('dashboardMetricTests').textContent = fmtPct(pct);

    const bugsOpen = state.bugs.filter(b => b.status !== 'Closed').length;
    const bugsClosed = state.bugs.filter(b => b.status === 'Closed').length;
    byId('dashboardMetricBugs').textContent = `${bugsOpen} / ${bugsClosed}`;

    const tasksDone = state.tasks.filter(t => t.status === 'Pronto').length;
    const tasksTotal = state.tasks.length;
    byId('dashboardMetricTasks').textContent = `${tasksDone} / ${tasksTotal}`;
}



function drawDashboardBurndown() {
    const canvas = byId('dashboardBurndownCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Eixo simples
    const padding = 30;
    const w = canvas.width - padding * 2;
    const h = canvas.height - padding * 2;
    ctx.strokeStyle = '#3c467e';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, padding + h);
    ctx.lineTo(padding + w, padding + h);
    ctx.stroke();

    // Dados básicos: totais vs done
    const total = state.tasks.length || 1;
    const done = state.tasks.filter(t => t.status === 'Pronto').length;
    const pending = Math.max(0, total - done);

    // Barras simples: done (verde) e pending (amarelo)
    const barWidth = 80;
    const baseY = padding + h;
    const scale = h / total;

    // Done
    ctx.fillStyle = '#3ddc97';
    const doneHeight = done * scale;
    ctx.fillRect(padding + 40, baseY - doneHeight, barWidth, doneHeight);
    // Pending
    ctx.fillStyle = '#ffcc66';
    const pendHeight = pending * scale;
    ctx.fillRect(padding + 160, baseY - pendHeight, barWidth, pendHeight);

    // Labels
    ctx.fillStyle = '#aeb4d4';
    ctx.font = '12px sans-serif';
    ctx.fillText('Concluídas', padding + 40, baseY + 14);
    ctx.fillText('Pendentes', padding + 160, baseY + 14);
    ctx.fillText(`Total: ${total}`, padding, padding - 8);
}


