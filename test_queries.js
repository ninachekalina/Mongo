// Подключение к базе 
const db = connect("mongodb://localhost:27017/testdb");
const fs = require('fs');

const results = [];

// Создание коллекции "users", если её нет
if (!db.getCollectionNames().includes("users")) {
    db.createCollection("users");
    db.getCollection("users").insertOne({ name: "Test User", email: "test@example.com" });
}

// Проверка наличия коллекции "users"
results.push({ users: db.getCollection("users").findOne() });

// Проверка индексов в "users"
results.push({ indexes: db.getCollection("users").getIndexes() });

// Создание коллекции "orders", если её нет
if (!db.getCollectionNames().includes("orders")) {
    db.createCollection("orders");
}

// Вставка тестового документа в коллекцию "orders"
db.getCollection("orders").insertOne({
    orderId: "12345",
    amount: 250,
    status: "pending"
});

// Проверка выборки данных из "orders"
results.push({
    orders: db.getCollection("orders").aggregate([
        { $match: { status: "pending" } },
        { $group: { _id: "$status", total: { $sum: "$amount" } } }
    ]).toArray()
});

// Запись результатов в JSON-файл
fs.writeFileSync("/tmp/mongo_output.json", JSON.stringify(results, null, 2));
