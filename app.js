// =============================================
// AGRO GESTÃO — JavaScript puro (Vanilla JS)
// Conecta com a API REST via fetch()
// =============================================

const API = '/api';

// Estado global
let atualpagina = 'painelDaPagina';
let anteriorpagina = 'painelDaPagina';

// =============================================
// INICIALIZAÇÃO
// =============================================
document.addEventListener('DOMContentLoaded', () => {
  // Navegar ao clicar nos itens do menu
  document.querySelectorAll('[elementoQueIdentificaAPagina]').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      const pagina = el.getAttribute('elementoQueIdentificaAPagina');
      mostrarPaginas(pagina);
    });
  });

  buildSemesterButtons();
  mostrarPaginas('painelDaPagina');
});

// =============================================
// ROTEAMENTO — mostrar páginas
// =============================================
function mostrarPaginas(pagina) {
  document.querySelectorAll('.pagina').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.navegacaoPorItem').forEach(n => n.classList.remove('active'));

  const section = document.getElementById(`pagina-${pagina}`);
  if (section) section.classList.add('active');

  const navItem = document.querySelector(`.navegacaoPorItem[elementoQueIdentificaAPagina="${pagina}"]`);
  if (navItem) navItem.classList.add('active');

  anteriorpagina = atualpagina;
  atualpagina = pagina;

  // Carregar dados da página
  if (pagina === 'painelDaPagina') loadpainelDaPagina();
}

function voltar(pagina) {
  mostrarPaginas(pagina);
}

// ===== CRIAR NOVA TABELA =====
let quantidadeDeColunas = 0;

function adicionarNovaColuna() {
  quantidadeDeColunas++;
  const div = document.createElement('div');
  div.className = 'col-row';
  div.id = `col-${quantidadeDeColunas}`;
  div.innerHTML = `
    <div>
      <label>Rótulo (exibido)</label>
      <input type="text" placeholder="Ex: Área (ha)" oninput="autoName(${quantidadeDeColunas}, this.value)">
    </div>
    <div>
      <label>Nome interno</label>
      <input type="text" placeholder="Ex: area_ha" id="col-name-${quantidadeDeColunas}">
    </div>
    <div>
      <label>Tipo de Dado</label>
      <select>
        <option value="text">Texto</option>
        <option value="number">Número</option>
        <option value="date">Data</option>
        <option value="boolean">Sim/Não</option>
      </select>
    </div>
    <button class="btn-remove" onclick="document.getElementById('col-${quantidadeDeColunas}').remove()">×</button>
  `;
  document.getElementById('columns-builder').appendChild(div);
}

