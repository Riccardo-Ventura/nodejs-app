var Express = require("express");
var Mongoclient = require("mongodb").MongoClient;
var cors = require("cors");
const multer = require("multer");

var app = Express();
app.use(cors());

var CONNECTION_STRING = "mongodb+srv://riccardoventurabo:rTQY7hiEmxCPXEkN@cluster0.fw5al.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
var DATABASENAME = "todoapp";
var database

app.listen(5038, () => {
    Mongoclient.connect(CONNECTION_STRING, (error, client) => {
        database = client.db(DATABASENAME);
        console.log("MONGO DB CONNECT SUCCESS");
    })
})

app.get('/api/todoapp/GetNotes', (request, response) => {
    database.collection("rtodoappcolettion").find({}).toArray((error, result) => {
        response.send(result);
    })
})

app.post('/api/todoapp/AddNotes', multer().none(), (request, response) => {
    database.collection("rtodoappcolettion").count({}, function (error, numOfDocs) {
        database.collection("rtodoappcolettion").insertOne({
            id: (numOfDocs + 1).toString(),
            description: request.body.newNotes
        });
        response.json("Added succ")
    })
})

app.delete('/api/todoapp/DeleteNotes', (request, response) => {
    database.collection("rtodoappcolettion").deleteOne({
        id: request.query.id
    });
    response.json("Delete succ")
})