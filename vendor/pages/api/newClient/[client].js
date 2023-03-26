import clientPromise from "/lib/mongodb";


export default async (req, res) => {
    try {
        
        const client = await clientPromise; //query string will look like /api/newClient/clientemail
        const db = client.db('foodOrders')
        const collection = db.collection('menu');
        

        
        
        

        const newClient = {
            email: req.query.client,
            upi: "",
            restaurants: []
        };
        

        //insert new client into db 
        const check = await collection.findOne({email:req.query.client})
        console.log("Data retrieved:",check)
        if(!check){
            t = await collection.insertOne(newClient);
            console.log("This is after insert: ",t)
            res.send("Successfully inserted new client")
        }
        else{
        res.send("Client exists")
        }

        

        // res.json(data);
    } catch (e) {
        console.error(e);
    }
};