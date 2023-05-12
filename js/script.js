const inputs = document.querySelectorAll('.input-code');
const confirmButton = document.getElementById('confirm-button');

inputs.forEach(function(input, index) {
    input.addEventListener('input', function() {
    // Remove caracteres não numéricos
    this.value = this.value.replace(/\D/g, '');

    if (this.value.length >= this.maxLength) {
      if (index < inputs.length - 1) {
        inputs[index + 1].focus();
      } else {
        confirmButton.disabled = false;
      }
    } else {
      confirmButton.disabled = true;
    }
  });

  input.addEventListener('keydown', function(e) {
    if (e.key === 'Backspace' && this.value.length === 0) {
      if (index > 0) {
        inputs[index - 1].focus();
      }
    }
  });

  input.addEventListener('click', function() {
    this.select();
  });

  input.addEventListener('focus', function() {
    if (this.value) {
      this.select();
    }
  });

  input.addEventListener('paste', function(event) {
    event.preventDefault(); // Impede a colagem direta no campo de entrada

    const clipboardData = event.clipboardData || window.clipboardData;
    const pastedText = clipboardData.getData('text');
    const numbers = pastedText.replace(/\D/g, '').split('');

    numbers.forEach((number, i) => {
      if (i < inputs.length) {
        inputs[i].value = number;
      }
    });
  });
});

function confirmaCodigo() 
{
    const code = Array.from(inputs).map(input => input.value).join('');

    fetch('http://localhost/MatchMe3/verifica.php', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code: code })
    })
        .then(response => {
        if (response.ok) {
            response.json(); // Converte a resposta para JSON
        } else {
            throw new Error('Erro ao enviar o código.');
        }
        })
        .then(data => {
        // Aqui você pode acessar os dados recebidos do servidor em 'data'
        console.log(data);
        })
        .catch(error => {
        console.error(error);
        alert('Ocorreu um erro ao enviar o código. Por favor, tente novamente mais tarde.');
        });
}