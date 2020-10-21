

const app = require('express')();
const http = require('http').createServer(app);


app.get('/', (req, res) => {
    res.send('Hello World!')
  })


http.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})