
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
    // console.log('Received a new connection.');
    // console.log("connected", wss.clients.size);
    ws.on('message', function message(data) {
        console.log(`Received message => ${data}`);
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        });
    });
});

// wss.on("connection", (ctx) => {
//     // print number of active connections
//     console.log("connected", wss.clients.size);
//
//     // handle message events
//     // receive a message and echo it back
//     ctx.on("message", (message) => {
//         console.log(`Received message => ${message}`);
//         ctx.send(`you said ${message}`);
//     });
//
//     // handle close event
//     ctx.on("close", () => {
//         console.log("closed", wss.clients.size);
//     });
//
//     // sent a message that we're good to proceed
//     ctx.send("connection established.");
// });


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
    // console.log(req, 'req')
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
//
// app.listen(3000, () => {
//     console.log("Server running successfully on 3000");
// });