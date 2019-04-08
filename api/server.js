'use strict'

const express = require('express');
const cors = require('cors');
const routes = require('./routes/carsRoutes');
const app = express();

app.set('view engine', 'ejs');
app.use(cors());
app.use('/', routes);

const server = app.listen(8081, function () {
   const host = server.address().address;
   const port = server.address().port;
   console.log("Car value app listening at http://%s:%s", host, port);
});
