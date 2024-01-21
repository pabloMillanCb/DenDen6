var express = require('express');

var app = express();
const PORT = process.env.PORT || 5000

app.get('/', (req: any, res: any) => {
res.send('This is DenDen6 API')
})

app.listen(PORT, function () {
    console.log(`project at: ${PORT}!`); 
});