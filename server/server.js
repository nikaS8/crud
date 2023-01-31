
const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const {Pool} = require("pg");
const port = 3000;

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.json());

const WebSocket = require('ws');
const http = require("http");
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const client = new Pool({
    host: 'localhost',
    user: 'postgres',
    port: '5433',
    password: 'test',
    database: 'postgres'
})

client.connect(function(err){
    if(err) throw err;
    console.log('connected!');
});

wss.on('connection', function connection(ws) {
    ws.on('message', function message(data) {
        console.log(`Received message => ${data}`);
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        });
    });
});

server.listen(port, () => {
    console.log(`WebSocket server is running on port ${port}`);
});

app.get('/api/get', (req, res) => {
    let sql = "SELECT * FROM numbers";
    client.query(sql, (err, results) => {
        res.send(results.rows)
    })
});

app.post('/api/insert', (req, res) => {
    let dataNum = req.body.number;
    let dataId = req.body.id;
    let sql = "INSERT INTO numbers (number, id) VALUES ($1, $2)";
    client.query(sql, [dataNum, dataId], (err, results) => {
        console.log(err);
    })
});

app.delete('/api/delete/:numId', (req, res) => {
    let data = req.params.numId;
    let sql = "DELETE FROM numbers WHERE id = $1";
    client.query(sql, [data], (err, results) => {
        console.log(err);
    })
})
