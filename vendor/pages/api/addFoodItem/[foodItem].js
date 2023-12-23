import clientPromise from "/lib/mongodb";


export default async (req, res) => {
    try {
        console.log("In api/addFoodItem");
        const client = await clientPromise; //query string will look like /api/getClientRes/clientemail
        const db = client.db('foodOrders')
        const collection = db.collection('menu');
        console.log(typeof(req.body.price))
        const query = { "email": req.query.foodItem, "restaurants.name": req.query.name };
        const update = { $set: { "restaurants.$.menu.$[elem].price": Number(req.body.price) } };
        const options = { arrayFilters: [{ "elem.name": req.body.name }] };


        // Update the document in the database
        const result = await collection.updateOne(query, update, options)
        console.log(result)
        res.json(result);
    }


    catch (e) {
        console.error(e);
    }
}