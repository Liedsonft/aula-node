const ObjectId = require ("mongodb").ObjectId;
const mongoClient = require("mongodb").MongoClient;
mongoClient.connect("mongodb://localhost:27017",)
                .then(connection => {
                    global.connection = connection.db("familia");
                    console.log("Conectamos ao MongoDB");
                })
                
                .catch (error => console.log(error));
                      
;

function findCustomers(){
return global.connection
    .collection("membros")
    .find({})
    .toArray()
}
function insertCustomers (customer) {
    return global.connection
    .collection ("membros")
    .insertOne (customer)
}
function updateCustomers (id, customer) {
    const objectId = new Objectid(id)
    return global.connection
    .collection("membros")
    .updateOne({_id: objectId}, {$set: customer})
}
function deleteCustomers (id){
    const objectId = new Objectid(id)
    return global.connection
    .collection ("membros")
    .deleteOne ({_id: objectId})
}


module.exports = {
    findCustomers,
    insertCustomers,
    updateCustomers,
    deleteCustomers
}