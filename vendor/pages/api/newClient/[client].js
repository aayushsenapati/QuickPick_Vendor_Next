import clientPromise from "/lib/mongodb";


export default async (req, res) => {
    try {
        
        const client = await clientPromise; //query string will look like /api/newClient/clientemail?upi = upiId
        const db = client.db('foodOrders')
        const collection = db.collection('menu');
        

        
        
        

        const newClient = {
            email: req.query.client,
            upi: "",
            restaurants: []
        };
        

        //insert new client into db 
        const data = await collection.insertOne(newClient);
        

        console.log(data)
        res.json(data);
    } catch (e) {
        console.error(e);
    }
};