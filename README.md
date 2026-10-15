# Catálogo para lojas

Vitrine de produtos em HTML, CSS e JavaScript com categorias e carrinho.

## Recursos

Listagem de produtos, filtro por categoria e gerenciamento dos itens do carrinho. Há também uma página de administração local.

## Tecnologias

HTML, CSS e JavaScript; sem etapa de build npm na estrutura analisada.

## Executar localmente

Sirva os arquivos por HTTP; uma opção com Python 3 instalado:

```sh
git clone https://github.com/Felipegaldinos/catalogo.git
cd catalogo
python -m http.server 8000
```

Abra http://localhost:8000. Recursos de terceiros, quando usados, exigem conexão com a internet.

## Onde começar no código

- `script.js` — ponto de entrada para entender o projeto.

## Estado atual

A vitrine usa uma lista fixa em script.js. O painel em painel_adm/admin.html grava produtos no localStorage, sem integração observada com essa lista fixa; suas alterações não devem ser apresentadas como atualização automática da vitrine.

## Autoria

[Felipe Galdino](https://github.com/Felipegaldinos). Consulte os arquivos do repositório para os termos de licença aplicáveis.
