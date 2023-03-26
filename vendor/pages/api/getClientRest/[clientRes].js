import clientPromise from "/lib/mongodb";


export default async (req, res) => {
    try {

        const client = await clientPromise; //query string will look like /api/newClient/clientemail
        const db = client.db('foodOrders')
        const collection = db.collection('menu');

        const query = { email: req.query.clientRes };

        //insert new client into db 
        await collection.findOne(query, { restaurants: 1 },(err,result)=>{if(err)throw err; console.log("Successfully Fetched");res.json()})       
    } catch (e) {
        console.error(e);
    }
};