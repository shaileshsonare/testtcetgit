const express = require("express");
const mysql = require("mysql2");
const app = express();

app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "%TGBbgt5",
    database: "tms"
});

app.get("/todolist", (req, res) => {
    const query = "SELECT tdl.id, u.username, tdl.task, tdl.status FROM todolist AS tdl LEFT JOIN users AS u ON u.id = tdl.user_id";
    db.query(query, (err, result) => {
        res.json(result);
    });
});

app.post("/todolist", (req, res) => {
    const query = "INSERT INTO todolist (user_id, task, status) VALUES (?, ?, ?)";
    db.query(query, [req.body.user_id, req.body.task, req.body.status], (err, result) => {
        res.json(result);
    });
});

app.put("/todolist/:id", (req, res) => {
    const query = "UPDATE todolist SET user_id = ?, task = ?, status = ? WHERE id = ?";
    db.query(query, [req.body.user_id, req.body.task, req.body.status, req.params.id], (err, result) => {
        res.json(result);
    });
});

app.delete("/todolist/:id", (req, res) => {
    const query = "DELETE FROM todolist WHERE id = ?";
    db.query(query, [req.params.id], (err, result) => {
        res.json(result);
    });
});



app.get("/", (req, res) => {
    res.send("Hello World!");
});


app.listen(3000, () => {
    console.log("Server started on port 3000");
});


/**
mysql> SELECT tdl.id, u.username, tdl.task, tdl.status 
    -> FROM todolist AS tdl LEFT JOIN users AS u 
    -> ON u.id = tdl.user_id;
+----+----------+------------------------------------+---------+
| id | username | task                               | status  |
+----+----------+------------------------------------+---------+
|  1 | shailesh | Prepare daily status report        | PENDING |
|  2 | shailesh | Review PowerInbox migration script | WIP     |
|  3 | shailesh | Complete team KRA validation       | DONE    |
|  4 | shailesh | Conduct Node.js mentorship session | PENDING |
|  5 | shailesh | Fix admin panel reporting issue    | WIP     |
+----+----------+------------------------------------+---------+
5 rows in set (0.00 sec)

mysql> ALTER TABLE users
    -> ADD COLUMN password VARCHAR(255) NOT NULL;
Query OK, 0 rows affected (0.03 sec)
Records: 0  Duplicates: 0  Warnings: 0

mysql> UPDATE users SET password = 'qwerasdf';
Query OK, 1 row affected (0.00 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> 
mysql> SELECT * FROM users;
+----+----------+----------+
| id | username | password |
+----+----------+----------+
|  1 | shailesh | qwerasdf |
+----+----------+----------+
1 row in set (0.00 sec) 
 
 */