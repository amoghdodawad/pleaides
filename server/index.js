const express = require('express');
const app = express();

const PORT = process.env.PORT || 8080;

app.get('/', ( req, res ) => {
    res.end('Hello world');
});

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
})