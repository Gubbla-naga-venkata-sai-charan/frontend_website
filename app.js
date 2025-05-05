const { urlencoded } = require("body-parser");
const express = require("express");
const fs = require('fs');
const path = require('path');

const defaultRoutes=require('./routes/default');
const restaurantRoutes=require('./routes/restaurents')

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use('/',defaultRoutes);
app.use('/',restaurantRoutes);

app.use(function (req, res) {
    res.status(404).render('404');
});

app.use(function (error, req, res, next) {
    res.status(500).render('500'); // Fixed missing status code
});

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
