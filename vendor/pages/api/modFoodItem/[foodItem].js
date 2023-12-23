import clientPromise from "/lib/mongodb";


export default async (req, res) => {
    try {

        const client = await clientPromise; //query string will look like /api/getClientRes/clientemail
        const db = client.db('foodOrders')
        const collection = db.collection('menu');
        console.log(typeof(req.body.price))
        const query = { "email": req.query.foodItem, "restaurants.name": req.query.name };
        const update = { $push: { "restaurants.$.menu":{"name":req.body.name,"price":Number(req.body.price)} } };
        //const options = { arrayFilters: [{ "elem.name": "masala dosa" }] };


        // Update the document in the database
        const result = await collection.updateOne(query, update)
        console.log(result)
        res.json(result);
    }


    catch (e) {
        console.error(e);
    }
}