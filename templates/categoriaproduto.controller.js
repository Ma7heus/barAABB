const URL = 'http://localhost:8090/baraabbAPI/api/v1/categoriaproduto';

// FUNCAO QUE PREENCHE LISTAGEM
function popularTabelaCategorias() {
  const tableCategorias = document.getElementById('table_categorias');

  getCategorias()
    .then(data => {
      data.forEach(categoria => {
        const row = tableCategorias.insertRow();

        const idCell = row.insertCell();
        idCell.textContent = categoria.idCategoria;

        const descricaoCell = row.insertCell();
        descricaoCell.textContent = categoria.descricao;

        const margemCell = row.insertCell();
        margemCell.textContent = categoria.margem;

        const dataCadastroCell = row.insertCell();
        dataCadastroCell.textContent = new Date(categoria.datacadastro).toLocaleString();

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
            iniciarEdicao(categoria.idCategoria);
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
          var idDeletar = categoria.idCategoria;
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

function getCategorias() {
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
  const descricao = document.getElementById('inputNome').value;
  const margem = document.getElementById('inputMargem').value;

  const data = {
    descricao: descricao,
    margem: margem
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
  // Redirecionar para o formulário de cadastro_categoria
  window.location.href = `cadastro_categoria.html?idCategoria=${ID}`;
}

//PREENCHER FORMULARIO COM DADOS PARA EDITAR
async function popularFormularioParaEditar(ID){
  try {
    const categoria = await getById(ID);
    // Preencher o formulário com os dados do categoria para edição
    document.getElementById('inputNome').value = categoria.descricao;
    document.getElementById('inputMargem').value = categoria.margem;
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




