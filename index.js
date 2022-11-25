const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.xq1hd1p.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const categoryCollection = client.db('cardbUser').collection('categories')
        const bookingsCollection = client.db('cardbUser').collection('bookings')

        app.get('/categories', async (req, res) => {
            const query = {}
            const cursor = categoryCollection.find(query);
            const categories = await cursor.toArray();
            res.send(categories);
        });


        app.get('/categories/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const categories = await categoryCollection.findOne(query);
            res.send(categories);
        });


        app.post('/bookings', async (req, res) => {
            const booking = req.body;
            console.log(booking);

            const result = await bookingsCollection.insertOne(booking);
            res.send(result);
        })
    }
    finally {

    }
}
run()
// run.catch(error => console.error(error))


app.get('/', (req, res) => {
    res.send('cars direct server is running')
})

app.listen(port, () => {
    console.log(`cars direct server running on ${port}`);
})