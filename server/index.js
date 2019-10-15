const http = require('http');
const express = require('express');

const app = express();
const getDogsRoute = require('./api/routes/get-dogs');
const uploadDogImageRoute = require('./api/routes/upload-dog-image');

app.use('/api/get-dogs/', getDogsRoute);
app.use('/api/upload-dog-image/', uploadDogImageRoute);

const port = process.env.PORT || 3001;
const server = http.createServer(app);

server.listen(port, () => console.log('listening at port: ' + port));
