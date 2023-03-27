import clientPromise from "/lib/mongodb";


export default async (req, res) => {
    try {

        const client = await clientPromise; //query string will look like /api/getClientRes/clientemail
        const db = client.db('foodOrders')
        const collection = db.collection('menu');
        //console.log(req.body.name)
        const query = { "email": req.query.foodItem, "restaurants.name": req.query.name };
        const update = { $set: { "restaurants.$.menu.$[elem].price": req.body.price } };
        const options = { arrayFilters: [{ "elem.name": "masala dosa" }] };


        // Update the document in the database
        const result = await collection.updateOne(query, update, options)
        console.log(result)
        res.json(result);
    }


    catch (e) {
        console.error(e);
    }
}