const URL = 'http://localhost:8090/baraabbAPI/api/v1/cliente';

async function getCliente() {
  fetch(URL)
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error('Erro:', error);
      });
  }

