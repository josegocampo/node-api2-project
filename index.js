const express = require('express')
const server = express()

const postsRouter = require('./routes/posts-router')

server.use(express.json())

server.use("/posts", postsRouter)


server.use((req, res) => {
	res.status(404).json({
		message: "Route was not found",
	})
})

server.use((err, req, res, next) => {
	console.log(err)
	res.status(500).json({
        error: "There was an error while saving the post to the database",
	})
})

server.get('/', (req, res)=>{
    res.json({
        message: 'Welcome!'
    })
})


const PORT = 4000;

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})

