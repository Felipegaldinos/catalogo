const form = document.getElementById('produto-form');
const lista = document.getElementById('lista-produtos');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const nome = document.getElementById('nome').value;
  const preco = parseFloat(document.getElementById('preco').value);
  const tamanhos = document.getElementById('tamanhos').value;
  const quantidade = parseInt(document.getElementById('quantidade').value);
  const imagemInput = document.getElementById('imagem');
  const imagem = imagemInput.files[0];

  const reader = new FileReader();
  reader.onload = function () {
    const produto = {
      nome,
      preco,
      tamanhos,
      quantidade,
      imagem: reader.result
    };

    salvarProduto(produto);
    mostrarProdutos();
    form.reset();
  };

  reader.readAsDataURL(imagem);
});

function salvarProduto(produto) {
  const produtos = JSON.parse(localStorage.getItem('produtos') || '[]');
  produtos.push(produto);
  localStorage.setItem('produtos', JSON.stringify(produtos));
}

function mostrarProdutos() {
  const produtos = JSON.parse(localStorage.getItem('produtos') || '[]');
  lista.innerHTML = '';

  produtos.forEach((p, index) => {
    const div = document.createElement('div');
    div.className = 'produto';
    div.innerHTML = `
      <img src="${p.imagem}">
      <div>
        <h3>${p.nome}</h3>
        <p>Preço: R$ ${p.preco.toFixed(2)}</p>
        <p>Tamanhos: ${p.tamanhos}</p>
        <p>Estoque: ${p.quantidade}</p>
        <button onclick="removerProduto(${index})">Remover</button>
      </div>
    `;
    lista.appendChild(div);
  });
}

function removerProduto(index) {
  const produtos = JSON.parse(localStorage.getItem('produtos') || '[]');
  produtos.splice(index, 1);
  localStorage.setItem('produtos', JSON.stringify(produtos));
  mostrarProdutos();
}

mostrarProdutos();
