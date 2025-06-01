const produtos = [
  {
    id: 1,
    nome: "Camisa Barcelona Messi",
    preco: 265.90,
    categoria: "homem",
    imagem: "img/barca01.jpg"
  },
  {
    id: 2,
    nome: "Tênis Nike",
    preco: 265.90,
    categoria: "mulher",
    imagem: "img/lunargato01.jpg"
  }
];

let carrinho = [];

function renderizarProdutos(lista) {
  const container = document.getElementById("produtos");
  container.innerHTML = "";
  lista.forEach(p => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <img src="${p.imagem}" alt="${p.nome}">
      <div class="card-content">
        <h3>${p.nome}</h3>
        <div class="stars">★★★★☆</div>
        <div class="preco">
          <span>A partir de</span>
          R$ ${p.preco.toFixed(2)} no Pix
        </div>
        <div class="opcoes">
          <label>Tam:
            <select id="tamanho-${p.id}">
              <option>P</option>
              <option>M</option>
              <option>G</option>
            </select>
          </label>
          <label>Quan:
            <input type="number" id="quantidade-${p.id}" min="1" value="1">
          </label>
        </div>
        <button onclick="adicionarCarrinho(${p.id})">Adicionar ao carrinho</button>
      </div>
    `;
    container.appendChild(div);
  });
}

function filtrar(cat) {
  const busca = document.getElementById("busca").value.toLowerCase();
  let lista = produtos;

  if (cat !== "todos") {
    lista = lista.filter(p => p.categoria === cat);
  }

  if (busca) {
    lista = lista.filter(p => p.nome.toLowerCase().includes(busca));
  }

  renderizarProdutos(lista);
}

document.getElementById("busca").addEventListener("input", () => filtrar("todos"));

function adicionarCarrinho(id) {
  const produto = produtos.find(p => p.id === id);
  const tamanho = document.getElementById(`tamanho-${id}`).value;
  const quantidade = parseInt(document.getElementById(`quantidade-${id}`).value);

  const existente = carrinho.find(item => item.id === id && item.tamanho === tamanho);
  if (existente) {
    existente.quantidade += quantidade;
  } else {
    carrinho.push({ ...produto, tamanho, quantidade });
  }

  atualizarCarrinho();
}

function removerDoCarrinho(index) {
  carrinho.splice(index, 1);
  atualizarCarrinho();
}

function atualizarCarrinho() {
  // Atualiza contador
  const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
  document.getElementById("contador").textContent = totalItens;

  // Atualiza itens no carrinho
  const lista = document.getElementById("itens-carrinho");
  lista.innerHTML = "";
  let total = 0;

  carrinho.forEach((item, index) => {
    const subtotal = item.preco * item.quantidade;
    total += subtotal;

    const div = document.createElement("div");
    div.className = "item-carrinho";
    div.innerHTML = `
      <button onclick="removerDoCarrinho(${index})">Remover</button>
      <div style="display: flex; gap: 10px;">
        <img src="${item.imagem}" alt="${item.nome}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;">
        <div>
          <strong>${item.nome}</strong><br>
          Tamanho: ${item.tamanho}<br>
          Qtd: ${item.quantidade}<br>
          Subtotal: R$ ${subtotal.toFixed(2)}
        </div>
      </div>
    `;
    lista.appendChild(div);
  });

  document.getElementById("total-carrinho").textContent = total.toFixed(2);

  const msg = carrinho.map(i =>
    `• ${i.nome} (Tam: ${i.tamanho}) x${i.quantidade} - R$ ${(i.preco * i.quantidade).toFixed(2)}`
  ).join('\n') + `\n\nTotal: R$ ${total.toFixed(2)}`;

  const link = `https://wa.me/5581999999999?text=${encodeURIComponent(msg)}`;
  document.querySelector(".whatsapp-btn").onclick = () => window.open(link, "_blank");
}

// Inicia com todos os produtos
filtrar("todos");

function abrirCarrinho() {
  const carrinhoDiv = document.getElementById("carrinho-id");
  carrinhoDiv.style.display = carrinhoDiv.style.display === "none" ? "block" : "none";
}
function toggleMenu() {
  const nav = document.querySelector('.nav');
  nav.classList.toggle('active');
}
// Fecha o menu lateral ao clicar fora dele
document.addEventListener('click', function(event) {
  const menu = document.querySelector('.nav');
  const toggleButton = document.querySelector('.menu-toggle');

  // Se o menu estiver aberto
  if (menu.classList.contains('active')) {
    // E se o clique não foi dentro do menu nem no botão hambúrguer
    if (!menu.contains(event.target) && !toggleButton.contains(event.target)) {
      menu.classList.remove('active');
    }
  }
});
