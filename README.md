# Em Desenvolvimento...

### Obs: Toda documentação está sendo construida na Wiki do Projeto ⤵
 https://github.com/Neto-Accioly/portfolio/wiki


# Jiraiya – Análise Geral do Projeto

**Jiraiya** é uma plataforma web para gestão de projetos, focada em Kanban, documentação de casos de teste, controle de bugs, evidências e métricas de acompanhamento. O sistema é moderno, responsivo e pensado para equipes ágeis.

O Jiraiya nasceu como parte do meu portfólio de Qualidade de Software (QA), fruto de uma jornada de aprendizado. Mesmo não sendo desenvolvedor, decidi criar do zero uma plataforma de gestão de projetos, Kanban, documentação de testes e controle de bugs, contando com o apoio de inteligência artificial generativa para transformar ideias em código.
Minha missão com o Jiraiya vai além do desenvolvimento: ele será meu laboratório de testes, documentação e automação, onde vou aplicar na prática tudo que aprendi sobre qualidade de software na Mentoria M2.0 do [Júlio de Lima](https://www.linkedin.com/in/juliodelimas/).

---

## Requisitos

| Código   | Funcionalidade                   | Descrição                                                                 | Critérios de Aceite                                                                                   |
|----------|----------------------------------|---------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------|
| REQ-001  | Report de Bugs                   | Permitir o registro, edição, exclusão e visualização de bugs associados a tarefas, incluindo anexos de evidências. | - É possível criar, editar e excluir bugs em tarefas.<br>- Bugs exibem título, descrição, prioridade e status.<br>- É possível anexar imagens/vídeos a bugs.<br>- Evidências ficam visíveis no modal do bug. |
| REQ-002  | Kanban com Drag & Drop e WIP     | Permitir criar, editar, excluir e mover tarefas entre colunas do Kanban via drag & drop, com limite WIP. | - Tarefas podem ser criadas, editadas e excluídas.<br>- Tarefas podem ser movidas entre colunas por drag & drop.<br>- A coluna "Em Desenvolvimento" limita a 3 tarefas.<br>- Cada tarefa recebe um ID único. |
| REQ-003  | Edição de Tarefas                | Permitir editar todos os campos de uma tarefa já criada.                  | - Todos os campos de uma tarefa podem ser editados.<br>- Alterações são refletidas imediatamente no Kanban. |
| REQ-004  | Comentários com Anexos           | Permitir adicionar, editar, excluir e anexar arquivos em comentários de tarefas. | - É possível adicionar, editar e excluir comentários.<br>- Comentários aceitam anexos de imagem/vídeo.<br>- Anexos ficam disponíveis para visualização local. |
| REQ-005  | Casos de Teste                   | Permitir documentar, editar e excluir casos de teste vinculados a tarefas. | - É possível adicionar, editar e excluir casos de teste em cada tarefa.<br>- Casos de teste são listados na aba "Documentação". |
| REQ-006  | Evidências                       | Permitir anexar imagens/vídeos como evidências a bugs, exibindo-as no modal do bug. | - Apenas imagens e vídeos podem ser anexados.<br>- Evidências ficam visíveis no modal do bug.<br>- Modal de sucesso exibido ao salvar evidências. |
| REQ-007  | Dashboard                        | Exibir métricas de progresso, bugs, tarefas e burndown em um dashboard visual. | - Dashboard exibe métricas de tarefas concluídas, bugs abertos/fechados e casos de teste executados.<br>- Gráfico burndown é exibido corretamente. |
| REQ-008  | Sprint e Countdown               | Permitir definir a data de fim da sprint e exibir a contagem regressiva de dias. | - Usuário pode definir a data de fim da sprint.<br>- Contagem regressiva de dias é exibida no header. |
| REQ-009  | Boas‑vindas                      | Exibir modal de boas-vindas na primeira visita do usuário.                | - Modal de boas-vindas é exibido apenas na primeira visita.<br>- Usuário pode fechar o modal e iniciar o uso normalmente. |
| REQ-010  | IDs de Tarefas                   | Exibir IDs únicos e sequenciais em cada tarefa.                           | - Cada tarefa recebe um ID único e sequencial.<br>- ID é exibido no card da tarefa. |
| REQ-011  | Seleção de Bug para Evidências   | Permitir selecionar o bug ao qual as evidências serão anexadas.           | - Usuário pode escolher o bug antes de anexar evidências.<br>- Evidências são vinculadas ao bug selecionado. |
| REQ-012  | Confirmação de Exclusão          | Exibir modal de confirmação ao excluir tarefas.                           | - Modal de confirmação é exibido ao tentar excluir uma tarefa.<br>- Exclusão só ocorre após confirmação do usuário. |
| REQ-013  | Sucesso ao Salvar Evidências     | Exibir modal de sucesso ao salvar evidências em um bug.                   | - Modal de sucesso é exibido após salvar evidências.<br>- Informações do bug e evidências são apresentadas no modal. |
| REQ-014  | Edição de Caso de Teste          | Permitir editar casos de teste já cadastrados.                            | - Casos de teste podem ser editados.<br>- Alterações são refletidas imediatamente na lista de casos de teste. |
| REQ-015  | Edição de Bug                    | Permitir editar bugs já cadastrados.                                      | - Bugs podem ser editados.<br>- Alterações são refletidas imediatamente na lista de bugs. |
| REQ-016  | Edição de Comentário             | Permitir editar comentários já cadastrados.                               | - Comentários podem ser editados.<br>- Alterações são refletidas imediatamente na lista de comentários. |
| REQ-017  | Atalhos e Interações             | Oferecer atalhos e dicas rápidas para navegação e ações.                  | - Atalhos e dicas rápidas são exibidos na interface.<br>- Usuário pode navegar e executar ações rapidamente. |
| REQ-018  | Responsividade e Acessibilidade  | Garantir uso em desktop/mobile e acessibilidade por teclado/leitores de tela. | - Sistema funciona corretamente em diferentes dispositivos.<br>- Todos os elementos são acessíveis por teclado e leitores de tela. |

---

## 2. Requisitos Não Funcionais

| Código   | Descrição                                                                 | Critérios de Aceite                                                                                   |
|----------|---------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------|
| RNF-001  | O sistema deve ser desenvolvido em HTML, CSS e JavaScript puro.           | - Não utiliza frameworks ou bibliotecas externas.<br>- Todo o código-fonte é entregue em arquivos HTML, CSS e JS puros. |
| RNF-002  | O layout deve ser moderno, limpo e agradável.                             | - Interface visualmente organizada, com cores e espaçamentos agradáveis.<br>- Elementos alinhados e legíveis em todas as telas. |
| RNF-003  | O código deve ser organizado, com separação clara entre estrutura, estilo e lógica. | - HTML, CSS e JS estão separados em arquivos distintos.<br>- Não há código misturado entre camadas.   |
| RNF-004  | O sistema deve ser fácil de usar, com feedback visual para ações do usuário. | - Todas as ações (criar, editar, excluir, mover) exibem feedback visual imediato.<br>- Modais, tooltips e mensagens de confirmação são utilizados. |
| RNF-005  | O sistema deve ser facilmente extensível para novas funcionalidades.       | - Novas colunas, campos ou fluxos podem ser adicionados sem reescrever o sistema.<br>- Estrutura modular e comentada. |

---

## 3. Requisitos de Interface

| Código   | Descrição                                                                 | Critérios de Aceite                                                                                   |
|----------|---------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------|
| RI-001   | Header: Exibe logo, nome do sistema, controles de sprint e botão para dashboard. | - Header sempre visível no topo.<br>- Logo, nome, campo de data da sprint, botão "Definir" e botão "Dashboard" presentes e funcionais. |
| RI-002   | Toolbar: Formulário para adicionar nova tarefa.                           | - Formulário com campos obrigatórios (título, prioridade, tipo) e opcionais (descrição).<br>- Botão "Adicionar ao Backlog" disponível. |
| RI-003   | Kanban: Quadro com colunas e cartões de tarefa.                           | - Todas as colunas do fluxo exibidas.<br>- Cartões de tarefa mostram título, ID, prioridade, tipo e status.<br>- Drag & drop funcional. |
| RI-004   | Modais: Para detalhes de tarefa, dashboard, edição de bugs, comentários, evidências, confirmação e boas-vindas. | - Todos os modais são acessíveis por teclado e mouse.<br>- Modais exibem informações e ações corretas.<br>- Fechamento por botão ou tecla ESC. |
| RI-005   | Footer: Informações sobre o sistema e atalhos.                            | - Footer sempre visível.<br>- Exibe nome do sistema, funcionalidades e atalhos principais.            |

---

## 4. Requisitos de Usabilidade

| Código   | Descrição                                                                 | Critérios de Aceite                                                                                   |
|----------|---------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------|
| RU-001   | Dicas rápidas e atalhos visíveis para o usuário.                          | - Dicas e atalhos exibidos no modal de boas-vindas, footer e cards de boas-vindas.<br>- Atalhos funcionam conforme descrito. |
| RU-002   | Feedback visual em todas as ações (adição, edição, exclusão).             | - Toda ação relevante gera mensagem visual (toast, modal, destaque, etc).                             |
| RU-003   | Navegação intuitiva entre tarefas, bugs, casos de teste e dashboard.      | - Usuário consegue acessar qualquer funcionalidade em até 2 cliques.<br>- Fluxos não exigem conhecimento prévio. |

---

## 5. Requisitos de Segurança

| Código   | Descrição                                                                 | Critérios de Aceite                                                                                   |
|----------|---------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------|
| RS-001   | O sistema não armazena dados sensíveis.                                   | - Nenhum dado pessoal, senha ou informação sensível é solicitado ou salvo.<br>- Dados ficam apenas no navegador do usuário. |
| RS-002   | Os arquivos anexados são apenas para visualização local (não há upload para servidor). | - Uploads de arquivos não enviam dados para servidores externos.<br>- Apenas imagens e vídeos são aceitos como anexos. |

---

## Regras de Negócio

1. **Criação de Tarefas:**  
   - Toda tarefa deve possuir título, prioridade e tipo obrigatórios.
   - Tarefas são criadas inicialmente na coluna "Backlog" e recebem um ID único sequencial.
   - O campo descrição é opcional, mas recomendado para detalhamento.

2. **Movimentação e WIP:**  
   - Tarefas podem ser movidas entre colunas do Kanban via drag & drop.
   - A coluna "Em Desenvolvimento" possui limite de até 3 tarefas (WIP ≤ 3).
   - Não é permitido mover tarefas para colunas não previstas no fluxo.

3. **Edição e Exclusão de Tarefas:**  
   - Tarefas podem ser editadas a qualquer momento, inclusive status, prioridade e tipo.
   - A exclusão de tarefas exige confirmação do usuário via modal.

4. **Comentários:**  
   - Usuários podem adicionar, editar e excluir comentários em tarefas.
   - Comentários podem conter anexos (imagens ou vídeos).
   - Cada comentário está vinculado a uma tarefa específica.

5. **Casos de Teste:**  
   - Cada tarefa pode ter múltiplos casos de teste documentados.
   - Casos de teste podem ser criados, editados e excluídos.
   - A execução dos casos de teste impacta as métricas do dashboard.

6. **Bugs e Evidências:**  
   - Bugs podem ser criados, editados e excluídos, sempre vinculados a uma tarefa.
   - Cada bug pode conter título, descrição, prioridade, status e evidências.
   - Evidências (imagens/vídeos) só podem ser anexadas a bugs existentes.
   - É possível selecionar o bug ao qual as evidências serão anexadas.

7. **Dashboard e Métricas:**  
   - O dashboard exibe métricas de tarefas concluídas, bugs abertos/fechados e percentual de casos de teste executados.
   - O gráfico burndown mostra a evolução de tarefas concluídas vs. pendentes.

8. **Sprint e Countdown:**  
   - O usuário pode definir a data de fim da sprint.
   - O sistema exibe a contagem regressiva de dias restantes até o fim da sprint.

9. **Modais e Feedback Visual:**  
   - Modais são utilizados para confirmação de exclusão, sucesso ao salvar evidências, edição de entidades e boas-vindas.
   - Toda ação relevante gera feedback visual ao usuário.

10. **IDs de Tarefas:**  
    - Cada tarefa recebe um identificador único e sequencial, exibido no card.

11. **Responsividade e Acessibilidade:**  
    - O sistema deve ser totalmente utilizável em desktop, tablet e mobile.
    - Todos os elementos interativos devem ser acessíveis por teclado e leitores de tela.
    - Atalhos e dicas rápidas devem estar visíveis para facilitar a navegação.

12. **Segurança e Privacidade:**  
    - O sistema não armazena dados sensíveis.
    - Anexos são apenas para visualização local, não havendo upload para servidores externos.
    - Apenas arquivos de imagem e vídeo são aceitos como anexos.

13. **Fluxo de Boas-vindas:**  
    - O modal de boas-vindas é exibido apenas na primeira visita do usuário.

---

## User Stories

- **Como** usuário, **quero** criar tarefas com título, prioridade e tipo, **para** organizar o trabalho no Kanban.
- **Como** usuário, **quero** mover tarefas entre colunas do Kanban via drag & drop, **para** refletir o progresso do trabalho.
- **Como** usuário, **quero** editar e excluir tarefas, **para** manter o quadro sempre atualizado.
- **Como** usuário, **quero** adicionar, editar e excluir comentários (com anexos) em tarefas, **para** registrar discussões e informações relevantes.
- **Como** usuário, **quero** documentar, editar e excluir casos de teste em cada tarefa, **para** garantir a qualidade das entregas.
- **Como** usuário, **quero** registrar, editar e excluir bugs vinculados a tarefas, **para** controlar defeitos encontrados.
- **Como** usuário, **quero** anexar evidências (imagens/vídeos) a bugs, **para** facilitar a análise e resolução.
- **Como** usuário, **quero** visualizar métricas e burndown no dashboard, **para** acompanhar o progresso do projeto.
- **Como** usuário, **quero** definir a data de fim da sprint e ver a contagem regressiva, **para** gerenciar prazos.
- **Como** usuário, **quero** receber feedback visual e confirmações ao realizar ações importantes, **para** ter segurança nas operações.
- **Como** usuário, **quero** ver IDs únicos em cada tarefa, **para** facilitar a referência e rastreabilidade.
- **Como** usuário, **quero** acessar o sistema em qualquer dispositivo e com acessibilidade, **para** garantir inclusão e mobilidade.
- **Como** usuário, **quero** receber uma mensagem de boas-vindas na primeira visita, **para** conhecer rapidamente as principais funções.
- **Como** usuário, **quero** utilizar atalhos e dicas rápidas, **para** agilizar minha navegação e uso da ferramenta.

---


# Plano e Estratégia de Testes – Projeto Jiraiya

Baseado na ISO-29119-3.

---

## 1. Épico e Estimativa Geral de Esforço em Testes

O **épico** deste ciclo é validar as principais funcionalidades do sistema **Jiraiya**, garantindo a qualidade da gestão de tarefas (Kanban), documentação de casos de teste, controle de bugs, evidências e dashboard de métricas.

**Estimativa Geral de Esforço:** Alto, considerando múltiplas camadas (frontend, usabilidade e integração).

---

## 2. User Stories, Requisitos e Estimativa de Esforço em Testes

| Código   | User Story / Funcionalidade                           | Requisito Relacionado | Esforço |
|----------|-------------------------------------------------------|-----------------------|---------|
| US01     | Criar Tarefa no Kanban                                | REQ-002               | Médio   |
| US02     | Mover Tarefa entre Colunas                            | REQ-002               | Médio   |
| US03     | Editar/Excluir Tarefa                                 | REQ-003, REQ-012      | Médio   |
| US04     | Visualizar Detalhes da Tarefa em Modal                | REQ-002, REQ-003      | Médio   |
| US05     | Adicionar Comentário com/sem anexo                    | REQ-004               | Médio   |
| US06     | Editar/Excluir Comentário                             | REQ-016, REQ-004      | Médio   |
| US07     | Adicionar Caso de Teste em uma Tarefa                 | REQ-005               | Alto    |
| US08     | Editar/Excluir Caso de Teste                          | REQ-014, REQ-005      | Médio   |
| US09     | Adicionar Bug a uma Tarefa                            | REQ-001, REQ-006      | Alto    |
| US10     | Editar/Excluir Bug                                    | REQ-015, REQ-001      | Médio   |
| US11     | Anexar Evidência (imagem/vídeo) a Bug                 | REQ-011, REQ-006      | Alto    |
| US12     | Visualizar Dashboard com métricas                     | REQ-007               | Médio   |
| US13     | Visualizar Gráfico Burndown                           | REQ-007               | Médio   |
| US14     | Definir Data de Fim da Sprint                         | REQ-008               | Baixo   |
| US15     | Exibir Contagem Regressiva da Sprint                  | REQ-008               | Médio   |
| US16     | Exibir Modal de Confirmação de Exclusão               | REQ-012               | Baixo   |
| US17     | Exibir Modal de Sucesso em Operações                  | REQ-013               | Baixo   |
| US18     | Exibir Modal de Boas-Vindas                           | REQ-009               | Baixo   |
| US19     | Responsividade em diferentes dispositivos              | REQ-018               | Alto    |
| US20     | Garantir Acessibilidade (elementos semânticos/atalhos)| REQ-018               | Alto    |
| US21     | IDs de Tarefas                                        | REQ-010               | Médio   |
| US22     | Atalhos e Interações                                  | REQ-017               | Médio   |

---

## 3. Condições de Teste e Camadas

### Exemplo de Condições de Teste por User Story

#### US01 – Criar Tarefa no Kanban (REQ-002)
| ID   | Condição                                                                 | Resultado Esperado                                                     | Camada   |
|------|--------------------------------------------------------------------------|------------------------------------------------------------------------|----------|
| CT01 | Usuário preenche título, descrição, prioridade e tipo em formulário      | Nova tarefa criada e exibida na coluna *Backlog*                       | Frontend |

#### US02 – Mover Tarefa entre Colunas (REQ-002)
| ID   | Condição                                                   | Resultado Esperado                                 | Camada   |
|------|------------------------------------------------------------|---------------------------------------------------|----------|
| CT04 | Usuário arrasta tarefa do *Backlog* para *Em Desenvolvimento* | Tarefa exibida na nova coluna com status atualizado | Frontend |

#### US05 – Adicionar Comentário (REQ-004)
| ID   | Condição                                               | Resultado Esperado                          | Camada   |
|------|--------------------------------------------------------|----------------------------------------------|----------|
| CT05 | Usuário adiciona comentário simples                    | Comentário listado na tarefa                 | Frontend |
| CT06 | Usuário adiciona comentário com anexo (imagem/arquivo) | Comentário listado com link/preview do anexo | Frontend |

#### US07 – Adicionar Caso de Teste (REQ-005)
| ID   | Condição                                                 | Resultado Esperado                              | Camada   |
|------|----------------------------------------------------------|------------------------------------------------|----------|
| CT08 | Usuário cria caso de teste vinculado a uma tarefa         | Caso listado na aba *Casos de Teste*            | Frontend |

#### US09 – Adicionar Bug (REQ-001, REQ-006)
| ID   | Condição                                                 | Resultado Esperado                              | Camada   |
|------|----------------------------------------------------------|------------------------------------------------|----------|
| CT11 | Usuário cria bug com título, descrição e prioridade       | Bug listado na aba *Bugs*                       | Frontend |
| CT14 | Usuário anexa evidência (imagem/vídeo) a bug             | Evidência visível no modal do bug               | Frontend |

#### US12 – Dashboard (REQ-007)
| ID   | Condição                                               | Resultado Esperado                                                | Camada   |
|------|--------------------------------------------------------|------------------------------------------------------------------|----------|
| CT15 | Sistema possui tarefas concluídas, bugs abertos/fechados | Dashboard exibe métricas atualizadas corretamente                | Frontend |
| CT15 | Casos de teste executados registrados                   | Dashboard mostra percentual de execução                          | Frontend |

#### US14 – Definir Sprint (REQ-008)
| ID   | Condição                                      | Resultado Esperado                        | Camada   |
|------|-----------------------------------------------|------------------------------------------|----------|
| CT16 | Usuário define data fim sprint                | Data registrada e exibida no header       | Frontend |
| CT16 | Sistema calcula dias restantes automaticamente | Contagem regressiva exibida corretamente | Frontend |

---

# 4. Charters de Teste Exploratório

| Explore                                                                 | Com                                                      | Para                                                                 |
|-------------------------------------------------------------------------|----------------------------------------------------------|----------------------------------------------------------------------|
| Criação, movimentação, edição e exclusão de tarefas no Kanban           | Diferentes combinações de status e interações no quadro  | Validar que o fluxo de gerenciamento de tarefas atende aos requisitos (REQ-002, REQ-003, REQ-012) |
| Detalhamento da tarefa, comentários e anexos                            | Diferentes tipos de arquivos, tamanhos e formatos de texto | Verificar usabilidade, consistência e integridade das informações (REQ-004, REQ-016) |
| Criação, edição e exclusão de casos de teste na documentação            | Diferentes níveis de detalhamento e versões dos testes   | Avaliar rastreabilidade e manutenção das evidências de QA (REQ-005, REQ-014) |
| Fluxo de bugs, incluindo anexos de imagens e vídeos                     | Diferentes navegadores e dispositivos                    | Validar clareza do ciclo de vida do bug e robustez do processo de registro (REQ-001, REQ-006, REQ-011, REQ-015) |
| Métricas apresentadas no dashboard                                      | Diferentes cenários de tarefas concluídas, pendentes e em andamento | Verificar consistência e confiabilidade dos dados exibidos (REQ-007) |
| Funcionalidades relacionadas à sprint (data e contagem regressiva)      | Diferentes durações de sprint e ajustes de calendário    | Garantir previsibilidade e alinhamento com o time de desenvolvimento (REQ-008) |
| Modais de confirmação, sucesso e boas-vindas                            | Diferentes sequências de ações do usuário                | Verificar clareza, timing e impacto na experiência do usuário (REQ-009, REQ-012, REQ-013) |
| Responsividade, identificação de elementos (IDs) e atalhos da plataforma| Diferentes resoluções, navegadores e dispositivos        | Avaliar acessibilidade, consistência de navegação e conformidade técnica (REQ-010, REQ-017, REQ-018) |


---

## 5. Testes Não-Funcionais

| Tipo             | Teste                                                                   | Requisito Relacionado | Resultado Esperado                                                                 |
|------------------|-------------------------------------------------------------------------|-----------------------|-----------------------------------------------------------------------------------|
| Performance      | Arrastar 100+ tarefas no Kanban                                         | REQ-002               | Sistema responde sem travamentos perceptíveis                                     |
| Performance      | Abertura do dashboard com 200+ tarefas registradas                      | REQ-007               | Dashboard carrega métricas em < 3 segundos                                        |
| Usabilidade      | Criação de tarefa por usuário iniciante                                 | REQ-002, RU-001       | Usuário entende processo sem necessidade de manual                                |
| Compatibilidade  | Acessar sistema em navegadores (Chrome, Firefox, Edge, Safari)          | REQ-018               | Mesma funcionalidade e layout preservado                                          |
| Responsividade   | Testar aplicação em desktop, tablet e mobile                            | REQ-018               | Layout adaptado sem perda de funcionalidade                                       |
| Segurança        | Upload de arquivo executável como anexo                                 | RS-002                | Sistema bloqueia anexos perigosos, permitindo apenas imagens/vídeos               |
| Segurança        | Acesso simultâneo de múltiplos usuários                                 | RS-001                | Dados isolados e consistentes                                                     |
| Extensibilidade  | Adicionar nova coluna no Kanban via configuração                        | RNF-005               | Sistema mantém integridade sem impacto nas funcionalidades existentes             |

---

## 6. Automação de Testes (Cypress)

| ID   | Condição                                                       | Requisito Relacionado | Resultado Esperado                                                             | Camada             |
|------|----------------------------------------------------------------|-----------------------|--------------------------------------------------------------------------------|--------------------|
| AT01 | Criar tarefa preenchendo título e descrição                    | REQ-002               | Nova tarefa aparece no *Backlog*                                               | Frontend           |
| AT02 | Mover tarefa para coluna *Em Desenvolvimento*                  | REQ-002               | Tarefa exibida na coluna correta                                               | Frontend           |
| AT03 | Editar título de uma tarefa                                    | REQ-003               | Alteração refletida no cartão                                                  | Frontend           |
| AT04 | Excluir tarefa                                                 | REQ-012               | Modal de confirmação exibido e tarefa removida                                 | Frontend           |
| AT05 | Adicionar comentário a uma tarefa                              | REQ-004               | Comentário listado imediatamente                                               | Frontend           |
| AT06 | Criar caso de teste em uma tarefa                              | REQ-005               | Caso listado na aba correspondente                                             | Frontend           |
| AT07 | Criar bug e anexar evidência                                   | REQ-001, REQ-006      | Bug listado com evidência visível                                              | Frontend           |
| AT08 | Visualizar dashboard após execução de tarefas e bugs           | REQ-007               | Dashboard exibe métricas corretas                                              | Frontend           |
| AT09 | Definir data de sprint                                         | REQ-008               | Data exibida corretamente no header                                            | Frontend           |
| AT10 | Acessar aplicação em viewport mobile                           | REQ-018               | Layout responsivo exibido corretamente                                         | Frontend           |

---

## 7. Mapeamento dos Dados de Teste

| Dado                 | Tipo                       | Exemplos de Valores                                     | Responsável | Status     |
|----------------------|----------------------------|--------------------------------------------------------|-------------|------------|
| Título da Tarefa     | String (até 100)           | "Implementar login", "Corrigir bug do Kanban"          | QA          | Disponível |
| Descrição da Tarefa  | Texto livre                | "Usuário deve conseguir logar com e-mail/senha válidos"| QA          | Disponível |
| Prioridade da Tarefa | Enum (Baixa, Média, Alta)  | Baixa, Média, Alta                                     | QA          | Disponível |
| Tipo da Tarefa       | Enum (Feature, Bug, Teste) | Feature, Bug, Teste                                    | QA          | Disponível |
| Status da Tarefa     | Enum                       | Backlog, Em Desenvolvimento, Em Teste, Concluída       | QA          | Disponível |
| Comentário           | Texto + Anexo opcional     | "Esse bug ocorre apenas no Firefox" + screenshot.png   | QA          | Disponível |
| Caso de Teste        | Texto livre                | "CT01 – Validar login com credenciais válidas"         | QA          | Disponível |
| Bug (Título/Descrição)| String/Texto livre        | Título: "Erro ao mover tarefa"; Descrição: "Tarefa não atualiza de coluna" | QA | Disponível |
| Evidência            | Arquivo (imagem/vídeo)     | evid_bug01.png, video_bug02.mp4                        | QA          | Disponível |
| Data Fim da Sprint   | Data (dd/mm/yyyy)          | 25/08/2025, 30/09/2025                                 | QA          | Disponível |
| Usuários de Teste    | Login/senha fictícios      | user1@test.com / 123456; admin@test.com / admin@123    | QA          | Disponível |
| Arquivos para Upload | Imagens, vídeos, PDF       | teste.png, documento.pdf, evid.mp4                     | QA          | Disponível |

---

## 8. Defeitos Conhecidos

*(Nenhum defeito conhecido até o momento)*

---

📌 **Todos os artefatos de teste estão rastreados com os requisitos do backlog (REQ-001, REQ-002, etc.) para garantir rastreabilidade total entre requisitos, testes e documentação.**

---

# Casos de Teste – Projeto Jiraiya

Baseado na ISO-29119-3.

---

## CT01 – Criar Tarefa no Kanban do Jiraiya

**ID:** CT01  
**Título do cenário de teste:** Validar a criação de uma nova tarefa no Kanban do Jiraiya 
**Rastreabilidade:** REQ-002 — Funcionalidade: Kanban com Drag & Drop e WIP  
**Prioridade:** Alta  

**Pré-Condições:**  
- Usuário acessa o Jiraiya.
- O formulário "Nova Tarefa" está visível na parte superior da tela, contendo os campos "Título", "Descrição", "Prioridade" e "Tipo".

**Passos:**

| Ação                                                                 | Resultado Esperado                                                     |
|----------------------------------------------------------------------|------------------------------------------------------------------------|
| Passo 1: Preencher o campo "Título" com o nome da tarefa             | O texto digitado aparece no campo                                      |
| Passo 2: Preencher o campo "Descrição" com detalhes da tarefa        | O texto digitado aparece no campo                                      |
| Passo 3: Selecionar a "Prioridade" desejada                          | Opções "Alta", "Média" e "Baixa" são exibidas e podem ser escolhidas   |
| Passo 4: Selecionar o "Tipo" desejado                                | Opções "Feature", "Bug" e "Melhoria" são exibidas e podem ser escolhidas|
| Passo 5: Clicar em "Adicionar ao Backlog"                            | A tarefa criada aparece na coluna "Backlog" do Kanban                  |

**Pós-Condições:**  
- Tarefa registrada e visível na coluna "Backlog" do Kanban.
- Status inicial definido como *Backlog*.

---

## CT02 – Editar Tarefa

**ID:** CT02  
**Título do cenário de teste:** Validar a edição de uma tarefa existente  
**Rastreabilidade:** REQ-003 — Funcionalidade: Edição de Tarefas  
**Prioridade:** Alta  

**Pré-Condições:**  
- Tarefa já cadastrada no Kanban.

**Passos:**

| Ação                                                                 | Resultado Esperado                                                     |
|----------------------------------------------------------------------|------------------------------------------------------------------------|
| Passo 1: Clicar duas vezes no card da tarefa ou clicar em "✏️ Editar" no menu | Modal de edição da tarefa é exibido com os campos preenchidos          |
| Passo 2: Alterar o título, descrição, prioridade, status ou tipo     | Campos aceitam edição normalmente                                      |
| Passo 3: Clicar em "Salvar"                                          | Alterações são refletidas no card da tarefa no Kanban                  |

**Pós-Condições:**  
- Tarefa atualizada e visível no Kanban com as novas informações.

---

## CT03 – Excluir Tarefa

**ID:** CT03  
**Título do cenário de teste:** Validar a exclusão de uma tarefa  
**Rastreabilidade:** REQ-012 — Funcionalidade: Confirmação de Exclusão  
**Prioridade:** Alta  

**Pré-Condições:**  
- Tarefa já cadastrada no Kanban.

**Passos:**

| Ação                                                                 | Resultado Esperado                                                     |
|----------------------------------------------------------------------|------------------------------------------------------------------------|
| Passo 1: Clicar no menu "⋮" do card da tarefa e selecionar "🗑️ Deletar" | Modal de confirmação de exclusão é exibido                             |
| Passo 2: Confirmar a exclusão clicando em "Sim, Excluir"             | Tarefa removida do Kanban                                              |

**Pós-Condições:**  
- Tarefa não está mais visível no Kanban.

---

## CT04 – Mover Tarefa entre Colunas

**ID:** CT04  
**Título do cenário de teste:** Validar movimentação de tarefa entre colunas do Kanban  
**Rastreabilidade:** REQ-002 — Funcionalidade: Kanban com Drag & Drop e WIP  
**Prioridade:** Alta  

**Pré-Condições:**  
- Tarefa cadastrada no Kanban.

**Passos:**

| Ação                                                                 | Resultado Esperado                                                     |
|----------------------------------------------------------------------|------------------------------------------------------------------------|
| Passo 1: Arrastar o card da tarefa de uma coluna para outra          | Card é movido para a nova coluna e status é atualizado                 |
| Passo 2: Soltar o card na coluna desejada                            | Tarefa permanece na nova coluna                                        |

**Pós-Condições:**  
- Status da tarefa atualizado conforme a coluna de destino.

---

## CT05 – Adicionar Comentário em uma Tarefa

**ID:** CT05  
**Título do cenário de teste:** Validar a adição de comentário (com e sem anexo) em uma tarefa  
**Rastreabilidade:** REQ-004 — Funcionalidade: Comentários com Anexos  
**Prioridade:** Média  

**Pré-Condições:**  
- Usuário acessa o modal de detalhes de uma tarefa existente.
- Área de comentários está disponível no modal.

**Passos:**

| Ação                                                                 | Resultado Esperado                                                     |
|----------------------------------------------------------------------|------------------------------------------------------------------------|
| Passo 1: No modal da tarefa, localizar a seção "Comentários"         | Campo de texto e botão "Adicionar" visíveis                            |
| Passo 2: Digitar um comentário e clicar em "Adicionar"               | Comentário aparece imediatamente na lista de comentários da tarefa      |
| Passo 3: Repetir o processo anexando um arquivo (imagem/vídeo)       | Comentário aparece com link ou preview do anexo                        |

**Pós-Condições:**  
- Comentário armazenado e visível na lista de comentários da tarefa.
- Anexo disponível para visualização local.

---

## CT06 – Editar Comentário

**ID:** CT06  
**Título do cenário de teste:** Validar a edição de um comentário em uma tarefa  
**Rastreabilidade:** REQ-016 — Funcionalidade: Edição de Comentário  
**Prioridade:** Média  

**Pré-Condições:**  
- Comentário já cadastrado em uma tarefa.

**Passos:**

| Ação                                                                 | Resultado Esperado                                                     |
|----------------------------------------------------------------------|------------------------------------------------------------------------|
| Passo 1: Clicar no ícone de editar ao lado do comentário             | Modal de edição de comentário é exibido                                |
| Passo 2: Alterar o texto do comentário e clicar em "Salvar"          | Comentário atualizado na lista                                         |

**Pós-Condições:**  
- Comentário atualizado visível na tarefa.

---

## CT07 – Excluir Comentário

**ID:** CT07  
**Título do cenário de teste:** Validar a exclusão de um comentário em uma tarefa  
**Rastreabilidade:** REQ-004 — Funcionalidade: Comentários com Anexos  
**Prioridade:** Média  

**Pré-Condições:**  
- Comentário já cadastrado em uma tarefa.

**Passos:**

| Ação                                                                 | Resultado Esperado                                                     |
|----------------------------------------------------------------------|------------------------------------------------------------------------|
| Passo 1: Clicar no ícone de excluir ao lado do comentário            | Comentário removido da lista                                           |

**Pós-Condições:**  
- Comentário não está mais visível na tarefa.

---

## CT08 – Adicionar Caso de Teste em uma Tarefa

**ID:** CT08  
**Título do cenário de teste:** Validar a adição de caso de teste em uma tarefa  
**Rastreabilidade:** REQ-005 — Funcionalidade: Casos de Teste  
**Prioridade:** Alta  

**Pré-Condições:**  
- Usuário acessa o modal de detalhes da tarefa.
- Aba "Documentação" está disponível.

**Passos:**

| Ação                                                                 | Resultado Esperado                                                     |
|----------------------------------------------------------------------|------------------------------------------------------------------------|
| Passo 1: Clicar na aba "Documentação" no modal da tarefa             | Aba exibida com formulário de novo caso de teste                       |
| Passo 2: Preencher a descrição do caso de teste                      | Texto digitado aparece no campo                                        |
| Passo 3: Clicar em "Adicionar Caso de Teste"                         | Caso de teste listado abaixo do formulário                             |

**Pós-Condições:**  
- Caso de teste armazenado e visível na aba "Documentação" da tarefa.

---

## CT09 – Editar Caso de Teste

**ID:** CT09  
**Título do cenário de teste:** Validar a edição de um caso de teste  
**Rastreabilidade:** REQ-014 — Funcionalidade: Edição de Caso de Teste  
**Prioridade:** Média  

**Pré-Condições:**  
- Caso de teste já cadastrado em uma tarefa.

**Passos:**

| Ação                                                                 | Resultado Esperado                                                     |
|----------------------------------------------------------------------|------------------------------------------------------------------------|
| Passo 1: Clicar no ícone de editar ao lado do caso de teste          | Modal de edição de caso de teste é exibido                             |
| Passo 2: Alterar a descrição e clicar em "Salvar"                    | Caso de teste atualizado na lista                                      |

**Pós-Condições:**  
- Caso de teste atualizado visível na tarefa.

---

## CT10 – Excluir Caso de Teste

**ID:** CT10  
**Título do cenário de teste:** Validar a exclusão de um caso de teste  
**Rastreabilidade:** REQ-005 — Funcionalidade: Casos de Teste  
**Prioridade:** Média  

**Pré-Condições:**  
- Caso de teste já cadastrado em uma tarefa.

**Passos:**

| Ação                                                                 | Resultado Esperado                                                     |
|----------------------------------------------------------------------|------------------------------------------------------------------------|
| Passo 1: Clicar no ícone de excluir ao lado do caso de teste         | Caso de teste removido da lista                                        |

**Pós-Condições:**  
- Caso de teste não está mais visível na tarefa.

---

## CT11 – Criar Bug com Evidência

**ID:** CT11  
**Título do cenário de teste:** Validar a criação de um bug associado a uma tarefa com evidência  
**Rastreabilidade:** REQ-001 — Funcionalidade: Report de Bugs; REQ-006 — Funcionalidade: Evidências  
**Prioridade:** Alta  

**Pré-Condições:**  
- Usuário acessa o modal de detalhes da tarefa.
- Aba "Bugs" está disponível no modal.

**Passos:**

| Ação                                                                 | Resultado Esperado                                                     |
|----------------------------------------------------------------------|------------------------------------------------------------------------|
| Passo 1: No modal da tarefa, clicar na aba "Bugs"                    | Aba exibida com lista de bugs (se houver) e formulário de novo bug     |
| Passo 2: Preencher título, descrição, prioridade e status do bug     | Dados inseridos corretamente nos campos correspondentes                |
| Passo 3: (Opcional) Clicar em "📎 Adicionar Evidências" e anexar arquivo(s) | Evidências carregadas e exibidas como preview                          |
| Passo 4: Clicar em "Adicionar Bug"                                   | Bug criado e listado na aba, exibindo todos os campos e evidências     |

**Pós-Condições:**  
- Bug armazenado e associado à tarefa.
- Evidência vinculada corretamente ao bug.

---

## CT12 – Editar Bug

**ID:** CT12  
**Título do cenário de teste:** Validar a edição de um bug  
**Rastreabilidade:** REQ-015 — Funcionalidade: Edição de Bug  
**Prioridade:** Média  

**Pré-Condições:**  
- Bug já cadastrado em uma tarefa.

**Passos:**

| Ação                                                                 | Resultado Esperado                                                     |
|----------------------------------------------------------------------|------------------------------------------------------------------------|
| Passo 1: Clicar no ícone de editar ao lado do bug                    | Modal de edição de bug é exibido                                       |
| Passo 2: Alterar os campos desejados e clicar em "Salvar"            | Bug atualizado na lista                                                |

**Pós-Condições:**  
- Bug atualizado visível na tarefa.

---

## CT13 – Excluir Bug

**ID:** CT13  
**Título do cenário de teste:** Validar a exclusão de um bug  
**Rastreabilidade:** REQ-001 — Funcionalidade: Report de Bugs  
**Prioridade:** Média  

**Pré-Condições:**  
- Bug já cadastrado em uma tarefa.

**Passos:**

| Ação                                                                 | Resultado Esperado                                                     |
|----------------------------------------------------------------------|------------------------------------------------------------------------|
| Passo 1: Clicar no ícone de excluir ao lado do bug                   | Bug removido da lista                                                  |

**Pós-Condições:**  
- Bug não está mais visível na tarefa.

---

## CT14 – Adicionar Evidência a um Bug

**ID:** CT14  
**Título do cenário de teste:** Validar a adição de evidência a um bug  
**Rastreabilidade:** REQ-011 — Funcionalidade: Seleção de Bug para Evidências; REQ-006 — Funcionalidade: Evidências  
**Prioridade:** Média  

**Pré-Condições:**  
- Bug já cadastrado em uma tarefa.

**Passos:**

| Ação                                                                 | Resultado Esperado                                                     |
|----------------------------------------------------------------------|------------------------------------------------------------------------|
| Passo 1: Clicar em "📎 Adicionar Evidências" ao lado do bug          | Modal de evidências é exibido                                          |
| Passo 2: Selecionar arquivos de imagem ou vídeo                      | Arquivos carregados e exibidos como preview                            |
| Passo 3: Clicar em "Salvar Evidências"                               | Evidências anexadas ao bug                                             |

**Pós-Condições:**  
- Evidências visíveis e associadas ao bug.

---

## CT15 – Visualizar Dashboard

**ID:** CT15  
**Título do cenário de teste:** Validar a visualização do dashboard de métricas  
**Rastreabilidade:** REQ-007 — Funcionalidade: Dashboard  
**Prioridade:** Média  

**Pré-Condições:**  
- Tarefas, bugs e casos de teste cadastrados no sistema.

**Passos:**

| Ação                                                                 | Resultado Esperado                                                     |
|----------------------------------------------------------------------|------------------------------------------------------------------------|
| Passo 1: Clicar no botão "📊 Dashboard" no topo da tela              | Modal do dashboard é exibido                                           |
| Passo 2: Visualizar métricas de casos executados, bugs e tarefas     | Métricas exibidas corretamente                                         |
| Passo 3: Visualizar gráfico burndown                                 | Gráfico exibido com dados atualizados                                  |

**Pós-Condições:**  
- Usuário visualiza informações de progresso e qualidade do projeto.

---

## CT16 – Definir Data de Fim da Sprint

**ID:** CT16  
**Título do cenário de teste:** Validar definição da data de fim da sprint  
**Rastreabilidade:** REQ-008 — Funcionalidade: Sprint e Countdown  
**Prioridade:** Média  

**Pré-Condições:**  
- Campo de data de fim da sprint disponível no topo da tela.

**Passos:**

| Ação                                                                 | Resultado Esperado                                                     |
|----------------------------------------------------------------------|------------------------------------------------------------------------|
| Passo 1: Selecionar uma data no campo "Fim da sprint"                | Data selecionada aparece no campo                                      |
| Passo 2: Clicar em "Definir"                                         | Contagem regressiva de dias é exibida ao lado do campo                 |

**Pós-Condições:**  
- Data de fim da sprint definida e contagem regressiva visível.

---

## CT17 – Visualizar Modal de Boas-Vindas

**ID:** CT17  
**Título do cenário de teste:** Validar exibição do modal de boas-vindas na primeira visita  
**Rastreabilidade:** REQ-009 — Funcionalidade: Boas‑vindas  
**Prioridade:** Baixa  

**Pré-Condições:**  
- Usuário acessa o sistema pela primeira vez (sem dados salvos/localStorage).

**Passos:**

| Ação                                                                 | Resultado Esperado                                                     |
|----------------------------------------------------------------------|------------------------------------------------------------------------|
| Passo 1: Acessar o sistema pela primeira vez                         | Modal de boas-vindas é exibido                                         |
| Passo 2: Clicar em "Começar"                                         | Modal é fechado e usuário acessa o sistema normalmente                 |

**Pós-Condições:**  
- Modal de boas-vindas não é exibido novamente até limpar os dados do navegador.

---

## CT18 – IDs de Tarefas

**ID:** CT18  
**Título do cenário de teste:** Validar exibição e unicidade dos IDs das tarefas  
**Rastreabilidade:** REQ-010 — Funcionalidade: IDs de Tarefas  
**Prioridade:** Média  

**Pré-Condições:**  
- Tarefas cadastradas no Kanban.

**Passos:**

| Ação                                                                 | Resultado Esperado                                                     |
|----------------------------------------------------------------------|------------------------------------------------------------------------|
| Passo 1: Criar múltiplas tarefas                                     | Cada tarefa recebe um ID único e sequencial                            |
| Passo 2: Visualizar o ID no card da tarefa                           | ID exibido de forma clara no card                                      |

**Pós-Condições:**  
- IDs únicos e visíveis em todas as tarefas.

---

## CT19 – Responsividade e Acessibilidade

**ID:** CT19  
**Título do cenário de teste:** Validar responsividade e acessibilidade do sistema  
**Rastreabilidade:** REQ-018 — Funcionalidade: Responsividade e Acessibilidade  
**Prioridade:** Alta  

**Pré-Condições:**  
- Acesso à aplicação via diferentes resoluções (1920x1080, 1024x768, 360x640).

**Passos:**

| Ação                                  | Resultado Esperado                                  |
|---------------------------------------|----------------------------------------------------|
| Passo 1: Abrir sistema em desktop     | Layout exibido corretamente com todas as colunas Kanban visíveis |
| Passo 2: Abrir sistema em tablet      | Layout adaptado, preservando usabilidade           |
| Passo 3: Abrir sistema em mobile      | Layout responsivo, colunas Kanban acessíveis via scroll horizontal |
| Passo 4: Navegar usando teclado e leitores de tela | Elementos acessíveis e navegação sem mouse         |

**Pós-Condições:**  
- Sistema acessível e usável em qualquer dispositivo e por qualquer usuário.

---
#Reporte de Defeitos

## Defeito (DEF-001)

Baseado na ISO-29119-3 e em ferramentas de gestão de defeitos.

| Campo                | Descrição                                                                                      |
|----------------------|-----------------------------------------------------------------------------------------------|
| **ID**               | DEF-001                                                                                       |
| **Título**           | Menu lateral não fecha ao clicar fora do botão menu-trigger                                    |
| **Testador**         | Neto Accioly                                                                                  |
| **Data e Hora**      | 21/08/2025 21:32                                                                              |
| **Resultado Esperado** | Ao clicar fora do menu aberto pelo botão `.menu-trigger`, o menu deveria ser fechado automaticamente. |
| **Resultado Atual**  | O menu permanece aberto mesmo após clicar fora do botão, obrigando o usuário a clicar novamente no botão para fechar. |
| **Evidências**       | [(anexos/print_menu_bug.png)](https://www.notion.so/DEF-001-256ec270496d805b9bd1dccdeec4c775?source=copy_link)                                              |
| **Prioridade**       | Média                                                                                         |
| **Severidade**       | Baixa                                                                                         |
| **Informações sobre o Software** | Versão: 1.0.0<br>Ambiente: Chrome Versão 139.0.7258.128 (Versão oficial) 64 bits, Windows 11                                 |
| **Rastreabilidade**  | CT04 – Mover Tarefa entre Colunas<br>REQ-002 – Kanban com Drag & Drop e WIP                   |
| **Status**           | Aberto                                                                                        |
