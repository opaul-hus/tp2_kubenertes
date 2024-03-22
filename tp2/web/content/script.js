// Fetch users and transactions when the page loads
document.addEventListener('DOMContentLoaded', function () {
    getAll();
});

// Fetch users and transactions when the user clicks the button
function getAll() {
    getUsers();
    getTransactions();
}

function getTransactions() {
    fetch('/transactions')
        .then(response => response.json())
        .then(transactions => {
            const transactionList = document.getElementById('transactionList');
            transactionList.innerHTML = transactions.map(transaction => `<li>${transaction.description} - ${transaction.amount}</li>`).join('');
        })
        .catch(error => console.error('Error fetching transactions:', error));
}

function getUsers() {
    fetch('/users')
        .then(response => response.json())
        .then(users => {
            const userList = document.getElementById('userList');
            userList.innerHTML = users.map(user => `<li>${user.username} - ${user.email}</li>`).join('');
        })
        .catch(error => console.error('Error fetching users:', error));
}