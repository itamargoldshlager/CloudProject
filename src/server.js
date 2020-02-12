const express = require('express')
const path = require('path')
var cors = require('cors');
var bodyParser= require("body-parser");
const app = express()
const port = 80
const apiRouter = require('./Routing/Router')
// require('./DbConnection').CreateProductTable();

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use('/api', apiRouter)
app.use(express.static(path.join(__dirname, 'build')));
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))