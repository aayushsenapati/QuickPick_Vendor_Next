import clientPromise from "/lib/mongodb";


export default async (req, res) => {
    try {
         //query object will look like this {rest:xys@gmail.com,name: "restaurantName", upi: "upiId"}
        const client = await clientPromise; //query string will look like /api/add/restaurantName?upi=upiId
        const db = client.db('foodOrders')
        const collection = db.collection('menu');


        const restaurant = {
            name: req.query.name,
            menu: [],
            upiId: req.query.upi
        };


        const query = { email: req.query.rest };


        const update = { $addToSet: { restaurants: restaurant } };
        //const update = { $push: { restaurants: restaurant } };


        collection.updateOne(query, update, (err, result) => {
            if (err) throw err;
            console.log(result);
            res.send("Successfully added restaurant");
        })

    } 
    catch (e) {
        console.error(e);
    }
};