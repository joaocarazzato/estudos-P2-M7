document.addEventListener('DOMContentLoaded', function() {
  // Seleciona a div
  const respostaDiv = document.getElementById('respostaDiv');
  const quebraDeLinha = document.createElement('br');

  // Realiza uma requisição usando a API Fetch
  fetch('http://localhost:5000/results')
    .then(response => {
      if (!response.ok) {
        throw new Error('A solicitação não foi bem-sucedida.');
      }
      return response.json(); // Ou response.text() para dados de texto
    })
    .then(data => {
      // Adiciona a resposta na div
      for (var item in data['results']) respostaDiv.append(`${JSON.stringify(data['results'][item])}, `);
      // respostaDiv.textContent = JSON.stringify(data['results'][0]);
    })
    .catch(error => {
      console.error('Ocorreu um erro:', error);
    });
});



document.getElementById('meuFormulario').addEventListener('submit', function (event) {
    event.preventDefault(); // Impede o envio padrão do formulário
  
    const formulario = new FormData(event.target); // Cria um objeto FormData com os dados do formulário
  
    // Faça uma solicitação POST para o backend
    fetch('http://localhost:5000/sum', {
      method: 'POST',
      body: formulario, // Envia os dados do formulário
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('A solicitação não foi bem-sucedida.');
        }
        return response.json();
      })
      .then(data => {
        console.log('Resposta do Backend:', data);

        location.reload();
      })
      .catch(error => {
        console.error('Ocorreu um erro:', error);
      });
  });