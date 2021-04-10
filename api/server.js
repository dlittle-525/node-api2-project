// implement your server here
const express = require("express")
const postRouter = require("./posts/posts-router")

const server = express()

server.use(express.json())

// require your posts router and connect it here

server.use(postRouter)

module.exports = server