### 🧪 Este é o MVP do meu Portfolio, baseado no meu conhecimento atual, irei continuar desenvolvendo e evoluindo o projeto conforme avanço nos estudos.

# ✬ Projeto Jiraiya – Laboratório de Qualidade de Software (QA)

Jiraiya é uma **plataforma web para gestão de projetos**, inspirada no Jira, focada em **Kanban, criação de tarefas com descrição, prioridade e tipo da tarefa(Feature, Bug ou Melhoria), documentação de casos de teste, controle de bugs, possibilidade de anexar evidências, contador regressivo do prazo final da sprint ágil e dashboard com métricas de acompanhamento da sprint**.  
O sistema é moderno, responsivo e pensado para **equipes ágeis**.

Este projeto nasceu como parte do meu **portfólio de Qualidade de Software (QA)**, fruto da minha jornada de aprendizado na [Mentoria M2.0 do Júlio de Lima](https://juliodelima.com.br/).  
Esse desafio consistiu em criar os requisitos e gerar do zero uma aplicação Web ou API Rest, apartir disso construir todo o planejamento para testar o software criado, executar os testes, reportar os defeitos(bugs) e automatizar os testes necessários.   

O **Jiraiya é mais do que uma aplicação**: ele é meu **laboratório de testes, documentação e automação**, onde aplico na prática tudo que venho aprendendo sobre qualidade de software.

---

## 📚 Documentação do Projeto

Toda a documentação do Jiraiya está organizada na [Wiki do repositório](https://github.com/Neto-Accioly/portfolio/wiki):

- [📖 Análise Geral do Projeto](https://github.com/Neto-Accioly/portfolio/wiki/Jiraiya-–-Análise-Geral-do-Projeto)  
- [🧾 Casos de Teste](https://github.com/Neto-Accioly/portfolio/wiki/Casos-de-teste)  
- [🧠 Heurísticas Utilizadas](https://github.com/Neto-Accioly/portfolio/wiki/Heur%C3%ADsticas-Utilizadas)  
- [🗂 Plano e Estratégia de Testes](https://github.com/Neto-Accioly/portfolio/wiki/Plano-e-Estrat%C3%A9gia-de-Testes-–-Projeto-Jiraiya)  
- [📝 Relatório de Sessão (Testes Exploratórios)](https://github.com/Neto-Accioly/portfolio/wiki/Relat%C3%B3rio-de-Sess%C3%A3o-(Testes-Explorat%C3%B3rios))  
- [🐞 Reporte de Defeitos](https://github.com/Neto-Accioly/portfolio/wiki/Reporte-de-defeitos)  
- [🤖 Testes Automatizados](https://github.com/Neto-Accioly/portfolio/wiki/Testes-Automatizados)  

📢Obs: Ainda vou incluir muito mais, além das documentações irei gravar vídeos demonstrando na prática.

---

## ✔️ Checkpoint do Laboratório

### ✔ O que já fiz até agora
- Estruturei o **projeto base** com suporte a Kanban, criação de tarefas com descrição, prioridade e tipo da tarefa(Feature, Bug ou Melhoria), documentação de casos de teste, controle de bugs, possibilidade de anexar evidências, contador regressivo do prazo final da sprint ágil e dashboard com métricas de acompanhamento da sprint.  
- Criei a **documentação completa** do ciclo de QA e armazenei na Wiki do GitHub.  
- Comecei a automação de testes end-to-end com [Cypress](https://www.cypress.io/). ---> [🎬Vídeo da execução do primeiro teste automatizado E2E.](https://jam.dev/c/29ab5f22-d5d7-4bd9-8d4d-df01b1733f4b) 
- Realizei testes de **responsividade** com [Responsive Viewer](https://chrome.google.com/webstore/detail/responsive-viewer/inmopeiepgfljkpkidclfgbgbmfcennb). ---> [🎬Exemplo em vídeo utilizando meu teste de responsividade.](https://jam.dev/c/79753bdc-4935-4ad4-933b-23eb31c072aa) 
- Avaliei **acessibilidade** com [Axe Accessibility](https://www.deque.com/axe/). ---> [🎬Exemplo em vídeo utilizando meu teste de Acessibilidade.](https://jam.dev/c/eb1e707a-2f07-4980-b5f3-a9f55c179e4e)
- Realizei testes de **performance** com [Lighthouse](https://developer.chrome.com/docs/lighthouse/). ---> [🎬Exemplo em vídeo utilizando meu teste de Performance.](https://jam.dev/c/9650b583-cca8-4a60-8895-9d12cb6cd00b)  
- Implementei relatórios dos testes Cypress em HTML com [Mochawesome](https://www.npmjs.com/package/mochawesome). ---> [🎬Exemplo em vídeo utilizando meu teste automatizado.](https://jam.dev/c/978336e9-0a94-4cd1-aa97-f1ca1e512a40)
- Gravei todas as **evidências de testes** utilizando [Jam](https://jam.dev/).  

### ⏳ O que vem pela frente
- **Explorar ao máximo** o front-end do Jiraiya para aumentar a cobertura de testes automatizados.  
- Criar uma **API do zero**.
- Documentar todo.
- Utilizar a heurística **[VADER](https://github.com/cjhutto/vaderSentiment)** para validar comportamentos da API Rest.  
- Automatizar testes de API com [Mocha](https://mochajs.org/), [Chai](https://www.chaijs.com/) e [Supertest](https://www.npmjs.com/package/supertest).  
- Gerar relatórios dos testes na API Rest em HTML com [Mochawesome](https://www.npmjs.com/package/mochawesome).  
- Realizar **testes de performance** na API Rest com [k6](https://k6.io/).  

---

## 🗄️ Estrutura de Pastas

### 📁 Estrutura Atual (fase de aprendizado)
```bash
portfolio/
├── cypress/                     # Pasta raiz dos testes automatizados com Cypress
│   ├── e2e/                     # Casos de teste automatizados (specs)
│   │   └── exemplo.cy.js        # Cada arquivo aqui representa um conjunto de testes
│   ├── fixtures/                # Massa de dados para testes
│   │   └── example.json         # Arquivos JSON com dados mockados para simular entradas
│   ├── support/                 # Configurações e comandos customizados
│   │   ├── commands.js          # Definições de comandos personalizados do Cypress
│   │   └── e2e.js               # Configurações globais que rodam antes dos testes
│
├── .gitignore                   # Arquivo que define o que o Git deve ignorar (node_modules, relatórios, etc.)
│
├── app.js                       # Arquivo principal em JavaScript da aplicação (lógica do front-end)
│
├── cypress.config.js            # Arquivo de configuração do Cypress (timeout, diretórios, baseUrl, reporter, etc.)
│
├── index.html                   # Página principal da aplicação (estrutura base em HTML)
│
├── package-lock.json            # Arquivo que trava as versões exatas das dependências instaladas (gerado automaticamente)
│
├── package.json                 # Arquivo de configuração do projeto Node.js:
│                                # - lista scripts (start, test, etc.)
│                                # - dependências e devDependencies
│                                # - informações do projeto
│
├── README.md                    # Documentação inicial do projeto (o que é, como rodar, instruções)
│
└── style.css                    # Arquivo de estilos da aplicação (responsável pela parte visual)

```

### 📁 Como vai ficar a estrutura atual corrigida (Em breve)
```bash
portfolio/
├── src/                          # Código-fonte da aplicação
│   ├── assets/                   # Imagens, ícones, fontes...
│   ├── css/                      # Arquivos de estilo
│   │   └── style.css
│   ├── js/                       # Scripts de frontend
│   │   └── app.js
│   └── index.html                # Página principal
│
├── tests/                        # Testes manuais e documentação de QA
│   └── test-cases.md             # Casos de teste escritos (além do Cypress)
│
├── cypress/                      # Testes automatizados com Cypress
│   ├── e2e/                      # Casos de teste automatizados (specs)
│   ├── fixtures/                 # Massa de dados simulada
│   └── support/                  # Configurações globais e comandos customizados
│
├── .gitignore                    # Ignora node_modules, relatórios, cache etc.
├── cypress.config.js             # Configuração do Cypress
├── package-lock.json
├── package.json
├── README.md                     # Documentação inicial
└── docs/                         # Documentação adicional do projeto
    └── arquitetura.md            # Explica estrutura e decisões do projeto
```



### 🗂️ Estrutura Futura quando incluir API (mais profissional e escalável)
```bash
portfolio/
├── src/                          # Código-fonte da aplicação (frontend)
│   ├── assets/                   # Imagens, ícones, fontes...
│   ├── css/                      # Arquivos de estilo
│   │   └── style.css
│   ├── js/                       # Scripts de frontend
│   │   └── app.js
│   └── index.html                # Página principal
│
├── api/                          # Código da API (backend)
│   ├── controllers/              # Lógica das rotas
│   ├── models/                   # Modelos de dados (caso use DB)
│   ├── routes/                   # Definição das rotas
│   ├── services/                 # Regras de negócio
│   ├── tests/                    # Testes unitários/integrados da API
│   ├── app.js                    # Ponto de entrada da API (Express, Fastify, etc.)
│   └── package.json              # Dependências da API (pode ser separado ou integrado ao principal)
│
├── cypress/                      # Testes automatizados de frontend
│   ├── e2e/                      # Casos de teste automatizados (specs)
│   ├── fixtures/                 # Massa de dados simulada
│   └── support/                  # Configurações globais e comandos customizados
│
├── k6/                           # Testes de performance
│   ├── load-test.js              # Teste de carga
│   ├── stress-test.js            # Teste de estresse
│   └── smoke-test.js             # Teste rápido de saúde
│
├── tests/                        # Testes manuais/documentação de QA
│   └── test-cases.md             # Casos de teste escritos
│
├── docs/                         # Documentação do projeto
│   ├── arquitetura.md            # Estrutura e decisões técnicas
│   ├── api-docs.md               # Documentação da API (endpoints)
│   └── qa-strategy.md            # Estratégia de testes (QA + performance)
│
├── .gitignore                    # Ignora node_modules, relatórios, cache etc.
├── cypress.config.js             # Configuração do Cypress
├── package-lock.json
├── package.json                  # Dependências do projeto (monorepo ou integrado)
├── README.md                     # Documentação inicial

```

---

## 🔎 Tecnologias Utilizadas

### Frontend:
- HTML, CSS e JavaScript puro.
### Persistência:
- LocalStorage (Dados mantidos localmente no navegador)
### Backend
- Em Breve

## ⚙️ Como rodar o projeto

### 1. Clone o repositório
```bash
git clone https://github.com/Neto-Accioly/portfolio.git
cd portfolio
````

### 2. Instale as dependências
```bash
npm install
```

### 3. Rode o servidor local
```bash
npm run start
```
O projeto estará disponível em: http://localhost:3000

### 4. Executar os testes com Cypress

Rodar teste abrindo o Cypress
```bash
npm run cy:open
```
ou para rodar headed.
```bash
npm run cy:headed
```

## Objetivo do Laboratório

Este projeto não é apenas para treinar código, mas para registrar toda a minha evolução como QA.
A ideia é que no futuro este repositório sirva como laboratório aberto de estudos, onde outros profissionais de QA possam:

- Consultar casos de teste reais

- Explorar estratégias de automação

- Ver exemplos práticos de heurísticas aplicadas

- Acompanhar a evolução de um projeto QA do zero até práticas avançadas

### Lindemir Accioly Neto
QA em transição de carreira | Estudante da Mentoria M2.0 do Júlio de Lima

[LinkedIn](https://www.linkedin.com/in/lindemir-accioly-neto-/)
[Portfólio](https://github.com/Neto-Accioly/portfolio)

