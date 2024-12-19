"use strict";
const express = require('express');
const { getAllBlogs, createBlog, getBlog, updateBlog, deleteBlog } = require('../controllers/blogsController');
const router = express.Router();
router.route('/blogs').get(getAllBlogs).post(createBlog);
router.route('/blog/:id').get(getBlog).put(updateBlog).delete(deleteBlog);
module.exports = router;
