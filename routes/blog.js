const blog = require('express').Router();
const Blog = require('../models/blog.model')

const verify = require('./verifyToken')

//Get all blog posts
blog.route('/').get(verify, (req, res) => {
    Blog.find()
        .then(posts => res.json(posts))
        .catch(err => res.status(400).json('Error: ' + err))
})

//ADD BLOG POST
blog.route('/').post(verify, (req, res) => {
    const title = req.body.title;
    const section = req.body.section;
    const imageSource = req.body.imageSource;
    const body = req.body.body;
    const newBlogSection = new Blog({ title, section, imageSource, body })

    newBlogSection.save()
        .then(() => res.json('Post Added!'))
        .catch(err => res.status(400).json('Error: ' + err))
})

//DELETE BLOG POST
blog.route('/:id').delete(verify, (req, res) => {
    Blog.findById(req.params.id)
        .then(blog => {
            blog.remove()
            res.json('Post Deleted!')
        })
        .catch(err => res.status(400).json('Error: ' + err))
})

//GET SINGLE BLOG POST
blog.route('/:id').get(verify, (req, res) => {
    Blog.findById(req.params.id)
        .then(blog => {
            res.json(blog)
        })
        .catch(err => res.status(400).json('Error: ' + err))
})

//UPDATE BLOG POST
blog.route('/:id').put(verify, (req, res) => {
    const title = req.body.title;
    const section = req.body.section;
    const imageSource = req.body.imageSource;
    const body = req.body.body;
    Blog.findById(req.params.id)
        .then(blog => {
            blog.title = title;
            blog.section = section;
            blog.imageSource = imageSource;
            blog.body = body;
            blog.save()
            res.json('Blog Post Updated!')
        })
        .catch(err => res.status(400).json('Error: ' + err))
})


module.exports = blog;

