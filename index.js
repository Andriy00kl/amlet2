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
    if(req.url === '/message'){
    connection.query(
        'SELECT * FROM message',
        function(err, result, fields){
                let html = `<html><body><ul>`
                result.forEach((element) =>{
                    html += `<li>${element.content}</li>`
                });
                html += `</ul><form action="/add" method="POST"> <input type="text" name="content"></form></body></html>`
                res.writeHead(200, {'Content-type': 'text/html'});
                res.end(html);
            }
        );
    }else if(req.url === "/add" && req.method === 'POST'){
        let data = '';
        req.on('data', function(chunk){
            data += chunk;
        });
        req.on('data', function(chunk){
            let sp = new URLSearchParams(data);
            let content = sp.get('content');
            connection.query(
                `INSERT INTO message(content, author_id, dialog_id) VALUES("${content}", 1, 5);`,
                function (err, result, fields){
                    res.writeHead(302, {'Location': '/message'});
                    res.end();
                }
            );   
        });
    }
});
    

server.listen(666);