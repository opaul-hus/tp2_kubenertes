const express = require('express');
const json = require('body-parser').json;
const cors = require('cors');
const createConnection = require('mysql2').createConnection;

const app = express();
app.use(cors());
app.options('*', cors());

const port = process.env.PORT;

let db;

function connectToDatabase() {
    db = createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    db.connect(err => {
        if (err) {
            console.error('Error connecting to MySQL:',
                '\nHost:', process.env.DB_HOST,
                '\nUser:', process.env.DB_USER,
                '\nPassword:', process.env.DB_PASSWORD,
                '\nDatabase:', process.env.DB_NAME,
                err);

            // Retry connection after 5 seconds
            setTimeout(connectToDatabase, 5000);
            return;
        }

        console.log('Connected to MySQL database',
            '\nHost:', process.env.DB_HOST,
            '\nUser:', process.env.DB_USER,
            '\nPassword:', process.env.DB_PASSWORD,
            '\nDatabase:', process.env.DB_NAME);

        startServer();
    });
}

function startServer() {
    app.use(json());

    // Get all users
    app.get('/users', (req, res) => {
        const query = 'SELECT * FROM users';
        db.query(query, (err, results) => {
            if (err) {
                console.error('Error fetching users from MySQL:', err);
                res.status(500).send('Internal Server Error');
                return;
            }
            res.json(results);
        });
    });

    app.listen(port, () => {
        console.log(`Users microservice listening at ${port}`);
    });
}

connectToDatabase();
