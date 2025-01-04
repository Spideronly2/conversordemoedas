// script.js
document.getElementById('currency-form').addEventListener('submit', async (e) => {
    e.preventDefault(); // Evita o recarregamento da página

    // Captura valores do formulário
    const amount = parseFloat(document.getElementById('amount').value);
    const fromCurrency = document.getElementById('from-currency').value;
    const toCurrency = document.getElementById('to-currency').value;
    const resultDiv = document.getElementById('result');

    try {
        // Consulta API de câmbio
        const response = await fetch(`https://api.exchangerate.host/latest?base=${fromCurrency}&symbols=${toCurrency}`);
        const data = await response.json();

        // Verifica se a API retornou sucesso
        if (data.rates && data.rates[toCurrency]) {
            const rate = data.rates[toCurrency];
            const convertedValue = (amount * rate).toFixed(2);
            resultDiv.textContent = `${amount} ${fromCurrency} é igual a ${convertedValue} ${toCurrency}.`;
        } else {
            resultDiv.textContent = "Erro ao obter a taxa de câmbio.";
        }
    } catch (error) {
        resultDiv.textContent = "Erro ao conectar com a API.";
    }
});
