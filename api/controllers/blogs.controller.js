const { request, response } = require('express');
const { Blog } = require('../models');
const urlSlug = require('url-slug');
const { fileUpload: fileUploadHelper } = require("../helpers");
const { filesUpload: filesUploadHelper } = require("../helpers");

const blogsGetPublic = async (req, res = response) => {

    const [ totalBlogs, blogs, blogsLimit, blogsAll] = await Promise.all([
        Blog.countDocuments({delete:false, active:true}),
        Blog.find({delete:false, active:true}).sort({date: 1}),
        Blog.find({delete:false, active:true}).sort({date: 1}).limit(3),
        Blog.find({delete:false, active:true}).sort({date: 1})
    ]);

    res.json({
        totalBlogs,
        blogs,
        blogsLimit,
        blogsAll
    });
};

const blogsChildrenGet = async ( req = request, res = response) => {
    const id = req.params.id;

    const blogs = await Blog.find({parent:id, delete:false});
    res.status(200).json({
        blogs
    });
}

const blogGetPublic = async ( req = request, res = response) => {
    const slug = req.params.slug;

    const blog = await Blog.findOne({slug});
    res.status(200).json({
        blog
    });
}

const blogsGet = async (req, res = response) => {

    const [ totalBlogs, blogs, blogsAll] = await Promise.all([
        Blog.countDocuments({delete:false, parent:{$exists: false}}),
        Blog.find({delete:false, parent:{$exists: false}}),
        Blog.find({delete:false})
    ]);

    res.json({
        totalBlogs,
        blogs,
        blogsAll
    });
};

const blogPost = async (req = request, res = response) => {

    let { name, description, intro, date } = req.body;
    let image;
    let slug = urlSlug(name);
    let images = [];
    if(req.files){
        if(req.files.file){
            image = await fileUploadHelper(req.files, undefined, 'news');
        }
        if(req.files.image){
            if(Array.isArray(req.files.image)) {
                images = await filesUploadHelper(req.files.image, undefined, 'news');
            } else {
                req.files.file = req.files.image
                let imageGallery = await fileUploadHelper(req.files, undefined, 'news');
                images.push(imageGallery);
            }
        }
    }
    let data;
    data = {name, description, intro, date, slug};
    data.image = image;
    let blog = new Blog(data);

    // Guardar en Base de datos
    await blog.save();

    blog = await Blog.findByIdAndUpdate(blog._id, {$push: {images: {$each: images}}}, {new:true});

    res.json({
        blog
    })
}

const blogActive = async (req = request, res = response) => {

    let { id, option } = req.body;

    const [blog] = await Promise.all([
        Blog.findByIdAndUpdate(id,{active:option}, {new:true})
    ]);

    const authenticatedUser = req.user;

    res.json({
        blog,
        authenticatedUser
    });
}

const blogShow = async ( req = request, res = response) => {
    const id = req.params.id;

    const blog = await Blog.findById(id);
    res.status(200).json({
        blog
    });
}

const blogPut = async ( req = request, res = response) => {
    const id = req.params.id;
    let { name, description, intro, date } = req.body;
    let image;
    let slug = urlSlug(name);
    let images;
    let blog;
    let data = {name, description, intro, date, slug};
    if(req.files){
        if(req.files.file) {
            image = await fileUploadHelper(req.files, undefined, 'news');
            data.image = image
        }
        if(req.files.image){
            if(Array.isArray(req.files.image)) {
                images = await filesUploadHelper(req.files.image, undefined, 'news');
                await Blog.findByIdAndUpdate(id, {$push: {images: {$each: images}}});
            } else {
                req.files.file = req.files.image
                imageGallery = await fileUploadHelper(req.files, undefined, 'news');
                images.push(imageGallery);
                await Blog.findByIdAndUpdate(id, {$push: {images: {$each: images}}});
            }
        }
    }

    blog = await Blog.findByIdAndUpdate(id, data, {new: true});


    res.status(201).json({
        blog
    });
}

const blogDelete = async (req = request, res = response) => {
    const id = req.params.id;

    const [blog] = await Promise.all([
        Blog.findByIdAndUpdate(id,{delete:true}, {new:true})
    ]);

    res.json({
        blog,
    });
}

module.exports = {
    blogsGetPublic,
    blogGetPublic,
    blogsGet,
    blogPost,
    blogActive,
    blogShow,
    blogPut,
    blogsChildrenGet,
    blogDelete
}
