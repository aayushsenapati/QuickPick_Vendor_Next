import clientPromise from "/lib/mongodb";


export default async (req, res) => {
    try {
        const rest=req.query //query object will look like this {name: "restaurantName", upi: "upiId"}
        const client = await clientPromise; //query string will look like /api/add/restaurantName?upi=upiId
        const db = client.db('foodOrders')
        const collection = db.collection('menu');

       

        // Check if the restaurant already exists
        const restaurantName = 'My Restaurant';
        const upiId = 'myrestaurant@upi';
        console.log(data)
        res.json(data);
    } catch (e) {
        console.error(e);
    }
};