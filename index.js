const mysql = require("mysql2");
const http = require("http");
const { isUtf8 } = require("buffer");

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'chat'
})

const server = http.createServer((req, res) => {
    connection.query(
        'SELECT * FROM user',
        function(err, result, fields){
            res.write(`JSON.stringify(result)`);
            res.end();
        }
    );
})

server.listen(666);