document.addEventListener("DOMContentLoaded", () => {
    let transactions = [];

    const form = document.getElementById("transaction-form");
    const tableBody = document.querySelector("#transactions-table tbody");
    const totalElement = document.getElementById("total");

    function generateId() {
        return '_' + Math.random().toString(36).substr(2, 9);
    }

    function calculateTotal() {
        const total = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
        totalElement.textContent = total.toFixed(2);
    }

    function renderTransactions() {
        tableBody.innerHTML = "";
        transactions.forEach(transaction => {
            const row = document.createElement("tr");
            row.classList.add(transaction.amount > 0 ? "income" : "expense");

            row.innerHTML = `
                <td>${transaction.date}</td>
                <td>${transaction.category}</td>
                <td>${transaction.description.split(" ").slice(0, 4).join(" ")}</td>
                <td>${transaction.amount.toFixed(2)}</td>
                <td><button onclick="removeTransaction('${transaction.id}')">Удалить</button></td>
            `;

            tableBody.appendChild(row);
        });
    }

    function addTransaction(amount, category, description) {
        const newTransaction = {
            id: generateId(),
            date: new Date().toLocaleString(),
            amount,
            category,
            description
        };
        transactions.push(newTransaction);
        renderTransactions();
        calculateTotal();
    }

    window.removeTransaction = function (id) {
        transactions = transactions.filter(transaction => transaction.id !== id);
        renderTransactions();
        calculateTotal();
    };

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const amount = parseFloat(document.getElementById("amount").value);
        const category = document.getElementById("category").value;
        const description = document.getElementById("description").value;

        addTransaction(amount, category, description);

        form.reset();
    });
});