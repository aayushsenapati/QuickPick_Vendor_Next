const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');

const app = express();
const port = 3001;


app.use(cors());
app.get('/data/:restaurant', async (req, res) => {
    const client = new MongoClient('mongodb+srv://quickPick:quickPick@quickpick.kqhqbdn.mongodb.net/test', { useUnifiedTopology: true });
    try {
        await client.connect();
        const db = client.db('foodOrders');
        const collection = db.collection('orders');
        const data = await collection.find({restaurant:req.params.restaurant}).toArray();
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    } finally {
        client.close();
    }
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
