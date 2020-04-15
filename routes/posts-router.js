const express = require('express')
const router = express.Router()

const db = require('../data/db')

router.get("/", async (req, res, next) =>{
        try{
            res.json(await db.find())
        }
        catch(err)
        {
            next(err)
        }
})


router.get("/:id", async (req, res, next) => {
        try{
            res.json(await db.findById(req.params.id))
        }
        catch(err)
        {
            next(err)
        }
})


router.post("/", async (req, res, next) =>{
    try{
        res.json(await db.insert(req.body))
    }
    catch(err){
        next(err)
    }
})

router.delete("/:id", async (req, res, next) =>{
    try{
        res.json(await db.remove(req.params.id))
    }
    catch(err){
        next(err)
    }
})



module.exports = router;