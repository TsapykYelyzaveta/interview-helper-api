const express = require('express');

const app = express();
app.use(express.json());

const dotenv = require('dotenv').config();

const cors = require('cors');
app.use(cors({
    origin: '*'
}));

require('./initDB')();

app.get('/', (req, res) => {
    res.send(`Hello`);
})


const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log('Server started on port ' + PORT + '...');
});

