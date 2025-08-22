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

Obs: Ainda vou incluir muito mais, além das documentações irei gravar vídeos demonstrando na prática.

---

## ✔️ Checkpoint do Laboratório

### 🔹 O que já fiz até agora
- Estruturei o **projeto base** com suporte a Kanban, documentação de casos de teste e reporte de defeitos.  
- Criei a **documentação completa** do ciclo de QA na Wiki do GitHub.  
- Comecei a automação de testes end-to-end com [Cypress](https://www.cypress.io/).  
- Realizei testes de **responsividade** com [Responsive Viewer](https://chrome.google.com/webstore/detail/responsive-viewer/inmopeiepgfljkpkidclfgbgbmfcennb).  
- Avaliei **acessibilidade** com [Axe Accessibility](https://www.deque.com/axe/) e [Lighthouse](https://developer.chrome.com/docs/lighthouse/).  
- Gravei **evidências de testes** utilizando [Jam](https://jam.dev/).  
- Relatórios HTML no Cypress com [Mochawesome](https://www.npmjs.com/package/mochawesome) ---> [✨Exemplo em vídeo do meu teste automatizado.](https://jam.dev/c/978336e9-0a94-4cd1-aa97-f1ca1e512a40)  

### 🔹 O que vem pela frente
- **Explorar ao máximo** o front-end do Jiraiya para aumentar a cobertura de testes automatizados.  
- Criar uma **API do zero** com auxílio de **IA generativa**.  
- Utilizar a heurística **[VADER](https://github.com/cjhutto/vaderSentiment)** para validar comportamentos.  
- Automatizar testes de API com [Mocha](https://mochajs.org/), [Chai](https://www.chaijs.com/) e [Supertest](https://www.npmjs.com/package/supertest).  
- Gerar relatórios HTML com [Mochawesome](https://www.npmjs.com/package/mochawesome).  
- Realizar **testes de performance** com [k6](https://k6.io/).  

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
├── package.json                  # Arquivo de configuração do projeto Node.js:
│                                 # - lista scripts (start, test, etc.)
│                                 # - dependências e devDependencies
│                                 # - informações do projeto
│
├── README.md                     # Documentação inicial do projeto (o que é, como rodar, instruções)
│
└── style.css                     # Arquivo de estilos da aplicação (responsável pela parte visual)

```

### 📁 Estrutura como vai ficar a estrutura atual corrigida (Em breve)
```bash
portfolio/
├── cypress/           # Testes automatizados com Cypress
│ ├── e2e/             # Casos de teste automatizados
│ ├── fixtures/        # Massa de dados para testes
│ ├── support/         # Configurações e comandos customizados
├── docs/              # Evidências, relatórios e anotações
├── src/               # Código da aplicação (front-end)
├── package.json       # Arquivo de configuração do projeto Node.js:
└── README.md
```


### 🗂️ Estrutura Futura quando incluir API (mais profissional e escalável)
```bash
portfolio/
├── tests/              # Pasta dedicada para todos os testes
│ ├── e2e/              # Testes end-to-end
│ ├── api/              # Testes de API (Mocha, Chai, Supertest)
│ ├── performance/      # Testes de performance (k6)
│ ├── accessibility/    # Scripts de acessibilidade
├── reports/            # Relatórios automatizados (Mochawesome, evidências)
├── docs/               # Documentação e wiki local
├── src/                # Código da aplicação
│ ├── api/              # Serviços de backend
│ ├── ui/               # Componentes de interface
│ ├── utils/            # Utilitários e helpers
├── config/             # Configurações de testes e ambientes
├── package.json
└── README.md
```

---

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

### 4. Executar os testes automatizados abrindo o Cypress
```bash
npm run cy:open
```
ou para rodar headed
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

