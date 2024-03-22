// Connect to MongoDB server
const conn = new Mongo();
const db = conn.getDB("transactions");

// Create a transactions collection and insert some initial data
db.transactions.insertMany([
  {
    description: "Grocery shopping",
    amount: 45.75
  },
  {
    description: "Restaurant bill",
    amount: 60.05
  },
  {
    description: "Online purchase",
    amount: 25.99
  }
]);

print("Initialization complete.");