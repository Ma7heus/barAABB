const caminhoApi = 'http://localhost:8090/baraabbAPI/api/v1/produto';

// FUNCAO QUE PREENCHE LISTAGEM
function popularTabelaProdutos() {
  const tableProdutos = document.getElementById('table_produtos');

  getAllData()
    .then(data => {
      data.forEach(produto => {
        const row = tableProdutos.insertRow();

        const idCell = row.insertCell();
        idCell.textContent = produto.idProduto;

        const descricaoCell = row.insertCell();
        descricaoCell.textContent = produto.descricao;

        const precoCompraCell = row.insertCell();
        precoCompraCell.textContent = 'R$ ' + produto.precoCompra;

        const precoVendaCell = row.insertCell();
        precoVendaCell.textContent = 'R$ ' + produto.precoVenda;

        const qtdEstoqueCell = row.insertCell();
        qtdEstoqueCell.textContent = produto.quantidadeEstoque;

        const usuarioCadastroCell = row.insertCell();
        usuarioCadastroCell.textContent = produto.usuarioCadastro;

        const idCategoriaCell = row.insertCell();
        idCategoriaCell.textContent = produto.categoriaProduto.descricao;

        const dataCadastroCell = row.insertCell();
        dataCadastroCell.textContent = new Date(produto.dataCadastro).toLocaleString();

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

          var newUrl = caminhoApi + '/' + produto.idProduto;
          deletar(newUrl);
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

function cadastrar() {
  const id = document.getElementById('inputCodigo').value;
  const descricao = document.getElementById('inputNomeProduto').value;
  const categoria = document.getElementById('categoriaproduto').value;
  const preco_compra = document.getElementById('inputValCompra').value;
  const preco_venda = document.getElementById('inputValVenda').value;
  const quantidade_estoque = document.getElementById('inputQtd').value;
  const usuario = document.getElementById('usuario').value;

  const data = {
    descricao: descricao,
    categoria: categoria,
    precoCompra: preco_compra,
    precoVenda: preco_venda,
    quantidadeEstoque: quantidade_estoque,
    usuario: usuario
  };

  if (id.length !== 0) {
      data.idProduto = id,
      update(data);
  } else {
    data.datacadastro = new Date();
    salvarNovo(data);
  }
}

async function iniciarEdicao(ID) {
  // Redirecionar para o formulário de cadastro_produto
  window.location.href = `cadastro_produto.html?idProduto=${ID}`;
}

//PREENCHER FORMULARIO COM DADOS PARA EDITAR
async function popularFormularioParaEditar(ID) {
  try {
    const produto = await getById(ID);
    console.log(produto);
    document.getElementById('inputCodigo').value = produto.idProduto
    document.getElementById('inputNomeProduto').value = produto.descricao;
    document.getElementById('categoriaproduto').value = produto.categoriaProduto;
    document.getElementById('inputValCompra').value = produto.precoCompra;
    document.getElementById('inputValVenda').value = produto.precoVenda;
    document.getElementById('inputQtd').value = produto.quantidadeEstoque;
    document.getElementById('usuario').value = produto.usuarioCadastro;
  } catch (error) {
    console.error('Erro:', error);
  }
}

function setUpDados() {
  console.log('SETANDO DADOS');

  // var teste = buscarCategorias('http://localhost:8090/baraabbAPI/api/v1/categoriaproduto')
  // console.log(teste);

  var categorias = ['Categoria 1', 'Categoria 2', 'Categoria 3'];

  console.log(categorias);
  // Obtém uma referência ao elemento select
  var selectCliente = document.getElementById('categoriaproduto');

  // Itera sobre a lista de clientes
  categorias.forEach(function (cliente) {
    // Cria um elemento de opção para cada cliente
    var option = document.createElement('option');
    option.textContent = cliente;

    // Adiciona a opção ao select
    selectCliente.appendChild(option);
  });

}

function mostrarSelecionado() {

  var select = document.getElementById('categoriaproduto');
  var Selecionado = select.value;

  console.log(Selecionado);

}

function buscarCategorias(path){
  fetch(path)
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(error => {
      console.error('Ocorreu um erro:', error);
    });
}


/**
 * METODOS GENERICOS
 */

function getAllData() {
  return fetch(caminhoApi)
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

async function getById(ID) {
  const newUrl = `${caminhoApi}/${ID}`;
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

function salvarNovo(data) {
  fetch(caminhoApi, {
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

function deletar(newUrl) {
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
}

function update(data) {
  fetch(caminhoApi, {
    method: 'PUT',
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

