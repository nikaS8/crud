const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const {Pool} = require("pg")

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.json());

const client = new Pool({
    host: 'db',
    user: 'test',
    port: '5432',
    password: 'test',
    database: 'test'
})

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

app.listen(3000, () => {
    console.log("Server running successfully on 3000");
});