const express = require('express')
const router = express.Router()

const db = require('../data/db')



router.post("/", async (req, res, next) =>{
    try{
        if (!req.body.title || !req.body.contents) {
            return res.status(400).json({
                errorMessage: "Please provide title and contents for the post."
            })
        }
            res.status(201).json(await db.insert(req.body))
    }
    catch(err){
        next(err)
    }
})

router.post("/:id/comments", async (req, res, next) =>{
    try{
        const post = await db.findById(req.params.id)

        if (post.length <= 0){
            res.json({message: "The post with the specified ID does not exist." })
        }
        else{
        !req.body.text ? res.status(400).json({errorMessage: "Please provide text for the comment."}) :
        res.status(201).json(await db.insertComment({
            text: req.body.text,
            post_id: req.params.id
        }))
        }
    }
    catch(err){
        next(err)
    }
})

// {
//     try {
//         !req.body.text ? res.status(400).json({message: "The text field is required"}) : null
//         const post = await db.findById(req.params.id);
//         if (post) {
//             res.status(201).json(await db.insertComment(req.body))
//         }
//     } catch {
//         res.status(500).json('There was an error while adding your comment')
//     }

// })


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

router.get("/:id/comments", async (req, res, next) =>{
        try{
            const post = await db.findById(req.params.id)
            if (post){
                res.json(await db.findPostComments(req.params.id))
            }
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