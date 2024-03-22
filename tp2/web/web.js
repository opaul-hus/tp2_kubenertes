const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

const PORT = process.env.PORT;
const TRANSACTIONS_URL = process.env.TRANSACTIONS_URL;
const USERS_URL = process.env.USERS_URL;

// Get the home page : index.html
app.get('/', (req, res) => {
    const indexPath = path.join(__dirname, '/content/index.html');
    fs.readFile(indexPath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Internal Server Error');
        } else {
            res.status(200).send(data);
        }
    });
});

// Get transactions from the transaction server
app.get('/transactions', (req, res) => {
    fetch(TRANSACTIONS_URL)
        .then(response => response.json())
        .then(transactions => {
            res.status(200).json(transactions);
        })
        .catch(error => {
            console.error('Error fetching transactions:', error);
            res.status(500).send('Internal Server Error');
        });
});

// Get the users from the users server
app.get('/users', (req, res) => {
    fetch(USERS_URL)
        .then(response => response.json())
        .then(users => {
            res.status(200).json(users);
        })
        .catch(error => {
            console.error('Error fetching users:', error);
            res.status(500).send('Internal Server Error');
        });
});

// Serve static files from the 'content' directory
app.use(express.static('content'));

app.use((req, res) => {
    res.status(404).send('Not Found');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
