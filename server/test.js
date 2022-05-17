
let sql = require('mysql');

let con = sql.createConnection({
    host: "mixfix.ca9nhsngguf6.us-east-2.rds.amazonaws.com",
    user: "admin",
    password: "PeterGriffin1"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query('CREATE DATABASE IF NOT EXISTS main;');
    con.query('USE main;');
    con.query('CREATE TABLE IF NOT EXISTS users(id int NOT NULL AUTO_INCREMENT, username varchar(30), email varchar(255), age int, PRIMARY KEY(id));');
    con.query('INSERT INTO users(username, email, age) VALUES("Seth", "s@s.com", 22);');
    con.end();
});








