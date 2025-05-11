<map version="1.0.1">
<!-- To view this file, download free mind mapping software FreeMind from http://freemind.sourceforge.net -->
<node CREATED="1746894703745" ID="ID_1570274096" MODIFIED="1746894703745" TEXT="Documenta&#xe7;&#xe3;o do Projeto React + Electron &#x2013; Equilibra Manager">
<node CREATED="1746894703745" ID="ID_1324577550" MODIFIED="1746894703745" POSITION="right" TEXT="1. Estrutura de Pastas">
<node CREATED="1746894703745" MODIFIED="1746894703745" TEXT="src/ &#x2013; C&#xf3;digo-fonte principal"/>
<node CREATED="1746894703745" MODIFIED="1746894703745" TEXT="  &#x251c;&#x2500;&#x2500; assets/ &#x2013; Imagens e fontes utilizadas no frontend"/>
<node CREATED="1746894703745" MODIFIED="1746894703745" TEXT="  &#x251c;&#x2500;&#x2500; db/ &#x2013; L&#xf3;gica de acesso ao banco SQLite com better-sqlite3"/>
<node CREATED="1746894703745" MODIFIED="1746894703745" TEXT="  &#x251c;&#x2500;&#x2500; renderer/ &#x2013; Componentes visuais e p&#xe1;ginas"/>
<node CREATED="1746894703745" MODIFIED="1746894703745" TEXT="  &#x251c;&#x2500;&#x2500; services/ &#x2013; Servi&#xe7;os que chamam a API (preload)"/>
<node CREATED="1746894703745" MODIFIED="1746894703745" TEXT="  &#x251c;&#x2500;&#x2500; types/ &#x2013; Interfaces e types globais"/>
<node CREATED="1746894703745" MODIFIED="1746894703745" TEXT="  &#x251c;&#x2500;&#x2500; preload.ts &#x2013; Comunica&#xe7;&#xe3;o frontend/backend via contextBridge"/>
<node CREATED="1746894703745" MODIFIED="1746894703745" TEXT="  &#x2514;&#x2500;&#x2500; index.ts &#x2013; Entrypoint principal com ipcMain e janelas"/>
<node CREATED="1746895108324" ID="ID_1401116448" MODIFIED="1746895261109">
<richcontent TYPE="NODE"><html>
  <head>
    
  </head>
  <body>
    Estrutura completa:

    <p>
      equilibraManager1/
    </p>
    <p>
      &#9500;&#9472;&#9472; .webpack/&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;# Gerado pelo Electron Forge (build final)
    </p>
    <p>
      &#9500;&#9472;&#9472; documentacao/&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;# Pasta auxiliar (PDFs, .mm, docs gerados)
    </p>
    <p>
      &#9500;&#9472;&#9472; node_modules/&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;# Depend&#234;ncias instaladas via npm
    </p>
    <p>
      &#9500;&#9472;&#9472; src/&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;# PASTA PRINCIPAL DO C&#211;DIGO FONTE
    </p>
    <p>
      &#9474;&#160;&#160;&#160;&#9500;&#9472;&#9472; assets/
    </p>
    <p>
      &#9474;&#160;&#160;&#160;&#9474;&#160;&#160;&#160;&#9500;&#9472;&#9472; fonts/&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;# Fontes personalizadas
    </p>
    <p>
      &#9474;&#160;&#160;&#160;&#9474;&#160;&#160;&#160;&#9492;&#9472;&#9472; images/&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;# Imagens usadas no layout (backgrounds, logos)
    </p>
    <p>
      &#9474;&#160;&#160;&#160;&#9500;&#9472;&#9472; db/
    </p>
    <p>
      &#9474;&#160;&#160;&#160;&#9474;&#160;&#160;&#160;&#9500;&#9472;&#9472; database.ts&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;# Inicializa e conecta o better-sqlite3
    </p>
    <p>
      &#9474;&#160;&#160;&#160;&#9474;&#160;&#160;&#160;&#9500;&#9472;&#9472; paciente.ts&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;# CRUD SQL para Paciente
    </p>
    <p>
      &#9474;&#160;&#160;&#160;&#9474;&#160;&#160;&#160;&#9492;&#9472;&#9472; sessao.ts&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;# CRUD SQL para Sess&#227;o
    </p>
    <p>
      &#9474;&#160;&#160;&#160;&#9500;&#9472;&#9472; renderer/&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;# C&#243;digo que roda no frontend (React)
    </p>
    <p>
      &#9474;&#160;&#160;&#160;&#9474;&#160;&#160;&#160;&#9500;&#9472;&#9472; components/&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;# Componentes reutiliz&#225;veis
    </p>
    <p>
      &#9474;&#160;&#160;&#160;&#9474;&#160;&#160;&#160;&#9474;&#160;&#160;&#160;&#9500;&#9472;&#9472; FormularioCard.tsx
    </p>
    <p>
      &#9474;&#160;&#160;&#160;&#9474;&#160;&#160;&#160;&#9474;&#160;&#160;&#160;&#9500;&#9472;&#9472; VoltarGlobal.tsx
    </p>
    <p>
      &#9474;&#160;&#160;&#160;&#9474;&#160;&#160;&#160;&#9474;&#160;&#160;&#160;&#9500;&#9472;&#9472; XPCPFField.tsx
    </p>
    <p>
      &#9474;&#160;&#160;&#160;&#9474;&#160;&#160;&#160;&#9474;&#160;&#160;&#160;&#9500;&#9472;&#9472; XPDateField.tsx
    </p>
    <p>
      &#9474;&#160;&#160;&#160;&#9474;&#160;&#160;&#160;&#9474;&#160;&#160;&#160;&#9492;&#9472;&#9472; XPPhoneField.tsx
    </p>
    <p>
      &#9474;&#160;&#160;&#160;&#9474;&#160;&#160;&#160;&#9500;&#9472;&#9472; layouts/&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;# Layouts e wrappers de p&#225;ginas (se houver)
    </p>
    <p>
      &#9474;&#160;&#160;&#160;&#9474;&#160;&#160;&#160;&#9474;&#160;&#160;&#160;&#9500;&#9472;&#9472;&#160;&#160;MainLayout.tsx
    </p>
    <p>
      &#9474;&#160;&#160;&#160;&#9474;&#160;&#160;&#160;&#9500;&#9472;&#9472; pages/
    </p>
    <p>
      &#9474;&#160;&#160;&#160;&#9474;&#160;&#160;&#160;&#9474;&#160;&#160;&#160;&#9500;&#9472;&#9472; Agenda/
    </p>
    <p>
      &#9474;&#160;&#160;&#160;&#9474;&#160;&#160;&#160;&#9474;&#160;&#160;&#160;&#9474;&#160;&#160;&#160;&#9500;&#9472;&#9472; calendario.tsx&#160;&#160;# Tela de calend&#225;rio principal com grid
    </p>
    <p>
      &#9474;&#160;&#160;&#160;&#9474;&#160;&#160;&#160;&#9474;&#160;&#160;&#160;&#9474;&#160;&#160;&#160;&#9500;&#9472;&#9472; calendario2.txt
    </p>
    <p>
      &#9474;&#160;&#160;&#160;&#9474;&#160;&#160;&#160;&#9474;&#160;&#160;&#160;&#9474;&#160;&#160;&#160;&#9492;&#9472;&#9472; AgendaModule.css
    </p>
    <p>
      &#9474;&#160;&#160;&#160;&#9474;&#160;&#160;&#160;&#9474;&#160;&#160;&#160;&#9500;&#9472;&#9472; Paciente/
    </p>
    <p>
      &#9474;&#160;&#160;&#160;&#9474;&#160;&#160;&#160;&#9474;&#160;&#160;&#160;&#9474;&#160;&#160;&#160;&#9500;&#9472;&#9472; adicionar.tsx
    </p>
    <p>
      &#9474;&#160;&#160;&#160;&#9474;&#160;&#160;&#160;&#9474;&#160;&#160;&#160;&#9474;&#160;&#160;&#160;&#9500;&#9472;&#9472; editar.tsx
    </p>
    <p>
      &#9474;&#160;&#160;&#160;&#9474;&#160;&#160;&#160;&#9474;&#160;&#160;&#160;&#9474;&#160;&#160;&#160;&#9500;&#9472;&#9472; index.tsx
    </p>
    <p>
      &#9474;&#160;&#160;&#160;&#9474;&#160;&#160;&#160;&#9474;&#160;&#160;&#160;&#9474;&#160;&#160;&#160;&#9500;&#9472;&#9472; listar.tsx
    </p>
    <p>
      &#9474;&#160;&#160;&#160;&#9474;&#160;&#160;&#160;&#9474;&#160;&#160;&#160;&#9474;&#160;&#160;&#160;&#9492;&#9472;&#9472; PacienteModule.css
    </p>
    <p>
      &#9474;&#160;&#160;&#160;&#9474;&#160;&#160;&#160;&#9474;&#160;&#160;&#160;&#9500;&#9472;&#9472; Painel/
    </p>
    <p>
      &#9474;&#160;&#160;&#160;&#9474;&#160;&#160;&#160;&#9474;&#160;&#160;&#160;&#9474;&#160;&#160;&#160;&#9492;&#9472;&#9472; (em constru&#231;&#227;o ou est&#225;tico)
    </p>
    <p>
      &#9474;&#160;&#160;&#160;&#9474;&#160;&#160;&#160;&#9474;&#160;&#160;&#160;&#9492;&#9472;&#9472; Sessao/
    </p>
    <p>
      &#9474;&#160;&#160;&#160;&#9474;&#160;&#160;&#160;&#9474;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#9492;&#9472;&#9472; novaSessao.tsx&#160;&#160;# Tela de cria&#231;&#227;o de sess&#245;es
    </p>
    <p>
      &#9474;&#160;&#160;&#160;&#9474;&#160;&#160;&#160;&#9500;&#9472;&#9472; services/&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;# Comunica&#231;&#227;o com preload (IPC)
    </p>
    <p>
      &#9474;&#160;&#160;&#160;&#9474;&#160;&#160;&#160;&#9474;&#160;&#160;&#160;&#9500;&#9472;&#9472; pacienteService.ts
    </p>
    <p>
      &#9474;&#160;&#160;&#160;&#9474;&#160;&#160;&#160;&#9474;&#160;&#160;&#160;&#9492;&#9472;&#9472; sessaoService.ts
    </p>
    <p>
      &#9474;&#160;&#160;&#160;&#9474;&#160;&#160;&#160;&#9500;&#9472;&#9472; styles/&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;# Estilos globais (Colors.ts etc.)
    </p>
    <p>
      &#9474;&#160;&#160;&#160;&#9474;&#160;&#160;&#160;&#9492;&#9472;&#9472; Splash.tsx / Splash.css # Tela inicial do app
    </p>
    <p>
      &#9474;&#160;&#160;&#160;&#9500;&#9472;&#9472; types/&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;# Tipagens globais e interfaces
    </p>
    <p>
      &#9474;&#160;&#160;&#160;&#9474;&#160;&#160;&#160;&#9500;&#9472;&#9472; assets.d.ts
    </p>
    <p>
      &#9474;&#160;&#160;&#160;&#9474;&#160;&#160;&#160;&#9500;&#9472;&#9472; globals.d.ts&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;# window.api + tipos para preload
    </p>
    <p>
      &#9474;&#160;&#160;&#160;&#9474;&#160;&#160;&#160;&#9500;&#9472;&#9472; Paciente.ts&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;# Interface do paciente
    </p>
    <p>
      &#9474;&#160;&#160;&#160;&#9474;&#160;&#160;&#160;&#9492;&#9472;&#9472; Sessao.ts&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;# Interface da sess&#227;o
    </p>
    <p>
      &#9474;&#160;&#160;&#160;&#9500;&#9472;&#9472; App.tsx&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;# Root component da aplica&#231;&#227;o React
    </p>
    <p>
      &#9474;&#160;&#160;&#160;&#9500;&#9472;&#9472; index.html&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;# HTML base (Electron carrega isso)
    </p>
    <p>
      &#9474;&#160;&#160;&#160;&#9500;&#9472;&#9472; index.ts&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;# Entry point main process Electron
    </p>
    <p>
      &#9474;&#160;&#160;&#160;&#9500;&#9472;&#9472; preload.ts&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;# exp&#245;e API via contextBridge (ipcRenderer)
    </p>
    <p>
      &#9474;&#160;&#160;&#160;&#9492;&#9472;&#9472; renderer.tsx&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;# Entry point do renderer (React)
    </p>
    <p>
      &#9500;&#9472;&#9472; .eslintrc.json&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;# Regras ESLint
    </p>
    <p>
      &#9500;&#9472;&#9472; .gitignore
    </p>
    <p>
      &#9500;&#9472;&#9472; forge.config.ts&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;# Configura&#231;&#227;o do Electron Forge
    </p>
    <p>
      &#9500;&#9472;&#9472; tsconfig.json&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;# Configura&#231;&#227;o TypeScript
    </p>
    <p>
      &#9500;&#9472;&#9472; package.json&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;# Configura&#231;&#245;es do npm (scripts e depend&#234;ncias)
    </p>
    <p>
      &#9500;&#9472;&#9472; README.md&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;# Introdu&#231;&#227;o ao projeto
    </p>
    <p>
      &#9500;&#9472;&#9472; webpack.main.config.ts&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;# Webpack para processo principal (Electron)
    </p>
    <p>
      &#9500;&#9472;&#9472; webpack.renderer.config.ts&#160;&#160;&#160;&#160;# Webpack para frontend React
    </p>
    <p>
      &#9500;&#9472;&#9472; webpack.plugins.ts
    </p>
    <p>
      &#9492;&#9472;&#9472; webpack.rules.ts
    </p>
  </body>
</html>
</richcontent>
</node>
</node>
<node CREATED="1746894703745" MODIFIED="1746894703745" POSITION="right" TEXT="2. Entidades e Banco de Dados">
<node CREATED="1746894703745" MODIFIED="1746894703745" TEXT="Paciente">
<node CREATED="1746894703745" MODIFIED="1746894703745" TEXT="Tabela criada em db/paciente.ts"/>
<node CREATED="1746894703745" MODIFIED="1746894703745" TEXT="Interface em types/Paciente.ts"/>
<node CREATED="1746894703745" MODIFIED="1746894703745" TEXT="Servi&#xe7;o em services/pacienteService.ts"/>
</node>
<node CREATED="1746894703745" MODIFIED="1746894703745" TEXT="Sess&#xe3;o">
<node CREATED="1746894703745" MODIFIED="1746894703745" TEXT="Relacionada ao paciente (chave estrangeira paciente_id)"/>
<node CREATED="1746894703745" MODIFIED="1746894703745" TEXT="Criada em db/sessao.ts"/>
<node CREATED="1746894703745" MODIFIED="1746894703745" TEXT="Interface em types/Sessao.ts"/>
<node CREATED="1746894703745" MODIFIED="1746894703745" TEXT="Servi&#xe7;o em services/sessaoService.ts"/>
</node>
</node>
<node CREATED="1746894703745" MODIFIED="1746894703745" POSITION="right" TEXT="3. Comunica&#xe7;&#xe3;o Preload &lt;-&gt; Renderer">
<node CREATED="1746894703745" MODIFIED="1746894703745" TEXT="preload.ts usa contextBridge para expor m&#xe9;todos em window.api"/>
<node CREATED="1746894703745" MODIFIED="1746894703745" TEXT="backend (main/index.ts) registra handlers com ipcMain.handle"/>
<node CREATED="1746894703745" MODIFIED="1746894703745" TEXT="renderer (React) acessa m&#xe9;todos via window.api"/>
</node>
<node CREATED="1746894703745" MODIFIED="1746894703745" POSITION="right" TEXT="4. Funcionalidades do App">
<node CREATED="1746894703745" ID="ID_1164298107" MODIFIED="1746894703745" TEXT="&#x2705; Adi&#xe7;&#xe3;o e listagem de pacientes">
<node CREATED="1746895371947" ID="ID_721374464" MODIFIED="1746895371947">
<richcontent TYPE="NODE"><html>
  <head>
    
  </head>
  <body>
    <img src="documentacao_3442667494480448332.jpeg" />
  </body>
</html>
</richcontent>
<node CREATED="1746895400175" ID="ID_1432968216" MODIFIED="1746895400175">
<richcontent TYPE="NODE"><html>
  <head>
    
  </head>
  <body>
    <img src="documentacao_1004997855539519262.jpeg" />
  </body>
</html></richcontent>
</node>
<node CREATED="1746895425023" ID="ID_1565859503" MODIFIED="1746895425023">
<richcontent TYPE="NODE"><html>
  <head>
    
  </head>
  <body>
    <img src="documentacao_2157852180537187887.jpeg" />
  </body>
</html></richcontent>
<node CREATED="1746895448622" MODIFIED="1746895448622">
<richcontent TYPE="NODE"><html>
  <head>
    
  </head>
  <body>
    <img src="documentacao_4987694437660306687.jpeg" />
  </body>
</html>
</richcontent>
</node>
</node>
</node>
</node>
<node CREATED="1746894703745" MODIFIED="1746894703745" TEXT="&#x2705; Cria&#xe7;&#xe3;o e exibi&#xe7;&#xe3;o de sess&#xf5;es na grade"/>
<node CREATED="1746894703745" MODIFIED="1746894703745" TEXT="&#x2705; Cards de sess&#xe3;o com cores din&#xe2;micas por status"/>
<node CREATED="1746894703745" MODIFIED="1746894703745" TEXT="&#x2705; Calend&#xe1;rio com controle de semanas e datas"/>
<node CREATED="1746894703745" MODIFIED="1746894703745" TEXT="&#x2705; Sistema visual bel&#xed;ssimo com MUI e imagens"/>
<node CREATED="1746894703745" MODIFIED="1746894703745" TEXT="&#x2705; Tipagem TypeScript em todo fluxo"/>
</node>
<node CREATED="1746894703745" MODIFIED="1746894703745" POSITION="right" TEXT="5. Tecnologias e Bibliotecas">
<node CREATED="1746894703745" MODIFIED="1746894703745" TEXT="Electron Forge + React + TypeScript"/>
<node CREATED="1746894703745" MODIFIED="1746894703745" TEXT="Material UI (MUI) para design e responsividade"/>
<node CREATED="1746894703745" MODIFIED="1746894703745" TEXT="Better-sqlite3 como banco de dados local"/>
<node CREATED="1746894703745" MODIFIED="1746894703745" TEXT="date-fns para manipula&#xe7;&#xe3;o de datas"/>
<node CREATED="1746894703745" MODIFIED="1746894703745" TEXT="Preload com contextBridge para seguran&#xe7;a"/>
</node>
</node>
</map>
