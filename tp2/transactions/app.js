const express = require('express');
const { json } = require('body-parser');
const cors = require('cors');
const { connect, Schema, model } = require('mongoose');

const app = express();
app.use(cors());
app.options('*', cors());

const port = process.env.PORT;

const mongoDBUrl = process.env.DB_MONGO_URL;
const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;

const connectToMongoDB = async () => {
    try {
        await connect(mongoDBUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            auth: {
                user: username,
                password: password
            }
        });

        console.log('Connected to MongoDB', 
            '\nURL:', mongoDBUrl,
            '\nUser:', username,
            '\nPassword', password);

        startServer();
    } catch (err) {
        console.error('Error connecting to MongoDB:', 
            '\nURL:', mongoDBUrl,
            '\nUser:', username,
            '\nPassword', password,
            err);

        // Retry connection after 5 seconds
        setTimeout(connectToMongoDB, 5000);
    }
};

function startServer() {
    const transactionSchema = new Schema({
        description: String,
        amount: Number
    });
    const Transaction = model('Transaction', transactionSchema);

    app.use(json());

    // Get all transactions
    app.get('/transactions', async (req, res) => {
        try {
            const transactions = await Transaction.find();
            res.json(transactions);
        } catch (err) {
            console.error('Error fetching transactions from MongoDB:', err);
            res.status(500).send('Internal Server Error');
        }
    });

    app.listen(port, () => {
        console.log(`Transactions microservice listening at ${port}`);
    });
}

connectToMongoDB();