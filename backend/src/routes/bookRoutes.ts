const express = require('express');
const { getAllBooks,createBook,getBook,updateBook,deleteBook } = require('../controllers/booksController');
const router = express.Router();

router.route('/books').get(getAllBooks).post(createBook);
router.route('/books/:id').get(getBook).patch(updateBook).delete(deleteBook);

module.exports = router;