const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());



app.get('/', (req, res) => {
    res.send('cars direct server is running')
})

app.listen(port, () => {
    console.log(`cars direct server running on ${port}`);
})