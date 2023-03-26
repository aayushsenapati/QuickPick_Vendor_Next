import clientPromise from "/lib/mongodb";


export default async (req, res) => {
    try {

        const client = await clientPromise; //query string will look like /api/newClient/clientemail
        const db = client.db('foodOrders')
        const collection = db.collection('menu');
        const query = { email: req.query.clientRes };
        const result=await collection.findOne(query, { restaurants: 1 })
        console.log(result)
    } catch (e) {
        console.error(e);
    }
};