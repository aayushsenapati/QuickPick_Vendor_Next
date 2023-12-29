import clientPromise from "/lib/mongodb";

export default async (req, res) => {
    try {
        const client = await clientPromise; //query string will look like /api/getClientRes/clientemail
        const db = client.db('foodOrders')
        const collection = db.collection('menu');

        const query = { email: req.query.clientRes };
        const result = await collection.find(query, { projection: { restaurants: 1, _id: 0 } }).toArray();

        if (result.length > 0) {
            if (req.query.name === undefined) {
                res.json(result[0].restaurants)
            }
            else {
                const resName = req.query.name;
                const resObj = result[0].restaurants.find((obj) => obj.name === resName);
                res.json(resObj);
            }
        } else {
            res.status(404).json({ message: 'No results found' });
        }
    } catch (e) {
        console.error(e);
    }
};