const express = require('express')
const path = require('path')
var cors = require('cors');
var bodyParser= require("body-parser");
var device = require('express-device');
var useragent = require('express-useragent');

const app = express()
const port = 80
const apiRouter = require('./Routing/Router')
// require('./DbConnection').CreateProductTable();

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(device.capture())
device.enableViewRouting(app);
app.use(useragent.express());

app.use('/static', express.static(path.join(__dirname, 'public')))
app.use('/api', apiRouter)

app.get('/', function(req, res) {
  console.log("hi")
  console.log(req.device.type.toUpperCase())
  console.log(req.useragent)
  app.use(express.static(path.join(__dirname, 'build')));
  if (req.device.type.toUpperCase() === 'DESKTOP' && req.useragent.browser === 'Chrome')
    res.sendFile(path.join(__dirname, 'build', 'index.html'), { forceType: 'desktop' });
  else {
    res.send("forbidden")
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))