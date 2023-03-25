import clientPromise from "/lib/mongodb";


export default async (req, res) => {
    try {
        const rest=req.query
        const client = await clientPromise;
        const db = client.db('foodOrders')
        const collection = db.collection('orders');
        const data = await collection.find({restaurant:rest.res}).toArray();
        console.log(data)
        res.json(data);
    } catch (e) {
        console.error(e);
    }
};



