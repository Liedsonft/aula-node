const ObjectId = require ("mongodb").ObjectId;
const mongoClient = require("mongodb").MongoClient;
mongoClient.connect("mongodb://localhost:27017",)
                .then(connection => {
                    global.connection = connection.db("livro");
                    console.log("Conectamos ao MongoDB");
                })
                
                .catch (error => console.log(error));
                      
;

function findCustomers(sort){
    var obj = {titulo: 1, autor:1, ano:-1}
    if (sort == "ano") {
        obj = {ano: 1, titulo:1, autor:1}

    } else if (sort =="antigo"){
        obj = {ano : -1, titulo:1, autor:1}
    
    } else if (sort == "autor") {
        obj = {autor: 1, titulo:1, ano:-1}}

        
return global.connection
    .collection("livros")
    .find({}).sort(obj)
    .toArray()
}
function findCustomer (id) {
    const objectId = new ObjectId (id)
    return global.connection
    .collection ("livros")
    .findOne ({_id : objectId})
}

function insertCustomers (customer) {
    return global.connection
    .collection ("livros")
    .insertOne (customer)
}
function updateCustomers (id, customer) {
    const objectId = new ObjectId(id)
    return global.connection
    .collection("livros")
    .updateOne({_id: objectId}, {$set: customer})

}
function deleteCustomers (id){
    const objectId = new ObjectId(id)
    return global.connection
    .collection ("livros")
    .deleteOne ({_id: objectId})
}


module.exports = {
    findCustomers,
    findCustomer,
    insertCustomers,
    updateCustomers,
    deleteCustomers,
    
}