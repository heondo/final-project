const http = require('http');
const express = require('express');

const app = express();
const getDogsRoute = require('./api/routes/get-dogs');
const uploadDogImageRoute = require('./api/routes/upload-dog-image');
const getUsersRoute = require('./api/routes/get-users');
const addDogRoute = require('./api/routes/add-dog');
const getBreedsRoute = require('./api/routes/get-breeds');
const userSignUpRoute = require('./api/routes/user-signup');

app.use('/api/get-dogs/', getDogsRoute);
app.use('/api/upload-dog-image/', uploadDogImageRoute);
app.use('/api/get-users/', getUsersRoute);
app.use('/api/add-dog/', addDogRoute);
app.use('/api/get-breeds/', getBreedsRoute);
app.use('/api/user-signup/', userSignUpRoute);

// app.use('/api/user-signup/', userSignUpRoute);

const port = process.env.PORT || 3001;
const server = http.createServer(app);

server.listen(port, () => console.log('listening at port: ' + port));
