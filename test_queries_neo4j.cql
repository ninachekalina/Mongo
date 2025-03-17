// 1. Создание узла (вершины) пользователя
CREATE (:User {name: "Alice", email: "alice@example.com"});

// 2. Создание узла заказа
CREATE (:Order {orderId: "12345", amount: 250, status: "pending"});

// 3. Создание связи между пользователем и заказом
MATCH (u:User {name: "Alice"}), (o:Order {orderId: "12345"})
CREATE (u)-[:PLACED]->(o);

// 4. Поиск всех пользователей
MATCH (u:User) RETURN u;

// 5. Поиск всех заказов со статусом "pending"
MATCH (o:Order {status: "pending"}) RETURN o;

// 6. Поиск пользователей и их заказов
MATCH (u:User)-[:PLACED]->(o:Order)
RETURN u.name AS User, o.orderId AS OrderID, o.amount AS Amount;

// 7. Подсчет количества заказов по статусу
MATCH (o:Order)
RETURN o.status AS Status, COUNT(o) AS OrderCount;
