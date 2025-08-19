// Estado em memória
const state = {
    tasks: [], // {id, title, description, priority, status, comments: [{text, files: [name]}]}
    testCases: [], // {id, description, executed: boolean, taskId: number}
    bugs: [], // {id, title, description, priority, status, evidence: [{id, files: [name], type: string}]}
    sprintEnd: null,
    seq: 1,
    taskSeq: 1,
};

// Requisitos bloqueados (sempre visíveis no Backlog, abaixo do card de boas-vindas)
const REQUIREMENTS = [
    { id: 'REQ-001', title: 'Report de Bugs', description: 'Permitir registro e gerenciamento de bugs por tarefa.', rules: [
        'Cadastrar bug com título, descrição, prioridade e status.',
        'Listar bugs no card com metadados visíveis (prioridade e status).',
        'Editar e excluir bugs individualmente.',
        'Anexar evidências aos bugs (ver requisito de Evidências).'
    ]},
    { id: 'REQ-002', title: 'Kanban com Drag & Drop e WIP', description: 'Fluxo com arrastar e soltar entre colunas e limite de WIP (≤3) em "Em Desenvolvimento".', rules: [
        'Cards devem suportar drag & drop entre colunas.',
        'Ao tentar exceder o WIP em "Em Desenvolvimento", alertar e negar a ação.',
        'Atualizar métricas após movimentação.'
    ]},
    { id: 'REQ-003', title: 'Edição de Tarefas', description: 'Edição completa de tarefas via modal.', rules: [
        'Editar título, descrição, prioridade, status e tipo.',
        'Respeitar regra de WIP ao alterar status para "Em Desenvolvimento".',
        'Duplo clique no card abre o modal.'
    ]},
    { id: 'REQ-004', title: 'Comentários com Anexos', description: 'Comentários por tarefa com anexos.', rules: [
        'Cadastrar comentário com texto e/ou arquivos.',
        'Listagem deve exibir nomes dos anexos.',
        'Permitir edição e exclusão do comentário.'
    ]},
    { id: 'REQ-005', title: 'Casos de Teste', description: 'Cadastro e execução de casos de teste.', rules: [
        'Criar, editar e excluir casos de teste.',
        'Marcar/desmarcar execução (executado/pendente).',
        'Refletir progresso nas métricas.'
    ]},
    { id: 'REQ-006', title: 'Evidências', description: 'Anexar evidências aos bugs com preview.', rules: [
        'Selecionar um bug da tarefa antes de anexar evidências.',
        'Aceitar imagens e vídeos; limitar a 5 arquivos por submissão.',
        'Exibir preview com nome, tamanho e tipo.',
        'Confirmar com modal de sucesso.'
    ]},
    { id: 'REQ-007', title: 'Dashboard', description: 'Métricas e burndown simples.', rules: [
        'Mostrar % de casos executados.',
        'Mostrar bugs abertos/fechados.',
        'Mostrar tarefas done/total e gráfico simples.'
    ]},
    { id: 'REQ-008', title: 'Sprint e Countdown', description: 'Definir e exibir contagem regressiva da sprint.', rules: [
        'Permitir configurar data de término da sprint.',
        'Exibir dias restantes atualizando automaticamente.'
    ]},
    { id: 'REQ-009', title: 'Boas‑vindas', description: 'Modal de introdução sempre exibido no carregamento.', rules: [
        'Modal responsivo explicando funcionalidades e atalhos.',
        'Fechamento via botão e clique fora.'
    ]},
    { id: 'REQ-010', title: 'IDs de Tarefas', description: 'Identificador incremental amigável por tarefa.', rules: [
        'Gerar no formato JRY-0001 e exibir no card.',
        'Mostrar ID junto ao título no modal de exclusão.'
    ]},
];

// Utilitários
const byId = (id) => document.getElementById(id);
const fmtPct = (n) => `${Math.round(n)}%`;
const nextId = () => state.seq++;
const formatTaskKey = (n) => `JRY-${String(n).padStart(4, '0')}`;
const nextTaskKey = () => formatTaskKey(state.taskSeq++);

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    bindTabs();
    bindSprintControls();
    bindNewTaskForm();
    bindKanbanDropzones();
    bindTestCaseForm();
    bindBugForm();
    bindEvidenceModal();
    bindModal();
    bindWelcomeIntroModal();
    renderAll();
});

function renderAll() {
    renderKanban();
    renderTestCasesList();
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
        const taskKey = nextTaskKey();
        state.tasks.push({ id: nextId(), taskKey, title, description, priority, status: 'Backlog', type: 'Feature', comments: [] });
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
        
        if (st === 'Backlog') {
            const backlogTasks = state.tasks.filter(t => t.status === st);
            // Card de boas-vindas só quando não há tarefas no Backlog
            if (backlogTasks.length === 0) {
                const welcomeCard = createWelcomeCard();
                zone.appendChild(welcomeCard);
            }
            // Tarefas do Backlog logo abaixo
            backlogTasks.forEach(task => {
                const card = buildCard(task);
                zone.appendChild(card);
            });
            // Requisitos fixos sempre ao final da coluna Backlog
            renderRequirementCards(zone);
        } else {
            // Demais colunas: apenas tarefas do status
            state.tasks.filter(t => t.status === st).forEach(task => {
                const card = buildCard(task);
                zone.appendChild(card);
            });
        }
    });
    
    // Estatísticas removidas do card de boas-vindas
}

// Função para criar o card de boas-vindas
function createWelcomeCard() {
    const welcomeDiv = document.createElement('div');
    welcomeDiv.className = 'welcome-card';
    welcomeDiv.innerHTML = `
        <div class="welcome-header">
            <div class="welcome-icon">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="16" cy="16" r="15" fill="#87CEEB" stroke="#5F9EA0" stroke-width="1"/>
                    <path d="M16 4 L20 12 L28 16 L20 20 L16 28 L12 20 L4 16 L12 12 Z" fill="#696969"/>
                    <path d="M16 6 L18.5 12 L24 16 L18.5 20 L16 26 L13.5 20 L8 16 L13.5 12 Z" fill="#808080"/>
                    <path d="M16 8 L17 12 L20 16 L17 20 L16 24 L15 20 L12 16 L15 12 Z" fill="#A9A9A9"/>
                    <ellipse cx="20" cy="22" rx="8" ry="3" fill="#4682B4" opacity="0.6"/>
                </svg>
            </div>
            <h3>Bem-vindo ao Jiraiya!</h3>
        </div>
        <div class="welcome-tips">
            <p>💡 <strong>Dica:</strong> Clique duas vezes em uma tarefa para editar</p>
            <p>📊 Use o Dashboard para ver estatísticas do projeto</p>
        </div>
    `;
    return welcomeDiv;
}

// Função para atualizar as estatísticas do card de boas-vindas
// Estatísticas removidas do card de boas-vindas

function buildCard(task) {
    const tmpl = byId('cardTemplate');
    const node = tmpl.content.firstElementChild.cloneNode(true);
    node.dataset.id = task.id;
    
    // Se for um card travado (não usado por enquanto para tasks), evitar qualquer interação
    if (task.locked) {
        node.setAttribute('draggable', 'false');
        const menu = node.querySelector('.card-menu');
        if (menu) menu.remove();
    }

    // Configurar título e tipo da tarefa
    const titleTextEl = node.querySelector('.card-title-text');
    const idBadgeEl = node.querySelector('.card-id');
    if (titleTextEl) titleTextEl.textContent = task.title;
    if (idBadgeEl) idBadgeEl.textContent = task.taskKey || formatTaskKey(task.id);
    node.querySelector('.card-type').textContent = task.type || 'Feature';
    node.querySelector('.card-type').className = `card-type ${task.type || 'Feature'}`;
    
    // Configurar prioridade e status
    const pr = node.querySelector('.priority');
    pr.textContent = task.priority;
    pr.classList.add(task.priority);
    
    node.querySelector('.card-status').textContent = task.status;
    
    // Configurar menu de ações
    const menuTrigger = node.querySelector('.menu-trigger');
    const menuDropdown = node.querySelector('.menu-dropdown');
    
    // Toggle do menu (somente se existir)
    if (menuTrigger) {
        menuTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            menuDropdown.classList.toggle('show');
            menuTrigger.setAttribute('aria-expanded', menuDropdown.classList.contains('show') ? 'true' : 'false');
        });
    }
    
    // Botão editar
    const editBtn = node.querySelector('.edit-task');
    if (editBtn) {
        editBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            openCardModal(task.id);
        });
    }
    
    // Botão deletar
    const deleteBtn = node.querySelector('.delete-task');
    if (deleteBtn) {
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            openDeleteConfirmModal(task);
        });
    }
    
    // Fechar menu ao clicar fora
    // Evitar fechar ao interagir dentro do dropdown
    if (menuDropdown) {
        menuDropdown.addEventListener('click', (e) => e.stopPropagation());
    }
    
    if (!task.locked) {
        node.addEventListener('dragstart', onDragStartCard);
        node.addEventListener('dblclick', () => openCardModal(task.id));
    }
    // Não deixar o menu ser arrastado
    if (menuTrigger) menuTrigger.setAttribute('draggable', 'false');
    return node;
}

// Renderiza os cards de requisitos (travados) abaixo do card de boas-vindas
function renderRequirementCards(zone) {
    REQUIREMENTS.forEach((req) => {
        const card = buildRequirementCard(req);
        zone.appendChild(card);
    });
}

function buildRequirementCard(req) {
    const card = document.createElement('div');
    card.className = 'requirement-card';
    card.id = `req-${req.id}`;
    card.dataset.reqId = req.id;
    card.setAttribute('draggable', 'false');

    const header = document.createElement('div');
    header.className = 'req-header';

    const idBadge = document.createElement('span');
    idBadge.className = 'req-id';
    idBadge.textContent = req.id;

    const title = document.createElement('span');
    title.className = 'req-title';
    title.textContent = req.title;

    const body = document.createElement('div');
    body.className = 'req-body';
    body.textContent = req.description;

    header.appendChild(idBadge);
    header.appendChild(title);
    card.appendChild(header);
    card.appendChild(body);
    card.addEventListener('click', () => openRequirementModal(req));
    return card;
}

// Modal de Requisito
function openRequirementModal(req) {
    byId('requirementModalTitle').textContent = `${req.id} — Funcionalidade: ${req.title}`;
    byId('requirementModalDescription').textContent = req.description || '';
    const ul = byId('requirementRulesList');
    ul.innerHTML = '';
    (req.rules || []).forEach(rule => {
        const li = document.createElement('li');
        li.textContent = rule;
        ul.appendChild(li);
    });
    const modal = byId('requirementModal');
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
}

document.addEventListener('DOMContentLoaded', () => {
    const closeReq = byId('closeRequirementModal');
    if (closeReq) closeReq.addEventListener('click', closeRequirementModal);
});

function closeRequirementModal() {
    const modal = byId('requirementModal');
    if (!modal) return;
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
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
    
    // Bind do modal de confirmação de exclusão
    byId('closeDeleteConfirmModal').addEventListener('click', closeDeleteConfirmModal);
    byId('cancelDelete').addEventListener('click', closeDeleteConfirmModal);
    byId('confirmDelete').addEventListener('click', handleConfirmDelete);
    
    // Bind das abas do modal
    bindModalTabs();
    
    // Bind dos formulários de documentação e bugs
    bindTestCaseForm();
    bindBugForm();
    
    // Fechar modal clicando fora
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal') && e.target.classList.contains('show')) {
            if (e.target.id === 'cardModal') closeCardModal();
            else if (e.target.id === 'dashboardModal') closeDashboardModal();
            else if (e.target.id === 'evidenceModal') closeEvidenceModal();
            else if (e.target.id === 'bugSelectionModal') closeBugSelectionModal();
            else if (e.target.id === 'editTestCaseModal') closeEditTestCaseModal();
            else if (e.target.id === 'editBugModal') closeEditBugModal();
            else if (e.target.id === 'editCommentModal') closeEditCommentModal();
            else if (e.target.id === 'deleteConfirmModal') closeDeleteConfirmModal();
            else if (e.target.id === 'evidenceSuccessModal') closeEvidenceSuccessModal();
            else if (e.target.id === 'welcomeIntroModal') closeWelcomeIntroModal();
    }
});
    
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
        t.type = byId('editCardType').value;
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
    byId('editCardType').value = t.type || 'Feature';
    renderComments(t);
    
    // Renderizar casos de teste e bugs da tarefa
    renderTestCasesList();
    renderBugsList();
    
    byId('cardModal').classList.add('show');
    byId('cardModal').setAttribute('aria-hidden', 'false');
}

function closeCardModal() {
    byId('cardModal').classList.remove('show');
    byId('cardModal').setAttribute('aria-hidden', 'true');
}

// Variável global para armazenar a tarefa a ser excluída
let taskToDelete = null;

function openDeleteConfirmModal(task) {
    taskToDelete = task;
    byId('deleteTaskTitle').textContent = `${task.taskKey || formatTaskKey(task.id)} — ${task.title}`;
    byId('deleteConfirmModal').classList.add('show');
    byId('deleteConfirmModal').setAttribute('aria-hidden', 'false');
}

function closeDeleteConfirmModal() {
    byId('deleteConfirmModal').classList.remove('show');
    byId('deleteConfirmModal').setAttribute('aria-hidden', 'true');
    taskToDelete = null;
}

function handleConfirmDelete() {
    if (taskToDelete) {
        const idx = state.tasks.findIndex(t => t.id === taskToDelete.id);
        if (idx >= 0) {
            state.tasks.splice(idx, 1);
            renderKanban();
            updateMetrics();
        }
        closeDeleteConfirmModal();
    }
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
        
        const edit = document.createElement('button');
        edit.className = 'icon-btn';
        edit.textContent = 'Editar';
        edit.addEventListener('click', () => openEditCommentModal(c, task));
        
        const del = document.createElement('button');
        del.className = 'icon-btn danger';
        del.textContent = 'Excluir';
        del.addEventListener('click', () => {
            const i = task.comments.indexOf(c);
            if (i >= 0) { task.comments.splice(i, 1); renderComments(task); }
        });
        
        actions.appendChild(edit);
        actions.appendChild(del);
        li.appendChild(actions);
        ul.appendChild(li);
    });
}

// Casos de Teste
function bindTestCaseForm() {
    const tcForm = byId('newTestCaseForm');
    tcForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const description = byId('tcDescription').value.trim();
        if (!description) return;
        
        const currentTaskId = Number(byId('editCardId').value);
        const testCase = { id: nextId(), description, executed: false, taskId: currentTaskId };
        state.testCases.push(testCase);
        tcForm.reset();
        renderTestCasesList();
        updateMetrics();
    });
}

function renderTestCasesList() {
    const ul = byId('testCasesList');
    ul.innerHTML = '';
    
    // Filtrar casos de teste da tarefa atual
    const currentTaskId = Number(byId('editCardId').value);
    const taskTestCases = state.testCases.filter(tc => tc.taskId === currentTaskId);
    
    taskTestCases.forEach((tc) => {
        const li = document.createElement('li');
        li.className = 'testcase';
        const row = document.createElement('div');
        row.className = 'row';
        const description = document.createElement('div');
        description.textContent = tc.description;
        const actions = document.createElement('div');
        actions.className = 'row-actions';
        const toggle = document.createElement('button'); 
        toggle.className = 'icon-btn'; 
        toggle.textContent = tc.executed ? 'Desmarcar' : 'Executado';
        toggle.addEventListener('click', () => { 
            tc.executed = !tc.executed; 
            renderTestCasesList(); 
            updateMetrics(); 
        });
        const edit = document.createElement('button'); 
        edit.className = 'icon-btn'; 
        edit.textContent = 'Editar';
        edit.addEventListener('click', () => openEditTestCaseModal(tc));
        const del = document.createElement('button'); 
        del.className = 'icon-btn danger'; 
        del.textContent = 'Excluir';
        del.addEventListener('click', () => { 
            const i = state.testCases.findIndex(x => x.id === tc.id); 
            if (i >= 0) state.testCases.splice(i, 1); 
            renderTestCasesList(); 
            updateMetrics(); 
        });
        actions.appendChild(toggle); actions.appendChild(edit); actions.appendChild(del);
        row.appendChild(description); row.appendChild(actions);
        li.appendChild(row);
        
        // Mostrar status de execução
        const status = document.createElement('div'); 
        status.className = 'small'; 
        status.textContent = tc.executed ? '✅ Executado' : '⏳ Pendente';
        status.style.marginTop = '8px';
        li.appendChild(status);
        
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
        state.bugs.push({ id: nextId(), title, description, priority, status, taskId: currentTaskId, evidence: [] });
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
        const li = document.createElement('li'); 
        li.className = 'bug-item';
        
        const row = document.createElement('div'); 
        row.className = 'row';
        
        const title = document.createElement('div'); 
        title.textContent = `${b.title} [${b.priority}]`;
        
        const actions = document.createElement('div'); 
        actions.className = 'row-actions';
        
        const edit = document.createElement('button'); 
        edit.className = 'icon-btn'; 
        edit.textContent = 'Editar';
        edit.addEventListener('click', () => openEditBugModal(b));
        
        const del = document.createElement('button'); 
        del.className = 'icon-btn danger'; 
        del.textContent = 'Excluir';
        del.addEventListener('click', () => { 
            const i = state.bugs.findIndex(x => x.id === b.id); 
            if (i>=0) state.bugs.splice(i,1); 
            renderBugsList(); 
            updateMetrics(); 
        });
        
        actions.appendChild(edit); 
        actions.appendChild(del);
        row.appendChild(title); 
        row.appendChild(actions);
        
        const meta = document.createElement('div'); 
        meta.className = 'small'; 
        meta.textContent = `${b.description || '(sem descrição)'} | Status: ${b.status}`;
        
        li.appendChild(row); 
        li.appendChild(meta);
        
        // Mostrar evidências se existirem
        if (b.evidence && b.evidence.length > 0) {
            const evidenceDiv = document.createElement('div');
            evidenceDiv.className = 'evidence-info';
            evidenceDiv.innerHTML = `<strong>📎 Evidências:</strong> ${b.evidence.length} arquivo(s) anexado(s)`;
            li.appendChild(evidenceDiv);
        }
        
        ul.appendChild(li);
    });
}



// Evidências
let currentBugId = null;
let selectedBug = null;

// Edição
let editingTestCase = null;
let editingBug = null;
let editingComment = null;

function bindEvidenceModal() {
    byId('addEvidenceBtn').addEventListener('click', () => {
        const currentTaskId = Number(byId('editCardId').value);
        const currentTaskBugs = state.bugs.filter(b => b.taskId === currentTaskId);
        if (currentTaskBugs.length === 0) {
            alert('Adicione um bug primeiro antes de adicionar evidências!');
            return;
        }
        openBugSelectionModal(currentTaskBugs);
    });

    // Bind do modal de seleção de bugs
    byId('closeBugSelectionModal').addEventListener('click', closeBugSelectionModal);
    byId('cancelBugSelection').addEventListener('click', closeBugSelectionModal);

    byId('closeEvidenceModal').addEventListener('click', closeEvidenceModal);
    byId('cancelEvidence').addEventListener('click', closeEvidenceModal);
    
    // Bind do formulário de evidências
    byId('evidenceForm').addEventListener('submit', handleEvidenceSubmit);
    
    // Bind do input de arquivos para preview
    byId('evidenceFiles').addEventListener('change', handleFileSelection);
    
    // Bind dos modais de edição
    bindEditModals();
    
    // Bind do modal de sucesso de evidências
    byId('closeEvidenceSuccessModal').addEventListener('click', closeEvidenceSuccessModal);
    byId('closeEvidenceSuccess').addEventListener('click', closeEvidenceSuccessModal);
}

function openBugSelectionModal(bugs) {
    const list = byId('bugSelectionList');
    list.innerHTML = '';
    
    bugs.forEach(bug => {
        const item = document.createElement('div');
        item.className = 'bug-selection-item';
        item.dataset.bugId = bug.id;
        
        item.innerHTML = `
            <h5>${bug.title}</h5>
            <p class="bug-meta">Prioridade: ${bug.priority} | Status: ${bug.status}</p>
            ${bug.description ? `<p class="bug-description">${bug.description}</p>` : ''}
        `;
        
        item.addEventListener('click', () => selectBug(bug));
        list.appendChild(item);
    });
    
    byId('bugSelectionModal').classList.add('show');
    byId('bugSelectionModal').setAttribute('aria-hidden', 'false');
}

function closeBugSelectionModal() {
    byId('bugSelectionModal').classList.remove('show');
    byId('bugSelectionModal').setAttribute('aria-hidden', 'true');
    selectedBug = null;
}

function selectBug(bug) {
    selectedBug = bug;
    currentBugId = bug.id;
    
    // Atualizar informações do bug selecionado no modal de evidências
    byId('selectedBugTitle').textContent = bug.title;
    byId('selectedBugPriority').textContent = bug.priority;
    byId('selectedBugStatus').textContent = bug.status;
    
    // Fechar modal de seleção e abrir modal de evidências
    closeBugSelectionModal();
    openEvidenceModal();
}

function openEvidenceModal() {
    byId('evidenceModal').classList.add('show');
    byId('evidenceModal').setAttribute('aria-hidden', 'false');
    byId('evidenceFiles').value = '';
    byId('evidencePreview').innerHTML = '';
}

function closeEvidenceModal() {
    byId('evidenceModal').classList.remove('show');
    byId('evidenceModal').setAttribute('aria-hidden', 'true');
    currentBugId = null;
    selectedBug = null;
}

// Funções para modais de edição
function bindEditModals() {
    // Modal de edição de caso de teste
    byId('closeEditTestCaseModal').addEventListener('click', closeEditTestCaseModal);
    byId('cancelEditTestCase').addEventListener('click', closeEditTestCaseModal);
    byId('editTestCaseForm').addEventListener('submit', handleEditTestCaseSubmit);
    
    // Modal de edição de bug
    byId('closeEditBugModal').addEventListener('click', closeEditBugModal);
    byId('cancelEditBug').addEventListener('click', closeEditBugModal);
    byId('editBugForm').addEventListener('submit', handleEditBugSubmit);
    
    // Modal de edição de comentário
    byId('closeEditCommentModal').addEventListener('click', closeEditCommentModal);
    byId('cancelEditComment').addEventListener('click', closeEditCommentModal);
    byId('editCommentForm').addEventListener('submit', handleEditCommentSubmit);
}

function openEditTestCaseModal(testCase) {
    editingTestCase = testCase;
    byId('editTestCaseDescription').value = testCase.description;
    byId('editTestCaseModal').classList.add('show');
    byId('editTestCaseModal').setAttribute('aria-hidden', 'false');
}

function closeEditTestCaseModal() {
    byId('editTestCaseModal').classList.remove('show');
    byId('editTestCaseModal').setAttribute('aria-hidden', 'true');
    editingTestCase = null;
}

function openEditBugModal(bug) {
    editingBug = bug;
    byId('editBugTitle').value = bug.title;
    byId('editBugDescription').value = bug.description || '';
    byId('editBugPriority').value = bug.priority;
    byId('editBugStatus').value = bug.status;
    byId('editBugModal').classList.add('show');
    byId('editBugModal').setAttribute('aria-hidden', 'false');
}

function closeEditBugModal() {
    byId('editBugModal').classList.remove('show');
    byId('editBugModal').setAttribute('aria-hidden', 'true');
    editingBug = null;
}

function handleEditTestCaseSubmit(e) {
    e.preventDefault();
    if (!editingTestCase) return;
    
    const newDescription = byId('editTestCaseDescription').value.trim();
    if (!newDescription) return;
    
    editingTestCase.description = newDescription;
    closeEditTestCaseModal();
    renderTestCasesList();
    updateMetrics();
}

function handleEditBugSubmit(e) {
    e.preventDefault();
    if (!editingBug) return;
    
    const newTitle = byId('editBugTitle').value.trim();
    if (!newTitle) return;
    
    editingBug.title = newTitle;
    editingBug.description = byId('editBugDescription').value.trim();
    editingBug.priority = byId('editBugPriority').value;
    editingBug.status = byId('editBugStatus').value;
    
    closeEditBugModal();
    renderBugsList();
    updateMetrics();
}

// Funções para edição de comentários
function openEditCommentModal(comment, task) {
    editingComment = comment;
    byId('editCommentText').value = comment.text || '';
    byId('editCommentModal').classList.add('show');
    byId('editCommentModal').setAttribute('aria-hidden', 'false');
}

function closeEditCommentModal() {
    byId('editCommentModal').classList.remove('show');
    byId('editCommentModal').setAttribute('aria-hidden', 'true');
    editingComment = null;
}

function handleEditCommentSubmit(e) {
    e.preventDefault();
    if (!editingComment) return;
    
    const newText = byId('editCommentText').value.trim();
    if (!newText) return;
    
    editingComment.text = newText;
    closeEditCommentModal();
    
    // Re-renderizar comentários da tarefa atual
    const currentTaskId = Number(byId('editCardId').value);
    const currentTask = state.tasks.find(t => t.id === currentTaskId);
    if (currentTask) {
        renderComments(currentTask);
    }
}

function handleFileSelection(e) {
    const files = Array.from(e.target.files);
    const preview = byId('evidencePreview');
    preview.innerHTML = '';
    
    if (files.length > 5) {
        alert('Máximo de 5 arquivos permitidos!');
        e.target.value = '';
        return;
    }
    
    files.forEach((file, index) => {
        const fileDiv = document.createElement('div');
        fileDiv.className = 'file-preview';
        
        const fileName = document.createElement('div');
        fileName.className = 'file-name';
        fileName.textContent = file.name;
        
        const fileSize = document.createElement('div');
        fileSize.className = 'file-size';
        fileSize.textContent = formatFileSize(file.size);
        
        const fileType = document.createElement('div');
        fileType.className = 'file-type';
        fileType.textContent = file.type.split('/')[0]; // image ou video
        
        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-file';
        removeBtn.textContent = '❌';
        removeBtn.onclick = () => removeFile(index, e.target);
        
        fileDiv.appendChild(fileName);
        fileDiv.appendChild(fileSize);
        fileDiv.appendChild(fileType);
        fileDiv.appendChild(removeBtn);
        preview.appendChild(fileDiv);
    });
}

function removeFile(index, input) {
    const dt = new DataTransfer();
    const files = Array.from(input.files);
    files.splice(index, 1);
    files.forEach(file => dt.items.add(file));
    input.files = dt.files;
    handleFileSelection({ target: input });
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function handleEvidenceSubmit(e) {
    e.preventDefault();
    
    if (!currentBugId) return;
    
    const files = Array.from(byId('evidenceFiles').files);
    if (files.length === 0) {
        alert('Selecione pelo menos um arquivo!');
        return;
    }
    
    const bug = state.bugs.find(b => b.id === currentBugId);
    if (!bug) return;
    
    const evidence = {
        id: nextId(),
        files: files.map(f => ({ name: f.name, size: f.size, type: f.type })),
        timestamp: new Date().toISOString()
    };
    
    bug.evidence.push(evidence);
    
    closeEvidenceModal();
    renderBugsList();
    
    // Mostrar modal de sucesso em vez do alert
    showEvidenceSuccessModal(bug);
}

// Funções para o modal de sucesso de evidências
function showEvidenceSuccessModal(bug) {
    byId('successBugTitle').textContent = bug.title;
    byId('successBugName').textContent = bug.title;
    byId('successBugPriority').textContent = bug.priority;
    byId('successBugStatus').textContent = bug.status;
    
    // Atualizar ícone de sucesso se fornecido via configuração global
    try {
        const iconEl = byId('evidenceSuccessIcon');
        const fallbackEl = document.querySelector('#evidenceSuccessModal .success-fallback');
        const src = (window.JIRAIYA_ICONS && window.JIRAIYA_ICONS.evidenceSuccess) || '';
        if (iconEl) {
            if (src) {
                iconEl.src = src;
                iconEl.style.display = 'block';
                if (fallbackEl) fallbackEl.style.display = 'none';
            } else {
                iconEl.removeAttribute('src');
                iconEl.style.display = 'none';
                if (fallbackEl) fallbackEl.style.display = 'inline';
            }
        }
    } catch (_) {}

    byId('evidenceSuccessModal').classList.add('show');
    byId('evidenceSuccessModal').setAttribute('aria-hidden', 'false');
}

function closeEvidenceSuccessModal() {
    byId('evidenceSuccessModal').classList.remove('show');
    byId('evidenceSuccessModal').setAttribute('aria-hidden', 'true');
}

// Modal de apresentação (boas-vindas)
function bindWelcomeIntroModal() {
    const closeBtn = byId('closeWelcomeIntroModal');
    const startBtn = byId('startUsingJiraiya');
    if (closeBtn) closeBtn.addEventListener('click', closeWelcomeIntroModal);
    if (startBtn) startBtn.addEventListener('click', closeWelcomeIntroModal);

    // Abrir sempre ao carregar a página
    try { sessionStorage.removeItem('jiraiya_intro_seen'); } catch(_) {}
    openWelcomeIntroModal();
}

function openWelcomeIntroModal() {
    const modal = byId('welcomeIntroModal');
    if (!modal) return;
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
}

function closeWelcomeIntroModal() {
    const modal = byId('welcomeIntroModal');
    if (!modal) return;
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
}

// Métricas e Burndown
function updateMetrics() {
    const testsTotal = state.testCases.length;
    const testsExecuted = state.testCases.filter(tc => tc.executed).length;
    const pct = testsTotal ? (testsExecuted / testsTotal) * 100 : 0;
    byId('metricTests').textContent = fmtPct(pct);

    const bugsOpen = state.bugs.filter(b => b.status !== 'Closed').length;
    const bugsClosed = state.bugs.filter(b => b.status === 'Closed').length;
    byId('metricBugs').textContent = `${bugsOpen} / ${bugsClosed}`;

    const tasksDone = state.tasks.filter(t => t.status === 'Pronto').length;
    const tasksTotal = state.tasks.length;
    byId('metricTasks').textContent = `${tasksDone} / ${tasksTotal}`;
    
    // Estatísticas do card de boas-vindas removidas
}

function updateDashboardMetrics() {
    const testsTotal = state.testCases.length;
    const testsExecuted = state.testCases.filter(tc => tc.executed).length;
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


