<map version="1.0.1">
<!-- To view this file, download free mind mapping software FreeMind from http://freemind.sourceforge.net -->
<node CREATED="1746893859251" ID="ID_147330994" MODIFIED="1746893859251" TEXT="Cria&#xe7;&#xe3;o de Entidades - Equilibra Manager">
<node CREATED="1746893859251" ID="ID_1354826562" MODIFIED="1746893982267" POSITION="right" TEXT=" Objetivo">
<node CREATED="1746893986171" ID="ID_818825427" MODIFIED="1746893988273" TEXT="Este documento detalha todo o processo necess&#xe1;rio para definir e implementar novas entidades no banco de dados local do projeto Equilibra Manager, que utiliza Electron + React + TypeScript no frontend e Better-SQLite3 como banco de dados local embutido. O padr&#xe3;o seguido &#xe9; o mesmo usado na cria&#xe7;&#xe3;o da entidade Sessao, e serve como refer&#xea;ncia para a adi&#xe7;&#xe3;o de qualquer nova entidade, como Financeiro, Relatorio, Consulta, etc."/>
</node>
<node CREATED="1746893859251" ID="ID_1018236703" MODIFIED="1746893859251" POSITION="right" TEXT=" Estrutura do Projeto">
<node CREATED="1746894009201" ID="ID_335597264" MODIFIED="1746894024245">
<richcontent TYPE="NODE"><html>
  <head>
    
  </head>
  <body>
    <p>
      src/
    </p>
    <p>
      &#9500;&#9472;&#9472; db/&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;# Regras e opera&#231;&#245;es de banco de dados
    </p>
    <p>
      &#9474;&#160;&#160;&#160;&#9500;&#9472;&#9472; database.ts&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;# Conex&#227;o com o SQLite
    </p>
    <p>
      &#9474;&#160;&#160;&#160;&#9500;&#9472;&#9472; paciente.ts&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;# Opera&#231;&#245;es da entidade Paciente
    </p>
    <p>
      &#9474;&#160;&#160;&#160;&#9492;&#9472;&#9472; sessao.ts&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;# Opera&#231;&#245;es da entidade Sessao (modelo)
    </p>
    <p>
      &#9500;&#9472;&#9472; main/&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;# Processo principal do Electron
    </p>
    <p>
      &#9474;&#160;&#160;&#160;&#9492;&#9472;&#9472; index.ts&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;# Registro de eventos ipcMain
    </p>
    <p>
      &#9500;&#9472;&#9472; preload.ts&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;# Context bridge de API frontend &#8596; backend
    </p>
    <p>
      &#9500;&#9472;&#9472; renderer/&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;# Frontend React
    </p>
    <p>
      &#9474;&#160;&#160;&#160;&#9492;&#9472;&#9472; services/&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;# Servi&#231;os que acessam as APIs definidas no preload
    </p>
    <p>
      &#9474;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#9500;&#9472;&#9472; pacienteService.ts
    </p>
    <p>
      &#9474;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#9492;&#9472;&#9472; sessaoService.ts
    </p>
    <p>
      &#9500;&#9472;&#9472; types/&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;# Tipagens globais do projeto
    </p>
    <p>
      &#9474;&#160;&#160;&#160;&#9500;&#9472;&#9472; Paciente.ts
    </p>
    <p>
      &#9474;&#160;&#160;&#160;&#9500;&#9472;&#9472; Sessao.ts
    </p>
    <p>
      &#9474;&#160;&#160;&#160;&#9492;&#9472;&#9472; globals.d.ts&#160;&#160;&#160;&#160;&#160;&#160;&#160;# Tipagem da interface da API
    </p>
  </body>
</html>
</richcontent>
</node>
</node>
<node CREATED="1746893859251" MODIFIED="1746893859251" POSITION="right" TEXT=" Etapas de Cria&#xe7;&#xe3;o">
<node CREATED="1746893859251" ID="ID_204103265" MODIFIED="1746893859251" TEXT="1. Definir Interface (src/types/)">
<node CREATED="1746893859251" MODIFIED="1746893859251" TEXT="Criar arquivo .ts com os campos"/>
<node CREATED="1746893859251" MODIFIED="1746893859251" TEXT="Ex: Sessao.ts, Consulta.ts"/>
<node CREATED="1746894071888" ID="ID_457450133" MODIFIED="1746894094483">
<richcontent TYPE="NODE"><html>
  <head>
    
  </head>
  <body>
    Exemplo: src/types/Consulta.ts

    <p>
      export interface Consulta {
    </p>
    <p>
      &#160;&#160;id: number;
    </p>
    <p>
      &#160;&#160;paciente: number;
    </p>
    <p>
      &#160;&#160;data: string; // ou Date
    </p>
    <p>
      &#160;&#160;tipo: string;
    </p>
    <p>
      &#160;&#160;status: string;
    </p>
    <p>
      &#160;&#160;anotacoes?: string;
    </p>
    <p>
      &#160;&#160;paciente_nome: string; // JOIN com Paciente
    </p>
    <p>
      }
    </p>
  </body>
</html>
</richcontent>
</node>
</node>
<node CREATED="1746893859251" ID="ID_287705544" MODIFIED="1746894136997" TEXT="2. Criar Opera&#xe7;&#xf5;es DB (src/db/)">
<node CREATED="1746893859251" MODIFIED="1746893859251" TEXT="criar, listar, atualizar, deletar"/>
<node CREATED="1746893859251" MODIFIED="1746893859251" TEXT="Usa getDb() de database.ts"/>
<node COLOR="#006699" CREATED="1746894138032" ID="ID_170153028" MODIFIED="1746894215523">
<richcontent TYPE="NODE"><html>
  <head>
    
  </head>
  <body>
    Exemplo: src/db/consulta.ts

    <p>
      import { getDb } from './database';
    </p>
    <p>
      import { Consulta } from '../types/Consulta';
    </p>
    <p>
      
    </p>
    <p>
      export function criarConsulta(consulta: Consulta): Consulta {
    </p>
    <p>
      &#160;&#160;const db = getDb();
    </p>
    <p>
      &#160;&#160;const stmt = db.prepare(
    </p>
    <p>
      &#160;&#160;&#160;&#160;`INSERT INTO consultas (paciente_id, data, tipo, status, anotacoes)
    </p>
    <p>
      &#160;&#160;&#160;&#160;&#160;VALUES (?, ?, ?, ?, ?)`
    </p>
    <p>
      &#160;&#160;);
    </p>
    <p>
      &#160;&#160;const result = stmt.run(
    </p>
    <p>
      &#160;&#160;&#160;&#160;consulta.paciente,
    </p>
    <p>
      &#160;&#160;&#160;&#160;consulta.data,
    </p>
    <p>
      &#160;&#160;&#160;&#160;consulta.tipo,
    </p>
    <p>
      &#160;&#160;&#160;&#160;consulta.status,
    </p>
    <p>
      &#160;&#160;&#160;&#160;consulta.anotacoes ?? null
    </p>
    <p>
      &#160;&#160;);
    </p>
    <p>
      &#160;&#160;return { ...consulta, id: Number(result.lastInsertRowid) };
    </p>
    <p>
      }
    </p>
    <p>
      
    </p>
    <p>
      export function listarConsultasPorPaciente(pacienteId: number): Consulta[] {
    </p>
    <p>
      &#160;&#160;const db = getDb();
    </p>
    <p>
      &#160;&#160;const stmt = db.prepare(
    </p>
    <p>
      &#160;&#160;&#160;&#160;`SELECT c.*, p.nome_completo AS paciente_nome
    </p>
    <p>
      &#160;&#160;&#160;&#160;&#160;FROM consultas c
    </p>
    <p>
      &#160;&#160;&#160;&#160;&#160;JOIN pacientes p ON p.id = c.paciente_id
    </p>
    <p>
      &#160;&#160;&#160;&#160;&#160;WHERE paciente_id = ?`
    </p>
    <p>
      &#160;&#160;);
    </p>
    <p>
      &#160;&#160;return stmt.all(pacienteId);
    </p>
    <p>
      }
    </p>
    <p>
      
    </p>
    <p>
      export function listarTodasConsultas(): Consulta[] {
    </p>
    <p>
      &#160;&#160;const db = getDb();
    </p>
    <p>
      &#160;&#160;const stmt = db.prepare(
    </p>
    <p>
      &#160;&#160;&#160;&#160;`SELECT c.*, p.nome_completo AS paciente_nome
    </p>
    <p>
      &#160;&#160;&#160;&#160;&#160;FROM consultas c
    </p>
    <p>
      &#160;&#160;&#160;&#160;&#160;JOIN pacientes p ON p.id = c.paciente_id`
    </p>
    <p>
      &#160;&#160;);
    </p>
    <p>
      &#160;&#160;return stmt.all();
    </p>
    <p>
      }
    </p>
    <p>
      
    </p>
    <p>
      export function atualizarConsulta(consulta: Consulta): void {
    </p>
    <p>
      &#160;&#160;const db = getDb();
    </p>
    <p>
      &#160;&#160;const stmt = db.prepare(`
    </p>
    <p>
      &#160;&#160;&#160;&#160;UPDATE consultas
    </p>
    <p>
      &#160;&#160;&#160;&#160;SET data = ?, tipo = ?, status = ?, anotacoes = ?
    </p>
    <p>
      &#160;&#160;&#160;&#160;WHERE id = ?
    </p>
    <p>
      &#160;&#160;`);
    </p>
    <p>
      &#160;&#160;stmt.run(consulta.data, consulta.tipo, consulta.status, consulta.anotacoes, consulta.id);
    </p>
    <p>
      }
    </p>
    <p>
      
    </p>
    <p>
      export function deletarConsulta(id: number): void {
    </p>
    <p>
      &#160;&#160;const db = getDb();
    </p>
    <p>
      &#160;&#160;const stmt = db.prepare(`DELETE FROM consultas WHERE id = ?`);
    </p>
    <p>
      &#160;&#160;stmt.run(id);
    </p>
    <p>
      }
    </p>
  </body>
</html>
</richcontent>
<font NAME="SansSerif" SIZE="11"/>
</node>
</node>
<node CREATED="1746893859251" ID="ID_1633794464" MODIFIED="1746893859251" TEXT="3. Registrar ipcMain (src/main/index.ts)">
<node CREATED="1746893859251" MODIFIED="1746893859251" TEXT="Registrar ipcMain.handle() para cada fun&#xe7;&#xe3;o"/>
<node CREATED="1746894237775" ID="ID_1733874949" MODIFIED="1746894255259">
<richcontent TYPE="NODE"><html>
  <head>
    
  </head>
  <body>
    Exemplo: src/index.ts

    <p>
      import {
    </p>
    <p>
      &#160;&#160;criarConsulta,
    </p>
    <p>
      &#160;&#160;listarConsultasPorPaciente,
    </p>
    <p>
      &#160;&#160;listarTodasConsultas,
    </p>
    <p>
      &#160;&#160;atualizarConsulta,
    </p>
    <p>
      &#160;&#160;deletarConsulta
    </p>
    <p>
      } from '../db/consulta';
    </p>
    <p>
      
    </p>
    <p>
      ipcMain.handle('criarConsulta', (_, dados) =&gt; criarConsulta(dados));
    </p>
    <p>
      ipcMain.handle('listarConsultasPorPaciente', (_, id) =&gt; listarConsultasPorPaciente(id));
    </p>
    <p>
      ipcMain.handle('listarTodasConsultas', () =&gt; listarTodasConsultas());
    </p>
    <p>
      ipcMain.handle('atualizarConsulta', (_, dados) =&gt; atualizarConsulta(dados));
    </p>
    <p>
      ipcMain.handle('deletarConsulta', (_, id) =&gt; deletarConsulta(id));
    </p>
  </body>
</html>
</richcontent>
</node>
</node>
<node CREATED="1746893859251" ID="ID_1162268139" MODIFIED="1746893859251" TEXT="4. Atualizar preload.ts">
<node CREATED="1746893859251" MODIFIED="1746893859251" TEXT="Expose com contextBridge"/>
<node CREATED="1746893859251" MODIFIED="1746893859251" TEXT="Usa ipcRenderer.invoke"/>
<node CREATED="1746894269420" ID="ID_1343740238" MODIFIED="1746894285414">
<richcontent TYPE="NODE"><html>
  <head>
    
  </head>
  <body>
    Exemplo: src/preload.ts

    <p>
      contextBridge.exposeInMainWorld('api', {
    </p>
    <p>
      &#160;&#160;...outrasAPIs,
    </p>
    <p>
      
    </p>
    <p>
      &#160;&#160;criarConsulta: (consulta) =&gt; ipcRenderer.invoke('criarConsulta', consulta),
    </p>
    <p>
      &#160;&#160;listarConsultasPorPaciente: (id) =&gt; ipcRenderer.invoke('listarConsultasPorPaciente', id),
    </p>
    <p>
      &#160;&#160;listarTodasConsultas: () =&gt; ipcRenderer.invoke('listarTodasConsultas'),
    </p>
    <p>
      &#160;&#160;atualizarConsulta: (consulta) =&gt; ipcRenderer.invoke('atualizarConsulta', consulta),
    </p>
    <p>
      &#160;&#160;deletarConsulta: (id) =&gt; ipcRenderer.invoke('deletarConsulta', id)
    </p>
    <p>
      });
    </p>
  </body>
</html>
</richcontent>
</node>
</node>
<node CREATED="1746893859251" ID="ID_1617550743" MODIFIED="1746893859251" TEXT="5. Atualizar globals.d.ts">
<node CREATED="1746893859251" MODIFIED="1746893859251" TEXT="Adicionar m&#xe9;todos na interface API"/>
<node CREATED="1746894327763" ID="ID_1064092576" MODIFIED="1746894341862">
<richcontent TYPE="NODE"><html>
  <head>
    
  </head>
  <body>
    Exemplo: src/types/globals.d.ts

    <p>
      interface API {
    </p>
    <p>
      &#160;&#160;...
    </p>
    <p>
      &#160;&#160;criarConsulta(consulta: Consulta): Promise&lt;Consulta&gt;;
    </p>
    <p>
      &#160;&#160;listarConsultasPorPaciente(id: number): Promise&lt;Consulta[]&gt;;
    </p>
    <p>
      &#160;&#160;listarTodasConsultas(): Promise&lt;Consulta[]&gt;;
    </p>
    <p>
      &#160;&#160;atualizarConsulta(consulta: Consulta): Promise&lt;void&gt;;
    </p>
    <p>
      &#160;&#160;deletarConsulta(id: number): Promise&lt;void&gt;;
    </p>
    <p>
      }
    </p>
  </body>
</html>
</richcontent>
</node>
</node>
<node CREATED="1746893859251" ID="ID_1727005400" MODIFIED="1746894352974" TEXT="6. Criar Service no Frontend">
<node CREATED="1746893859251" MODIFIED="1746893859251" TEXT="src/renderer/services/"/>
<node CREATED="1746893859251" MODIFIED="1746893859251" TEXT="Fun&#xe7;&#xf5;es ass&#xed;ncronas chamando window.api"/>
<node CREATED="1746894355703" ID="ID_780147374" MODIFIED="1746894372074">
<richcontent TYPE="NODE"><html>
  <head>
    
  </head>
  <body>
    Exemplo: src/renderer/services/consultaService.ts

    <p>
      import { Consulta } from '../../types/Consulta';
    </p>
    <p>
      
    </p>
    <p>
      export async function criarConsulta(consulta: Consulta): Promise&lt;Consulta&gt; {
    </p>
    <p>
      &#160;&#160;return await window.api.criarConsulta(consulta);
    </p>
    <p>
      }
    </p>
    <p>
      
    </p>
    <p>
      export async function listarConsultasPorPaciente(id: number): Promise&lt;Consulta[]&gt; {
    </p>
    <p>
      &#160;&#160;return await window.api.listarConsultasPorPaciente(id);
    </p>
    <p>
      }
    </p>
    <p>
      
    </p>
    <p>
      export async function listarTodasConsultas(): Promise&lt;Consulta[]&gt; {
    </p>
    <p>
      &#160;&#160;return await window.api.listarTodasConsultas();
    </p>
    <p>
      }
    </p>
    <p>
      
    </p>
    <p>
      export async function atualizarConsulta(consulta: Consulta): Promise&lt;void&gt; {
    </p>
    <p>
      &#160;&#160;return await window.api.atualizarConsulta(consulta);
    </p>
    <p>
      }
    </p>
    <p>
      
    </p>
    <p>
      export async function deletarConsulta(id: number): Promise&lt;void&gt; {
    </p>
    <p>
      &#160;&#160;return await window.api.deletarConsulta(id);
    </p>
    <p>
      }
    </p>
  </body>
</html>
</richcontent>
</node>
</node>
</node>
<node CREATED="1746893859251" ID="ID_825111830" MODIFIED="1746893859251" POSITION="right" TEXT="&#x2705; Considera&#xe7;&#xf5;es finais">
<node CREATED="1746893859251" ID="ID_54875343" MODIFIED="1746894402347" TEXT="Tipagem forte via TypeScript e o uso do IPC s&#xe3;o seguros, isolados e organizados."/>
<node CREATED="1746894409413" ID="ID_1370611750" MODIFIED="1746894412628" TEXT="As tabelas SQLite s&#xe3;o criados em database.ts, geralmente com CREATE TABLE IF NOT EXISTS ...."/>
<node CREATED="1746893859251" ID="ID_1098958375" MODIFIED="1746894425766" TEXT="Todas as entidades seguem uma l&#xf3;gica RESTful local: create, list, update, delete."/>
<node CREATED="1746893859251" ID="ID_330463889" MODIFIED="1746894437231" TEXT="As p&#xe1;ginas React utilizam esses servi&#xe7;os para interagir com o banco por meio de hooks e contextos."/>
<node CREATED="1746893859251" ID="ID_155003337" MODIFIED="1746893859251" TEXT="Padr&#xe3;o RESTful: create, list, update, delete"/>
<node CREATED="1746893859251" ID="ID_1980456193" MODIFIED="1746893859251" TEXT="Frontend consome tudo via services"/>
</node>
</node>
</map>
