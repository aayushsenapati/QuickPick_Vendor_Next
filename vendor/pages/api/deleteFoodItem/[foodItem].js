import clientPromise from "/lib/mongodb";

export default async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db("foodOrders");
        const collection = db.collection("menu");

        const query = {
            email: req.query.foodItem,
            "restaurants.name": req.query.resName,
            "restaurants.menu.name": req.query.name,
        };

        // Remove the food item from the menu array
        const update = {
            $pull: {
                "restaurants.$.menu": { name: req.query.name },
            },
        };

        //const options = { arrayFilters: [{ "elem.name": "masala dosa" }] };

        // Update the document in the database
        
        const result = await collection.updateOne(query, update);      
        console.log(result);
        res.json(result);
    } catch (e) {
        console.error(e);
    }
};
