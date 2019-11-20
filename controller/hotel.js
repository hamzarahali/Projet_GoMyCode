const express = require ("express") 
const router = express.Router() 
const Hotel = require ("../model/hotel") 

router.get ("/" , async (req,res) => {
    let searchQuery = {}
    const hotels = await Hotel.find(searchQuery)
        .populate()
        .exec()
    res.render ("index" , { hotels : hotels }) ; 
})

module.exports = router 