document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("converter-form");
    const amountInput = document.getElementById("amount");
    const fromCurrency = document.getElementById("from-currency");
    const toCurrency = document.getElementById("to-currency");
    const resultDiv = document.getElementById("result");

    // API key and URL for fetching live exchange rates
    const API_KEY = '366666222469a99bf994d9a2'; // Replace with your API key
    const API_URL = `https://v6.exchangerate-api.com/v6/366666222469a99bf994d9a2/latest/USD`;

    // Fetch available currencies and exchange rates
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            const currencies = Object.keys(data.conversion_rates);
            currencies.forEach(currency => {
                let option1 = document.createElement("option");
                option1.value = currency;
                option1.textContent = currency;
                fromCurrency.appendChild(option1);

                let option2 = document.createElement("option");
                option2.value = currency;
                option2.textContent = currency;
                toCurrency.appendChild(option2);
            });
        })
        .catch(error => console.error('Error fetching exchange rates:', error));

    // Convert currency when form is submitted
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const amount = amountInput.value;
        const from = fromCurrency.value;
        const to = toCurrency.value;

        if (amount === '' || from === '' || to === '') {
            resultDiv.textContent = "Please fill in all fields.";
            return;
        }

        // Fetch the exchange rate for the selected currencies
        fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${from}/${to}`)
            .then(response => response.json())
            .then(data => {
                const rate = data.conversion_rate;
                const result = amount * rate;
                resultDiv.textContent = `${amount} ${from} = ${result.toFixed(2)} ${to}`;
            })
            .catch(error => {
                console.error('Error fetching conversion rate:', error);
                resultDiv.textContent = "Error fetching conversion rate.";
            });
    });
});
