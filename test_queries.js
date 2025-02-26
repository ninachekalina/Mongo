// Подключение к базе
const db = connect("mongodb://localhost:27017/testdb");

// Проверка наличия коллекции "users"
printjson(db.getCollection("users").findOne());

// Проверка индексов
printjson(db.getCollection("users").getIndexes());

// Вставка тестового документа в коллекцию "orders"
db.getCollection("orders").insertOne({
  orderId: "12345",
  amount: 250,
  status: "pending"
});

// Проверка выборки данных
printjson(db.getCollection("orders").aggregate([
  { $match: { status: "pending" } },
  { $group: { _id: "$status", total: { $sum: "$amount" } } }
]).toArray());
