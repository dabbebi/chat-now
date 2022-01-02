
const express = require('express');
const path = require('path');
const app = express();

// Serve only the static files form the dist directory
app.use(express.static('./dist/'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/'}),
);

const port = process.env.PORT || 8080;
// Start the app by listening on the default Heroku port
app.listen(port);
console.log("Start server at port " + port);