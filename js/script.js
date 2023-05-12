const inputs = document.querySelectorAll('.input-code');
const confirmButton = document.getElementById('confirm-button');

inputs.forEach(function(input, index) 
{
    input.addEventListener('input', function() 
    {
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

    input.addEventListener('keydown', function(e) 
    {
        if (e.key === 'Backspace' && this.value.length === 0) 
        {
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

    input.addEventListener('paste', function(event) 
    {
        event.preventDefault();

        const clipboardData = event.clipboardData || window.clipboardData;
        const pastedText = clipboardData.getData('text');
        const numbers = pastedText.replace(/\D/g, '').split('');

        numbers.forEach((number, i) => 
        {
        if (i < inputs.length) {
            inputs[i].value = number;
        }
        });
    });
});

function confirmCode() 
{
    const code = Array.from(inputs).map(input => input.value).join('');
    alert("Seu código é " + code);
}
