const blog = require('express').Router();
const Blog = require('../models/blog.model')

const verify = require('./verifyToken')

//Get all blog sections and blog posts
blog.route('/').get(verify, (req, res) => {
    Blog.find()
        .then(sections => res.json(sections))
        .catch(err => res.status(400).json('Error: ' + err))
})

//ADD EMPTY BLOG SECTION
blog.route('/').post(verify, (req, res) => {
    const title = req.body.title;
    const posts = []
    const newBlogSection = new Blog({ title, posts })

    newBlogSection.save()
        .then(() => res.json('Section added!'))
        .catch(err => res.status(400).json('Error: ' + err))
})


module.exports = blog;

