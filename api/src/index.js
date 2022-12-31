require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const indexRoutes = require('./routes/index.route.js');
require('./config/utils.db');

const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname));
app.use('/v0/', indexRoutes);

app.listen(port, () => console.log(`Connection established on port ${port}`));
