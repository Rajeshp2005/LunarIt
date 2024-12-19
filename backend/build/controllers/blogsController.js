"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const asyncHandler = require('express-async-handler');
const blog_1 = __importDefault(require("../model/blog"));
const getAllBlogs = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogs = yield blog_1.default.findAll();
        res.status(200).json(blogs);
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
}));
const createBlog = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, author, pic } = req.body;
    if (!title || !description || !author) {
        res.status(400);
        throw new Error("Please fill all the fields");
        return;
    }
    const blogData = {
        title: title,
        description: description,
        author: author,
        pic: pic || `https://picsum.photos/600/400?seed=${Math.random() * 100 + 1}`,
    };
    const blog = yield blog_1.default.create(blogData);
    res.status(201).json(blog);
}));
const getBlog = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params);
    const blog = yield blog_1.default.findByPk(req.params.id);
    if (blog) {
        res.status(200).json(blog);
    }
    else {
        res.status(404);
        throw new Error("Blog not found");
    }
}));
const updateBlog = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blog_1.default.findByPk(req.params.id);
    if (blog) {
        blog.title = req.body.title || blog.title;
        blog.description = req.body.description || blog.description;
        blog.author = req.body.author || blog.author;
        const updatedBlog = yield blog.save();
        res.status(202).json(updatedBlog);
    }
    else {
        res.status(404);
        throw new Error("Blog not found");
    }
}));
const deleteBlog = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blog_1.default.findByPk(req.params.id);
    try {
        if (blog) {
            yield blog.destroy();
            res.status(200).json({ message: 'Blog deleted successfully' });
        }
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
}));
module.exports = { getAllBlogs, createBlog, getBlog, deleteBlog, updateBlog };
