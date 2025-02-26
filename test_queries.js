// Указываем, с какой базой работаем
use("testdb");

// Создаем коллекцию "users", если её нет
if (!db.getCollectionNames().includes("users")) {
  db.createCollection("users");
}

// Проверка наличия коллекции "users"
printjson(db.getCollection("users").findOne());

// Проверка индексов
printjson(db.getCollection("users").getIndexes());

// Создаем коллекцию "orders", если её нет
if (!db.getCollectionNames().includes("orders")) {
  db.createCollection("orders");
}

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
