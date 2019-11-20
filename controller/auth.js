const express = require ("express") 
const router = express.Router() 
const User = require ("../model/user") 
const Book = require ("../model/book")

router.get ("/login" , (req,res) => {
    res.render ("login") 
}) ;

router.get ("/register" , (req,res) => {
    res.render ("register") 
})

router.post ("/register" , async ( req , res , next ) => {
    const user = await User.findOne ( { email : req.body.email } )
    if ( !!user ) 
        return res.render ("register" , { errors : ["EMAIL ALREADY EXISTANT"] } )
    let newUser = new User ({
        username : req.body.username , 
        email : req.body.email , 
        password : req.body.password
    })
    newUser = await newUser.save() 
    res.redirect ("/login") 
})

router.post ("/login" , async ( req , res , err ) => {
    const user = await User.findOne ({ email : req.body.email , password : req.body.password }).exec()  
    if ( !user ) 
        return res.render ("login" , { errors : ["WRONG EMAIL OR PASSWORD "]})
    req.session.isAuthenticated = true  
    req.session.user = user.toObject() 
    return req.session.save ( err => {
        res.redirect ("/")
    })
})

router.get ("/logout" , async ( req , res ) => {
    req.session.destroy ( err => {
        res.redirect ("/")
    })
})

router.get ("/profile" , async ( req , res ) => {
    res.render ("profile" ) 
})

router.get ("/delete/:id" , async ( req , res ) => {
    await Book.deleteOne ().populate('user')
    await User.deleteOne ( { _id : req.params.id } ) 
    req.session.destroy ( err => {
        res.redirect ("/")
    })
})

module.exports = router 