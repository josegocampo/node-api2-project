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

router.put("/:id", async (req, res, next) =>{
    try{
        const post = await db.findById(req.params.id)

        if (post.length <= 0){
            res.status(404).json({message: "The post with the specified ID does not exist." })
        }
        else{
          if(!req.body.title && !req.body.contents){
              console.log(req.body)
              res.status(400).json({errorMessage: "Please provide title and contents for the post."})
          }console.log(req.body)
         res.json(await db.update(post, req.body))
        }
    }
    catch(err){
        next(err)
    }
})



module.exports = router;