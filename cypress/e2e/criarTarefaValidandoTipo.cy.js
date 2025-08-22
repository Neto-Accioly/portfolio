// CT01 – Criar Tarefa no Kanban do Jiraiya
// Rastreabilidade: REQ-002 — Kanban com Drag & Drop e WIP | Prioridade: Alta

describe('CT01 - Criar Tarefa no Kanban do Jiraiya', () => {
  const baseUrl = 'http://localhost:3000/';

  beforeEach(() => {
    cy.visit(baseUrl, {
      onBeforeLoad(win) {
        // Garante estado limpo para o teste
        try { win.localStorage.clear(); } catch (_) {}
        try { win.sessionStorage.clear(); } catch (_) {}
      },
    });

    // Fecha o modal de boas-vindas para não bloquear interações
    cy.get('#welcomeIntroModal', { timeout: 10000 }).should('be.visible');
    cy.get('#startUsingJiraiya').click();
    cy.get('#welcomeIntroModal').should('not.be.visible');
  });

  it('Validar a criação de uma nova tarefa (CT01)', () => {
    const titulo = `Tarefa de teste ${Date.now()}`;
    const descricao = 'Detalhes da tarefa de teste automatizado';

    // Pré-condições: formulário "Nova Tarefa" visível
    cy.get('#newTaskForm').should('be.visible');
    cy.get('#taskTitle').should('be.visible');
    cy.get('#taskDescription').should('be.visible');
    cy.get('#taskPriority').should('be.visible');

    // Passo 1: Preencher "Título"
    cy.get('#taskTitle').type(titulo).should('have.value', titulo);

    // Passo 2: Preencher "Descrição"
    cy.get('#taskDescription').type(descricao).should('have.value', descricao);

    // Passo 3: Selecionar "Prioridade"
    cy.get('#taskPriority')
      .find('option')
      .then($opts => {
        const texts = [...$opts].map(o => o.textContent?.trim());
        expect(texts).to.include.members(['Alta', 'Média', 'Baixa']);
      });
    cy.get('#taskPriority').select('Alta').should('have.value', 'Alta');

    // Passo 4: Clicar em "Adicionar ao Backlog"
    cy.get('#newTaskForm').within(() => {
      cy.contains('button', 'Adicionar ao Backlog').click();
    });

    // Pós-condição: Tarefa aparece no Backlog
    cy.get('#dropzoneBacklog .card').should('exist');
    cy.get('#dropzoneBacklog .card').contains('.card-title-text', titulo).should('exist');

    // Valida status inicial "Backlog" e prioridade escolhida
    cy.contains('#dropzoneBacklog .card', titulo)
      .as('novoCard')
      .within(() => {
        cy.get('.card-status').should('have.text', 'Backlog');
        cy.get('.priority').should('contain.text', 'Alta');
        cy.get('.card-id').invoke('text').should('match', /^JRY-\d{4}$/);
      });

    // Valida e seleciona o "Tipo" via modal de edição, então salva
    cy.get('@novoCard').dblclick();
    cy.get('#cardModal').should('be.visible');

    cy.get('#editCardType')
      .should('be.visible')
      .find('option')
      .then($opts => {
        const texts = [...$opts].map(o => o.textContent?.trim());
        expect(texts).to.include.members(['🚀 Feature', '🐛 Bug', '⚡ Melhoria']);
      });

    cy.get('#editCardType').select('Melhoria');
    cy.get('#editCardForm').submit();
    cy.get('#cardModal').should('not.be.visible');

    // Confirma tipo refletido no card
    cy.contains('#dropzoneBacklog .card', titulo)
      .within(() => {
        cy.get('.card-type').should('have.text', 'Melhoria');
        cy.get('.card-status').should('have.text', 'Backlog');
      });
  });
});