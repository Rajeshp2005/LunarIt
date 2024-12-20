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
exports.getBook = exports.getAllBooks = exports.deleteBook = exports.updateBook = exports.createBook = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const book_1 = __importDefault(require("../model/book"));
// Set up multer for file upload
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = 'uploads/';
        if (!fs_1.default.existsSync(uploadDir)) {
            fs_1.default.mkdirSync(uploadDir); // Create the directory if it doesn't exist
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const fileExtension = path_1.default.extname(file.originalname);
        const fileName = Date.now() + fileExtension; // Add timestamp to file name
        cb(null, fileName);
    }
});
const upload = (0, multer_1.default)({ storage: storage });
// Create Book with Image
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Upload image file
    upload.single('image')(req, res, (err) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            return res.status(400).json({ message: 'Error uploading file' });
        }
        // Get the file path from the uploaded file
        let fileName;
        if (!req.file) {
            fileName =
                "https://images.unsplash.com/photo-1731332066050-47efac6e884f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw4fHx8ZW58MHx8fHx8";
        }
        else {
            fileName = `http://localhost:3000/uploads/${req.file.filename}`;
        }
        // Destructure other book fields from the request body
        const { bookName, author, description, price, publishedDate, isbnNumber } = req.body;
        try {
            // Create the book in the database with image path
            const book = yield book_1.default.create({
                bookName,
                author,
                description,
                price,
                publishedDate,
                isbnNumber,
                image: fileName, // Store the image path in the database
            });
            // Respond with the created book
            res.status(201).json(book);
        }
        catch (err) {
            res.status(400).json({ message: err.message });
        }
    }));
});
exports.createBook = createBook;
// Update Book with Image (including image update)
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_1.default.findByPk(req.params.id);
    if (!book) {
        return res.status(404).json({ message: 'Book not found' });
    }
    // Upload image (same as in createBook)
    upload.single('image')(req, res, (err) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            return res.status(400).json({ message: 'Error uploading file' });
        }
        // Destructure other book fields from the request body
        const { bookName, author, description, price, publishedDate, isbnNumber } = req.body;
        // If a new image is uploaded, remove the old image
        let imagePath = book.image; // Keep the old image path by default
        if (req.file) {
            // Delete the old image file from the server (if any)
            if (book.image && fs_1.default.existsSync(book.image)) {
                fs_1.default.unlinkSync(book.image); // Delete the old image file
            }
            // Set the new image path (convert to URL like in createBook)
            imagePath = `http://localhost:3000/uploads/${req.file.filename}`; // New image URL
        }
        // Update the book's details
        book.bookName = bookName || book.bookName;
        book.author = author || book.author;
        book.description = description || book.description;
        book.price = price || book.price;
        book.publishedDate = publishedDate || book.publishedDate;
        book.isbnNumber = isbnNumber || book.isbnNumber;
        book.image = imagePath; // Update the image path if changed
        try {
            const updatedBook = yield book.save();
            res.status(202).json(updatedBook);
        }
        catch (err) {
            res.status(400).json({ message: err.message });
        }
    }));
});
exports.updateBook = updateBook;
// Delete Book (with image deletion)
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_1.default.findByPk(req.params.id);
    if (!book) {
        return res.status(404).json({ message: 'Book not found' });
    }
    try {
        // Remove the associated image file from the server
        if (book.image && fs_1.default.existsSync(book.image)) {
            fs_1.default.unlinkSync(book.image); // Delete the image file from the server
        }
        // Delete the book from the database
        yield book.destroy();
        res.status(200).json({ message: 'Book and associated image deleted successfully' });
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});
exports.deleteBook = deleteBook;
// Get All Books
const getAllBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield book_1.default.findAll();
        res.status(200).json(books);
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
});
exports.getAllBooks = getAllBooks;
// Get a Single Book by ID
const getBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield book_1.default.findByPk(req.params.id);
        if (book) {
            res.status(200).json(book);
        }
        else {
            res.status(404).json({ message: 'Book not found' });
        }
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
});
exports.getBook = getBook;
