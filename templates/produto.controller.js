const URL = 'http://localhost:8090/baraabbAPI/api/v1/produto';

// FUNCAO QUE PREENCHE LISTAGEM
function popularTabelaProdutos() {
  const tableProdutos = document.getElementById('table_produtos');

  getProdutos()
    .then(data => {
      data.forEach(produto => {
        const row = tableProdutos.insertRow();

        const idCell = row.insertCell();
        idCell.textContent = produto.idProduto;

        const descricaoCell = row.insertCell();
        descricaoCell.textContent = produto.descricao;

        const precoCompraCell = row.insertCell();
        precoCompraCell.textContent = produto.precoCompra;

        const precoVendaCell = row.insertCell();
        precoVendaCell.textContent = produto.precoVenda;

        const qtdEstoqueCell = row.insertCell();
        qtdEstoqueCell.textContent = produto.qtdEstoque;

        const usuarioCadastroCell = row.insertCell();
        usuarioCadastroCell.textContent = produto.usuarioCadastro;

        const idCategoriaCell = row.insertCell();
        idCategoriaCell.textContent = produto.idCategoria;

        const dataCadastroCell = row.insertCell();
        dataCadastroCell.textContent = new Date(produto.datacadastro).toLocaleString();

        const actionCell = row.insertCell();
        const editDeleteContainer = document.createElement('div');
        editDeleteContainer.classList.add('container', 'edit-delete-container');

        const btnGroup = document.createElement('div');
        btnGroup.classList.add('btn-group');

        //CRIANDO BOTAO EDITAR
        const editButton = document.createElement('button');
        editButton.type = 'submit';
        editButton.classList.add('btn', 'btn-info', 'btn-sm', 'text-white');
        editButton.addEventListener('click', () => {
            iniciarEdicao(produto.idProduto);
        })

        const editIcon = document.createElement('span');
        editIcon.classList.add('material-symbols-outlined');
        editIcon.textContent = 'edit';

        editButton.appendChild(editIcon);
        btnGroup.appendChild(editButton);

        //CRIANDO BOTAO DELETAR
        const deleteButton = document.createElement('button');
        deleteButton.type = 'submit';
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm', 'text-white');
        deleteButton.addEventListener('click', () => {
          var idDeletar = produto.idProduto;
          var newUrl = URL + '/' + idDeletar;
          fetch(newUrl, {
            method: 'DELETE'
          })
            .then(response => response.json())
            .then(data => {
              console.log(data);
            })
            .catch(error => {
              console.error('Erro:', error);
            });
            location.reload();
        });

        const deleteIcon = document.createElement('span');
        deleteIcon.classList.add('material-symbols-outlined');
        deleteIcon.textContent = 'delete';

        deleteButton.appendChild(deleteIcon);
        btnGroup.appendChild(deleteButton);

        editDeleteContainer.appendChild(btnGroup);
        actionCell.appendChild(editDeleteContainer);
      });
    })
    .catch(error => {
      console.error('Erro:', error);
    });
}

function getProdutos() {
  return fetch(URL)
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro na solicitação da API.');
      }
      return response.json();
    })
    .then(data => {
      return data;
    })
    .catch(error => {
      console.error('Erro:', error);
    });
}

function cadastrar() {
  const descricao = document.getElementById('inputNomeProduto').value;
  const categoria = document.getElementById('inputCategoriaProduto').value;
  const preco_compra = document.getElementById('inputValCompra').value;
  const preco_venda = document.getElementById('inputValVenda').value;
  const quantidade_estoque = document.getElementById('inputQtd').value;
  const usuario = document.getElementById('inputUser').value;

  const data = {
    descricao: descricao,
    categoria: categoria,
    preco_compra: preco_compra,
    preco_venda: preco_venda,
    quantidade_estoque: quantidade_estoque,
    usuario: usuario
  };
  fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error('Erro:', error);
    });
}

async function iniciarEdicao(ID) {
  // Redirecionar para o formulário de cadastro_produto
  window.location.href = `cadastro_produto.html?idProduto=${ID}`;
}

//PREENCHER FORMULARIO COM DADOS PARA EDITAR
async function popularFormularioParaEditar(ID){
  try {
    const produto = await getById(ID);
    // Preencher o formulário com os dados do produto para edição
    document.getElementById('inputNomeProduto').value;
    document.getElementById('inputCategoriaProduto').value;
    document.getElementById('inputValCompra').value;
    document.getElementById('inputValVenda').value;
    document.getElementById('inputQtd').value;
    document.getElementById('inputUser').value;
  } catch (error) {
    console.error('Erro:', error);
  }
}

//BUSCAR POR ID
async function getById(ID) {
  const newUrl = `${URL}/${ID}`;
  try {
    const response = await fetch(newUrl);
    if (!response.ok) {
      throw new Error('Erro na solicitação da API.');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro:', error);
    throw error;
  }
}




