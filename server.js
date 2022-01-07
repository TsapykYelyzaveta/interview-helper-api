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

const categoryRouter = require("./routes/categoryRouter.js");
const topicRouter = require("./routes/topicRouter.js");

app.use("/api/categories", categoryRouter);
app.use("/api/topics", topicRouter);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log('Server started on port ' + PORT + '...');
});

