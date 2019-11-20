const express = require ("express") 
const router = express.Router() 
const Book = require ("../model/book")
const User = require ("../model/user")
const Hotel = require ("../model/hotel")

router.get ("/" , async ( req , res ) => {
    const books = await Book.find()
    res.render ("books/" , { books : books } )
})

router.get ("/book/:id" , async ( req , res ) => {
    const hotel = await Hotel.findById ( req.params.id )
    res.render ("books/book" , { hotel : hotel })
})

router.post ("/book/:id" , async ( req , res ) => {
    const user = await User.findById ( req.session.user._id )
    const hotel = await Hotel.findById (req.params.id)
    let newBook = { ...req.body , user : user , hotel : hotel }
    const book = new Book(newBook)
    await book.save() ; 
    res.redirect ("/books/")
})

router.get ("/delete/:id" , async ( req , res ) => {
    await Book.deleteOne ( { _id : req.params.id } )
    res.redirect ("/books/")
})

router.get ("/edit/:id" , async ( req , res ) => {
    const book = await Book.findById (req.params.id)
    const hotel = await Hotel.findById (book.hotel._id)
        let searchQuery = {}
        const hotels = await Hotel.find(searchQuery)
            .populate()
            .exec()
    res.render ("books/edit" , { book : book  , hotel : hotel , hotels : hotels})
})

router.post ("/edit/:id" , async ( req , res ) => {
    let newBook = { ...req.body } 
    await Book.updateOne (
        { _id : req.params.id } , 
        {
            $set : newBook
        }
    )
    res.redirect ("/books/")
})

router.get ("/print/:id" , async ( req , res ) => {
    const book = await Book.findById ( req.params.id ) 
    const hotel = await Hotel.findById ( book.hotel._id )
    res.render ("books/print" , { book : book , hotel : hotel })
})

module.exports = router