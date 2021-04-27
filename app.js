const express = require('express');
const path = require('path');
const apiRouter = require('./router/api.router');
const db = require('./dataBase/MySQL').getInit();

db.setModels();

const app = express();

app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.use('/', apiRouter);


app.listen(5000, () => {
    console.log('App listen 5000')
});
