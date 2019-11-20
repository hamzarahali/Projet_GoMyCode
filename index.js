var express = require ("express") 
var app = express()
const Routers = {
    auth : require ("./controller/auth") ,
    hotel : require ("./controller/hotel") ,
    book : require ("./controller/book") , 
} 
const {
    addUserToLocal ,
} = require ("./middleware/auth")

require ("./configuration/mongodbConnexion") 

require ("./configuration/appConfiguration")(app)

app.use(addUserToLocal)
app.use ("/" , Routers.auth)
app.use ("/" , Routers.hotel)
app.use ("/books" , Routers.book)

app.get ("/", ( req , res ) => {
    res.render ("index") ; 
}) ;

app.listen(5000, console.log ("localhost:5000"))