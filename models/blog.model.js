const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        min: 3
    },
    posts: []
}, {
    timestamps: true,
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog;