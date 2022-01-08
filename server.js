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

const categoryRouter = require("./routes/categoryRouter");
const topicRouter = require("./routes/topicRouter");
const questionRouter = require("./routes/questionRouter");

app.use("/api/categories", categoryRouter);
app.use("/api/topics", topicRouter);
app.use("/api/questions", questionRouter);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log('Server started on port ' + PORT + '...');
});

