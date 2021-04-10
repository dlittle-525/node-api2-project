// implement your posts router here
const express = require("express")
const db = require("./posts-model")

const router = express.Router()

router.get("/api/posts", (req, res) => {
    db.find()
        .then((posts) => {
            res.status(200).json(posts)
        })
        .catch((error) => {
			console.log(error)
			res.status(500).json({
				message: "The posts information could not be retrieved",
			})
		})
})

router.get("/api/posts/:id", async (req, res) => {
    db.findById(req.params.id)
    .then((post) => {
        if (post) {
            res.status(200).json(post)
        } else {
            res.status(404).json({
                message: "The post with the specified ID does not exist"
            })
        }
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json({
            message: "The post information could not be retrieved",
        })
    })
})

router.post("/api/posts", (req, res) => {
    if (!req.body.title || !req.body.contents) {
        return res.status(400).json({
            message: "Please provide title and contents for the post",
        })
    }

    db.insert(req.body)
        .then((post) => {
            res.status(201).json(post)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({
                message: "There was an error while saving the post to the database",
            })
        })
})

router.put("/api/posts/:id", (req, res) => {
    if (!req.body.title || req.body.contents) {
        return res.status(400).json({
            message: "Please provide title and contents for the post",
        })
    }

    db.update(req.params.id, req.body)
        .then((post) => {
            if (post) {
                res.status(20).json(post)
            } else {
                res.status(200).json({
                    message: "The post with the specified ID does not exist",
                })
            }
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({
                message: "The post information could not be modified",
            })
        })
})

router.delete("/api/posts/:id", (req, res) => {
    db.remove(req.params.id)
        .then((count) => {
            if (count > 0) {
                res.status(200).end
            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist",
                })
            }
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({
                message: "The post could not be removed",
            })
        })
})

router.get("/api/posts/:id/comments", (req, res) => {
    db.findPostComments(req.params.id)
        .then((comments) => {
            res.json(comments)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({
                message: "The comments information could not be retrieved",
            })
        })
})

module.exports = router