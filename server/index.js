const http = require('http');
const express = require('express');

const app = express();
const getDogsRoute = require('./api/routes/get-dogs');
const uploadDogImageRoute = require('./api/routes/upload-dog-image');
const uploadUserImageRoute = require('./api/routes/upload-user-image');
const getUsersRoute = require('./api/routes/get-users');
const addDogRoute = require('./api/routes/add-dog');
const getBreedsRoute = require('./api/routes/get-breeds');
const addUserRoute = require('./api/routes/add-user');
const loginRoute = require('./api/routes/login');
const addPlaydatesRoute = require('./api/routes/add-playdates');
const makePlaydateReqRoute = require('./api/routes/playdate-request');
const getPdRequestsRoute = require('./api/routes/get-requests');
const userPlayReqsRoute = require('./api/routes/user-play-reqs');

app.use('/api/get-dogs/', getDogsRoute);
app.use('/api/upload-dog-image/', uploadDogImageRoute);
app.use('/api/get-users/', getUsersRoute);
app.use('/api/add-dog/', addDogRoute);
app.use('/api/get-breeds/', getBreedsRoute);
app.use('/api/upload-user-image', uploadUserImageRoute);
app.use('/api/add-user/', addUserRoute);
app.use('/api/login', loginRoute);
app.use('/api/add-playdates', addPlaydatesRoute);
app.use('/api/playdate-request', makePlaydateReqRoute);
app.use('/api/get-requests', getPdRequestsRoute);
app.use('/api/user-play-reqs', userPlayReqsRoute);

const port = process.env.PORT || 3001;
const server = http.createServer(app);

server.listen(port, () => console.log('listening at port: ' + port));
