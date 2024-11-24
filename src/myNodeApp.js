var mj = require('mongojs')
var conn = mj('mongodb://localhost:27017/Project1');
var exp = require('express')
var app = exp()
var cr = require('cors')
app.use(cr())
app.listen(1000)
var bp = require('body-parser')
app.use(bp.json())

app.post('/register', (req, res) => {
    console.log(req.body);
    conn.tbl_user.insert(req.body, (err, doc) => {
        if (err) {
            res.send({ result: "Error inserting data" });
        } else {
            res.send({ result: "Inserted" });
        }
    });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    conn.tbl_user.findOne({ username: username, password: password }, (err, user) => {
        if (err) {
            console.error("Database error:", err);
            res.send({ result: "Database error" });
        } else if (!user) {
            res.send({ result: "Invalid username or password" });
        } else {
            res.send({ result: "Login successful", user: user });
            console.log("User Logged in...")
        }
    });
});
